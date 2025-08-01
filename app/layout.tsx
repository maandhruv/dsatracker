'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar"
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  const shouldShowNavbar = pathname !== '/login'
  return (
    <html lang="en">
      <body
        className="bg-gray-900 text-white"
      >
        {shouldShowNavbar && <Navbar />}
        {children}
        
      </body>
    </html>
  );
}
