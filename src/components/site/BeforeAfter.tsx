import { RESULTS } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";
import acne from "@/assets/ba-acne.jpg";
import pigmentation from "@/assets/ba-pigmentation.jpg";
import prp from "@/assets/ba-prp.jpg";
import laser from "@/assets/ba-laser.jpg";
import peel from "@/assets/ba-peel.jpg";
import antiaging from "@/assets/ba-antiaging.jpg";

// Local before/after clinical photos
const LOCAL_BA_IMAGES = [acne, pigmentation, prp, laser, peel, antiaging];

export function BeforeAfter() {
  const { data: contentMap = {} } = useWebsiteContent();
  const customResults = contentMap.results?.items;
  const resultsList = customResults && customResults.length > 0 ? customResults : RESULTS;

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {resultsList.map((r: any, i: number) => {
          const imgSrc = r.url || LOCAL_BA_IMAGES[i % LOCAL_BA_IMAGES.length];
          const treatmentName = r.treatment || r.title || "Skin Treatment";
          const tag = r.tag || "Clinical Transformation";
          const duration = r.duration || "4–8 weeks";

          return (
            <article
              key={treatmentName + i}
              className="group animate-fade-in-up overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={imgSrc}
                  alt={`${treatmentName} before and after result`}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Before / After badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full glass px-3.5 py-1.5 text-[10px] font-black tracking-widest text-foreground uppercase shadow-sm">
                    BEFORE
                  </span>
                  <span className="rounded-full bg-primary px-3.5 py-1.5 text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-sm">
                    AFTER
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                  {tag}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                  {treatmentName}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Treatment Duration</span>
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{duration}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-14 text-center text-sm text-muted-foreground leading-relaxed">
        * Individual results may vary based on skin type and condition. All outcomes are from verified patients.
      </p>
    </>
  );
}
