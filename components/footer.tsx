"use client"

import { Github, Linkedin, Mail, ArrowUpRight, Globe } from "lucide-react"
import { useNav } from "@/components/transition/transition-provider"
import { useLang } from "@/components/i18n/lang-provider"
import { ScrambleText } from "@/components/scramble-text"
import { ui } from "@/lib/i18n"
import { profile } from "@/lib/profile"

const SOCIALS = [
  { name: "GitHub", href: profile.links.github, icon: Github, accent: "var(--hot)" },
  { name: "LinkedIn", href: profile.links.linkedin, icon: Linkedin, accent: "var(--cyan)" },
  { name: "OkutGitsin", href: profile.links.okutgitsin, icon: Globe, accent: "var(--acid)" },
]

export function Footer() {
  const { goTo } = useNav()
  const { t } = useLang()

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink-2">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />

      {/* contact CTA */}
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-acid">{t(ui.contact_kicker)}</div>
        <h2 className="font-black uppercase leading-[0.95] tracking-tight text-4xl sm:text-6xl">
          <ScrambleText text={t(ui.contact_heading1)} duration={700} />
          <br />
          <span className="text-acid">
            <ScrambleText text={t(ui.contact_heading2)} duration={900} />
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t(ui.contact_body)}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={profile.links.email}
            className="group inline-flex items-center gap-2 border-[3px] border-black bg-acid px-5 py-3 font-mono text-sm font-bold text-ink brutal-press"
            style={{ ["--bs" as string]: "#000" }}
          >
            <Mail className="h-4 w-4" />
            {profile.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="grid h-12 w-12 place-items-center border-[3px] border-black bg-ink text-paper brutal-press"
              style={{ ["--bs" as string]: s.accent }}
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* footer bar */}
      <div className="relative border-t-[3px] border-black bg-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <button onClick={() => goTo("top", "HOME")} className="flex items-center gap-2" aria-label="Home">
            <span
              className="grid h-8 w-8 place-items-center border-[3px] border-black bg-acid font-black text-ink"
              style={{ ["--bs" as string]: "var(--hot)" }}
            >
              F
            </span>
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-paper">{profile.fullName.toUpperCase()}</span>
          </button>

          <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
            <span className="font-mono text-[11px] text-muted-foreground">
              © 2026 {profile.fullName} · {t(profile.role)}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              Next.js · React Three Fiber · Tailwind — {profile.site}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
