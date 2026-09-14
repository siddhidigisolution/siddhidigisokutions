import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_LINK,
  SOCIAL_LINKS,
} from "./contactContent";

const CONTACT_ITEMS = [
  {
    key: "email",
    label: "EMAIL",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "WHATSAPP",
    value: CONTACT_WHATSAPP_DISPLAY,
    href: CONTACT_WHATSAPP_LINK,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
          d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8.5 9.5c0 3.6 2.4 6 6 6l.9-1.8-2.4-.9-.6.9c-1.2-.6-2.1-1.5-2.7-2.7l.9-.6-.9-2.4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "location",
    label: "LOCATION",
    value: "India",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    key: "availability",
    label: "AVAILABILITY",
    value: "Available for new projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.15" />
        <circle cx="12" cy="12" r="2.3" fill="currentColor" />
      </svg>
    ),
  },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7.6" cy="8.1" r="1.1" fill="currentColor" />
      <path d="M7.6 10.8v6.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M11.2 16.9v-4c0-1.6 1.1-2.5 2.4-2.5s2.4.9 2.4 2.5v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function ContactInformation() {
  return (
    <div className="mt-10 w-full max-w-[360px]">
      <div className="space-y-1">
        {CONTACT_ITEMS.map((item) =>
          item.href ? (
            <a
              key={item.key}
              href={item.href}
              {...(item.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-accent-tint/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-tint p-2 text-accent-solid transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="flex-1">
                <span className="block text-[10px] font-semibold tracking-[0.12em] text-ink-faint">
                  {item.label}
                </span>
                <span className="block text-[13.5px] font-medium text-ink-soft transition-colors duration-300 group-hover:text-accent-to">
                  {item.value}
                </span>
              </span>
              <span className="text-accent-tint-border opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </a>
          ) : (
            <div key={item.key} className="flex items-center gap-3.5 px-3 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-tint p-2 text-accent-solid">
                {item.icon}
              </span>
              <span>
                <span className="block text-[10px] font-semibold tracking-[0.12em] text-ink-faint">
                  {item.label}
                </span>
                <span className="block text-[13.5px] font-medium text-ink-soft">{item.value}</span>
              </span>
            </div>
          )
        )}
      </div>

      <a
        href={CONTACT_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-between rounded-2xl border border-border-soft bg-surface px-5 py-4 shadow-[0_10px_24px_-16px_rgba(30,20,70,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdeecb] hover:shadow-[0_16px_32px_-16px_rgba(30,20,70,0.3)]"
      >
        <span>
          <span className="block text-[12.5px] text-ink-muted">Prefer a quick conversation?</span>
          <span className="mt-0.5 block text-[14px] font-semibold text-ink">
            Let&rsquo;s Talk on WhatsApp
          </span>
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/12 text-[#1fae57]">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>

      <div className="mt-8">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-ink-faint">
          FOLLOW THE STUDIO
        </span>
        <div className="mt-3 flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-tint-border hover:text-accent-to dark:border-white/10"
            >
              {SOCIAL_ICONS[social.key]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
