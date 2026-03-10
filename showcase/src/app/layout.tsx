import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Briques — Composants SaaS Next.js + Supabase",
  description:
    "10 briques reutilisables pour coaches, consultants et formateurs. Dashboard, Messaging, Payments, Onboarding et plus.",
  metadataBase: new URL("https://briques-showcase.vercel.app"),
  openGraph: {
    title: "Briques — Composants SaaS Next.js + Supabase",
    description:
      "10 briques reutilisables pour coaches, consultants et formateurs.",
    siteName: "Briques",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Briques — Composants SaaS Next.js + Supabase",
    description:
      "10 briques reutilisables pour coaches, consultants et formateurs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
