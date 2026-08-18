import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, GraduationCap, Stethoscope, BookOpen, Sparkles, Trophy, ShieldCheck } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { useWebsiteContent } from "@/lib/cms-store";
import doctorImg from "@/assets/doctor-priya.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Priya Sharma — Senior Dermatologist | GlowCare" },
      { name: "description", content: "Meet Dr. Priya Sharma — MBBS, MD Dermatology with 12+ years of experience in acne, pigmentation, hair restoration, lasers and aesthetic care." },
      { property: "og:title", content: "About Dr. Priya Sharma — Senior Dermatologist" },
      { property: "og:description", content: "12+ years of evidence-based dermatology and aesthetic care in Bangalore." },
      { property: "og:url", content: "/about" },
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
  const { data: contentMap = {} } = useWebsiteContent();
  const doc = contentMap.about_doctor || {};

  const doctorName = doc.name || "Dr. Priya Sharma";
  const doctorCredentials = doc.credentials || "MBBS, MD Dermatology · 12+ Years Experience";
  const doctorPhoto = doc.photo_url || doctorImg;
  const bio = doc.bio || "Dr. Priya Sharma is a leading dermatologist specializing in acne treatment, pigmentation correction, anti-aging procedures, hair restoration, laser therapies and advanced skin care treatments.";
  const bio2 = doc.bio2 || "Trained at top medical institutions and certified in advanced aesthetic procedures, Dr. Priya believes in a personalised, evidence-based approach — combining medical dermatology with modern aesthetics to deliver natural, long-lasting results.";
  const yearsExp = doc.years_experience || "12+";
  const patients = doc.patients_treated || "5000+";
  const quote = doc.quote || "Every patient deserves honest advice, safe treatments and results they can see and feel. That promise has guided my practice for over a decade.";

  return (
    <>
      <Section
        eyebrow="Meet Your Doctor"
        title={doctorName}
        subtitle={doctorCredentials}
      >
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo column */}
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-elegant ring-1 ring-border/30">
              <img
                src={doctorPhoto}
                alt={`${doctorName}, senior dermatologist`}
                className="aspect-[3/4] w-full object-cover object-top"
                width={900}
                height={1200}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-border bg-card px-6 py-4 shadow-elegant sm:block">
              <p className="text-3xl font-bold text-primary leading-none">{yearsExp}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Years of Practice</p>
            </div>
          </div>

          {/* Text column */}
          <div className="animate-fade-in-up">
            <p className="text-lg leading-[1.8] text-foreground/90">{bio}</p>
            <p className="mt-5 text-base leading-[1.85] text-muted-foreground">{bio2}</p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: Stethoscope, label: yearsExp + " Years", desc: "Clinical Experience" },
                { icon: GraduationCap, label: "MD Derm", desc: "Specialist Qualified" },
                { icon: Award, label: patients, desc: "Patients Treated" },
                { icon: ShieldCheck, label: "USFDA", desc: "Approved Devices" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-soft hover:-translate-y-0.5">
                  <div className="w-fit rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-display text-xl font-bold text-foreground">{label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-10 h-14 rounded-full px-9 text-[1rem] font-bold shadow-elegant hover:scale-105 transition-all">
              <Link to="/book">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section eyebrow="Credentials" title="Certifications & Memberships" className="bg-secondary/30">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Indian Association of Dermatologists, Venereologists & Leprologists (IADVL)",
            "Cosmetology Society of India (CSI)",
            "Advanced Aesthetic Medicine — International Certification",
            "USFDA-Approved Laser Specialist",
            "Certified Trichologist (Hair Restoration)",
            "Member, Indian Medical Association",
          ].map((c, i) => (
            <div
              key={c}
              className="flex gap-4 rounded-2xl border border-border/60 bg-card p-6 animate-fade-in-up hover:shadow-soft transition-all"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mt-0.5 w-fit shrink-0 rounded-lg bg-primary/10 p-2 text-primary h-fit">
                <BookOpen className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recognition" title="Awards & Achievements">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Best Dermatologist", year: "2024", body: "Bangalore Healthcare Excellence Award" },
            { title: "Top 50 Skin Specialists", year: "2023", body: "Featured in Times Health" },
            { title: "Excellence in Aesthetics", year: "2022", body: "IADVL National Recognition" },
            { title: "Patient Choice Award", year: "2021", body: "Practo Verified" },
            { title: "Pioneer in Laser Therapy", year: "2020", body: "Cosmetology Society of India" },
            { title: "Research Publications", year: "15+", body: "Peer-reviewed dermatology journals" },
          ].map((a, i) => (
            <div
              key={a.title}
              className="rounded-2xl border border-border/60 bg-card p-7 animate-fade-in-up hover:shadow-soft transition-all"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                <Trophy className="h-5 w-5" />
              </div>
              <p className="mt-5 font-display text-xl font-bold text-foreground">{a.title}</p>
              <p className="mt-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary">{a.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card p-10 text-center shadow-soft sm:p-16">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-primary-foreground">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">A patient-first philosophy</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground italic">
            "{quote}"
          </p>
          <p className="mt-5 text-sm font-bold text-primary">— {doctorName}</p>
        </div>
      </Section>
    </>
  );
}
