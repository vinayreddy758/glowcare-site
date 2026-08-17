import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2"
      aria-label="GlowCare Skin & Hair Clinic — Home"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-primary shadow-soft transition-transform group-hover:scale-105">
        <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          GlowCare
        </span>
        {!compact && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Skin &amp; Hair Clinic
          </span>
        )}
      </span>
    </Link>
  );
}
