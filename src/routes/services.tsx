import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Dermatology Services & Treatments — GlowCare Bangalore" },
      { name: "description", content: "Acne, pigmentation, hair loss, PRP, laser hair removal, chemical peels, anti-aging, Botox, fillers and skin rejuvenation in Bangalore." },
      { property: "og:title", content: "Dermatology Services & Treatments — GlowCare Bangalore" },
      { property: "og:description", content: "10+ medical & aesthetic dermatology services delivered by Dr. Priya Sharma." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Our Services"
        title="Advanced Skin & Hair Treatments"
        subtitle="A complete suite of medical and aesthetic dermatology — tailored to your skin type and goals."
      >
        <ServicesGrid />
      </Section>

      <Section eyebrow="Why GlowCare" title="What Sets Our Care Apart" className="bg-secondary/40">
        <WhyChooseUs />
      </Section>
    </>
  );
}
