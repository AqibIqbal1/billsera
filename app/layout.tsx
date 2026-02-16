import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billsera | Modern Invoicing for Founders",
  description:
    "Create, manage and track invoices with a clean, powerful SaaS platform designed for freelancers and small businesses.",
  keywords:
    "invoicing, freelance tools, business management, billing saas, billsera",
  openGraph: {
    title: "Billsera | Modern Invoicing. Simplified.",
    description:
      "The modern standard for invoicing. Built for the elite circle of founders.",
    url: "https://billsera.vercel.app",
    siteName: "Billsera",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billsera | Modern Invoicing for Founders",
    description:
      "Create, manage and track invoices with a clean, powerful SaaS platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
