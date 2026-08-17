import { Link } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, Star, Users, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC, whatsappHref } from "@/data/clinic";
import { useWebsiteContent, useClinicSettings } from "@/lib/cms-store";
import doctorImg from "@/assets/doctor-priya.jpg";
import clinicImg from "@/assets/clinic-reception.jpg";

export function Hero() {
  const { data: contentMap = {} } = useWebsiteContent();
  const { data: clinicSettings = {} } = useClinicSettings();

  const hero = contentMap.hero || {};
  const clinicName = clinicSettings.name || CLINIC.name;
  const whatsappMsg = clinicSettings.whatsapp_message || CLINIC.whatsappMessage;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-soft" />
      <div className="absolute -top-32 right-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{hero.eyebrow || "Trusted dermatology since 2013 · Bangalore"}</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]">
            {hero.title || (
              <>
                Healthy Skin Starts With{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Expert Care
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subtitle || "Advanced dermatology, acne treatment, hair loss solutions, laser procedures and aesthetic care delivered by experienced specialists."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base font-semibold shadow-elegant">
              <Link to="/book">
                <CalendarCheck className="h-4 w-4" />
                {hero.button_text || "Book Appointment"}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-2 px-6 text-base font-semibold">
              <a href={whatsappHref(whatsappMsg)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: Users, value: "5,000+", label: "Happy Patients" },
              { icon: Award, value: "12+ Yrs", label: "Experience" },
              { icon: Star, value: "4.9★", label: "Google Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-start">
                <Icon className="h-5 w-5 text-primary" />
                <dt className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{value}</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={doctorImg}
              alt={`Dr. Priya Sharma, lead dermatologist at ${clinicName}`}
              className="h-full w-full object-cover"
              width={1024}
              height={1280}
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-background">Dr. Priya Sharma</p>
              <p className="text-xs text-background/85">MBBS, MD Dermatology · 12+ yrs</p>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-6 hidden w-56 overflow-hidden rounded-2xl border border-border bg-background shadow-elegant sm:block">
            <img src={clinicImg} alt={`${clinicName} clinic reception`} className="h-32 w-full object-cover" width={1024} height={768} loading="lazy" />
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-foreground">Premium Clinic</p>
              <p className="text-[11px] text-muted-foreground">{clinicSettings.address || "Whitefield, Bangalore"}</p>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-soft sm:flex">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground">4.9 · 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
