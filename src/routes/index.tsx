import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { StatsCounter } from "@/components/site/StatsCounter";
import { Testimonials } from "@/components/site/Testimonials";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FAQSection } from "@/components/site/FAQSection";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/data/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlowCare Skin & Hair Clinic — Best Dermatologist in Bangalore" },
      { name: "description", content: "Expert dermatology & aesthetic care in Whitefield, Bangalore. Acne, pigmentation, hair loss, lasers & anti-aging by Dr. Priya Sharma. Book online." },
      { property: "og:title", content: "GlowCare Skin & Hair Clinic — Best Dermatologist in Bangalore" },
      { property: "og:description", content: "Premium dermatology & aesthetic care by Dr. Priya Sharma. 5000+ happy patients, 4.9★ Google rating." },
      { property: "og:url", content: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />

      <Section
        eyebrow="Our Services"
        title="Comprehensive Skin & Hair Care"
        subtitle="From everyday concerns to advanced aesthetic procedures — handled by specialists."
      >
        <ServicesGrid limit={6} />
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full border-2">
            <Link to="/services">View All Services <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section eyebrow="Why Choose Us" title="Care You Can Trust" className="bg-secondary/40">
        <WhyChooseUs />
      </Section>

      <Section>
        <StatsCounter />
      </Section>

      <Section
        eyebrow="Real Results"
        title="Before & After Transformations"
        subtitle="A glimpse into the visible outcomes our patients have achieved."
      >
        <BeforeAfter />
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full border-2">
            <Link to="/results">See More Results <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Patient Stories"
        title="Loved by 5,000+ Patients"
        subtitle="Honest words from people who trusted us with their skin and hair journey."
        className="bg-secondary/40"
      >
        <Testimonials limit={4} />
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full border-2">
            <Link to="/reviews">Read All Reviews <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="FAQ"
        title="Questions, Answered"
        subtitle="Everything you'd like to know before your first visit."
      >
        <FAQSection />
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-center text-primary-foreground sm:p-16">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.3), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,.2), transparent 40%)" }} />
          <h2 className="relative text-3xl font-semibold sm:text-4xl">Ready to glow with confidence?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Book a personalised consultation with Dr. Priya Sharma today.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6 text-base font-semibold">
              <Link to="/book">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-2 border-primary-foreground/40 bg-transparent px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Contact Clinic</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
