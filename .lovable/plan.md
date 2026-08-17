# GlowCare Skin & Hair Clinic — Website Plan

A modern, premium, mobile-first dermatology clinic demo site with realistic sample data, optimized for conversions (bookings, calls, WhatsApp) and local SEO.

## Design Direction
- **Aesthetic**: Clean, clinical, premium healthcare. White background, soft neutrals, premium blue accent (`#1E6BFF`-class oklch token) with a lighter sky-blue glow and subtle gradient surfaces.
- **Typography**: Display font `Fraunces` (warm, trustworthy serif) for headings + `Inter` for body — distinct from generic AI defaults. Loaded via `<link>` in `__root.tsx`.
- **Tokens**: Defined in `src/styles.css` under `@theme` (primary, primary-glow, accent-soft, gradient-primary, shadow-elegant, shadow-soft).
- **Motion**: Fade-in on scroll, animated stat counters, soft hover lifts on cards. Tailwind keyframes + small intersection observer hook.
- **Mobile-first**: Sticky top nav with hamburger sheet; sticky floating WhatsApp (bottom-right) + Book Appointment (bottom-left) pills always visible.

## Route Architecture (TanStack Start)
Each major section becomes its own route for SEO (unique title/description/og per page), with the homepage holding hero + condensed previews.

```
src/routes/
  __root.tsx           // shared Header, Footer, sticky CTAs, fonts, default meta + Organization/MedicalClinic JSON-LD
  index.tsx            // Home: hero, trust stats, services preview, why-us, results preview, testimonials preview, CTA
  about.tsx            // About Dr. Priya Sharma
  services.tsx         // All 10 services
  results.tsx          // Before/After gallery (6+)
  reviews.tsx          // 8 testimonials + Google-style cards + stats
  blog.tsx             // 6 blog cards
  contact.tsx          // Address, hours, map placeholder, contact form
  book.tsx             // Full appointment booking form
```

All link via type-safe `<Link to="...">`. Sticky CTAs use `<Link to="/book">` and a `wa.me` href.

## Components (`src/components/`)
- `Header.tsx` — sticky nav, logo, desktop links, mobile sheet (shadcn Sheet), "Book Appointment" button
- `Footer.tsx` — quick links, services, contact, socials, legal, copyright
- `StickyCTAs.tsx` — floating WhatsApp + Book pills (hidden when overlapping footer optional)
- `Hero.tsx` — headline, sub, dual CTAs, doctor + clinic image placeholders, trust badges (5000+, 10+, 4.9★)
- `TrustStrip.tsx` — three trust badges
- `AboutDoctor.tsx` — portrait, bio, qualifications, experience cards, certifications, awards
- `ServiceCard.tsx` + `ServicesGrid.tsx` — 10 services with Lucide icon, description, benefits list, "Learn More"
- `WhyChooseUs.tsx` — 6 feature cards
- `BeforeAfterGallery.tsx` — 6 transformations (before/after placeholders, treatment, duration) + disclaimer
- `Testimonials.tsx` — 8 cards, avg rating header
- `GoogleReviews.tsx` — Google-styled review cards
- `StatsCounter.tsx` — 4 animated counters (IntersectionObserver)
- `BookingForm.tsx` — validated with `zod` + react-hook-form; success toast via Sonner; WhatsApp fallback button
- `ClinicGallery.tsx` — 6 placeholders (reception, consult, treatment, laser, waiting, exterior)
- `FAQ.tsx` — shadcn Accordion, 6 Q&A
- `BlogGrid.tsx` + `BlogCard.tsx` — 6 sample posts (title, excerpt, image placeholder, date, read time)
- `ContactSection.tsx` — address, phone (`tel:`), email (`mailto:`), hours, map iframe placeholder, contact form

## Sample Data
- All clinic info hardcoded in `src/data/clinic.ts` (services, testimonials, results, blog, FAQ).
- Phone `+91 9876543210` → WhatsApp link `https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20book...`.

## Images
- Use Lovable image generation for: hero doctor portrait, clinic exterior/interior shots (6 gallery), 6 before/after pairs (clinical, tasteful), 8 patient avatars (diverse, neutral backgrounds), 6 blog thumbnails. Saved to `src/assets/` and imported as ES6.
- **Note**: To keep generation cost reasonable, I'll batch ~20 fast-tier images. If you want premium-quality hero/portrait, say so.

## SEO
- Per-route `head()` with unique title (`<60 chars`), description (`<160`), og:title/description/og:type, og:image (leaf only, using that route's hero image), canonical (leaf only, relative paths).
- `__root.tsx`: viewport, charset, og:type=website, MedicalClinic JSON-LD (name, address, phone, openingHours, geo placeholder, aggregateRating).
- Per-page schemas: `Physician` on /about, `MedicalProcedure` list on /services, `BreadcrumbList` on deep pages, `FAQPage` on home (where FAQ lives) or /contact, `Article` on blog cards.
- Single `<main>` per route, semantic HTML (`<section>`, `<article>`, h1 once per page), alt text on every image, `loading="lazy"` on below-fold images.
- `robots.txt` allows all; `sitemap.xml` lists all routes with relative base.

## Form Validation
- `zod` schema for booking + contact (name 2–100, phone regex, email, required date/time, message ≤1000), error messages inline, Sonner toast on success, simulated submit (no backend — pure demo).

## Accessibility
- Design tokens only (no `text-gray-*`), all icon-only buttons get `aria-label`, focus rings via `--ring`, accordion + sheet from shadcn (Radix a11y), tap targets ≥44px on mobile.

## Out of Scope (demo only)
- No backend / Lovable Cloud — booking form is a simulated submit with success state. (Easy to wire later if you want real bookings + email/WhatsApp notifications — say the word.)
- No real Google Maps API — embedded `<iframe>` placeholder with a static map image fallback.

## Deliverable
A polished, production-looking demo site presentable to a real client, with strong conversion paths (3 visible CTAs at all times: sticky book, sticky WhatsApp, top-nav book button) and full local-SEO scaffolding.

---

Ready to build on approval. If you'd like any tweaks first — different accent color, different fonts, brand logo direction, fewer/more generated images, or a real backend for bookings — let me know.