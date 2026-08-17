import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Testimonials } from "@/components/site/Testimonials";
import { StatsCounter } from "@/components/site/StatsCounter";
import { TESTIMONIALS as fallbackTESTIMONIALS } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Patient Reviews — 4.9★ from 1200+ | GlowCare Clinic" },
      { name: "description", content: "Read 1200+ verified Google reviews from GlowCare patients in Bangalore. Real experiences with acne, pigmentation, hair loss and aesthetic treatments." },
      { property: "og:title", content: "Patient Reviews — GlowCare Clinic" },
      { property: "og:description", content: "1200+ verified 5-star reviews from real patients." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function GoogleReviewCard({ name, review, treatment }: { name: string; review: string; treatment: string }) {
  const initials = (name || "Patient").split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">Verified Patient</p>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.83z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
      </div>
      <div className="mt-3 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{review}"</p>
      <p className="mt-3 text-xs text-muted-foreground">Treatment: {treatment}</p>
    </article>
  );
}

function ReviewsPage() {
  const { data: contentMap = {} } = useWebsiteContent();
  const reviewsList = contentMap.testimonials?.reviews || fallbackTESTIMONIALS;

  return (
    <>
      <Section
        eyebrow="Patient Stories"
        title="Loved by Patients Across Bangalore"
        subtitle="Authentic experiences from people who've trusted us with their skin and hair journey."
      >
        <Testimonials />
      </Section>

      <Section eyebrow="Verified on Google" title="What Patients Say on Google" className="bg-secondary/40">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsList.slice(0, 6).map((t: any, i: number) => {
            const name = t.name || t.author || "Patient";
            const review = t.quote || t.review || t.text || "";
            const treatment = t.treatment || t.role || "Consultation";
            return <GoogleReviewCard key={i} name={name} review={review} treatment={treatment} />;
          })}
        </div>
      </Section>

      <Section>
        <StatsCounter />
      </Section>
    </>
  );
}
