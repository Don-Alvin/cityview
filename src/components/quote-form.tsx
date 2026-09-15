"use client";

import { useState, type FormEvent } from "react";
import { Pill } from "./pill";
import { whatsappLink } from "@/content/contact";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

type ServiceOption = { slug: string; title: string };

const fieldClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-body-sm focus:outline-none focus:ring-3 focus:ring-brand/20 focus:border-brand disabled:cursor-not-allowed disabled:opacity-50";

// DESIGN.md defines no error/danger colour token (same gap noted for
// quote-modal.tsx, see report.md): a heavier border plus explicit copy
// stands in for colour, which is also the more accessible choice.
function borderFor(hasError: boolean) {
  return hasError ? "border-2 border-ink" : "border-hairline";
}

/**
 * The structured alternative to WhatsApp (IMPLEMENTATION.md build order
 * step 4): unlike the quick name/email/project modal reachable from every
 * "Request a quote" pill, this is the full job brief the client actually
 * needs to price a print run, matching src/app/api/quote/route.ts's
 * fields exactly (service, size, quantity, finish, deadline, name, phone).
 */
export function QuoteForm({
  services,
  initialService,
}: {
  services: ServiceOption[];
  initialService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ service?: string; name?: string; phone?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("there");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service = String(form.get("service") ?? "").trim();
    const size = String(form.get("size") ?? "").trim();
    const quantity = String(form.get("quantity") ?? "").trim();
    const finish = String(form.get("finish") ?? "").trim();
    const deadline = String(form.get("deadline") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!service) nextErrors.service = "Choose a service.";
    if (!name) nextErrors.name = "Enter your name.";
    if (!phone) nextErrors.phone = "Enter a phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFirstName(name.split(/\s+/)[0] || "there");
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, size, quantity, finish, deadline, name, phone }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong sending your request.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const submitting = status === "submitting";

  if (status === "success") {
    return (
      <div className="mt-8 max-w-[28rem] rounded-card bg-surface p-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand">
          <svg viewBox="0 0 24 24" width="24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-body-lg font-medium">Request received</h2>
        <p className="mt-2 text-body-sm text-ink-soft">
          Thanks, {firstName}, our team will be in touch to price your job.
        </p>
        <Pill href="/" className="mt-5">
          Back to home
        </Pill>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-8 flex max-w-[34rem] flex-col gap-5">
      <div>
        <label htmlFor="quote-service" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
          Service
        </label>
        <select
          id="quote-service"
          name="service"
          defaultValue={initialService ?? ""}
          disabled={submitting}
          className={`${fieldClasses} ${borderFor(Boolean(errors.service))}`}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
        {errors.service ? <p className="mt-1.5 text-body-sm text-ink">{errors.service}</p> : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-size" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
            Size
          </label>
          <input
            id="quote-size"
            name="size"
            type="text"
            placeholder="e.g. A5, A2, 60x90cm"
            disabled={submitting}
            className={`${fieldClasses} border-hairline`}
          />
        </div>

        <div>
          <label htmlFor="quote-quantity" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
            Quantity
          </label>
          <input
            id="quote-quantity"
            name="quantity"
            type="text"
            placeholder="e.g. 500"
            disabled={submitting}
            className={`${fieldClasses} border-hairline`}
          />
        </div>

        <div>
          <label htmlFor="quote-finish" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
            Finish
          </label>
          <input
            id="quote-finish"
            name="finish"
            type="text"
            placeholder="e.g. matte, gloss, spot UV"
            disabled={submitting}
            className={`${fieldClasses} border-hairline`}
          />
        </div>

        <div>
          <label htmlFor="quote-deadline" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
            Needed by
          </label>
          <input
            id="quote-deadline"
            name="deadline"
            type="text"
            placeholder="e.g. 2 weeks, or a date"
            disabled={submitting}
            className={`${fieldClasses} border-hairline`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-name" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
          Full name
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          placeholder="Alex Mwangi"
          disabled={submitting}
          className={`${fieldClasses} ${borderFor(Boolean(errors.name))}`}
        />
        {errors.name ? <p className="mt-1.5 text-body-sm text-ink">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="quote-phone" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
          Phone number
        </label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          placeholder="07XX XXX XXX"
          disabled={submitting}
          className={`${fieldClasses} ${borderFor(Boolean(errors.phone))}`}
        />
        {errors.phone ? <p className="mt-1.5 text-body-sm text-ink">{errors.phone}</p> : null}
      </div>

      {status === "error" ? <p className="text-body-sm text-ink">{serverError}</p> : null}

      <div className="flex flex-wrap items-center gap-4">
        <Pill type="submit" disabled={submitting}>
          {submitting ? "Sending" : "Request a quote"}
        </Pill>
        <Link href={whatsappLink()} className="text-body-sm text-ink-soft underline underline-offset-4 hover:text-ink">
          Prefer to chat? Message us on WhatsApp
        </Link>
      </div>
    </form>
  );
}
