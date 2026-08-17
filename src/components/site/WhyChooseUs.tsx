import { Award, Cpu, UserCheck, Wallet, ShieldCheck, Smile } from "lucide-react";
import { WHY_US } from "@/data/clinic";

const ICONS = [Award, Cpu, UserCheck, Wallet, ShieldCheck, Smile];

export function WhyChooseUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {WHY_US.map((item, i) => {
        const Icon = ICONS[i];
        return (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-soft"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
