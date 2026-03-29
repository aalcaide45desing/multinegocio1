import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { db } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  // Parche de seguridad: Si Prisma no se ha generado con el nuevo modelo, usamos null
  const settings = await (db as any).settings?.findUnique({ where: { id: "global" } }).catch(() => null);
  
  return {
    title: settings?.siteTitle || "Mi Negocio",
    description: settings?.siteDescription || "Bienvenidos a nuestro sitio web.",
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    },
    openGraph: {
      images: settings?.ogImageUrl ? [settings.ogImageUrl] : [],
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
