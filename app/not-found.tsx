"use client"

import Link from "next/link"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import FuzzyText from "@/components/FuzzyText"

export default function NotFound() {
  const { t } = useLang()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-hot/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <span
          className="inline-flex items-center gap-2 border-[3px] border-black bg-paper px-3 py-1 font-mono text-[11px] font-bold text-ink"
          style={{ ["--bs" as string]: "var(--hot)" }}
        >
          <span className="h-2 w-2 animate-blink bg-hot" />
          {t(ui.nf_kicker)}
        </span>

        {/* canvas heading is decorative; the real one is for screen readers */}
        <h1 className="sr-only">404</h1>
        <div aria-hidden="true" className="font-mono">
          <FuzzyText
            fontSize="clamp(5rem, 22vw, 11rem)"
            fontWeight={900}
            color="var(--acid)"
            baseIntensity={0.16}
            hoverIntensity={0.5}
          >
            404
          </FuzzyText>
        </div>

        <p className="max-w-md text-pretty font-mono text-sm font-bold text-muted-foreground sm:text-base">
          {t(ui.nf_body)}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 border-[3px] border-black bg-acid px-5 py-3 font-mono text-sm font-bold text-ink brutal-press"
          style={{ ["--bs" as string]: "#000" }}
        >
          {t(ui.nf_home)}
        </Link>
      </div>
    </main>
  )
}
