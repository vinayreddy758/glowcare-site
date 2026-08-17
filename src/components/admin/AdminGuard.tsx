import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { supabase, isDemoMode } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If in demo mode (no env variables), we allow a mock login
    if (isDemoMode) {
      const demoAuth = localStorage.getItem("demo_admin_auth");
      if (demoAuth === "true") {
        setIsAuthenticated(true);
      } else {
        router.navigate({ to: "/admin/login" });
      }
      setIsLoading(false);
      return;
    }

    // Real Supabase Auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        router.navigate({ to: "/admin/login" });
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.navigate({ to: "/admin/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
