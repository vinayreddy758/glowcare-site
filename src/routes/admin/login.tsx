import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { supabase, isDemoMode } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isDemoMode) {
        // Mock authentication
        if (email === "admin@glowcare.com" && password === "admin123") {
          localStorage.setItem("demo_admin_auth", "true");
          toast.success("Welcome, Admin!");
          router.navigate({ to: "/admin" });
        } else {
          toast.error("Invalid credentials for demo mode.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Logged in successfully!");
        router.navigate({ to: "/admin" });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage GlowCare</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@glowcare.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>

        {isDemoMode && (
          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-center text-sm">
            <p className="font-semibold text-primary">Demo Mode Active</p>
            <p className="mt-1 text-muted-foreground">
              Use <strong>admin@glowcare.com</strong> / <strong>admin123</strong> to log in.
            </p>
            <Button 
              variant="outline" 
              className="mt-3 w-full text-xs" 
              onClick={() => {
                setEmail("admin@glowcare.com");
                setPassword("admin123");
              }}
            >
              Autofill Demo Credentials
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
