"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IdCard3D } from "@/components/three/id-card-3d"
import { ScrambleText } from "@/components/scramble-text"
import { useLang } from "@/components/i18n/lang-provider"
import { profile } from "@/lib/profile"

/* ------------------------------------------------------------------ */
/* context                                                             */
/* ------------------------------------------------------------------ */
type NavCtx = { goTo: (id: string, label?: string) => void }
const Ctx = createContext<NavCtx>({ goTo: () => {} })
export const useNav = () => useContext(Ctx)

const NAV_OFFSET = 78 // sticky navbar height

const bootStatus = (p: number) => {
  if (p < 18) return "BOOTING SYSTEM"
  if (p < 42) return "LOADING ASSETS"
  if (p < 68) return "COMPILING SHADERS"
  if (p < 90) return "HYDRATING UI"
  return "READY"
}

/* ------------------------------------------------------------------ */
/* CSS-3D spinning mini card (cheap, used in section transitions)      */
/* ------------------------------------------------------------------ */
function MiniCard() {
  return (
    <div className="[perspective:700px]">
      <div className="relative h-[126px] w-[90px] animate-spin-y [transform-style:preserve-3d]">
        {/* front */}
        <div className="absolute inset-0 grid place-items-center border-[3px] border-black bg-acid font-black text-ink [backface-visibility:hidden]">
          <span className="text-2xl">FC</span>
        </div>
        {/* back */}
        <div className="absolute inset-0 grid place-items-center border-[3px] border-black bg-hot font-mono text-[10px] font-bold text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          ID·2026
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* provider                                                            */
/* ------------------------------------------------------------------ */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLang()
  const [booting, setBooting] = useState(true)
  const [progress, setProgress] = useState(0)
  const [overlay, setOverlay] = useState<{ active: boolean; label: string }>({
    active: false,
    label: "",
  })
  const navLock = useRef(false)

  // boot sequence
  useEffect(() => {
    const DURATION = 2400
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(100, ((now - t0) / DURATION) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
      else setTimeout(() => setBooting(false), 360)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // lock scroll while booting
  useEffect(() => {
    document.body.style.overflow = booting ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [booting])

  const goTo = useCallback((id: string, label?: string) => {
    if (navLock.current) return
    navLock.current = true
    setOverlay({ active: true, label: (label ?? id).toUpperCase() })
    window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top: y, behavior: "auto" })
      }
    }, 430)
    window.setTimeout(() => {
      setOverlay({ active: false, label: "" })
      navLock.current = false
    }, 980)
  }, [])

  return (
    <Ctx.Provider value={{ goTo }}>
      {children}

      {/* ---------- BOOT LOADER ---------- */}
      <AnimatePresence>
        {booting && (
          <motion.div
            key="boot"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-ink"
          >
            <div className="retro-grid pointer-events-none absolute inset-0 opacity-70" />
            <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

            {/* spinning 3D card */}
            <div className="relative h-[300px] w-[230px]">
              <IdCard3D mode="loading" className="h-full w-full" />
            </div>

            {/* decrypting name */}
            <ScrambleText
              text={profile.fullName.toUpperCase()}
              duration={1600}
              className="mt-2 font-mono text-lg font-bold tracking-[0.25em] text-acid sm:text-2xl"
            />

            {/* progress */}
            <div className="mt-7 w-[280px] max-w-[80vw] sm:w-[360px]">
              <div className="mb-2 flex items-end justify-between font-mono text-xs font-bold text-paper">
                <span>{bootStatus(progress)}</span>
                <span className="text-acid">
                  {Math.floor(progress).toString().padStart(3, "0")}%
                  <span className="ml-0.5 inline-block animate-blink">_</span>
                </span>
              </div>
              <div className="h-5 w-full border-[3px] border-black bg-paper">
                <div
                  className="h-full bg-acid"
                  style={{ width: `${progress}%`, transition: "width 80ms linear" }}
                />
              </div>
            </div>

            <p className="mt-5 font-mono text-[10px] tracking-widest text-muted-foreground">
              {profile.site} · {t(profile.role)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- SECTION TRANSITION ---------- */}
      <AnimatePresence>
        {overlay.active && (
          <motion.div
            key="section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-sm"
          >
            <div className="retro-dots pointer-events-none absolute inset-0 opacity-40" />
            <MiniCard />
            <div className="mt-6 font-mono text-sm font-bold tracking-widest text-acid">
              LOADING // {overlay.label}
              <span className="ml-1 inline-block animate-blink">_</span>
            </div>
            <div className="mt-4 h-2 w-48 overflow-hidden border-[3px] border-black bg-paper">
              <div className="h-full w-1/2 animate-[marquee_0.9s_linear_infinite] bg-hot" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
