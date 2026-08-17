import { Link, useRouter, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, CalendarDays, Scissors, Clock, CalendarOff, Settings, Type, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { label: "Services", href: "/admin/services", icon: Scissors },
  { label: "Business Hours", href: "/admin/business-hours", icon: Clock },
  { label: "Blocked Dates", href: "/admin/blocked-dates", icon: CalendarOff },
  { label: "Clinic Settings", href: "/admin/clinic-settings", icon: Settings },
  { label: "Website Content", href: "/admin/website-content", icon: Type },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out");
    } else {
      toast.success("Logged out successfully");
      router.navigate({ to: "/admin/login" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-4 flex flex-col">
        <div className="mb-8 flex items-center justify-between md:justify-start">
          <Logo />
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-border pt-4">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/20 p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
