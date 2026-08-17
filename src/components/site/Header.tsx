import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { CLINIC } from "@/data/clinic";
import { useClinicSettings } from "@/lib/cms-store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Doctor" },
  { to: "/services", label: "Services" },
  { to: "/results", label: "Results" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: clinicSettings = {} } = useClinicSettings();
  const phone = clinicSettings.phone || CLINIC.phone;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-soft"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${phone}`}
            aria-label={`Call ${phone}`}
            className="hidden h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary md:grid"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Button asChild className="hidden h-10 rounded-full px-5 font-semibold shadow-soft md:inline-flex">
            <Link to="/book">Book Appointment</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 h-12 rounded-full text-base font-semibold">
                  <Link to="/book">Book Appointment</Link>
                </Button>
                <a
                  href={`tel:${phone}`}
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full border border-border text-base font-medium text-foreground"
                >
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
