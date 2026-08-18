import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useServices } from "@/lib/cms-store";

export function ServicesGrid({ limit }: { limit?: number }) {
  const { data: services = [] } = useServices();
  const activeServices = services.filter(s => s.is_active !== false);
  const list = limit ? activeServices.slice(0, limit) : activeServices;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {list.map((s, i) => (
        <article
          key={s.slug || s.id}
          className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm transition-all duration-300 animate-fade-in-up hover:-translate-y-2 hover:border-primary/30 hover:shadow-elegant"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Subtle gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-soft group-hover:scale-110">
              <Sparkles className="h-6 w-6" />
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-display text-2xl font-semibold text-foreground leading-tight">{s.title}</h3>
              {s.price && (
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                  ₹{s.price}
                </span>
              )}
            </div>
            
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            
            {s.benefits && s.benefits.length > 0 && (
              <ul className="mt-6 space-y-2.5 flex-1">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground/85">
                    <div className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/20">
                      <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                    </div>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-8 pt-6 border-t border-border/50">
              <Link
                to="/book"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-sm font-bold text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-soft"
              >
                Book Treatment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
