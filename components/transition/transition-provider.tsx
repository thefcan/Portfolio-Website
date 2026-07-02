"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { initials } from "@/components/three/id-card-static"
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
/* CSS-3D boot card — the boot screen must not pay for WebGL: the old  */
/* three.js loading card put a ~900KB chunk + a shader compile in the  */
/* critical path. This is the same spinning-ID look in pure CSS.       */
/* ------------------------------------------------------------------ */
function BootCard() {
  return (
    <div className="[perspective:1100px]">
      <div
        className="relative h-[300px] w-[215px] animate-spin-y [transform-style:preserve-3d]"
        style={{ animationDuration: "3.4s" }}
      >
        {/* front — compact ID face (mirrors IdCardStatic) */}
        <div className="absolute inset-0 flex flex-col border-[3px] border-black bg-paper [backface-visibility:hidden]">
          <div className="flex items-center justify-between border-b-[3px] border-black bg-acid px-2.5 py-1.5 font-mono text-[9px] font-bold text-ink">
            <span>{"// ACCESS"}</span>
            <span>ALL·AREAS</span>
          </div>
          <div className="relative mx-auto mt-3 aspect-square w-[104px] overflow-hidden border-[3px] border-black bg-[#161616]">
            {profile.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover grayscale"
                style={{ objectPosition: "50% 28%" }}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center font-black text-2xl text-acid">{initials()}</div>
            )}
            <div className="absolute left-0 top-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-acid border-t-transparent" />
          </div>
          <div className="mt-2 text-center font-black leading-none text-ink">
            <div className="text-sm">{profile.firstName}</div>
            <div className="text-sm">{profile.lastName}</div>
          </div>
          <div className="mx-2.5 mt-1.5 bg-hot py-0.5 text-center font-mono text-[8px] font-bold text-white">
            {profile.roleCard}
          </div>
          <div className="mt-auto border-t-[3px] border-black py-1 text-center font-mono text-[8px] font-bold text-ink">
            {profile.site}
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-[3px] border-black bg-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-mono text-xs font-bold tracking-widest text-hot">{"// ENCRYPTED"}</span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-paper">{profile.idNo}</span>
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
  const [skipBoot, setSkipBoot] = useState(false)
  const [progress, setProgress] = useState(0)
  const [overlay, setOverlay] = useState<{ active: boolean; label: string }>({
    active: false,
    label: "",
  })
  const navLock = useRef(false)

  // boot sequence — runs once per browser-tab session, skipped on repeat loads
  useEffect(() => {
    let alreadyBooted = false
    try {
      alreadyBooted = sessionStorage.getItem("fck:booted") === "1"
    } catch {}
    if (alreadyBooted) {
      setSkipBoot(true)
      setBooting(false)
      return
    }
    const DURATION = 2400
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(100, ((now - t0) / DURATION) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
      else {
        try {
          sessionStorage.setItem("fck:booted", "1")
        } catch {}
        setTimeout(() => setBooting(false), 360)
      }
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
      {!skipBoot && (
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

            {/* spinning card (pure CSS — no WebGL in the boot path) */}
            <BootCard />

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
      )}

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
