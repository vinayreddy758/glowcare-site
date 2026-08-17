import { Star, Quote } from "lucide-react";
import { TESTIMONIALS as fallbackTESTIMONIALS } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";

function Avatar({ name }: { name: string }) {
  const initials = (name || "Patient").split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
      {initials}
    </div>
  );
}

export function Testimonials({ limit }: { limit?: number }) {
  const { data: contentMap = {} } = useWebsiteContent();
  const reviewsList = contentMap.testimonials?.reviews || fallbackTESTIMONIALS;
  const list = limit ? reviewsList.slice(0, limit) : reviewsList;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-center">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm font-semibold text-foreground">
          4.9 / 5 · Based on verified patient reviews
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((t: any, i: number) => {
          const nameText = t.name || t.author || "Anonymous Patient";
          const treatmentText = t.treatment || t.role || "Skin Care";
          const quoteText = t.quote || t.review || t.text || "";
          const ratingNum = t.rating || 5;

          return (
            <article key={i} className="relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-soft">
              <Quote className="absolute right-5 top-5 h-6 w-6 text-primary-soft" />
              <div className="flex gap-1">
                {Array.from({ length: ratingNum }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90 flex-1">"{quoteText}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Avatar name={nameText} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{nameText}</p>
                  <p className="truncate text-xs text-muted-foreground">{treatmentText}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
