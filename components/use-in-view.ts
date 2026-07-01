"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Reveal-on-scroll helper: `seen` flips to true the first time the element
 * enters the viewport (then the observer disconnects — reveals never reverse).
 * Attach `ref` to the section and drive fade/translate + ScrambleText off `seen`.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          ob.disconnect()
        }
      },
      { threshold },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [threshold])
  return { ref, seen }
}
