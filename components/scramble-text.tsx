"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*<>[]{}=+-_"

/**
 * Terminal-style "decrypt" reveal: scrambles characters then resolves to `text`.
 * Reused by the boot loader and section headings.
 */
export function ScrambleText({
  text,
  className,
  duration = 1100,
  start = true,
}: {
  text: string
  className?: string
  duration?: number
  start?: boolean
}) {
  const [out, setOut] = useState(text)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // read the flag at effect-time (not via a hook) so the very first mount is
    // correct — no scramble flash before a reactive value catches up
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (!start || reduced) {
      setOut(text)
      return
    }
    const total = text.length
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const revealed = Math.floor(p * total)
      let s = ""
      for (let i = 0; i < total; i++) {
        const ch = text[i]
        if (ch === " ") {
          s += " "
          continue
        }
        s += i < revealed ? ch : CHARS[(Math.random() * CHARS.length) | 0]
      }
      setOut(s)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else setOut(text)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, duration, start])

  return <span className={className}>{out}</span>
}
