import { NextResponse } from "next/server";
import { Resend } from "resend";

type QuoteBody = {
  service: string;
  size: string;
  quantity: string;
  finish: string;
  deadline: string;
  name: string;
  phone: string;
};

function isQuoteBody(value: unknown): value is QuoteBody {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.service === "string" &&
    typeof v.size === "string" &&
    typeof v.quantity === "string" &&
    typeof v.finish === "string" &&
    typeof v.deadline === "string" &&
    typeof v.name === "string" &&
    typeof v.phone === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isQuoteBody(body)) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Server-side validation, independent of the client form. Never trust
  // that a request came from our own JS.
  if (!body.service || !body.name.trim() || !body.phone.trim()) {
    return NextResponse.json(
      { error: "Service, name and phone are required." },
      { status: 400 },
    );
  }

  // TODO(step 4 follow-up): RESEND_API_KEY is not set yet. Once Alvin has
  // a Resend account, set RESEND_API_KEY and QUOTE_TO_EMAIL in the Vercel
  // project env vars (and .env.local for dev) and this starts delivering
  // for real. Until then every submission fails honestly rather than
  // pretending to have been sent.
  if (!process.env.RESEND_API_KEY) {
    console.error("Quote request received but RESEND_API_KEY is not configured:", body);
    return NextResponse.json(
      { error: "Quote requests are not yet connected to email. Please use WhatsApp instead." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.QUOTE_TO_EMAIL ?? "hello@cityviewprinters.co.ke";

  const { error } = await resend.emails.send({
    from: "CityView Printers <quotes@cityviewprinters.co.ke>",
    to: toEmail,
    replyTo: body.phone,
    subject: `Quote request: ${body.service}`,
    text: [
      `Service: ${body.service}`,
      `Size: ${body.size || "not given"}`,
      `Quantity: ${body.quantity || "not given"}`,
      `Finish: ${body.finish || "not given"}`,
      `Needed by: ${body.deadline || "not given"}`,
      `Name: ${body.name}`,
      `Phone: ${body.phone}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
