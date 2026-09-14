export interface PillOption {
  key: string;
  label: string;
}

export const PROJECT_TYPES: PillOption[] = [
  { key: "website", label: "Website" },
  { key: "software", label: "Software" },
  { key: "branding", label: "Branding" },
  { key: "design", label: "Design" },
  { key: "motion", label: "Motion & Video" },
  { key: "ai", label: "AI / Automation" },
  { key: "other", label: "Something Else" },
];

export const BUDGET_OPTIONS: PillOption[] = [
  { key: "under-50k", label: "Under ₹50K" },
  { key: "50k-1l", label: "₹50K – ₹1L" },
  { key: "1l-3l", label: "₹1L – ₹3L" },
  { key: "3l-plus", label: "₹3L+" },
  { key: "not-sure", label: "Not sure yet" },
];

export const TIMELINE_OPTIONS: PillOption[] = [
  { key: "asap", label: "ASAP" },
  { key: "2-4-weeks", label: "2–4 Weeks" },
  { key: "1-2-months", label: "1–2 Months" },
  { key: "3-plus-months", label: "3+ Months" },
  { key: "flexible", label: "Flexible" },
];

export const FORM_STEPS = [
  { key: "details", label: "Details" },
  { key: "project", label: "Project" },
  { key: "message", label: "Message" },
  { key: "send", label: "Send" },
] as const;

export const CONTACT_EMAIL = "siddhidigisolution@gmail.com";
export const CONTACT_PHONE_DISPLAY = "+91 94047 96646";
export const CONTACT_PHONE_LINK = "tel:+919404796646";
export const CONTACT_WHATSAPP_DISPLAY = "+91 94047 96646";
export const CONTACT_WHATSAPP_LINK = "https://wa.me/919404796646";

export const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/siddhi_digisolution" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mohit-warpe-578670286/" },
];

export const SPEECH_BUBBLES = {
  empty: "So, what are we building?",
  projectSelected: "Nice choice.",
  typing: "Tell me everything.",
  complete: "Looks like we're ready.",
  submitted: "I'll make sure the team sees this.",
};
