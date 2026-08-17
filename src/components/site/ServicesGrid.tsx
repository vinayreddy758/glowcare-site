import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useServices } from "@/lib/cms-store";

export function ServicesGrid({ limit }: { limit?: number }) {
  const { data: services = [] } = useServices();
  const activeServices = services.filter(s => s.is_active !== false);
  const list = limit ? activeServices.slice(0, limit) : activeServices;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {list.map((s) => (
        <article
          key={s.slug || s.id}
          className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
        >
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex justify-between items-start">
            <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
            {s.price && (
              <span className="text-sm font-semibold text-primary">₹{s.price}</span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          {s.benefits && s.benefits.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/book"
            className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-glow"
          >
            Book Treatment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}
