"use client";

import { useState, type FormEvent } from "react";
import { Pill } from "./pill";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-body-sm focus:outline-none focus:ring-3 focus:ring-brand/20 focus:border-brand disabled:cursor-not-allowed disabled:opacity-50";

/**
 * DESIGN.md defines no error/danger colour token, so the error state
 * here is a heavier border and explicit copy rather than an invented red:
 * CLAUDE.md's "never hardcode a hex value" rule leaves no token to reach
 * for, and not relying on colour alone to signal an error is the more
 * accessible choice anyway.
 */
function borderFor(hasError: boolean) {
  return hasError ? "border-2 border-ink" : "border-hairline";
}

/**
 * The mockup's own quote form: name, email, project. Rendered once
 * (in Footer) and opened from anywhere via document.getElementById to
 * avoid prop-drilling open state through header, footer and the overlay
 * menu; a native <dialog> with showModal() already gives focus trap,
 * Escape-to-close and focus-return for free (DESIGN.md section 7).
 */
export function QuoteModal() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; project?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("there");

  function close() {
    const dialog = document.getElementById("quote-modal") as HTMLDialogElement | null;
    dialog?.close();
  }

  function resetAfterClose() {
    setStatus("idle");
    setErrors({});
    setServerError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter your email.";
    if (!project) nextErrors.project = "Tell us what you'd like printed.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFirstName(name.split(/\s+/)[0] || "there");
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project }),
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

  return (
    <dialog
      id="quote-modal"
      aria-labelledby="modal-title"
      onClose={resetAfterClose}
      className="relative w-[calc(100%-1.5rem)] max-w-[32rem] rounded-card-lg bg-white p-5 text-ink backdrop:bg-brand-deep/40 sm:p-7"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close quote request"
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-surface"
      >
        <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <span className="eyebrow text-eyebrow font-medium">Request a quote</span>

      {status === "success" ? (
        <div className="mt-5 rounded-card bg-surface p-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <svg viewBox="0 0 24 24" width="24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-body-lg font-medium">Request received</h3>
          <p className="mt-2 text-body-sm text-ink-soft">
            Thanks, {firstName}, our team will be in touch to discuss your print project.
          </p>
          <Pill onClick={close} className="mt-5">
            Done
          </Pill>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="mt-3 flex flex-col gap-4">
          <h2 id="modal-title" className="text-title-sm font-medium leading-none">
            Tell us what
            <br />
            you want to make
          </h2>

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
            <label htmlFor="quote-email" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
              Email
            </label>
            <input
              id="quote-email"
              name="email"
              type="email"
              placeholder="you@email.com"
              disabled={submitting}
              className={`${fieldClasses} ${borderFor(Boolean(errors.email))}`}
            />
            {errors.email ? <p className="mt-1.5 text-body-sm text-ink">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="quote-project" className="mb-1.5 block text-eyebrow font-medium text-ink-soft">
              What would you like printed?
            </label>
            <textarea
              id="quote-project"
              name="project"
              rows={3}
              placeholder="Tell us the product, quantity, size and when you need it"
              disabled={submitting}
              className={`${fieldClasses} resize-y ${borderFor(Boolean(errors.project))}`}
            />
            {errors.project ? <p className="mt-1.5 text-body-sm text-ink">{errors.project}</p> : null}
          </div>

          {status === "error" ? (
            <p className="text-body-sm text-ink">{serverError}</p>
          ) : null}

          <Pill type="submit" disabled={submitting}>
            {submitting ? "Sending" : "Request a quote"}
          </Pill>
        </form>
      )}
    </dialog>
  );
}
