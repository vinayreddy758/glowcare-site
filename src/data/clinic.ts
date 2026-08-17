import {
  Sparkles,
  Droplets,
  Sun,
  Scissors,
  Activity,
  Zap,
  FlaskConical,
  HeartPulse,
  Syringe,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export const CLINIC = {
  name: "GlowCare Skin & Hair Clinic",
  shortName: "GlowCare",
  tagline: "Healthy Skin Starts With Expert Care",
  phone: "+91 9353261314",
  phoneDigits: "919353261314",
  email: "info@glowcareclinic.com",
  address: "123 Health Street, Whitefield, Bangalore 560066",
  hours: "Mon–Sat: 9 AM – 8 PM",
  whatsappMessage: "Hi GlowCare, I'd like to book an appointment.",
};

export const whatsappHref = (msg = CLINIC.whatsappMessage) =>
  `https://wa.me/${CLINIC.phoneDigits}?text=${encodeURIComponent(msg)}`;

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "acne-treatment",
    title: "Acne Treatment",
    icon: Droplets,
    description:
      "Clinical-grade therapies that calm active breakouts and prevent recurrence.",
    benefits: ["Clears active acne", "Reduces oil & inflammation", "Prevents scarring"],
  },
  {
    slug: "acne-scar-removal",
    title: "Acne Scar Removal",
    icon: Sparkles,
    description:
      "Advanced laser & micro-needling protocols that visibly soften scars.",
    benefits: ["Smoother texture", "Fades pitted scars", "Minimal downtime"],
  },
  {
    slug: "pigmentation",
    title: "Pigmentation Treatment",
    icon: Sun,
    description:
      "Personalised plans for melasma, dark spots and uneven skin tone.",
    benefits: ["Brightens complexion", "Targets melasma", "Long-lasting results"],
  },
  {
    slug: "hair-loss",
    title: "Hair Loss Treatment",
    icon: Activity,
    description:
      "Trichologist-led diagnostics and proven therapies to restore growth.",
    benefits: ["Stops hair fall", "Boosts density", "Strengthens follicles"],
  },
  {
    slug: "prp-therapy",
    title: "PRP Therapy",
    icon: HeartPulse,
    description:
      "Platelet-Rich Plasma sessions that rejuvenate scalp and skin naturally.",
    benefits: ["Natural growth boost", "Improves skin tone", "Safe & autologous"],
  },
  {
    slug: "laser-hair-removal",
    title: "Laser Hair Removal",
    icon: Zap,
    description:
      "FDA-cleared diode laser for smooth, lasting hair-free results.",
    benefits: ["Permanent reduction", "Safe for all skin tones", "Quick sessions"],
  },
  {
    slug: "chemical-peels",
    title: "Chemical Peels",
    icon: FlaskConical,
    description:
      "Medical peels that exfoliate, brighten and reveal fresh skin.",
    benefits: ["Smoother texture", "Brighter glow", "Reduces dullness"],
  },
  {
    slug: "anti-aging",
    title: "Anti-Aging Treatment",
    icon: Wand2,
    description:
      "Comprehensive plans that target lines, sagging and skin laxity.",
    benefits: ["Reduces wrinkles", "Lifts & firms", "Restores youthful glow"],
  },
  {
    slug: "botox-fillers",
    title: "Botox & Fillers",
    icon: Syringe,
    description:
      "Subtle, expert injectables for a refreshed, natural appearance.",
    benefits: ["Natural results", "Quick procedure", "No downtime"],
  },
  {
    slug: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    icon: Scissors,
    description:
      "Hydrafacials, mesotherapy and bespoke glow-boosting treatments.",
    benefits: ["Instant radiance", "Deep hydration", "Healthy glow"],
  },
];

export const WHY_US = [
  { title: "Experienced Specialists", desc: "Board-certified dermatologists with 12+ years of clinical expertise." },
  { title: "Advanced Technology", desc: "USFDA-approved lasers and aesthetic devices from global leaders." },
  { title: "Personalized Treatment Plans", desc: "Every protocol is tailored to your skin type, goals and budget." },
  { title: "Affordable Pricing", desc: "Transparent packages with EMI options — no hidden costs." },
  { title: "Safe Procedures", desc: "Strict sterilisation and evidence-based protocols for every session." },
  { title: "Excellent Patient Satisfaction", desc: "4.9★ rating from 1,200+ verified Google reviews." },
];

export const RESULTS = [
  { treatment: "Acne Treatment", duration: "8 weeks", tag: "Active Acne → Clear Skin" },
  { treatment: "Pigmentation", duration: "12 weeks", tag: "Melasma → Even Tone" },
  { treatment: "PRP Hair Therapy", duration: "6 months", tag: "Thinning → Visible Regrowth" },
  { treatment: "Laser Hair Removal", duration: "6 sessions", tag: "Unwanted Hair → Smooth Skin" },
  { treatment: "Chemical Peel", duration: "4 sessions", tag: "Dull Skin → Radiant Glow" },
  { treatment: "Anti-Aging", duration: "3 months", tag: "Fine Lines → Firm Skin" },
];

