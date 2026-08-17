import { Link } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/data/clinic";

export function StickyCTAs() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-between px-4 sm:bottom-6 sm:px-6">
      <Link
        to="/book"
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-105 sm:h-14 sm:px-6 sm:text-base"
      >
        <CalendarCheck className="h-5 w-5" />
        <span>Book Appointment</span>
      </Link>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-elegant transition-transform hover:scale-105 sm:h-14 sm:px-6 sm:text-base"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
