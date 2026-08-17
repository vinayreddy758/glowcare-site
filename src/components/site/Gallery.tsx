import reception from "@/assets/clinic-reception.jpg";
import consultation from "@/assets/clinic-consultation.jpg";
import treatment from "@/assets/clinic-treatment.jpg";
import laser from "@/assets/clinic-laser.jpg";
import waiting from "@/assets/clinic-waiting.jpg";
import exterior from "@/assets/clinic-exterior.jpg";

const ITEMS = [
  { src: reception, label: "Reception Area" },
  { src: consultation, label: "Consultation Room" },
  { src: treatment, label: "Treatment Room" },
  { src: laser, label: "Laser Equipment" },
  { src: waiting, label: "Waiting Area" },
  { src: exterior, label: "Exterior View" },
];

export function Gallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((g) => (
        <figure key={g.label} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={g.src}
            alt={`GlowCare clinic — ${g.label}`}
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent p-4">
            <span className="text-sm font-semibold text-background">{g.label}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
