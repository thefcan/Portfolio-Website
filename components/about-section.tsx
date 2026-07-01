"use client"

import { Briefcase, GraduationCap, Gamepad2, Server } from "lucide-react"
import { ScrambleText } from "@/components/scramble-text"
import { useInView } from "@/components/use-in-view"
import { useLang } from "@/components/i18n/lang-provider"
import { ui } from "@/lib/i18n"
import { profile } from "@/lib/profile"
import { experience, education, stats } from "@/lib/resume"

export function AboutSection() {
  const { ref, seen } = useInView<HTMLElement>()
  const { t } = useLang()

  return (
    <section id="about" ref={ref} className="relative border-b-[3px] border-black bg-ink-2 py-14 sm:py-24">
      <div className="retro-dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4">
        {/* kicker */}
        <div className="mb-3 font-mono text-xs font-bold tracking-[0.3em] text-acid">{t(ui.about_kicker)}</div>
        <h2 className="font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl">
          <ScrambleText text={t(ui.about_heading)} start={seen} duration={900} />
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          {/* bio + hybrid framing */}
          <div className="space-y-5">
            {t(profile.bio).map((p, i) => (
              <p key={i} className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {p}
              </p>
            ))}

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div
                className="border-[3px] border-black bg-ink p-4 brutal-sm"
                style={{ ["--bs" as string]: "var(--hot)" }}
              >
                <Gamepad2 className="mb-2 h-6 w-6 text-hot" />
                <h3 className="font-mono text-sm font-bold text-paper">{t(ui.about_game_title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(ui.about_game_desc)}</p>
              </div>
              <div
                className="border-[3px] border-black bg-ink p-4 brutal-sm"
                style={{ ["--bs" as string]: "var(--cyan)" }}
              >
                <Server className="mb-2 h-6 w-6 text-cyan" />
                <h3 className="font-mono text-sm font-bold text-paper">{t(ui.about_system_title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(ui.about_system_desc)}</p>
              </div>
            </div>

            <p className="border-l-[3px] border-acid bg-ink/60 px-4 py-3 font-mono text-sm text-paper">
              {t(ui.about_callout)}
            </p>
          </div>

          {/* stats */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {stats.map((s, i) => {
              const accents = ["var(--acid)", "var(--hot)", "var(--cyan)", "var(--amber)"]
              return (
                <div
                  key={s.label.en}
                  className="grid place-items-center border-[3px] border-black bg-paper p-5 text-ink brutal"
                  style={{ ["--bs" as string]: accents[i % accents.length] }}
                >
                  <span className="font-black text-4xl leading-none sm:text-5xl">{s.value}</span>
                  <span className="mt-2 font-mono text-[10px] font-bold tracking-widest">{t(s.label)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* experience */}
        <div className="mt-16">
          <div className="mb-5 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.3em] text-cyan">
            <Briefcase className="h-4 w-4" />
            {t(ui.about_exp)}
          </div>
          <div className="space-y-4">
            {experience.map((e) => (
              <div
                key={e.org}
                className="border-[3px] border-black bg-ink p-5 brutal-sm transition-transform hover:-translate-y-0.5"
                style={{ ["--bs" as string]: "var(--violet)" }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-bold text-paper">
                    {t(e.role)} <span className="text-acid">— {e.org}</span>
                  </h3>
                  <span className="font-mono text-xs font-bold text-muted-foreground">{t(e.meta)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t(e.desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* education */}
        <div className="mt-10">
          <div className="mb-5 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.3em] text-amber">
            <GraduationCap className="h-4 w-4" />
            {t(ui.about_edu)}
          </div>
          <div
            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-[3px] border-black bg-paper p-5 text-ink brutal-sm"
            style={{ ["--bs" as string]: "var(--amber)" }}
          >
            <div>
              <h3 className="font-bold">{t(education.degree)}</h3>
              <p className="font-mono text-sm">{t(education.school)}</p>
              <p className="mt-1 font-mono text-xs text-neutral-600">{t(education.languages)}</p>
            </div>
            <span className="font-mono text-sm font-bold">{education.meta}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
