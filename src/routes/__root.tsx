import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-4">
      {/* Decorative premium gradients */}
      <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#0EA5A4]/10 blur-[100px]" />
      
      <div className="relative z-10 max-w-xl text-center">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Error Code 404
        </div>
        
        <h1 className="font-logo text-7xl md:text-8xl font-black uppercase text-foreground tracking-wider mb-4 leading-none">
          Lost In Space
        </h1>
        <p className="mx-auto max-w-md text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
          The link you followed may be broken, or the page has been moved. Let's get you back on track to scaling your digital systems.
        </p>
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            🏠 Home
          </Link>
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ⚙️ Services
          </Link>
          <Link
            to="/faq"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ❓ FAQs
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[#0a0a0c]/40 hover:bg-secondary/40 px-4 py-3 text-xs md:text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/45"
          >
            ✉️ Contact
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vexcort — Premium Web, AI & Digital Agency" },
      { name: "description", content: "Vexcort designs, automates, and scales premium web, mobile apps, custom AI workflows, and digital marketing systems for ambitious brands." },
      { name: "author", content: "Vexcort" },
      { property: "og:image", content: "https://vexcort.com/textlogo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Vexcort" },
      { name: "twitter:image", content: "https://vexcort.com/textlogo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/logo.png?v=4",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.png?v=4",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vexcort",
    "url": "https://vexcort.com",
    "logo": "https://vexcort.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "connect@vexcort.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/vexcort"
    ]
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
