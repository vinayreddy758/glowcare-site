import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { CLINIC, SERVICES } from "@/data/clinic";
import { useClinicSettings, useServices } from "@/lib/cms-store";

export function Footer() {
  const { data: clinicSettings = {} } = useClinicSettings();
  const { data: liveServices = [] } = useServices();

  const name = clinicSettings.name || CLINIC.name;
  const address = clinicSettings.address || CLINIC.address;
  const phone = clinicSettings.phone || CLINIC.phone;
  const email = clinicSettings.email || CLINIC.email;
  const tagline = clinicSettings.tagline || CLINIC.tagline;

  const topServices = liveServices.length > 0 ? liveServices.slice(0, 7) : SERVICES.slice(0, 7);

  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-4 lg:gap-10 lg:px-10 lg:py-20">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {tagline}
          </p>
          <div className="flex gap-2">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Facebook, label: "Facebook", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/about", label: "About Doctor" },
              { to: "/services", label: "Services" },
              { to: "/results", label: "Results" },
              { to: "/reviews", label: "Reviews" },
              { to: "/contact", label: "Contact Us" },
              { to: "/book", label: "Book Appointment" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-foreground">Top Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {topServices.map((s) => (
              <li key={s.slug || s.title}>
                <Link to="/services" className="text-muted-foreground transition-colors hover:text-primary">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-foreground">Get in Touch</h4>
          <ul className="mt-4 space-y-3.5 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${phone}`} className="hover:text-primary">{phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{CLINIC.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms &amp; Conditions</a>
            <Link to="/admin/login" className="hover:text-foreground">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