export const TESTIMONIALS = [
  { name: "Ananya Iyer", rating: 5, review: "Dr. Priya is incredibly thorough. My acne cleared up in 2 months and the scars have faded beautifully. Best dermatologist in Bangalore!", treatment: "Acne Treatment" },
  { name: "Rohan Mehta", rating: 5, review: "PRP sessions gave me visible regrowth in 4 months. The team is professional and the clinic is spotless.", treatment: "PRP Therapy" },
  { name: "Sneha Kapoor", rating: 5, review: "Got my laser hair removal done here — painless, quick and incredible results. Highly recommend.", treatment: "Laser Hair Removal" },
  { name: "Vikram Reddy", rating: 5, review: "Honest consultation, no upselling. My pigmentation has reduced dramatically after the prescribed peels.", treatment: "Pigmentation" },
  { name: "Priyanka Nair", rating: 5, review: "Subtle, natural Botox — exactly what I asked for. Dr. Priya truly listens.", treatment: "Botox" },
  { name: "Arjun Sharma", rating: 5, review: "Skin rejuvenation hydrafacial was bliss. My skin has never looked this good. Booking my next session already!", treatment: "Hydrafacial" },
  { name: "Meera Joshi", rating: 5, review: "Wonderful experience from consultation to treatment. The staff is warm and the results speak for themselves.", treatment: "Chemical Peel" },
  { name: "Karthik Rao", rating: 5, review: "Years of stubborn acne scars finally treated. The micro-needling sessions transformed my skin texture.", treatment: "Acne Scars" },
];

export const STATS = [
  { value: 5000, suffix: "+", label: "Patients Treated" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 1200, suffix: "+", label: "Google Reviews" },
  { value: 98, suffix: "%", label: "Patient Satisfaction" },
];

export const FAQ = [
  { q: "Is acne treatment painful?", a: "Most acne treatments are gentle and well-tolerated. Procedures like chemical peels or micro-needling may cause mild tingling, but topical numbing ensures comfort throughout." },
  { q: "How many sessions are required?", a: "It depends on your skin condition. On average 4–8 sessions spaced 2–4 weeks apart are recommended for visible, lasting results." },
  { q: "What is the recovery period?", a: "Most treatments have zero to minimal downtime — you can return to work the same day. Aggressive procedures may need 2–5 days of light recovery." },
  { q: "Are laser treatments safe?", a: "Yes. We use USFDA-approved lasers calibrated for Indian skin. All procedures are performed under expert supervision with strict safety protocols." },
  { q: "What are consultation charges?", a: "First consultations are ₹500 and include a detailed skin & hair analysis with a personalised treatment plan." },
  { q: "Do you treat hair loss?", a: "Absolutely. We offer trichologist-led diagnostics, PRP, mesotherapy, GFC and medical hair-loss therapies tailored to the underlying cause." },
];

export const BLOG = [
  { slug: "best-treatments-for-acne-scars", title: "Best Treatments for Acne Scars in 2026", excerpt: "From micro-needling to fractional lasers — a complete guide to the most effective acne-scar solutions.", category: "Skin Care", read: "6 min" },
  { slug: "causes-of-hair-loss", title: "Top 7 Causes of Hair Loss (and What Actually Works)", excerpt: "A dermatologist's breakdown of common hair-loss triggers and the treatments that deliver results.", category: "Hair Care", read: "8 min" },
  { slug: "how-to-reduce-pigmentation", title: "How to Reduce Pigmentation Naturally & Medically", excerpt: "Understand melasma, sun damage and dark spots — and the proven ways to fade them safely.", category: "Skin Care", read: "5 min" },
  { slug: "daily-skin-care-routine", title: "The Perfect Daily Skin Care Routine for Indian Skin", excerpt: "A simple morning & night routine recommended by dermatologists for healthy, glowing skin.", category: "Lifestyle", read: "4 min" },
  { slug: "benefits-of-chemical-peels", title: "Benefits of Chemical Peels: Are They Right for You?", excerpt: "Everything you need to know about chemical peels — types, benefits, recovery and results.", category: "Treatments", read: "6 min" },
  { slug: "anti-aging-tips", title: "10 Anti-Aging Tips That Actually Work", excerpt: "Science-backed habits and treatments to keep your skin firm, smooth and youthful.", category: "Anti-Aging", read: "7 min" },
];

export const GALLERY = [
  { label: "Reception Area", key: "reception" },
  { label: "Consultation Room", key: "consultation" },
  { label: "Treatment Room", key: "treatment" },
  { label: "Laser Equipment", key: "laser" },
  { label: "Waiting Area", key: "waiting" },
  { label: "Exterior View", key: "exterior" },
] as const;
