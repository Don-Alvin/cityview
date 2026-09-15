import { whatsappLink } from "@/content/contact";

/**
 * IMPLEMENTATION.md: WhatsApp click-to-chat sticky on mobile. A round
 * corner button rather than a full-width bar, so it never covers the
 * footer's own contact details, the other place people look for the
 * same thing. Hidden from lg up since the header already carries a
 * WhatsApp icon there.
 */
export function StickyWhatsapp() {
  return (
    <a
      href={whatsappLink()}
      aria-label="Message CityView Printers on WhatsApp"
      className="fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-deep shadow-lg transition-transform duration-200 ease-out hover:-translate-y-[3px] lg:hidden"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.36a9.9 9.9 0 0 0 4.64 1.15h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.06h-.01a8.14 8.14 0 0 1-4.14-1.13l-.3-.18-3.1.8.83-3.02-.19-.31a8.13 8.13 0 0 1-1.26-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.14-8.16 8.14Zm4.47-6.1c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.36 7.36 0 0 1-1.35-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
