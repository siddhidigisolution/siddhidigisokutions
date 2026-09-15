"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import type { Expression } from "../hero/expressions";
import type { DirOverride, Ref } from "../hero/Robot";
import {
  PROJECT_TYPES,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  SPEECH_BUBBLES,
} from "./contactContent";
import PillSelector from "./PillSelector";
import FormProgress from "./FormProgress";
import { submitContactForm, type ContactFormPayload } from "./submitContactForm";

const MESSAGE_MIN_LENGTH = 20;
const MESSAGE_THINKING_LENGTH = 120;

// preset look-angles per field — a believable, subtle rightward-and-down
// gaze that progresses as the user moves through the form, without needing
// to measure exact DOM positions across the robot/form component boundary
const FIELD_LOOK: Record<string, { x: number; y: number }> = {
  name: { x: 0.3, y: 0.15 },
  email: { x: 0.35, y: 0.05 },
  phone: { x: 0.35, y: -0.05 },
  projectType: { x: 0.4, y: -0.15 },
  budget: { x: 0.4, y: -0.25 },
  timeline: { x: 0.4, y: -0.3 },
  message: { x: 0.3, y: -0.45 },
  submit: { x: 0.2, y: -0.55 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectTypes: string[];
  budget: string | null;
  timeline: string | null;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  projectTypes: [],
  budget: null,
  timeline: null,
  message: "",
};

interface Errors {
  name?: string;
  email?: string;
  projectTypes?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactForm = forwardRef<
  HTMLDivElement,
  {
    dirOverrideRef: Ref<DirOverride>;
    onExpression: (expression: Expression) => void;
    onSpeech: (text: string | null) => void;
    onStatusChange: (status: FormStatus) => void;
  }
>(function ContactForm({ dirOverrideRef, onExpression, onSpeech, onStatusChange }, ref) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hasStartedTyping = useRef(false);
  const pulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setStatusBoth = (next: FormStatus) => {
    setStatus(next);
    onStatusChange(next);
  };

  const lookAt = (field: keyof typeof FIELD_LOOK) => {
    const dir = FIELD_LOOK[field];
    dirOverrideRef.current.active = true;
    dirOverrideRef.current.x = dir.x;
    dirOverrideRef.current.y = dir.y;
  };
  const lookAway = () => {
    dirOverrideRef.current.active = false;
  };

  const pulseExpression = (expression: Expression, revertTo: Expression, ms = 1400) => {
    onExpression(expression);
    if (pulseTimeout.current) clearTimeout(pulseTimeout.current);
    pulseTimeout.current = setTimeout(() => onExpression(revertTo), ms);
  };

  const isEmailValid = (value: string) => EMAIL_RE.test(value.trim());

  const currentBaseExpression = (): Expression => {
    if (!isEmailValid(form.email)) return "happy";
    if (
      form.name.trim() &&
      isEmailValid(form.email) &&
      form.projectTypes.length > 0 &&
      form.message.trim().length >= MESSAGE_MIN_LENGTH
    ) {
      return "joyful";
    }
    if (form.message.length > MESSAGE_THINKING_LENGTH) return "cheerful";
    return "joyful";
  };

  const handleTextChange = (field: "name" | "email" | "phone" | "message", value: string) => {
    setForm((f) => ({ ...f, [field]: value }));

    if (!hasStartedTyping.current && value.trim()) {
      hasStartedTyping.current = true;
      onExpression("happy");
      onSpeech(SPEECH_BUBBLES.typing);
    }

    if (field === "email" && isEmailValid(value)) {
      onExpression("joyful");
    } else if (field === "message") {
      if (value.length > MESSAGE_THINKING_LENGTH) {
        onExpression("cheerful");
      } else if (value.trim()) {
        onExpression(currentBaseExpression());
      }
    }

    if (errors[field as keyof Errors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const toggleProjectType = (key: string) => {
    setForm((f) => {
      const has = f.projectTypes.includes(key);
      const next = has ? f.projectTypes.filter((k) => k !== key) : [...f.projectTypes, key];
      return { ...f, projectTypes: next };
    });
    if (!form.projectTypes.includes(key)) {
      pulseExpression("excited", currentBaseExpression());
      onSpeech(SPEECH_BUBBLES.projectSelected);
    }
    if (errors.projectTypes) setErrors((e) => ({ ...e, projectTypes: undefined }));
  };

  const isComplete =
    form.name.trim().length > 0 &&
    isEmailValid(form.email) &&
    form.projectTypes.length > 0 &&
    form.message.trim().length >= MESSAGE_MIN_LENGTH;

  const wasComplete = useRef(false);
  useEffect(() => {
    if (isComplete && !wasComplete.current) {
      onExpression("joyful");
      onSpeech(SPEECH_BUBBLES.complete);
    }
    wasComplete.current = isComplete;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  const activeStepIndex = (() => {
    if (status === "success") return 3;
    if (form.message.trim().length > 0 || form.budget || form.timeline) return 2;
    if (form.projectTypes.length > 0) return 1;
    if (form.name || form.email || form.phone) return 0;
    return 0;
  })();

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "We'd love to know what to call you.";
    if (!form.email.trim() || !isEmailValid(form.email)) {
      next.email = "Looks like the email needs a quick check.";
    }
    if (form.projectTypes.length === 0) {
      next.projectTypes = "Pick at least one — even a guess is fine.";
    }
    if (form.message.trim().length < MESSAGE_MIN_LENGTH) {
      next.message = "A few more details would help us understand your idea.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onExpression("cheerful");
      return;
    }

    lookAt("submit");
    onExpression("excited");
    setStatusBoth("submitting");
    setSubmitError(null);

    const payload: ContactFormPayload = { ...form };
    const result = await submitContactForm(payload);

    if (result.ok) {
      onExpression("happy");
      onSpeech(SPEECH_BUBBLES.submitted);
      setStatusBoth("success");
    } else {
      onExpression("cheerful");
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
      setStatusBoth("error");
    }
  };

  if (status === "success") {
    return (
      <div ref={ref} className="rounded-[28px] border border-border-soft bg-surface p-8 text-center shadow-[0_30px_70px_-40px_rgba(76,58,140,0.35)] sm:p-12">
        <h3 className="text-[1.8rem] font-bold tracking-[-0.01em] text-ink sm:text-[2.1rem]">
          We&rsquo;re on it.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-muted">
          Your project brief is on its way to us. We&rsquo;ll get back to you soon.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-from to-accent-cta-to px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(91,63,224,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Back to Home <span aria-hidden>↗</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-semibold text-ink transition-colors duration-300 hover:border-accent-tint-border hover:bg-accent-tint dark:border-white/10"
          >
            Explore Our Work <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="rounded-[28px] border border-border-soft bg-surface p-6 shadow-[0_30px_70px_-40px_rgba(76,58,140,0.35)] sm:p-9">
      <FormProgress activeIndex={activeStepIndex} />

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-9">
        {/* 01 — YOUR DETAILS */}
        <fieldset>
          <legend className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint">
            01 — YOUR DETAILS
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your Name" htmlFor="contact-name" error={errors.name}>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => handleTextChange("name", e.target.value)}
                onFocus={() => lookAt("name")}
                onBlur={lookAway}
                placeholder="What should we call you?"
                className={inputClass(!!errors.name)}
                aria-invalid={!!errors.name}
              />
            </Field>
            <Field label="Email Address" htmlFor="contact-email" error={errors.email}>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleTextChange("email", e.target.value)}
                onFocus={() => lookAt("email")}
                onBlur={lookAway}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field label="Phone / WhatsApp (optional)" htmlFor="contact-phone" className="sm:col-span-2">
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => handleTextChange("phone", e.target.value)}
                onFocus={() => lookAt("phone")}
                onBlur={lookAway}
                placeholder="+91 XXXXX XXXXX"
                className={inputClass(false)}
              />
            </Field>
          </div>
        </fieldset>

        {/* 02 — YOUR PROJECT */}
        <fieldset>
          <legend className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint">
            02 — YOUR PROJECT
          </legend>
          <div
            onFocus={() => lookAt("projectType")}
            onBlur={lookAway}
            className="mt-4"
          >
            <PillSelector
              options={PROJECT_TYPES}
              selected={form.projectTypes}
              onToggle={toggleProjectType}
            />
            {errors.projectTypes && <ErrorText>{errors.projectTypes}</ErrorText>}
          </div>
        </fieldset>

        {/* 03 — PROJECT RANGE + TIMELINE */}
        <fieldset>
          <legend className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint">
            03 — PROJECT RANGE
          </legend>
          <p className="mt-1 text-[12.5px] text-ink-faint">Optional — no pressure if you&rsquo;re not sure yet.</p>
          <div onFocus={() => lookAt("budget")} onBlur={lookAway} className="mt-4">
            <PillSelector
              options={BUDGET_OPTIONS}
              selected={form.budget ? [form.budget] : []}
              onToggle={(key) => setForm((f) => ({ ...f, budget: f.budget === key ? null : key }))}
            />
          </div>

          <legend className="mt-7 text-[11px] font-semibold tracking-[0.14em] text-ink-faint">
            TIMELINE
          </legend>
          <div onFocus={() => lookAt("timeline")} onBlur={lookAway} className="mt-4">
            <PillSelector
              options={TIMELINE_OPTIONS}
              selected={form.timeline ? [form.timeline] : []}
              onToggle={(key) => setForm((f) => ({ ...f, timeline: f.timeline === key ? null : key }))}
            />
          </div>
        </fieldset>

        {/* 04 — TELL US MORE */}
        <fieldset>
          <legend className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint">
            04 — TELL US MORE
          </legend>
          <div className="mt-4">
            <Field label="Tell us about your idea..." htmlFor="contact-message" error={errors.message}>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={(e) => handleTextChange("message", e.target.value)}
                onFocus={() => lookAt("message")}
                onBlur={lookAway}
                placeholder="What are you building, what problem are you solving, or what would you like to improve?"
                rows={6}
                className={inputClass(!!errors.message) + " resize-none"}
                aria-invalid={!!errors.message}
              />
            </Field>
          </div>
        </fieldset>

        {submitError && (
          <p role="alert" className="text-[13px] font-medium text-[#c2557a] dark:text-[#e88bab]">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          onMouseEnter={() => lookAt("submit")}
          onMouseLeave={lookAway}
          className={[
            "group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-from to-accent-cta-to px-8 py-4 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(91,63,224,0.6)] transition-all duration-400",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            status === "submitting" ? "opacity-80" : "hover:scale-[1.015] hover:shadow-[0_22px_50px_-14px_rgba(91,63,224,0.7)]",
          ].join(" ")}
        >
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Send Project Brief
              <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                ↗
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
});

export default ContactForm;

function Field({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-medium text-ink-soft">
        {label}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#c2557a] dark:text-[#e88bab]">
      {children}
    </p>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-surface-alt px-4 py-3 text-[14px] text-ink outline-none transition-all duration-300 placeholder:text-ink-faint",
    "focus:bg-surface focus:shadow-[0_0_0_4px_rgba(139,124,246,0.14)]",
    hasError
      ? "border-[#f0b4c8] dark:border-[#7a3f56]"
      : "border-border-soft focus:border-accent-tint-border",
  ].join(" ");
}
