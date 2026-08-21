import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isDemoMode } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, UserPlus, ShieldCheck, KeyRound, Mail, ExternalLink } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

// Create a client with no session persistence to avoid logging out current admin session when creating a user
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const tempSupabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } })
  : null;

function AdminUsersPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isDemoMode || !tempSupabase) {
        toast.success(`Demo user created for ${email}! Note: In demo mode, use admin@glowcare.com / admin123 for full access.`);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const { error } = await tempSupabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast.success(`Admin user (${email}) registered successfully! They can now log in.`);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Admin User Management</h1>
        <p className="text-sm text-muted-foreground">Add new administrators or manage access credentials for GlowCare</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Create User Form */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Add New Admin User</h2>
              <p className="text-xs text-muted-foreground">Create login credentials for a new administrator</p>
            </div>
          </div>

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="newadmin@glowcare.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-10 mt-2" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Admin User"}
            </Button>
          </form>
        </div>

        {/* Information Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-green-500/10 p-2.5 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Supabase Cloud Authentication</h3>
                <p className="text-xs text-muted-foreground">Managing users via Supabase Dashboard</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground mb-4">
              You can also manage users, reset passwords, or delete admin accounts directly in your Supabase Authentication Cloud Console.
            </p>

            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2 text-xs">
              <p className="font-medium text-foreground">Steps to add via Supabase Console:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Go to your Supabase Project Dashboard</li>
                <li>Navigate to <strong>Authentication &rarr; Users</strong></li>
                <li>Click <strong>Add User &rarr; Create User</strong></li>
                <li>Enter Email and Password, and check <strong>Auto Confirm</strong></li>
              </ol>
            </div>

            <div className="mt-4">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
              >
                Open Supabase Dashboard <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
