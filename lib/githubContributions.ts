// Server-only. Fetches the contribution calendar from GitHub's public
// profile-graph endpoint (github.com/users/<user>/contributions - plain
// HTML, no token or API quota) and parses it into typed data. Cached via
// ISR so GitHub is hit at most once per revalidate window, not per visitor.

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  weekday: number; // 0 = Sunday .. 6 = Saturday
  week: number; // column index, 0 = oldest week
  level: 0 | 1 | 2 | 3 | 4;
  count: number;
};

export type ContributionCalendar = {
  total: number;
  weekCount: number;
  days: ContributionDay[];
};

const REVALIDATE_SECONDS = 6 * 60 * 60;

export async function fetchContributions(
  username: string
): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;
    return parseContributions(await res.text());
  } catch {
    return null;
  }
}

// The endpoint returns a <table>: one <td class="ContributionCalendar-day">
// per day carrying data-date / data-level, with an id like
// "contribution-day-component-<weekday>-<week>". Exact counts live in
// sibling <tool-tip for="<that id>"> elements ("3 contributions on ...").
function parseContributions(html: string): ContributionCalendar | null {
  const countById = new Map<string, number>();
  const toolTipRe = /<tool-tip\b[^>]*?for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  for (const match of html.matchAll(toolTipRe)) {
    const text = match[2].trim();
    const num = /^([\d,]+)\s+contribution/.exec(text);
    countById.set(match[1], num ? parseInt(num[1].replace(/,/g, ""), 10) : 0);
  }

  const days: ContributionDay[] = [];
  let weekCount = 0;
  const dayRe = /<td\b[^>]*?data-date="(\d{4}-\d{2}-\d{2})"[^>]*?>/g;
  for (const match of html.matchAll(dayRe)) {
    const td = match[0];
    const id = /id="(contribution-day-component-(\d+)-(\d+))"/.exec(td);
    const level = /data-level="(\d)"/.exec(td);
    if (!id || !level) continue;
    const weekday = parseInt(id[2], 10);
    const week = parseInt(id[3], 10);
    weekCount = Math.max(weekCount, week + 1);
    days.push({
      date: match[1],
      weekday,
      week,
      level: Math.min(4, parseInt(level[1], 10)) as ContributionDay["level"],
      count: countById.get(id[1]) ?? 0,
    });
  }

  // A real year has ~365 cells; far fewer means GitHub changed its markup
  // and the parser is misreading - treat as unavailable rather than render
  // a broken graph.
  if (days.length < 300) return null;

  const totalMatch =
    /js-contribution-activity-description[^>]*>\s*([\d,]+)\s+contribution/.exec(html);
  const total = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : days.reduce((sum, d) => sum + d.count, 0);

  days.sort((a, b) => (a.date < b.date ? -1 : 1));
  return { total, weekCount, days };
}
