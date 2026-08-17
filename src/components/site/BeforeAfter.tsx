import { RESULTS } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";
import acne from "@/assets/ba-acne.jpg";
import pigmentation from "@/assets/ba-pigmentation.jpg";
import prp from "@/assets/ba-prp.jpg";
import laser from "@/assets/ba-laser.jpg";
import peel from "@/assets/ba-peel.jpg";
import antiaging from "@/assets/ba-antiaging.jpg";

const DEFAULT_IMAGES = [acne, pigmentation, prp, laser, peel, antiaging];

export function BeforeAfter() {
  const { data: contentMap = {} } = useWebsiteContent();
  const galleryImages = contentMap.gallery?.images || [];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESULTS.map((r, i) => {
          const liveImg = galleryImages[i]?.url;
          const imgSrc = liveImg || DEFAULT_IMAGES[i % DEFAULT_IMAGES.length];
          const imgLabel = galleryImages[i]?.label || r.treatment;

          return (
            <article
              key={r.treatment + i}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elegant flex flex-col"
            >
              <div className="relative aspect-[5/3] bg-muted overflow-hidden">
                <img
                  src={imgSrc}
                  alt={`${imgLabel} results`}
                  width={1280}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {r.tag}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {imgLabel}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Treatment duration: {r.duration}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        * Individual results may vary. Images managed dynamically from Admin Panel.
      </p>
    </>
  );
}
