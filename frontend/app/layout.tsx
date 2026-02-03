import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hatolie = localFont({
  src: "./fonts/Hatolie.ttf",
  variable: "--font-hatolie-new",
});

const star = localFont({
  src: "./fonts/Starjedi.ttf",
  variable: "--font-star-new",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway-new",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamSmart - Streaming Meets Intelligence",
  description: "Experience the next generation of movie streaming with AI-powered search and curated recommendations.",
  keywords: ["streaming", "movies", "AI", "search", "StreamSmart", "entertainment"],
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hatolie.variable} ${raleway.variable} ${star.variable}  antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
