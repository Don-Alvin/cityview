"use client";

import { useState, type FormEvent } from "react";
import { whatsappMessageLink } from "@/content/contact";
import styles from "./site.module.css";

type ServiceOption = { slug: string; title: string };

export function QuoteForm({
  services,
  initialService,
}: {
  services: ServiceOption[];
  initialService?: string;
}) {
  const [errors, setErrors] = useState<{ service?: string; name?: string; phone?: string }>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    const details = [
      `Service: ${service}`,
      size && `Size: ${size}`,
      quantity && `Quantity: ${quantity}`,
      finish && `Finish: ${finish}`,
      deadline && `Needed by: ${deadline}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
    ].filter(Boolean).join("\n");
    window.location.assign(whatsappMessageLink(`Hi CityView, I'd like a quote.\n\n${details}`));
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.formStack}>
      <div>
        <label htmlFor="quote-service" className="field-label">
          Service
        </label>
        <select
          id="quote-service"
          name="service"
          defaultValue={initialService ?? ""}
          required
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "quote-service-error" : undefined}
          className="form-field"
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
        {errors.service && <p id="quote-service-error" className="field-error">{errors.service}</p>}
      </div>

      <div className={styles.formGroup}>
        <div>
          <label htmlFor="quote-size" className="field-label">
            Size
          </label>
          <input
            id="quote-size"
            name="size"
            type="text"
            placeholder="e.g. A5, A2, 60x90cm"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="quote-quantity" className="field-label">
            Quantity
          </label>
          <input
            id="quote-quantity"
            name="quantity"
            type="text"
            placeholder="e.g. 500"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="quote-finish" className="field-label">
            Finish
          </label>
          <input
            id="quote-finish"
            name="finish"
            type="text"
            placeholder="e.g. matte, gloss, spot UV"
            className="form-field"
          />
        </div>

        <div>
          <label htmlFor="quote-deadline" className="field-label">
            When do you need it?
          </label>
          <input
            id="quote-deadline"
            name="deadline"
            type="text"
            placeholder="Enter a date or timeframe"
            className="form-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-name" className="field-label">
          Full name
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          placeholder="Alex Mwangi"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          className="form-field"
        />
        {errors.name && <p id="quote-name-error" className="field-error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="quote-phone" className="field-label">
          Phone number
        </label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          placeholder="07XX XXX XXX"
          required
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "quote-phone-error" : undefined}
          className="form-field"
        />
        {errors.phone && <p id="quote-phone-error" className="field-error">{errors.phone}</p>}
      </div>

      <button type="submit" className="site-action">Continue on WhatsApp</button>
    </form>
  );
}
