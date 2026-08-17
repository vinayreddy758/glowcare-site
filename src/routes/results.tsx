import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { StatsCounter } from "@/components/site/StatsCounter";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Before & After Results — GlowCare Skin & Hair Clinic" },
      { name: "description", content: "See real before & after transformations from our acne, pigmentation, hair restoration, laser and anti-aging patients in Bangalore." },
      { property: "og:title", content: "Real Patient Results — GlowCare" },
      { property: "og:description", content: "Visible transformations from real GlowCare patients." },
      { property: "og:url", content: "/results" },
    ],
    links: [{ rel: "canonical", href: "/results" }],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <>
      <Section
        eyebrow="Real Results"
        title="Transformations That Speak"
        subtitle="A selection of before & after outcomes from our patients across treatments."
      >
        <BeforeAfter />
      </Section>
      <Section className="bg-secondary/40">
        <StatsCounter />
      </Section>
    </>
  );
}
