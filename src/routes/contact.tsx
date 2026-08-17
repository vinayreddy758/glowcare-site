import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ContactBlock } from "@/components/site/ContactBlock";
import { Gallery } from "@/components/site/Gallery";
import { FAQSection } from "@/components/site/FAQSection";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GlowCare Clinic — Whitefield, Bangalore" },
      { name: "description", content: "Visit GlowCare Skin & Hair Clinic at 123 Health Street, Whitefield, Bangalore. Call +91 9876543210 or WhatsApp us to book." },
      { property: "og:title", content: "Contact GlowCare Skin & Hair Clinic" },
      { property: "og:description", content: "Visit, call or WhatsApp us to book your appointment." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Section
        eyebrow="Contact"
        title="We're Here to Help"
        subtitle="Visit our clinic in Whitefield, give us a call, or message us on WhatsApp."
      >
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactBlock />
          </div>
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="aspect-[16/11] w-full">
                <iframe
                  title="GlowCare clinic location"
                  src="https://www.google.com/maps?q=Whitefield,Bangalore&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-border p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">123 Health Street, Whitefield, Bangalore 560066</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Clinic Gallery" title="A Look Inside GlowCare" className="bg-secondary/40">
        <Gallery />
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FAQSection />
      </Section>
    </>
  );
}
