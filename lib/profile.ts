// Single source of truth for identity + contact.
// Projects live in lib/projects.ts; skills/experience in lib/resume.ts.

import type { LText, LList } from "@/lib/i18n"

export const profile = {
  firstName: "FURKAN CAN",
  lastName: "KARAFIL",
  fullName: "Furkan Can Karafil",
  // localised role; default English ("Computer Engineer")
  role: { en: "Computer Engineer", tr: "Bilgisayar Mühendisi" } as LText,
  // fixed string baked onto the 3D ID-card texture
  roleCard: "COMPUTER ENGINEER",
  // hats cycled by the hero role badge — pre-uppercased so the Turkish İ/ı
  // never depends on CSS text-transform (SSR ships <html lang="en">)
  rolesCycle: [
    { en: "COMPUTER ENGINEER", tr: "BİLGİSAYAR MÜHENDİSİ" },
    { en: "GAME DEVELOPER", tr: "OYUN GELİŞTİRİCİ" },
    { en: "BACKEND & DEVOPS", tr: "BACKEND & DEVOPS" },
  ] as LText[],
  tagline: "Games + Backend / DevOps",
  idNo: "ID·2026-CS-0007",
  location: "Türkiye",
  email: "fcankaranfil@gmail.com",
  site: "furkankarafil.me",
  // photo shown on the ID card (in /public)
  photoUrl: "/me.jpg",
  links: {
    github: "https://github.com/thefcan",
    linkedin: "https://www.linkedin.com/in/furkankarafil",
    okutgitsin: "https://okutgitsin.com",
    site: "https://furkankarafil.me",
    email: "mailto:fcankaranfil@gmail.com",
  },
  // short hybrid bio (about section) — tech concepts kept in English even in TR
  bio: {
    en: [
      "I'm a computer engineer who ships production systems — from match-3 game mechanics to Kubernetes chaos tests.",
      "On one side, games with Unity/C#; on the other, scalable backend & DevOps with Go, NestJS and Docker/K8s. I feed both with real projects.",
    ],
    tr: [
      "Match-3 oyun mekaniklerinden Kubernetes chaos testlerine kadar uzanan, production'a çıkmış sistemler kuran bir bilgisayar mühendisiyim.",
      "Bir yanda Unity/C# ile oyun; diğer yanda Go, NestJS ve Docker/K8s ile ölçeklenebilir backend & DevOps. İkisini de gerçek projelerle besliyorum.",
    ],
  } as LList,
}

export type Profile = typeof profile
