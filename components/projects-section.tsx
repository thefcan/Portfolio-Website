"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Github, ExternalLink, Lock, Star } from "lucide-react"
import { ScrambleText } from "@/components/scramble-text"
import SpotlightCard from "@/components/SpotlightCard"
import { useInView } from "@/components/use-in-view"
import { usePrefersReducedMotion, revealClass } from "@/components/use-prefers-reduced-motion"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import {
  projects,
  CATEGORY_LABELS,
  MORE_PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/lib/projects"
import { profile } from "@/lib/profile"

type Filter = "all" | ProjectCategory

const ACCENT_VAR: Record<Project["accent"], string> = {
  acid: "var(--acid)",
  hot: "var(--hot)",
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  amber: "var(--amber)",
}

// `compact` renders the uniform catalog card (no FEATURED badge, no highlights);
// the rich variant — badge + highlight bullets — is reserved for the flagship
// showcase so the same project doesn't get the full treatment twice.
function ProjectCard({ p, compact = false, index = 0 }: { p: Project; compact?: boolean; index?: number }) {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  const accent = ACCENT_VAR[p.accent]
  const rich = !compact && p.featured
  return (
    <motion.article
      // reduced motion: keep the same start/end state (no hydration drift) but
      // collapse the duration so the card appears instantly — an instant opacity
      // step reads as calm, not as a slide/scale
      layout={compact && !reduced}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced || compact ? 0 : index * 0.08 }}
      className="group flex flex-col border-[3px] border-black bg-ink-2 brutal-sm"
      style={{ ["--bs" as string]: accent }}
    >
      <SpotlightCard
        spotlightColor={`color-mix(in srgb, ${accent} 14%, transparent)`}
        className="flex flex-1 flex-col"
      >
      {/* top strip */}
      <div className="flex items-center gap-3 border-b-[3px] border-black px-4 py-2" style={{ background: accent }}>
        <span className="font-mono text-sm font-black text-ink">{p.no}</span>
        <span className="font-mono text-xs font-bold text-ink/80">{t(p.badge)}</span>
        {rich && (
          <span className="ml-auto inline-flex items-center gap-1 bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-paper">
            <Star className="h-3 w-3 fill-current" />
            {t(ui.proj_featured)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-black uppercase tracking-tight text-2xl text-paper">{p.title}</h3>
        <p className="mt-1 font-mono text-[11px] font-bold leading-snug text-muted-foreground">{t(p.subtitle)}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(p.blurb)}</p>

        {rich && (
          <ul className="mt-4 space-y-2">
            {t(p.highlights).map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-paper/90">
                <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color: accent }}>
                  ◆
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="border-2 border-black bg-paper px-2 py-0.5 font-mono text-[11px] font-bold text-ink">
              {s}
            </span>
          ))}
        </div>

        {/* links pinned to the bottom (mt-auto) so CTAs line up across a row
            and extra height reads as breathing room, not a gap under a button */}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.links.repo && (
            <a
              href={p.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-[3px] border-black bg-ink px-3 py-1.5 font-mono text-xs font-bold text-paper brutal-press"
              style={{ ["--bs" as string]: accent }}
            >
              <Github className="h-3.5 w-3.5" />
              {t(ui.proj_code)}
            </a>
          )}
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-[3px] border-black bg-acid px-3 py-1.5 font-mono text-xs font-bold text-ink brutal-press"
              style={{ ["--bs" as string]: "#000" }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t(ui.proj_live)}
            </a>
          )}
          {p.links.private && (
            <span className="inline-flex items-center gap-2 border-[3px] border-dashed border-neutral-600 px-3 py-1.5 font-mono text-xs font-bold text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              {t(ui.proj_private)}
            </span>
          )}
        </div>
      </div>
      </SpotlightCard>
    </motion.article>
  )
}

export function ProjectsSection() {
  const { t } = useLang()
  const { ref, seen } = useInView<HTMLElement>()
  const { ref: catRef, seen: catSeen } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [filter, setFilter] = useState<Filter>("all")

  const featured = useMemo(() => projects.filter((p) => p.featured), [])

  const FILTERS: { key: Filter; label: { en: string; tr: string } }[] = [
    { key: "all", label: ui.filter_all },
    { key: "games", label: CATEGORY_LABELS.games },
    { key: "backend", label: CATEGORY_LABELS.backend },
    { key: "systems", label: CATEGORY_LABELS.systems },
    { key: "ml", label: CATEGORY_LABELS.ml },
  ]

  // counts + catalog stay over the full set so every filter (incl. GAMES, whose
  // only project is featured) still resolves — the flagship is a highlight reel,
  // not a removal from the catalog.
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length }
    for (const cat of ["games", "backend", "systems", "ml"] as ProjectCategory[]) {
      c[cat] = projects.filter((p) => p.categories.includes(cat)).length
    }
    return c
  }, [])

  const shown = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" ref={ref} className="relative border-b-[3px] border-black bg-ink py-14 sm:py-24">
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-6xl px-4">
        {/* ---- flagship showcase ---- */}
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-acid">{t(ui.flagship_kicker)}</div>
        <h2 className="font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl">
          <ScrambleText text={t(ui.flagship_heading)} start={seen} duration={850} />
        </h2>
        {/* items-start so each flagship card is its own content height (the three
            differ a lot in length) — top-aligned, no stretched-in empty space */}
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* ---- full catalog ---- */}
        <div ref={catRef} className="mt-16">
          <div className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-acid">{t(ui.projects_kicker)}</div>
          <h2 className="font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl">
            <ScrambleText text={t(ui.projects_heading)} start={catSeen} duration={850} />
          </h2>

          {/* filters */}
          <div className="mt-7 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 border-[3px] border-black px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                    active ? "bg-acid text-ink" : "bg-ink-2 text-paper hover:bg-ink-2/60"
                  }`}
                  style={active ? { ["--bs" as string]: "#000" } : undefined}
                >
                  {t(f.label)}
                  <span className={`text-[10px] ${active ? "text-ink/60" : "text-muted-foreground"}`}>
                    {counts[f.key]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* grid — single column sizes to content on mobile; equal-height rows
              only kick in at sm+, where the 2-col layout needs aligned cards */}
          <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:auto-rows-fr sm:grid-cols-2 sm:[grid-auto-flow:dense]">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <ProjectCard key={p.id} p={p} compact />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* more on github */}
          <div
            className={`mt-8 border-[3px] border-dashed border-neutral-700 bg-ink-2/50 p-5 transition-all duration-700 ${revealClass(catSeen, reduced)}`}
          >
            <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground">
              <span className="text-acid">{"//"}</span> {t(ui.proj_more)}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-paper">
              {MORE_PROJECTS.map((m, i) => (
                <span key={m}>
                  {m}
                  {i < MORE_PROJECTS.length - 1 && <span className="ml-2 text-neutral-600">·</span>}
                </span>
              ))}
            </div>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 border-[3px] border-black bg-paper px-3 py-1.5 font-mono text-xs font-bold text-ink brutal-press"
              style={{ ["--bs" as string]: "var(--hot)" }}
            >
              <Github className="h-3.5 w-3.5" />
              github.com/thefcan
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
