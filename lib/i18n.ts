// Bilingual content layer.
// Principle: in the Turkish copy, professional/technical concepts stay in their
// original English form (Docker, backend, DevOps, runtime, pipeline, matchmaking,
// real-time, escrow, anomaly detection…). Only natural-language prose is localised.

export type Lang = "en" | "tr"
export type LText = { en: string; tr: string }
export type LList = { en: string[]; tr: string[] }

export function pick<T>(lang: Lang, v: { en: T; tr: T }): T {
  return v[lang]
}

export const ui = {
  // nav
  nav_about: { en: "ABOUT", tr: "HAKKIMDA" },
  nav_skills: { en: "SKILLS", tr: "YETENEKLER" },
  nav_projects: { en: "PROJECTS", tr: "PROJELER" },
  nav_contact: { en: "CONTACT", tr: "İLETİŞİM" },

  // hero
  hero_available: { en: "AVAILABLE FOR 2026 · GAMES / BACKEND", tr: "2026 İÇİN MÜSAİT · GAMES / BACKEND" },
  hero_greeting: { en: "Hey there 👋 welcome — I'm", tr: "Selam 👋 hoş geldin — ben" },
  hero_bio: {
    en: "From match-3 game mechanics to Kubernetes chaos tests — I build production-grade, scalable systems. One half games, one half backend & DevOps.",
    tr: "Match-3 oyun mekaniklerinden Kubernetes chaos testlerine — production'a çıkmış, ölçeklenebilir sistemler kuruyorum. Bir yanım oyun, bir yanım backend & DevOps.",
  },
  hero_cta_projects: { en: "PROJECTS", tr: "PROJELER" },
  hero_cta_contact: { en: "CONTACT", tr: "İLETİŞİM" },
  hero_hint: { en: "tilt with mouse · 3D", tr: "mouse ile eğ · 3D" },

  // about
  about_kicker: { en: "// ABOUT", tr: "// HAKKIMDA" },
  about_heading: { en: "GAMES × SYSTEMS", tr: "OYUN × SİSTEM" },
  about_game_title: { en: "GAME SIDE", tr: "OYUN TARAFI" },
  about_game_desc: {
    en: "Engine-independent, testable game core in Unity/C#; design patterns and gameplay systems.",
    tr: "Unity/C# ile engine'den bağımsız, test edilebilir oyun çekirdeği; design pattern'lar ve gameplay sistemleri.",
  },
  about_system_title: { en: "SYSTEM SIDE", tr: "SİSTEM TARAFI" },
  about_system_desc: {
    en: "Real-time bid engines, RAG services and from-scratch systems software — Go, Rust, C; with Docker, tests and CI.",
    tr: "Real-time bid engine'ler, RAG servisleri ve sıfırdan systems software — Go, Rust, C; Docker, test ve CI ile.",
  },
  about_callout: {
    en: "// Atomic state, matchmaking and live-broadcast work in auction rooms — real-time systems that transfer directly to game-server engineering.",
    tr: "// Auction room'lardaki atomic state, matchmaking ve live-broadcast işleri; doğrudan game-server engineering'e transfer olan real-time sistemler.",
  },
  about_exp: { en: "// EXPERIENCE", tr: "// DENEYİM" },
  about_edu: { en: "// EDUCATION", tr: "// EĞİTİM" },

  // skills
  skills_kicker: { en: "// SKILLS", tr: "// YETENEKLER" },
  skills_heading: { en: "TECH STACK", tr: "TECH STACK" },
  skills_learning: { en: "LEARNING", tr: "ÖĞRENİYORUM" },

  // projects
  flagship_kicker: { en: "// FLAGSHIP", tr: "// VİTRİN" },
  flagship_heading: { en: "FEATURED WORK", tr: "ÖNE ÇIKAN İŞLER" },
  projects_kicker: { en: "// PROJECTS", tr: "// PROJELER" },
  projects_heading: { en: "ALL PROJECTS", tr: "TÜM PROJELER" },
  filter_all: { en: "ALL", tr: "TÜMÜ" },
  proj_featured: { en: "FEATURED", tr: "ÖNE ÇIKAN" },
  proj_code: { en: "CODE", tr: "KOD" },
  proj_live: { en: "LIVE", tr: "CANLI" },
  proj_private: { en: "PRIVATE REPO", tr: "ÖZEL REPO" },
  proj_more: { en: "MORE ON GITHUB", tr: "GITHUB'DA DAHA FAZLASI" },

  // contact / footer
  contact_kicker: { en: "// CONTACT", tr: "// İLETİŞİM" },
  contact_heading1: { en: "LET'S BUILD", tr: "BERABER" },
  contact_heading2: { en: "SOMETHING TOGETHER", tr: "BİR ŞEY KURALIM" },
  contact_body: {
    en: "A new game studio, a backend team, or an interesting systems problem — I'm open to internships and remote roles. Drop a message, let's talk.",
    tr: "Yeni bir oyun stüdyosu, bir backend ekibi ya da ilginç bir systems problemi — internship ve remote fırsatlarına açığım. Bir mesaj at, konuşalım.",
  },
} satisfies Record<string, LText>
