import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://o3.dev"),
  title: {
    default: "o3.dev",
    template: "%s | o3.dev",
  },
  description: "Open-source by default. Explore o3.dev on GitHub.",
  applicationName: "o3.dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "o3.dev",
    description: "Open-source by default. Explore o3.dev on GitHub.",
    url: "https://o3.dev",
    siteName: "o3.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "o3.dev",
    description: "Open-source by default. Explore o3.dev on GitHub.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
