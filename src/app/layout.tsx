import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    default: "Raffa Yuda Pratama - Portfolio",
    template: "%s | Raffa Yuda Pratama - Portfolio",
  },
  description: "Junior Web Developer",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development", "Portfolio"],
  authors: [{ name: "Raffa Yuda Pratama" }],
  creator: "Raffa Yuda Pratama",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://raffayudapratama-portfolio.vercel.app",
    title: "Raffa Yuda Pratama - Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js",
    siteName: "Raffa Yuda Pratama Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raffa Yuda Pratama - Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js",
    creator: "@raffayudapratama06",
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
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="54d91077-ef7d-4c50-a9c6-28685eb3bade"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
