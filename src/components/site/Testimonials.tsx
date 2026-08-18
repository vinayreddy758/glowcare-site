import { Star, Quote } from "lucide-react";
import { TESTIMONIALS as fallbackTESTIMONIALS } from "@/data/clinic";
import { useWebsiteContent } from "@/lib/cms-store";

function Avatar({ name }: { name: string }) {
  const initials = (name || "Patient").split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold tracking-wider text-primary-foreground shadow-sm">
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
      <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-center animate-fade-in-up">
        <div className="flex gap-1 rounded-full bg-white/60 px-4 py-2 shadow-sm border border-border/50 backdrop-blur-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm font-semibold tracking-wide text-foreground uppercase bg-primary/10 text-primary px-4 py-2 rounded-full">
          4.9/5 · Verified Patient Reviews
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((t: any, i: number) => {
          const nameText = t.name || t.author || "Anonymous Patient";
          const treatmentText = t.treatment || t.role || "Skin Care";
          const quoteText = t.quote || t.review || t.text || "";
          const ratingNum = t.rating || 5;

          return (
            <article 
              key={i} 
              className="group relative flex flex-col rounded-[2rem] border border-border/60 bg-card p-8 transition-all duration-300 animate-fade-in-up hover:-translate-y-2 hover:shadow-elegant overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/20" />
              
              <div className="relative z-10 flex gap-1">
                {Array.from({ length: ratingNum }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="relative z-10 mt-5 text-[15px] leading-relaxed text-foreground/80 flex-1 italic">"{quoteText}"</p>
              
              <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-border/50 pt-5">
                <Avatar name={nameText} />
                <div className="min-w-0">
                  <p className="truncate text-base font-bold text-foreground">{nameText}</p>
                  <p className="truncate text-xs font-semibold uppercase tracking-wider text-primary mt-1">{treatmentText}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
