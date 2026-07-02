"use client"

import { useEffect, useState } from "react"

/**
 * Reactive `prefers-reduced-motion: reduce` flag — single source of truth shared
 * by the 3D card, the scramble headings and every scroll-reveal so all motion
 * honours the OS accessibility setting (macOS: Settings › Accessibility ›
 * Display › Reduce Motion). Updates live when the user toggles it.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener?.("change", on)
    return () => mq.removeEventListener?.("change", on)
  }, [])
  return reduced
}

/**
 * Scroll-reveal class helper: fade + rise normally, but a translate-free fade
 * under reduced motion (an opacity fade reads as calm, not as movement).
 */
export function revealClass(seen: boolean, reduced: boolean) {
  if (reduced) return seen ? "opacity-100" : "opacity-0"
  return seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
}
