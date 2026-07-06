import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * Stores contact-form submissions in Neon Postgres (free tier auto-wakes
 * on demand, so the form never goes dark from inactivity).
 * The table is created on first use - configuring the form is just
 * setting DATABASE_URL to a Neon connection string.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot field - real users never fill it; pretend success for bots.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    message.trim().length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Please provide a valid name, email and a message of at least 10 characters." },
      { status: 400 }
    );
  }

  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json(
      { error: "Contact form is not configured yet - email me directly instead." },
      { status: 503 }
    );
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at timestamptz DEFAULT now(),
        name text NOT NULL,
        email text NOT NULL,
        message text NOT NULL
      )`;
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name.trim()}, ${email.trim()}, ${message.trim()})`;
  } catch (error) {
    console.error("contact insert failed:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Could not send the message. Try again or email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
