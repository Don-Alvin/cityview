"use client";

import { useState, type FormEvent } from "react";
import { whatsappMessageLink } from "@/content/contact";
import styles from "./site.module.css";

export function QuoteModal() {
  const [errors, setErrors] = useState<{ name?: string; project?: string }>({});

  function close() {
    (document.getElementById("quote-modal") as HTMLDialogElement | null)?.close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!project) nextErrors.project = "Tell us what you'd like printed.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.location.assign(whatsappMessageLink(`Hi CityView, I'd like a quote.\n\nName: ${name}\n\n${project}`));
  }

  return (
    <dialog
      id="quote-modal"
      aria-labelledby="modal-title"
      onClose={() => setErrors({})}
      className={styles.quoteDialog}
    >
      <div className={styles.dialogHeader}>
        <h2 id="modal-title">Request a quote</h2>
        <button type="button" onClick={close} aria-label="Close quote request" className={styles.iconButton}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <form noValidate onSubmit={handleSubmit} className={styles.formStack}>
        <div>
          <label htmlFor="quote-dialog-name" className="field-label">Full name</label>
          <input
            id="quote-dialog-name"
            name="name"
            type="text"
            placeholder="Alex Mwangi"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-dialog-name-error" : undefined}
            className="form-field"
          />
          {errors.name && <p id="quote-dialog-name-error" className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="quote-dialog-project" className="field-label">What would you like printed?</label>
          <textarea
            id="quote-dialog-project"
            name="project"
            rows={3}
            placeholder="Tell us what you need, the size, quantity and deadline"
            required
            aria-invalid={Boolean(errors.project)}
            aria-describedby={errors.project ? "quote-dialog-project-error" : undefined}
            className="form-field resize-y"
          />
          {errors.project && <p id="quote-dialog-project-error" className="field-error">{errors.project}</p>}
        </div>
        <p className={styles.prose}>WhatsApp opens with your details ready to send.</p>
        <button type="submit" className="site-action">Continue on WhatsApp</button>
      </form>
    </dialog>
  );
}
