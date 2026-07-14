import { profile } from "@/data/profile";
import {
  fetchContributions,
  type ContributionCalendar,
  type ContributionDay,
} from "@/lib/githubContributions";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CELL = "11px";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Heat scale derived from the hud-red token; level 0 stays a panel-colored
// socket so empty days read as part of the HUD, not as data.
const LEVEL_STYLE: React.CSSProperties[] = [
  {
    background: "var(--color-hud-panel2)",
    boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--color-hud-line2) 60%, transparent)",
  },
  { background: "color-mix(in srgb, var(--color-hud-red) 28%, var(--color-hud-panel2))" },
  { background: "color-mix(in srgb, var(--color-hud-red) 55%, var(--color-hud-panel2))" },
  { background: "color-mix(in srgb, var(--color-hud-red) 80%, var(--color-hud-panel2))" },
  {
    background: "var(--color-hud-red)",
    boxShadow: "0 0 6px color-mix(in srgb, var(--color-hud-red) 55%, transparent)",
  },
];

function prettyDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// One label per month change, at the column where the month starts. The
// first label is dropped when the second follows within 3 columns (the
// leading month is a partial week and its label would overlap).
function monthLabels(days: ContributionDay[]) {
  const firstDayOfWeek = new Map<number, string>();
  for (const day of days) {
    const existing = firstDayOfWeek.get(day.week);
    if (!existing || day.date < existing) firstDayOfWeek.set(day.week, day.date);
  }
  const labels: { week: number; label: string }[] = [];
  let prevMonth = -1;
  for (const [week, date] of [...firstDayOfWeek.entries()].sort((a, b) => a[0] - b[0])) {
    const month = Number(date.slice(5, 7)) - 1;
    if (month !== prevMonth) {
      labels.push({ week, label: MONTHS[month] });
      prevMonth = month;
    }
  }
  if (labels.length > 1 && labels[1].week - labels[0].week < 3) labels.shift();
  return labels;
}

function computeStats(days: ContributionDay[]) {
  let longestStreak = 0;
  let streak = 0;
  let busiest: ContributionDay | null = null;
  for (const day of days) {
    streak = day.count > 0 ? streak + 1 : 0;
    longestStreak = Math.max(longestStreak, streak);
    if (day.count > 0 && (!busiest || day.count > busiest.count)) busiest = day;
  }
  return { longestStreak, busiest };
}

function Heatmap({ calendar }: { calendar: ContributionCalendar }) {
  const rows = `16px repeat(7, ${CELL})`;
  return (
    <div className="mt-6 flex gap-3">
      <div
        className="shrink-0 font-mono text-[10px] leading-none text-hud-dim"
        style={{ display: "grid", gridTemplateRows: rows, gap: "3px" }}
        aria-hidden
      >
        <span style={{ gridRow: 3 }}>MON</span>
        <span style={{ gridRow: 5 }}>WED</span>
        <span style={{ gridRow: 7 }}>FRI</span>
      </div>
      <div className="overflow-x-auto pb-2">
        <div
          role="img"
          aria-label={`GitHub contribution heatmap: ${calendar.total} contributions in the last 12 months`}
          style={{
            display: "grid",
            gridTemplateRows: rows,
            gridTemplateColumns: `repeat(${calendar.weekCount}, ${CELL})`,
            gap: "3px",
          }}
        >
          {monthLabels(calendar.days).map(({ week, label }) => (
            <span
              key={`${label}-${week}`}
              className="font-mono text-[10px] leading-none text-hud-dim whitespace-nowrap"
              style={{ gridRow: 1, gridColumn: `${week + 1} / span 4` }}
              aria-hidden
            >
              {label.toUpperCase()}
            </span>
          ))}
          {calendar.days.map((day) => (
            <div
              key={day.date}
              title={`${day.count} contribution${day.count === 1 ? "" : "s"} · ${prettyDate(day.date)}`}
              style={{
                gridRow: day.weekday + 2,
                gridColumn: day.week + 1,
                ...LEVEL_STYLE[day.level],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function GithubActivity() {
  const username = profile.github.split("/").filter(Boolean).pop() ?? "";
  const calendar = await fetchContributions(username);
  const stats = calendar ? computeStats(calendar.days) : null;

  return (
    <section id="activity" className="py-24 border-t border-hud-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="COMBAT RECORD" title="GitHub Activity" />
        </Reveal>

        <Reveal delay={80}>
          {calendar ? (
            <div className="hud-clip border border-hud-line border-t-2 border-t-hud-red bg-hud-panel p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-mono text-xs tracking-[0.25em] text-hud-cyan">
                  {"// "}
                  {calendar.total} CONTRIBUTIONS · LAST 12 MONTHS
                </p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-underline font-mono text-xs tracking-[0.2em] text-hud-muted hover:text-hud-text"
                >
                  @{username.toUpperCase()} ↗
                </a>
              </div>

              <Heatmap calendar={calendar} />

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hud-line pt-5">
                <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-[0.15em] text-hud-muted">
                  <span>
                    LONGEST STREAK{" "}
                    <span className="text-hud-text">{stats?.longestStreak ?? 0}D</span>
                  </span>
                  {stats?.busiest && (
                    <span>
                      PEAK DAY{" "}
                      <span className="text-hud-text">
                        {stats.busiest.count} · {prettyDate(stats.busiest.date).toUpperCase()}
                      </span>
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-hud-dim"
                  aria-hidden
                >
                  LESS
                  {LEVEL_STYLE.map((style, level) => (
                    <span
                      key={level}
                      className="inline-block h-[11px] w-[11px]"
                      style={style}
                    />
                  ))}
                  MORE
                </div>
              </div>
            </div>
          ) : (
            <div className="hud-clip border border-dashed border-hud-line2 bg-hud-panel p-6 sm:p-8">
              <p className="font-mono text-sm tracking-[0.2em] text-hud-dim">
                SIGNAL LOST <span className="text-hud-red">{"//"}</span> LIVE CONTRIBUTION FEED
                UNAVAILABLE
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-underline mt-4 inline-block font-mono text-xs tracking-[0.2em] text-hud-cyan"
              >
                OPEN GITHUB PROFILE ↗
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
