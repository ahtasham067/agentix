"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitQuote, type QuoteState } from "@/app/contact/actions";
import { Icon } from "@/components/icons";
import {
  BUDGET_OPTIONS,
  PLAN_OPTIONS,
  QUOTE_FIELDS,
  SERVICE_OPTIONS,
  validateQuote,
  type FieldErrors,
  type QuoteField,
} from "@/lib/quote-schema";

const initialState: QuoteState = { status: "idle" };

const inputClass =
  "block w-full rounded-[10px] border border-line bg-bg px-[17px] text-[16px] text-text placeholder:text-[rgb(244_241_238/0.55)] transition-[border-color,box-shadow] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgb(255_107_44/0.25)] aria-[invalid=true]:border-[#ff8a5c]";

function Field({
  id,
  label,
  error,
  hint,
  className = "",
  children,
}: {
  id: QuoteField;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] leading-[20px] font-semibold">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      <div className="mt-[2px]">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-[6px] text-[13.5px] leading-[18px] text-[#ff9b73]">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  placeholder,
  options,
  defaultValue,
  error,
  onBlur,
}: {
  id: QuoteField;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required
        defaultValue={defaultValue ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        className={`${inputClass} h-[52px] appearance-none pr-[44px] invalid:text-[rgb(244_241_238/0.68)]`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={14}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-[18px] -translate-y-1/2 text-muted"
      />
    </div>
  );
}

/** Fields the pricing buttons can preselect through the URL (?service=…&plan=…). */
const PREFILL = { service: SERVICE_OPTIONS, plan: PLAN_OPTIONS } as const;

/**
 * Applies allow-listed ?service= and ?plan= values to the selects. Runs in the
 * browser, so the page itself stays static; unknown values are ignored.
 */
export function applyPrefill(form: HTMLFormElement, search: string) {
  const params = new URLSearchParams(search);
  for (const [field, options] of Object.entries(PREFILL)) {
    const value = params.get(field);
    const select = form.elements.namedItem(field);
    if (value && select instanceof HTMLSelectElement && options.some((o) => o.value === value)) {
      select.value = value;
    }
  }
}

/** Quote request form. Works without JavaScript; validates on the client too. */
export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) applyPrefill(formRef.current, window.location.search);
  }, []);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };
  const values = state.values ?? {};

  function readForm(form: HTMLFormElement) {
    const data = new FormData(form);
    return Object.fromEntries(QUOTE_FIELDS.map((f) => [f, String(data.get(f) ?? "")]));
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (!submitted) return;
    const field = e.currentTarget.name as QuoteField;
    const result = validateQuote(readForm(e.currentTarget.form!));
    setClientErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.errors[field],
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setSubmitted(true);
    const result = validateQuote(readForm(e.currentTarget));
    if (!result.success) {
      e.preventDefault();
      setClientErrors(result.errors);
      const first = QUOTE_FIELDS.find((f) => result.errors[f]);
      if (first) e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors({});
  }

  const describedBy = (field: QuoteField) => (errors[field] ? `${field}-error` : undefined);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-line bg-secondary px-[40px] py-[48px]"
        data-testid="quote-success"
      >
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary text-on-primary">
          <Icon name="check" size={24} strokeWidth={2.4} />
        </span>
        <h2 className="mt-[24px] text-[28px] leading-[1.2] tracking-[-0.01em]">
          Thanks{state.name ? `, ${state.name}` : ""}. Your request is in.
        </h2>
        <p className="mt-[12px] max-w-[520px] text-[17px] leading-[1.6] text-muted">
          We will read your details and reply within one working day with questions or a plan, a
          timeline and a price.
        </p>
        <a
          href="/contact"
          className="mt-[28px] inline-flex h-[44px] items-center rounded-[12px] border border-[rgb(244_241_238/0.3)] px-[22px] text-[15px] font-semibold"
        >
          Send another request
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="quote"
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="quote-form-title"
      className="relative scroll-mt-[96px] rounded-card border border-line bg-secondary p-[24px] sm:p-[40px]"
    >
      <h2 id="quote-form-title" className="text-[25.5px] leading-[32px] tracking-[-0.01em]">
        Tell us about your project
      </h2>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mt-[16px] rounded-[10px] border border-[rgb(255_107_44/0.5)] bg-[rgb(255_107_44/0.12)] px-[16px] py-[12px] text-[14.5px] leading-[20px]"
        >
          {state.message}
        </div>
      )}

      {/* Honeypot for bots. Hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute top-0 left-[-10000px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-[28px] grid gap-x-[20px] gap-y-[23px] sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your name"
            defaultValue={values.fullName}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy("fullName")}
            onBlur={onBlur}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            onBlur={onBlur}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id="whatsapp" label="WhatsApp number" error={errors.whatsapp}>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="+92 3XX XXXXXXX"
            defaultValue={values.whatsapp}
            aria-invalid={errors.whatsapp ? true : undefined}
            aria-describedby={describedBy("whatsapp")}
            onBlur={onBlur}
            className={`${inputClass} h-[52px]`}
          />
        </Field>
        <Field id="service" label="Service" error={errors.service}>
          <Select
            id="service"
            placeholder="Choose a service"
            options={SERVICE_OPTIONS}
            defaultValue={values.service}
            error={errors.service}
            onBlur={onBlur}
          />
        </Field>
        <Field id="plan" label="Plan" error={errors.plan}>
          <Select
            id="plan"
            placeholder="Choose a plan"
            options={PLAN_OPTIONS}
            defaultValue={values.plan}
            error={errors.plan}
            onBlur={onBlur}
          />
        </Field>
        <Field id="budget" label="Budget range" error={errors.budget}>
          <Select
            id="budget"
            placeholder="Select a range"
            options={BUDGET_OPTIONS}
            defaultValue={values.budget}
            error={errors.budget}
            onBlur={onBlur}
          />
        </Field>
        <Field
          id="details"
          label="Project details"
          error={errors.details}
          className="sm:col-span-2"
        >
          <textarea
            id="details"
            name="details"
            required
            maxLength={4000}
            rows={5}
            placeholder="What do you want to build or automate?"
            defaultValue={values.details}
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy("details")}
            onBlur={onBlur}
            className={`${inputClass} h-[150px] resize-y py-[14px] leading-[24px]`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-[20px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-primary text-[16px] font-semibold text-on-primary transition-colors hover:bg-[#ff7d45] disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
