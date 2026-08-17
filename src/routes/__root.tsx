import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTAs } from "@/components/site/StickyCTAs";
import { Toaster } from "@/components/ui/sonner";
import { CLINIC } from "@/data/clinic";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminGuard } from "@/components/admin/AdminGuard";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1E5BFF" },
      { title: "GlowCare Skin & Hair Clinic — Bangalore Dermatologist" },
      { name: "description", content: "Premium dermatology & aesthetic care in Bangalore. Acne, pigmentation, hair loss, laser, anti-aging by Dr. Priya Sharma. 5000+ happy patients." },
      { name: "author", content: "GlowCare Skin & Hair Clinic" },
      { property: "og:site_name", content: "GlowCare Skin & Hair Clinic" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "GlowCare Skin & Hair Clinic — Bangalore Dermatologist" },
      { name: "twitter:title", content: "GlowCare Skin & Hair Clinic — Bangalore Dermatologist" },
      { property: "og:description", content: "Premium dermatology & aesthetic care in Bangalore. Acne, pigmentation, hair loss, laser, anti-aging by Dr. Priya Sharma. 5000+ happy patients." },
      { name: "twitter:description", content: "Premium dermatology & aesthetic care in Bangalore. Acne, pigmentation, hair loss, laser, anti-aging by Dr. Priya Sharma. 5000+ happy patients." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAdminLogin = location.pathname === '/admin/login';

  return (
    <QueryClientProvider client={queryClient}>
      {isAdminPath ? (
        isAdminLogin ? (
          <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1">
              <Outlet />
            </main>
            <Toaster position="top-center" richColors />
          </div>
        ) : (
          <AdminGuard>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
            <Toaster position="top-center" richColors />
          </AdminGuard>
        )
      ) : (
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1 pb-28 sm:pb-32">
            <Outlet />
          </main>
          <Footer />
          <StickyCTAs />
          <Toaster position="top-center" richColors />
        </div>
      )}
    </QueryClientProvider>
  );
}
