"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitContact } from "@/actions/contact";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  t: Dictionary["contact"];
  services: { value: string; label: string }[];
  whatsappNumber: string;
  whatsappGreeting: string;
  newTabLabel: string;
};

// Defined here (not imported from contact-schema) so zod stays out of the client bundle.
const initialState: ContactState = {
  status: "idle",
  errors: {},
  values: { name: "", phone: "", email: "", service: "", message: "", consent: "" },
};

const inputClass =
  "block w-full rounded-md border bg-paper px-4 text-base text-ink transition-shadow placeholder:text-muted/70 focus-visible:border-gold-text focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-gold)_22%,transparent)] aria-[invalid=true]:border-error";

export function ContactForm({ t, services, whatsappNumber, whatsappGreeting, newTabLabel }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // After a failed submit, move focus to the first invalid field.
  useEffect(() => {
    if (state.status === "error") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
    if (state.status === "success") statusRef.current?.focus();
  }, [state]);

  const err = (field: ContactField) => state.errors[field];
  const msg = (field: ContactField) => {
    const key = err(field);
    return key ? t.errors[key] : undefined;
  };
  const fieldProps = (field: ContactField, hint?: boolean) => ({
    id: `contact-${field}`,
    name: field,
    "aria-invalid": err(field) ? true : undefined,
    "aria-describedby":
      [hint ? `contact-${field}-hint` : "", err(field) ? `contact-${field}-error` : ""].filter(Boolean).join(" ") ||
      undefined,
  });

  const { form } = t;
  const selectedService = services.find((service) => service.value === state.values.service)?.label;
  const whatsappUrl =
    state.status === "success" && state.values.name
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          [
            whatsappGreeting,
            `Name: ${state.values.name}`,
            `Phone: ${state.values.phone}`,
            ...(state.values.email ? [`Email: ${state.values.email}`] : []),
            `Service: ${selectedService ?? state.values.service}`,
            `Message: ${state.values.message}`,
          ].join("\n"),
        )}`
      : undefined;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={
          state.status === "success"
            ? "rounded-md border-l-4 border-whatsapp bg-white px-5 py-4 font-medium text-ink"
            : state.status === "error"
              ? "rounded-md border-l-4 border-error bg-white px-5 py-4 font-medium text-error"
              : "sr-only"
        }
      >
        {state.status === "success" ? form.success : state.status === "error" ? form.errorSummary : ""}
      </p>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lift btn-sheen inline-flex min-h-12 items-center justify-center rounded-md bg-whatsapp px-6 text-base font-semibold text-white shadow-[var(--shadow-soft)] hover:brightness-110"
        >
          {form.sendWhatsApp}
          <span className="sr-only"> {newTabLabel}</span>
        </a>
      )}

      <fieldset className="space-y-6">
        <legend className="sr-only">{form.legend}</legend>

        <Field id="name" label={form.name} error={msg("name")}>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            defaultValue={state.values.name}
            className={`${inputClass} h-12 border-rule`}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="phone"
            label={form.phone}
            hint={form.phoneHint}
            error={msg("phone")}
          >
            <input
              {...fieldProps("phone", true)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              defaultValue={state.values.phone}
              className={`${inputClass} h-12 border-rule`}
            />
          </Field>
          <Field
            id="email"
            label={form.email}
            optional={form.optional}
            error={msg("email")}
          >
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              defaultValue={state.values.email}
              className={`${inputClass} h-12 border-rule`}
            />
          </Field>
        </div>

        <Field id="service" label={form.service} error={msg("service")}>
          <select
            key={`service-${state.values.service}`}
            {...fieldProps("service")}
            defaultValue={state.values.service}
            className={`${inputClass} h-12 border-rule pr-10`}
          >
            <option value="" disabled>
              {form.servicePlaceholder}
            </option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="message"
          label={form.message}
          hint={form.messageHint}
          error={msg("message")}
        >
          <textarea
            {...fieldProps("message", true)}
            rows={5}
            defaultValue={state.values.message}
            className={`${inputClass} border-rule py-3`}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="contact-company">{form.honeypot}</label>
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              key={`consent-${state.values.consent}`}
              {...fieldProps("consent")}
              type="checkbox"
              value="on"
              defaultChecked={state.values.consent === "on"}
              className="mt-1 size-5 shrink-0 accent-ink"
            />
            <label htmlFor="contact-consent" className="text-[0.95rem] leading-relaxed text-muted">
              {form.consent}
            </label>
          </div>
          {err("consent") && (
            <p id="contact-consent-error" className="mt-2 text-sm font-medium text-error">
              {msg("consent")}
            </p>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="btn-lift btn-sheen inline-flex min-h-13 w-full items-center justify-center rounded-md bg-ink px-9 text-base font-semibold text-white shadow-[var(--shadow-soft)] hover:bg-ink-deep disabled:opacity-70 sm:w-auto"
      >
        {pending ? form.sending : form.submit}
      </button>
    </form>
  );
}

type FieldProps = {
  id: ContactField;
  label: string;
  hint?: string;
  optional?: string;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, hint, optional, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-2 block text-[0.95rem] font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> ({optional})</span>}
      </label>
      {children}
      {hint && (
        <p id={`contact-${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`contact-${id}-error`} className="mt-2 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
