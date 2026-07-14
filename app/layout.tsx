import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LangProvider } from "@/components/i18n/lang-provider"
import { TransitionProvider } from "@/components/transition/transition-provider"
import TargetCursor from "@/components/TargetCursor"
import "./globals.css"

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
})

const SITE_URL = "https://furkankarafil.me"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Furkan Can Karafil — Computer Engineer · Games + Backend/DevOps",
    template: "%s · Furkan Can Karafil",
  },
  description:
    "Furkan Can Karafil — Computer Engineer building games (Unity/C#) and scalable backend & DevOps systems (Go, NestJS, Docker, Kubernetes). Portfolio, projects and contact.",
  keywords: [
    "Furkan Can Karafil",
    "Computer Engineer",
    "Game Developer",
    "Unity",
    "C#",
    "Backend",
    "DevOps",
    "Go",
    "Kubernetes",
    "Portfolio",
  ],
  authors: [{ name: "Furkan Can Karafil", url: SITE_URL }],
  creator: "Furkan Can Karafil",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Furkan Can Karafil",
    title: "Furkan Can Karafil — Computer Engineer · Games + Backend/DevOps",
    description:
      "Games (Unity/C#) + Backend/DevOps (Go, NestJS, Kubernetes). Interactive 3D portfolio.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furkan Can Karafil — Computer Engineer",
    description: "Games + Backend/DevOps engineer. Interactive 3D portfolio.",
    creator: "@thefcan",
  },
  generator: "Next.js",
  // the site ships its own EN/TR switch — stop browsers from auto-translating
  // (which mangles tech terms: Docker → "liman işçisi", FCK → "siktir git", …)
  other: { google: "notranslate" },
  // favicon comes from app/icon.svg (brand F mark) via the App Router convention
}

export const viewport: Viewport = {
  themeColor: "#0e0e11",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body className={`notranslate ${grotesk.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LangProvider>
            <TransitionProvider>{children}</TransitionProvider>
          </LangProvider>
        </ThemeProvider>
        {/* arcade target reticle trailing the pointer — corners lock onto
            links/buttons; desktop-only decoration, native cursor stays */}
        <TargetCursor />
        <Analytics />
      </body>
    </html>
  )
}
