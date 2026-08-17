import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BookingForm } from "@/components/site/BookingForm";
import { useClinicSettings } from "@/lib/cms-store";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — GlowCare Skin & Hair Clinic" },
      { name: "description", content: "Book your dermatology consultation online with Dr. Priya Sharma. Same-day slots available. WhatsApp booking supported." },
      { property: "og:title", content: "Book an Appointment — GlowCare" },
      { property: "og:description", content: "Reserve your dermatology consultation in just 30 seconds." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { data: settings } = useClinicSettings();
  const fee = settings?.consultation_fee ?? 500;

  return (
    <Section
      eyebrow="Book Appointment"
      title="Schedule Your Consultation"
      subtitle="Fill in your details and we'll confirm your preferred slot within 30 minutes."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 to-background p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-foreground">What to expect</h3>
            <ul className="mt-5 space-y-4">
              {[
                "Detailed skin & hair analysis with Dr. Priya Sharma",
                "Personalised, evidence-based treatment plan",
                "Transparent pricing with EMI options available",
                "USFDA-approved devices and strict safety protocols",
                "Follow-up support across your entire journey",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-background/80 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Consultation fee</p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">₹{fee}</p>
              <p className="text-xs text-muted-foreground">Includes full skin & hair analysis.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <BookingForm />
        </div>
      </div>
    </Section>
  );
}
