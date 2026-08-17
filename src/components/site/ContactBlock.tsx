import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { CLINIC, whatsappHref } from "@/data/clinic";
import { useClinicSettings } from "@/lib/cms-store";

export function ContactBlock() {
  const { data: clinicSettings = {} } = useClinicSettings();

  const address = clinicSettings.address || CLINIC.address;
  const phone = clinicSettings.phone || CLINIC.phone;
  const email = clinicSettings.email || CLINIC.email;
  const whatsappMsg = clinicSettings.whatsapp_message || CLINIC.whatsappMessage;

  const items = [
    { icon: MapPin, title: "Visit Us", value: address },
    { icon: Phone, title: "Call Us", value: phone, href: `tel:${phone}` },
    { icon: Mail, title: "Email", value: email, href: `mailto:${email}` },
    { icon: Clock, title: "Business Hours", value: CLINIC.hours },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, value, href }) => (
        <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
            {href ? (
              <a href={href} className="mt-1 block break-words text-sm font-medium text-foreground hover:text-primary">{value}</a>
            ) : (
              <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
            )}
          </div>
        </div>
      ))}
      <a
        href={whatsappHref(whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp p-5 text-whatsapp-foreground transition-transform hover:scale-[1.02] sm:col-span-2"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-semibold">Chat with us on WhatsApp</span>
      </a>
    </div>
  );
}
