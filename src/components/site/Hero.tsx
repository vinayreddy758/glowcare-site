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
  const doctor = contentMap.about_doctor || {};
  const clinicName = clinicSettings.name || CLINIC.name;
  const whatsappMsg = clinicSettings.whatsapp_message || CLINIC.whatsappMessage;

  const doctorPhoto = doctor.photo_url || doctorImg;
  const doctorName = doctor.name || "Dr. Priya Sharma";
  const doctorCredentials = doctor.credentials || "MBBS, MD Dermatology · 12+ yrs";

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 gradient-soft" />
      <div className="absolute -top-40 right-[-15%] -z-10 h-[560px] w-[560px] rounded-full bg-primary/8 blur-[80px]" aria-hidden />
      <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[60px]" aria-hidden />

      <div className="mx-auto grid max-w-7xl gap-16 px-5 pt-16 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:pt-24 lg:pb-36 items-center">
        {/* Left content */}
        <div className="flex flex-col justify-center animate-fade-in-up">
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{hero.eyebrow || "Trusted dermatology since 2013 · Bangalore"}</span>
          </div>

          <h1 className="mt-7 text-[2.8rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            {hero.title ? hero.title : (
              <>
                Radiant Skin Starts
                <br />
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  With Expert Care
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-[42ch] text-lg leading-[1.75] text-muted-foreground">
            {hero.subtitle || "Advanced dermatology, acne treatment, hair loss solutions, laser procedures and aesthetic care — delivered by experienced specialists."}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-14 rounded-full px-9 text-[1rem] font-bold shadow-elegant transition-all hover:scale-105 hover:shadow-elegant">
              <Link to="/book">
                <CalendarCheck className="mr-2.5 h-5 w-5" />
                {hero.button_text || "Book Appointment"}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-2 border-border/60 px-9 text-[1rem] font-bold bg-white/60 backdrop-blur-sm transition-all hover:bg-primary/5 hover:border-primary/40">
              <a href={whatsappHref(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-foreground">
                <MessageCircle className="h-5 w-5 text-whatsapp" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
            {[
              { icon: Users, value: "5,000+", label: "Happy Patients" },
              { icon: Award, value: "12+ Yrs", label: "Experience" },
              { icon: Star, value: "4.9★", label: "Google Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-2.5">
                <div className="w-fit rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{value}</p>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "180ms" }}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-elegant ring-1 ring-border/30">
            <img
              src={doctorPhoto}
              alt={`${doctorName}, lead dermatologist at ${clinicName}`}
              className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
              width={900}
              height={1200}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="font-display text-2xl font-bold text-white leading-tight">{doctorName}</p>
              <p className="mt-1.5 text-sm font-medium text-white/75">{doctorCredentials}</p>
            </div>
          </div>

          {/* Floating clinic thumbnail */}
          <div className="absolute -bottom-10 -left-10 hidden w-60 overflow-hidden rounded-3xl glass p-2 shadow-elegant animate-float sm:block">
            <img src={clinicImg} alt={`${clinicName} clinic`} className="h-32 w-full rounded-2xl object-cover" width={800} height={600} loading="lazy" />
            <div className="px-4 py-3.5">
              <p className="text-sm font-bold text-foreground">Premium Clinic</p>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{clinicSettings.address || "Whitefield, Bangalore"}</p>
            </div>
          </div>

          {/* Floating rating badge */}
          <div className="absolute -top-6 -right-6 hidden items-center gap-3 rounded-2xl glass px-5 py-3.5 shadow-elegant animate-float sm:flex" style={{ animationDelay: "2s" }}>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="h-8 w-px bg-border/70" />
            <div>
              <p className="text-sm font-bold text-foreground">4.9 / 5</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">1,200+ Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
