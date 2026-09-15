import { NextResponse } from "next/server";
import { Resend } from "resend";

type QuoteRequestBody = {
  name: string;
  email: string;
  project: string;
};

function isQuoteRequestBody(value: unknown): value is QuoteRequestBody {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.project === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isQuoteRequestBody(body)) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Server-side validation, independent of the client form. Never trust
  // that a request came from our own JS.
  if (!body.name.trim() || !body.email.trim() || !body.project.trim()) {
    return NextResponse.json(
      { error: "Name, email and project details are required." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Quote request received but RESEND_API_KEY is not configured:", body);
    return NextResponse.json(
      { error: "Quote requests are not yet connected to email. Please message us on WhatsApp instead." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.QUOTE_TO_EMAIL ?? "hello@cityviewprinters.co.ke";

  const { error } = await resend.emails.send({
    from: "CityView Printers <quotes@cityviewprinters.co.ke>",
    to: toEmail,
    replyTo: body.email,
    subject: `Quote request from ${body.name}`,
    text: [`Name: ${body.name}`, `Email: ${body.email}`, "", body.project].join("\n"),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
