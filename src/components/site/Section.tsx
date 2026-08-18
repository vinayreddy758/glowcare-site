import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {(eyebrow || title || subtitle) && (
          <div className={`mb-14 sm:mb-18 animate-fade-in-up ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
