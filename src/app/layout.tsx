import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/layout/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "West Gilmore St Church of Christ",
    template: "%s | West Gilmore St Church of Christ",
  },
  description: "Pointing Souls to Christ Through Truth and Love — A welcoming community of faith.",
  keywords: ["church", "Christ", "worship", "sermons", "community", "faith"],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "West Gilmore St Church of Christ",
    description: "Pointing Souls to Christ Through Truth and Love",
    siteName: "West Gilmore St Church of Christ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
