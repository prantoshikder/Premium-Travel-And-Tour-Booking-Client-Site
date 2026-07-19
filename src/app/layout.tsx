import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelPerk — Explore More, Travel Better",
  description:
    "Discover amazing places with exclusive deals on flights, hotels, and tour packages. Your trusted travel partner worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body suppressContentEditableWarning className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
