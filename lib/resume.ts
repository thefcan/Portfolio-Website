// Skills, experience and education — sourced from the 2026 portfolio.
// Skill group labels stay in English (technical headers) for both languages.

import type { LText } from "@/lib/i18n"

export type SkillGroup = { label: string; items: string[]; soon?: boolean }

export const skills: SkillGroup[] = [
  { label: "LANGUAGES", items: ["Python", "Go", "TypeScript", "JavaScript", "Rust", "Java", "C", "C#", "PHP"] },
  { label: "BACKEND", items: ["NestJS", "FastAPI", "Express", "Axum", "net/http", "REST APIs", "Microservices"] },
  { label: "DEVOPS & INFRA", items: ["Docker", "GitHub Actions", "CI/CD", "Linux", "Bash", "Server Admin"] },
  { label: "DATA", items: ["PostgreSQL", "pgvector", "Prisma", "Redis", "SQLite", "Firebase"] },
  { label: "FRONTEND", items: ["React", "Next.js", "React Native", "Tailwind CSS"] },
  { label: "ML & DATA", items: ["TensorFlow / Keras", "XGBoost", "scikit-learn", "pandas", "RAG"] },
  { label: "GAMES", items: ["Unity", "C#", "Design Patterns", "Gameplay Systems"] },
  { label: "EXPLORING", items: ["Kubernetes", "LangChain", "LangGraph"], soon: true },
]

export type Experience = {
  role: LText
  org: string
  meta: LText
  desc: LText
}

export const experience: Experience[] = [
  {
    role: { en: "DevOps & Backend Developer Intern", tr: "DevOps & Backend Developer Stajyeri" },
    org: "Yazılım.xyz",
    meta: { en: "Remote · Aug–Oct 2025", tr: "Remote · Ağu–Eki 2025" },
    desc: {
      en: "Built and maintained RESTful APIs and backend services within an agile team, working across the build-and-delivery workflow.",
      tr: "Agile bir takımda RESTful API'ler ve backend servisleri kurdum/sürdürdüm; build-and-delivery workflow'u boyunca çalıştım.",
    },
  },
  {
    role: { en: "Software Engineering Intern", tr: "Software Engineering Stajyeri" },
    org: "Siberkon Inc.",
    meta: { en: "Konya · Jul–Aug 2024", tr: "Konya · Tem–Ağu 2024" },
    desc: {
      en: "Developed features in PHP, JavaScript and TypeScript and supported server infrastructure and high-availability operations.",
      tr: "PHP, JavaScript ve TypeScript ile feature'lar geliştirdim; server infrastructure ve high-availability operasyonlarını destekledim.",
    },
  },
  {
    role: { en: "Cybersecurity & Reverse Engineering", tr: "Cybersecurity & Reverse Engineering" },
    org: "Anticverse Club",
    meta: { en: "University · 2022–2024", tr: "Üniversite · 2022–2024" },
    desc: {
      en: "Hands-on reverse engineering and security research within the university's cybersecurity club.",
      tr: "Üniversitenin cybersecurity kulübünde uygulamalı reverse engineering ve güvenlik araştırması.",
    },
  },
]

export const education = {
  degree: { en: "B.Sc. Computer Engineering", tr: "Bilgisayar Mühendisliği (Lisans)" } as LText,
  school: { en: "Konya Food & Agriculture University", tr: "Konya Gıda ve Tarım Üniversitesi" } as LText,
  meta: "2022 – 2026",
  languages: { en: "Turkish (native) · English (C1)", tr: "Türkçe (ana dil) · İngilizce (C1)" } as LText,
}

export type Stat = { value: string; label: LText }
export const stats: Stat[] = [
  { value: "16+", label: { en: "PROJECTS", tr: "PROJE" } },
  { value: "8", label: { en: "LANGUAGES", tr: "DİL" } },
  { value: "3", label: { en: "EXPERIENCES", tr: "DENEYİM" } },
  { value: "2026", label: { en: "GRADUATING", tr: "MEZUNİYET" } },
]
