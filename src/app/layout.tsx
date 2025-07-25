import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "John Developer - Full Stack Developer Portfolio",
    template: "%s | John Developer"
  },
  description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. View my projects, skills, and experience in modern web development.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development", "Portfolio"],
  authors: [{ name: "John Developer" }],
  creator: "John Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndeveloper-portfolio.vercel.app",
    title: "John Developer - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js",
    siteName: "John Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Developer - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js",
    creator: "@johndeveloper",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
