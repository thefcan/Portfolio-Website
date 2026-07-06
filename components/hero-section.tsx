"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { ArrowRight, Github, Mail } from "lucide-react"
import { useNav } from "@/components/transition/transition-provider"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import { profile } from "@/lib/profile"
import { IdCardStatic } from "@/components/three/id-card-static"
import { ScrollVelocity } from "@/components/ScrollVelocity"
import RotatingText from "@/components/RotatingText"
import GlitchText from "@/components/GlitchText"
import CircularText from "@/components/CircularText"
import { usePrefersReducedMotion } from "@/components/use-prefers-reduced-motion"

// keep the WebGL canvas out of the server bundle
const IdCard3D = dynamic(
  () => import("@/components/three/id-card-3d").then((m) => m.IdCard3D),
  { ssr: false, loading: () => <IdCardStatic className="h-full w-full" /> },
)

// Mount the WebGL card on the visitor's first interaction (pointer move,
// touch, scroll or key). Desktop fires on the first mouse twitch and mobile
// on the first touch — effectively instant for anyone engaging with the page,
// and usually already during the boot overlay. A passive load never pays the
// three.js + shader-compile cost (measured at ~6s of main-thread time on a
// 4x-throttled mobile), and the static card it keeps is visually identical
// at rest. The card's 3D-ness only matters once you interact anyway.
function useFirstInteraction() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const on = () => setReady(true)
    const evs = ["pointermove", "pointerdown", "touchstart", "scroll", "wheel", "keydown"] as const
    evs.forEach((e) => window.addEventListener(e, on, { once: true, passive: true }))
    return () => evs.forEach((e) => window.removeEventListener(e, on))
  }, [])
  return ready
}

const TICKER = [
  "UNITY",
  "C#",
  "GO",
  "NEST.JS",
  "NEXT.JS",
  "KUBERNETES",
  "DOCKER",
  "REDIS",
  "POSTGRES",
  "REACT",
  "TYPESCRIPT",
  "FREERTOS",
]

// one full row of tags — ScrollVelocity tiles copies of it edge to edge.
// Module-level so the node identity is stable across hero re-renders.
const TICKER_ROW = (
  <>
    {TICKER.map((tag) => (
      <span key={tag} className="mx-4 inline-flex items-center gap-4">
        {tag} <span className="text-hot">◆</span>
      </span>
    ))}
  </>
)

export function HeroSection() {
  const { goTo } = useNav()
  const { lang, t } = useLang()
  const show3D = useFirstInteraction()
  const reduced = usePrefersReducedMotion()

  // role badge cycles through the hats; width pinned to the longest phrase
  // (mono font, so `ch` is exact) so the tagline next to it never shifts
  const roles = profile.rolesCycle.map((r) => t(r))
  const rolesCh = Math.max(...roles.map((s) => s.length))

  // mobile has no hover cursor, so the tap-to-flip affordance isn't obvious —
  // show a small hint until the card is first tapped (or a few seconds pass)
  const [flipHintSeen, setFlipHintSeen] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setFlipHintSeen(true), 9000)
    return () => clearTimeout(id)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-black">
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-60" />
      {/* accent corner blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-hot/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* ---- left: copy ---- */}
        <div>
          <div
            className="inline-flex items-center gap-2 border-[3px] border-black bg-paper px-3 py-1 font-mono text-[11px] font-bold text-ink"
            style={{ ["--bs" as string]: "var(--acid)" }}
          >
            <span className="h-2 w-2 animate-blink bg-hot" />
            {t(ui.hero_available)}
          </div>

          <p className="mt-5 font-mono text-sm font-bold text-acid sm:text-base">{t(ui.hero_greeting)}</p>

          {/* hover the name for an RGB-split glitch (CSS-only, zero idle cost) */}
          <h1 className="mt-2 font-black uppercase leading-[0.92] tracking-tight">
            <GlitchText enableOnHover speed={0.6} className="block text-5xl sm:text-6xl lg:text-7xl">
              {profile.firstName}
            </GlitchText>
            <GlitchText enableOnHover speed={0.6} className="block text-5xl text-acid sm:text-6xl lg:text-7xl">
              {profile.lastName}
            </GlitchText>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center justify-center bg-hot px-3 py-1 font-mono text-sm font-bold uppercase text-white"
              style={{ minWidth: `${rolesCh}ch` }}
            >
              {reduced ? (
                t(profile.rolesCycle[0])
              ) : (
                <RotatingText
                  texts={roles}
                  mainClassName="justify-center"
                  rotationInterval={2600}
                  staggerDuration={0.025}
                />
              )}
            </span>
            <span className="font-mono text-sm font-bold text-paper">// {profile.tagline}</span>
          </div>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t(ui.hero_bio)}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => goTo("projects", t(ui.nav_projects))}
              className="group inline-flex items-center gap-2 border-[3px] border-black bg-acid px-5 py-3 font-mono text-sm font-bold text-ink brutal-press"
              style={{ ["--bs" as string]: "#000" }}
            >
              {t(ui.hero_cta_projects)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => goTo("contact", t(ui.nav_contact))}
              className="inline-flex items-center gap-2 border-[3px] border-black bg-paper px-5 py-3 font-mono text-sm font-bold text-ink brutal-press"
              style={{ ["--bs" as string]: "var(--cyan)" }}
            >
              <Mail className="h-4 w-4" />
              {t(ui.hero_cta_contact)}
            </button>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-[3px] border-black bg-ink px-5 py-3 font-mono text-sm font-bold text-paper brutal-press"
              style={{ ["--bs" as string]: "var(--hot)" }}
            >
              <Github className="h-4 w-4" />
              GITHUB
            </a>
          </div>
        </div>

        {/* ---- right: 3D card ---- */}
        <div className="relative">
          <div
            className="relative mx-auto h-[420px] w-full max-w-[360px] sm:h-[460px]"
            onPointerDown={() => setFlipHintSeen(true)}
          >
            {show3D ? (
              <IdCard3D mode="hero" className="h-full w-full" />
            ) : (
              <IdCardStatic className="h-full w-full" />
            )}
            {/* rotating sticker pinned to the card corner — decorative, the
                same info lives in the AVAILABLE badge for screen readers */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 z-10 hidden rounded-full border-[3px] border-black bg-ink p-1.5 brutal-sm sm:block"
              style={{ ["--bs" as string]: "var(--hot)" }}
            >
              <CircularText
                text={t(ui.hero_badge_circle)}
                spinDuration={24}
                className="h-28 w-28 font-mono text-[10px] font-bold tracking-widest text-acid"
              />
            </div>
          </div>
          {/* touch-only affordance — desktop already gets a pointer cursor */}
          {!flipHintSeen && (
            <div className="mt-2 flex justify-center sm:hidden">
              <span className="inline-flex items-center gap-2 border-[3px] border-black bg-acid px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-[3px_3px_0_#000]">
                <span className="animate-bounce">👆</span>
                {t({ en: "tap the card to flip", tr: "kartı çevirmek için dokun" })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ---- ticker — drifts like the old marquee, but reacts to scroll
           velocity (speeds up with the scroll, flips direction on scroll-up).
           Decorative tag soup, so hidden from screen readers. ---- */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-t-[3px] border-black bg-acid py-2 font-mono text-sm font-bold text-ink"
      >
        <ScrollVelocity texts={[TICKER_ROW]} velocity={-40} numCopies={4} />
      </div>
    </section>
  )
}
