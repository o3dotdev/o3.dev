import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://o3.dev"),
  title: {
    default: "o3.dev",
    template: "%s | o3.dev",
  },
  description:
    "A small home for upcoming software projects, notes, and experiments.",
  applicationName: "o3.dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "o3.dev",
    description:
      "A small home for upcoming software projects, notes, and experiments.",
    url: "https://o3.dev",
    siteName: "o3.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "o3.dev",
    description:
      "A small home for upcoming software projects, notes, and experiments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
