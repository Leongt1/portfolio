import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Stores contact-form submissions in a Supabase `contact_messages` table:
 *   create table contact_messages (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz default now(),
 *     name text not null,
 *     email text not null,
 *     message text not null
 *   );
 * Env: SUPABASE_URL + SUPABASE_SECRET_KEY (server-only; RLS stays enabled with no public policies).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot field — real users never fill it; pretend success for bots.
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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Contact form is not configured yet — email me directly instead." },
      { status: 503 }
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  if (error) {
    console.error("contact insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not send the message. Try again or email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
