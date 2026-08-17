import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/clinic";

function useCountUp(target: number, duration = 1600) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);

  return { n, ref };
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { n, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {n.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">{label}</p>
    </div>
  );
}

export function StatsCounter() {
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 via-background to-background p-8 sm:p-12">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </div>
  );
}
