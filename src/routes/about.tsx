import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, GraduationCap, Stethoscope, BookOpen, Sparkles, Trophy, ShieldCheck } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import doctorImg from "@/assets/doctor-priya.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Priya Sharma — Senior Dermatologist | GlowCare" },
      { name: "description", content: "Meet Dr. Priya Sharma — MBBS, MD Dermatology with 12+ years of experience in acne, pigmentation, hair restoration, lasers and aesthetic care." },
      { property: "og:title", content: "About Dr. Priya Sharma — Senior Dermatologist" },
      { property: "og:description", content: "12+ years of evidence-based dermatology and aesthetic care in Bangalore." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: doctorImg },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          name: "Dr. Priya Sharma",
          medicalSpecialty: "Dermatology",
          worksFor: { "@type": "MedicalClinic", name: "GlowCare Skin & Hair Clinic" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section
        eyebrow="Meet Your Doctor"
        title="Dr. Priya Sharma"
        subtitle="MBBS, MD Dermatology · 12+ years of experience"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-elegant">
              <img src={doctorImg} alt="Dr. Priya Sharma, senior dermatologist" className="aspect-[4/5] w-full object-cover" width={1024} height={1280} />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-border bg-background p-4 shadow-soft sm:block">
              <p className="text-2xl font-semibold text-primary">12+</p>
              <p className="text-xs text-muted-foreground">Years of Practice</p>
            </div>
          </div>

          <div>
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              Dr. Priya Sharma is a leading dermatologist specializing in acne treatment,
              pigmentation correction, anti-aging procedures, hair restoration, laser therapies
              and advanced skin care treatments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Trained at top medical institutions and certified in advanced aesthetic procedures,
              Dr. Priya believes in a personalised, evidence-based approach — combining medical
              dermatology with modern aesthetics to deliver natural, long-lasting results.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Stethoscope, label: "12+ Years", desc: "Clinical Experience" },
                { icon: GraduationCap, label: "MD Derm", desc: "Specialist Qualified" },
                { icon: Award, label: "5000+", desc: "Patients Treated" },
                { icon: ShieldCheck, label: "USFDA", desc: "Approved Devices" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-border bg-card p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 font-display text-lg font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-8 h-12 rounded-full px-6 text-base font-semibold shadow-soft">
              <Link to="/book">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section eyebrow="Credentials" title="Certifications & Memberships" className="bg-secondary/40">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Indian Association of Dermatologists, Venereologists & Leprologists (IADVL)",
            "Cosmetology Society of India (CSI)",
            "Advanced Aesthetic Medicine — International Certification",
            "USFDA-Approved Laser Specialist",
            "Certified Trichologist (Hair Restoration)",
            "Member, Indian Medical Association",
          ].map((c) => (
            <div key={c} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <BookOpen className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm font-medium text-foreground">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recognition" title="Awards & Achievements">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Best Dermatologist", year: "2024", body: "Bangalore Healthcare Excellence Award" },
            { title: "Top 50 Skin Specialists", year: "2023", body: "Featured in Times Health" },
            { title: "Excellence in Aesthetics", year: "2022", body: "IADVL National Recognition" },
            { title: "Patient Choice Award", year: "2021", body: "Practo Verified" },
            { title: "Pioneer in Laser Therapy", year: "2020", body: "Cosmetology Society of India" },
            { title: "Research Publications", year: "15+", body: "Peer-reviewed dermatology journals" },
          ].map((a) => (
            <div key={a.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <Trophy className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-foreground">{a.title}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{a.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">A patient-first philosophy</h2>
          <p className="mt-3 text-muted-foreground">
            "Every patient deserves honest advice, safe treatments and results they can see and feel.
            That promise has guided my practice for over a decade." — Dr. Priya Sharma
          </p>
        </div>
      </Section>
    </>
  );
}
