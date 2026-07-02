"use client"

import { ScrambleText } from "@/components/scramble-text"
import { useInView } from "@/components/use-in-view"
import { usePrefersReducedMotion, revealClass } from "@/components/use-prefers-reduced-motion"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import { skills } from "@/lib/resume"

const GROUP_ACCENT = ["var(--acid)", "var(--hot)", "var(--cyan)", "var(--violet)", "var(--amber)"]

export function SkillsSection() {
  const { ref, seen } = useInView<HTMLElement>()
  const reduced = usePrefersReducedMotion()
  const { t } = useLang()

  return (
    <section id="skills" ref={ref} className="relative border-b-[3px] border-black bg-ink py-14 sm:py-24">
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-acid">{t(ui.skills_kicker)}</div>
        <h2 className="font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl">
          <ScrambleText text={t(ui.skills_heading)} start={seen} duration={800} />
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {skills.map((group, gi) => {
            const accent = GROUP_ACCENT[gi % GROUP_ACCENT.length]
            return (
              <div
                key={group.label}
                className={`border-[3px] border-black bg-ink-2 p-5 brutal-sm transition-all duration-500 ${revealClass(seen, reduced)}`}
                style={{ ["--bs" as string]: accent, transitionDelay: `${gi * 60}ms` }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 border-2 border-black" style={{ background: accent }} />
                  <h3 className="font-mono text-sm font-bold tracking-widest text-paper">{group.label}</h3>
                  {group.soon && (
                    <span className="ml-auto font-mono text-[10px] font-bold text-amber">{t(ui.skills_learning)}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors ${
                        group.soon
                          ? "border-dashed bg-transparent text-muted-foreground"
                          : "bg-paper text-ink hover:bg-acid"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
