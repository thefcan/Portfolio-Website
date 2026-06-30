"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { Lang } from "@/lib/i18n"

type LangCtxValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: <T>(v: { en: T; tr: T }) => T
}

const LangCtx = createContext<LangCtxValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: (v) => v.en,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  // English by default; user can switch to Turkish (persisted).
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    try {
      const s = localStorage.getItem("lang")
      if (s === "tr" || s === "en") setLang(s)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "tr" : "en")), [])
  const t = useCallback(<T,>(v: { en: T; tr: T }) => v[lang], [lang])

  return <LangCtx.Provider value={{ lang, setLang, toggle, t }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}
