"use client"

import { useState } from "react"
import { Github, Linkedin, Menu, X, Languages } from "lucide-react"
import { useNav } from "@/components/transition/transition-provider"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import { profile } from "@/lib/profile"

const LINKS = [
  { id: "about", label: ui.nav_about },
  { id: "skills", label: ui.nav_skills },
  { id: "projects", label: ui.nav_projects },
  { id: "contact", label: ui.nav_contact },
]

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 border-[3px] border-black bg-paper px-2.5 font-mono text-xs font-bold text-ink brutal-press ${className}`}
      style={{ ["--bs" as string]: "var(--violet)" }}
    >
      {/* sr-only prefix makes the accessible name "Switch language: EN / TR" —
          it contains the visible "EN / TR", satisfying WCAG 2.5.3 (label in name) */}
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Switch language: </span>
      <span className={lang === "en" ? "text-ink" : "text-neutral-600"}>EN</span>
      <span className="text-neutral-600">/</span>
      <span className={lang === "tr" ? "text-ink" : "text-neutral-600"}>TR</span>
    </button>
  )
}

export function Header() {
  const { goTo } = useNav()
  const { lang } = useLang()
  const [open, setOpen] = useState(false)

  const jump = (id: string, label: string) => {
    setOpen(false)
    goTo(id, label)
  }

  return (
    <header className="sticky top-0 z-[90] border-b-[3px] border-black bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4">
        {/* logo */}
        <button onClick={() => jump("top", "HOME")} className="flex items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center border-[3px] border-black bg-acid font-black text-ink brutal-press"
            style={{ ["--bs" as string]: "var(--hot)" }}
          >
            F
          </span>
          <span className="hidden font-mono text-sm font-bold tracking-[0.25em] sm:inline">KARAFIL</span>
          <span className="sr-only"> — home</span>
        </button>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => jump(l.id, l.label[lang])}
              className="border-[3px] border-transparent px-3 py-2 font-mono text-xs font-bold tracking-wider transition-colors hover:border-black hover:bg-acid hover:text-ink"
            >
              {l.label[lang]}
            </button>
          ))}
        </nav>

        {/* desktop right cluster */}
        <div className="hidden items-center gap-2 md:flex">
          <LangToggle className="h-9" />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center border-[3px] border-black bg-paper text-ink brutal-press"
            style={{ ["--bs" as string]: "var(--cyan)" }}
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center border-[3px] border-black bg-paper text-ink brutal-press"
            style={{ ["--bs" as string]: "var(--acid)" }}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>

        {/* mobile cluster */}
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle className="h-10" />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border-[3px] border-black bg-acid text-ink"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t-[3px] border-black bg-ink md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col p-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => jump(l.id, l.label[lang])}
                className="border-b-2 border-neutral-800 py-3 text-left font-mono text-sm font-bold tracking-wider hover:text-acid"
              >
                {l.label[lang]}
              </button>
            ))}
            <div className="mt-3 flex gap-2">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center border-[3px] border-black bg-paper text-ink">
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center border-[3px] border-black bg-paper text-ink">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
