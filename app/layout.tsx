import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vexcort — Premium Web, AI & Digital Agency",
    template: "%s | Vexcort",
  },
  description:
    "Vexcort designs, automates, and scales premium web, mobile apps, custom AI workflows, and digital marketing systems for ambitious brands.",
  authors: [{ name: "Vexcort" }],
  openGraph: {
    siteName: "Vexcort",
    type: "website",
    images: [{ url: "https://vexcort.com/textlogo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Vexcort",
    images: ["https://vexcort.com/textlogo.png"],
  },
  icons: {
    icon: "/textlogo.png",
    apple: "/textlogo.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vexcort",
  url: "https://vexcort.com",
  logo: "https://vexcort.com/textlogo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "connect@vexcort.com",
    contactType: "customer service",
  },
  sameAs: ["https://www.linkedin.com/company/vexcort"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Herr+Von+Muellerhoff&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
