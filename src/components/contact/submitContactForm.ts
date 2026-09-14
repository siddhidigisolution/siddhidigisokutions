import emailjs from "@emailjs/browser";

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  projectTypes: string[];
  budget: string | null;
  timeline: string | null;
  message: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// UI/submission-logic boundary: the form only ever talks to this function.
// Sends the brief via EmailJS (https://www.emailjs.com) straight from the
// browser to the studio's connected inbox — no backend server needed.
// Set NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY in
// .env.local (see .env.local.example) to activate it.
export async function submitContactForm(
  payload: ContactFormPayload
): Promise<SubmitResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] EmailJS isn't configured yet — set the NEXT_PUBLIC_EMAILJS_* vars in .env.local. Payload:",
        payload
      );
    }
    return {
      ok: false,
      error: "The contact form isn't fully set up yet — please email us directly for now.",
    };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: payload.name,
        from_email: payload.email,
        phone: payload.phone || "Not provided",
        project_types: payload.projectTypes.join(", ") || "Not specified",
        budget: payload.budget ?? "Not specified",
        timeline: payload.timeline ?? "Not specified",
        message: payload.message,
      },
      { publicKey: PUBLIC_KEY }
    );
    return { ok: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[contact] EmailJS send failed:", err);
    }
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again or email us directly.",
    };
  }
}
