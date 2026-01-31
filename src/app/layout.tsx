import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond, Playfair_Display, Fraunces } from "next/font/google";
import "./globals.css";
import { ApexProvider } from "@/store/apex-context";

// Base/Body fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

// Luxury/DisplayName fonts (Substitutes for Qaveria, Argeta, Brideside)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-qaveria-alt" // Qaveria substitute
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-argeta-alt" // Argeta substitute
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-brideside-alt" // Brideside substitute
});

export const metadata: Metadata = {
  title: "Apex Hiring System",
  description: "Gamified task verification for the Apex Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} 
          ${outfit.variable} 
          ${cormorant.variable}
          ${playfair.variable}
          ${fraunces.variable}
          font-sans antialiased bg-apex-obsidian text-white
        `}
        suppressHydrationWarning
      >
        <ApexProvider>
          {children}
        </ApexProvider>
      </body>
    </html>
  );
}
