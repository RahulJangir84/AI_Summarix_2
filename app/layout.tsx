export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Source_Sans_3 as FontSans, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import PlanBadge from "@/components/common/plan-badge";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarix - AI-powered summarization tool",
  description:
    "Summarix transforms long articles into concise summaries with our advanced AI technology",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
        <body className={`font-sans ${fontSans.variable} ${robotoFlex.variable} antialiased`}>
        <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader
          color="#2299DD"        
          height={3}            
          showSpinner={false}  
        />
          <div className="relative flex flex-col min-h-screen">
            <Header 
              planBadge={
                <Suspense fallback={<div className="w-16 h-6 animate-pulse bg-slate-200 rounded-full ml-2"></div>}>
                  <PlanBadge />
                </Suspense>
              } 
            />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          {/* <div className="noise-overlay fixed inset-0 z-[100] opacity-2 pointer-events-none" /> */}
      </ThemeProvider>
    </ClerkProvider>
        </body>
      </html>
  );
}
