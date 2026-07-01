// Curated project set, sourced from the 2026 portfolio.
// Identity/contact live in lib/profile.ts; skills/experience in lib/resume.ts.
// In the Turkish copy, technical concepts stay in their original English form.

import type { LText, LList } from "@/lib/i18n"

export type ProjectCategory = "games" | "backend" | "systems" | "ml"
export type Accent = "acid" | "hot" | "cyan" | "violet" | "amber"

export type Project = {
  id: string
  no: string
  title: string
  badge: LText // short status pill
  subtitle: LText // all-caps one-liner descriptor
  blurb: LText
  highlights: LList
  stack: string[]
  categories: ProjectCategory[]
  accent: Accent
  featured?: boolean
  links: { repo?: string; live?: string; private?: boolean }
}

export const CATEGORY_LABELS: Record<ProjectCategory, LText> = {
  games: { en: "GAMES", tr: "OYUN" },
  backend: { en: "BACKEND", tr: "BACKEND" },
  systems: { en: "SYSTEMS", tr: "SİSTEM" },
  ml: { en: "ML / DATA", tr: "ML / DATA" },
}

export const projects: Project[] = [
  {
    id: "okutgitsin",
    no: "01",
    title: "OkutGitsin",
    badge: { en: "FOUNDER · LIVE", tr: "KURUCU · CANLI" },
    subtitle: {
      en: "LIVE-STREAM GROUP-AUCTION MARKETPLACE FOR VEHICLES · FULL-STACK + INFRA",
      tr: "ARAÇLAR İÇİN LIVE-STREAM GROUP-AUCTION MARKETPLACE · FULL-STACK + INFRA",
    },
    blurb: {
      en: "A next-generation vehicle auction platform built around live-streamed group auctions: an admin opens a broadcast, multiple cars go under the hammer, and users join with tokens and bid in real time. I designed and built the whole system, from data model to deployment.",
      tr: "Live-streamed group auction üzerine kurulu, yeni nesil bir araç açık-artırma platformu: admin bir broadcast açar, araçlar sırayla çekiçe çıkar, kullanıcılar token ile real-time teklif verir. Data model'den deployment'a kadar tüm sistemi tek başıma tasarlayıp kurdum.",
    },
    highlights: {
      en: [
        "Atomic bid engine on Redis + Lua for millisecond-level, race-free bid processing, with Socket.IO broadcasting every bid instantly.",
        "Live video auctions via LiveKit, plus an escrow deposit flow (HELD → REFUNDED / FORFEITED) with IBAN verification.",
        "Security-hardened — Helmet CSP & HSTS, XSS sanitization, endpoint rate limiting; CI/CD through GitHub Actions → Vercel.",
      ],
      tr: [
        "Redis + Lua üzerinde atomic bid engine — millisecond seviyesinde, race-free bid processing; her teklif Socket.IO ile anında broadcast edilir.",
        "LiveKit ile live video auction + IBAN doğrulamalı escrow akışı (HELD → REFUNDED / FORFEITED).",
        "Security-hardened — Helmet CSP & HSTS, XSS sanitization, endpoint rate limiting; GitHub Actions → Vercel ile CI/CD.",
      ],
    },
    stack: ["NestJS 11", "Next.js 16", "React 19", "PostgreSQL", "Prisma", "Redis + Lua", "Socket.IO", "LiveKit", "JWT", "Turborepo"],
    categories: ["backend", "systems"],
    accent: "acid",
    featured: true,
    links: { live: "https://okutgitsin.com", private: true },
  },
  {
    id: "unity-match3",
    no: "02",
    title: "unity-match3",
    badge: { en: "GAME · C#", tr: "OYUN · C#" },
    subtitle: {
      en: "UNITY 2D MATCH-3 — ENGINE-FREE, UNIT-TESTED C# CORE",
      tr: "UNITY 2D MATCH-3 — ENGINE'DEN BAĞIMSIZ, UNIT-TEST'Lİ C# CORE",
    },
    blurb: {
      en: "A Unity 2D match-3 puzzle built around an engine-independent, unit-testable pure-C# core. Game logic is decoupled from Unity, so it stays testable and extensible.",
      tr: "Engine'den bağımsız, unit-test edilebilir saf C# core üzerine kurulu bir Unity 2D match-3 puzzle. Game logic Unity'den decouple edildiği için test edilebilir ve genişletilebilir.",
    },
    highlights: {
      en: [
        "Game logic in a pure-C# core, decoupled from Unity — unit-testable without the engine.",
        "Extensible architecture with State, Observer, Object-Pool, Factory and ScriptableObject patterns.",
      ],
      tr: [
        "Game logic, Unity'den decouple edilmiş saf C# core'da — engine olmadan unit-test edilebilir.",
        "State, Observer, Object-Pool, Factory ve ScriptableObject pattern'larıyla genişletilebilir mimari.",
      ],
    },
    stack: ["Unity", "C#", "Design Patterns", "Unit Tests"],
    categories: ["games"],
    accent: "hot",
    featured: true,
    links: { repo: "https://github.com/thefcan/unity-match3" },
  },
  {
    id: "ragdesk",
    no: "03",
    title: "RagDesk",
    badge: { en: "SAAS · RAG", tr: "SAAS · RAG" },
    subtitle: {
      en: "MULTI-TENANT, AI-POWERED KNOWLEDGE SAAS — RAG OVER YOUR DOCUMENTS",
      tr: "MULTI-TENANT, AI-POWERED KNOWLEDGE SAAS — BELGELERİNİZ ÜZERİNDE RAG",
    },
    blurb: {
      en: "A multi-tenant SaaS that answers questions over your own documents with citations — built as polyglot microservices and engineered to run at near-zero cost.",
      tr: "Kendi belgeleriniz üzerinde citation'larla soru yanıtlayan multi-tenant bir SaaS — polyglot microservices olarak ve neredeyse sıfır maliyetle çalışacak şekilde tasarlandı.",
    },
    highlights: {
      en: [
        "Retrieval-augmented pipeline with citations, backed by PostgreSQL + pgvector for semantic search.",
        "Polyglot services — a Go API, a Python / FastAPI AI service and a Next.js frontend, all containerised.",
      ],
      tr: [
        "Citation'lı retrieval-augmented pipeline; semantic search için PostgreSQL + pgvector.",
        "Polyglot servisler — Go API, Python / FastAPI AI service ve Next.js frontend, hepsi containerised.",
      ],
    },
    stack: ["Go", "Python", "FastAPI", "Next.js", "PostgreSQL", "pgvector", "Docker", "LLM / RAG"],
    categories: ["backend", "ml"],
    accent: "cyan",
    featured: true,
    links: { repo: "https://github.com/thefcan/ragdesk" },
  },
  {
    id: "reveil",
    no: "04",
    title: "Reveil",
    badge: { en: "CAPSTONE · AI", tr: "BİTİRME · AI" },
    subtitle: {
      en: "AI-POWERED HABIT TRANSFORMATION APP · SENIOR CAPSTONE",
      tr: "AI-POWERED HABIT TRANSFORMATION APP · BİTİRME PROJESİ",
    },
    blurb: {
      en: "A cross-platform habit-building app backed by an AI engine that turns user behaviour into personalised guidance, built with a dual native client and a dedicated AI service.",
      tr: "Kullanıcı davranışını kişiselleştirilmiş rehberliğe çeviren bir AI engine ile desteklenen cross-platform habit-building uygulaması; dual native client ve özel bir AI service ile kuruldu.",
    },
    highlights: {
      en: [
        "Dual clients — React Native and SwiftUI — over a NestJS modular-monolith API and a FastAPI AI engine.",
        "Resilient multi-provider AI chain: Claude → Groq → OpenAI → rule-based fallback for reliability and cost control.",
      ],
      tr: [
        "Dual client — React Native ve SwiftUI — bir NestJS modular-monolith API ve FastAPI AI engine üzerinde.",
        "Dayanıklı multi-provider AI chain: Claude → Groq → OpenAI → rule-based fallback (güvenilirlik ve maliyet kontrolü).",
      ],
    },
    stack: ["React Native", "SwiftUI", "NestJS", "FastAPI", "PostgreSQL", "SQLite", "LLM APIs"],
    categories: ["backend"],
    accent: "violet",
    links: { repo: "https://github.com/Urthella/Reveil" },
  },
  {
    id: "costsight",
    no: "05",
    title: "CostSight",
    badge: { en: "CLOUD · ML", tr: "CLOUD · ML" },
    subtitle: {
      en: "AUTOMATED CLOUD-COST ANOMALY DETECTION & ROOT-CAUSE ATTRIBUTION",
      tr: "OTOMATİK CLOUD-COST ANOMALY DETECTION & ROOT-CAUSE ATTRIBUTION",
    },
    blurb: {
      en: "Detects unusual spikes in cloud spend and attributes them to the responsible service or account — so cost surprises are caught early instead of at invoice time.",
      tr: "Cloud harcamasındaki olağandışı spike'ları tespit edip sorumlu service ya da account'a atfeder — maliyet sürprizleri invoice zamanı yerine erkenden yakalanır.",
    },
    highlights: {
      en: [
        "Ensemble anomaly detection combining STL decomposition, Isolation Forest and Z-score over time-series billing data.",
        "Root-cause attribution across service / account dimensions, surfaced through an interactive Streamlit dashboard.",
      ],
      tr: [
        "Time-series billing verisi üzerinde STL decomposition + Isolation Forest + Z-score ile ensemble anomaly detection.",
        "Service / account boyutlarında root-cause attribution; interaktif bir Streamlit dashboard'da.",
      ],
    },
    stack: ["Python", "scikit-learn", "statsmodels", "pandas", "Streamlit", "AWS CUR"],
    categories: ["ml"],
    accent: "amber",
    links: { repo: "https://github.com/Urthella/costsight" },
  },
  {
    id: "gocontainer",
    no: "06",
    title: "gocontainer",
    badge: { en: "GO · LINUX", tr: "GO · LINUX" },
    subtitle: {
      en: "A FROM-SCRATCH CONTAINER RUNTIME IN ~80 LINES OF GO",
      tr: "~80 SATIR GO İLE SIFIRDAN BİR CONTAINER RUNTIME",
    },
    blurb: {
      en: "A tiny container runtime in ~80 lines of Go — real process, filesystem and hostname isolation via Linux namespaces, cgroups and chroot. A from-scratch docker run.",
      tr: "~80 satır Go ile minik bir container runtime — Linux namespaces, cgroups ve chroot ile gerçek process, filesystem ve hostname isolation. Sıfırdan bir docker run.",
    },
    highlights: {
      en: [
        "Real process / filesystem / hostname isolation via Linux namespaces + cgroups + chroot.",
        "Zero libraries; talks directly to syscalls.",
      ],
      tr: [
        "Linux namespaces + cgroups + chroot ile gerçek process / filesystem / hostname isolation.",
        "Sıfır kütüphane; doğrudan syscall'larla konuşur.",
      ],
    },
    stack: ["Go", "Namespaces", "cgroups", "syscalls"],
    categories: ["systems"],
    accent: "cyan",
    links: { repo: "https://github.com/thefcan/gocontainer" },
  },
  {
    id: "gochain",
    no: "07",
    title: "gochain",
    badge: { en: "GO · DISTRIBUTED", tr: "GO · DISTRIBUTED" },
    subtitle: {
      en: "A BLOCKCHAIN BUILT FROM SCRATCH IN GO — POW, UTXO, ECDSA, P2P",
      tr: "SIFIRDAN GO İLE BLOCKCHAIN — POW, UTXO, ECDSA, P2P",
    },
    blurb: {
      en: "A blockchain built from scratch in Go — proof-of-work, UTXO transactions, ECDSA wallets and P2P networking, shipped in phases with tests, CI and Docker.",
      tr: "Sıfırdan Go ile yazılmış bir blockchain — proof-of-work, UTXO transactions, ECDSA wallets ve P2P networking; testler, CI ve Docker ile fazlar halinde teslim edildi.",
    },
    highlights: {
      en: [
        "Proof-of-work + UTXO transaction model + ECDSA wallets.",
        "P2P networking; phased delivery with tests / CI / Docker.",
      ],
      tr: [
        "Proof-of-work + UTXO transaction model + ECDSA wallets.",
        "P2P networking; test / CI / Docker ile fazlı teslim.",
      ],
    },
    stack: ["Go", "PoW", "P2P", "ECDSA"],
    categories: ["systems"],
    accent: "acid",
    links: { repo: "https://github.com/thefcan/gochain" },
  },
  {
    id: "rust-url-shortener",
    no: "08",
    title: "rust-url-shortener",
    badge: { en: "RUST · ASYNC", tr: "RUST · ASYNC" },
    subtitle: {
      en: "ASYNC URL SHORTENER IN RUST WITH AXUM & TOKIO",
      tr: "AXUM & TOKIO İLE RUST'TA ASYNC URL SHORTENER",
    },
    blurb: {
      en: "Async URL shortener in Rust with Axum & Tokio — typed errors mapped to HTTP, hit-count analytics, integration tests, tracing and a multi-stage Docker image.",
      tr: "Axum & Tokio ile Rust'ta async bir URL shortener — HTTP'ye map'lenen typed error'lar, hit-count analytics, integration testler, tracing ve multi-stage Docker image.",
    },
    highlights: {
      en: [
        "Async service on Axum + Tokio; typed errors mapped to HTTP.",
        "Hit-count analytics, tracing and a multi-stage Docker image.",
      ],
      tr: [
        "Axum + Tokio üzerinde async service; typed error'lar HTTP'ye map'lenir.",
        "Hit-count analytics, tracing ve multi-stage Docker image.",
      ],
    },
    stack: ["Rust", "Axum", "Tokio", "Docker"],
    categories: ["systems", "backend"],
    accent: "hot",
    links: { repo: "https://github.com/thefcan/rust-url-shortener" },
  },
  {
    id: "go-rest-task-api",
    no: "09",
    title: "go-rest-task-api",
    badge: { en: "GO · BACKEND", tr: "GO · BACKEND" },
    subtitle: {
      en: "A PRODUCTION-STYLE TASK API IN PURE GO (NET/HTTP)",
      tr: "SAF GO (NET/HTTP) İLE PRODUCTION TARZI TASK API",
    },
    blurb: {
      en: "A production-style task-management REST API in pure Go (net/http, zero dependencies) with a concurrency-safe in-memory store and a clean handler layer.",
      tr: "Saf Go (net/http, zero dependency) ile production tarzı bir task-management REST API — concurrency-safe in-memory store ve temiz bir handler layer.",
    },
    highlights: {
      en: [
        "Zero dependencies, standard-library net/http only.",
        "Concurrency-safe in-memory store + clean handler layer.",
      ],
      tr: [
        "Zero dependency, sadece standart kütüphane net/http.",
        "Concurrency-safe in-memory store + temiz handler layer.",
      ],
    },
    stack: ["Go", "net/http", "REST", "Concurrency"],
    categories: ["backend"],
    accent: "cyan",
    links: { repo: "https://github.com/thefcan/go-rest-task-api" },
  },
  {
    id: "rtos-process-control",
    no: "10",
    title: "Process Control · RTOS",
    badge: { en: "C · EMBEDDED", tr: "C · EMBEDDED" },
    subtitle: {
      en: "MULTI-TASKING RTOS SIMULATING DISTRIBUTED CONTROL WITH FREERTOS",
      tr: "FREERTOS İLE DISTRIBUTED CONTROL SİMÜLE EDEN MULTI-TASKING RTOS",
    },
    blurb: {
      en: "A multi-tasking RTOS application (FreeRTOS, CMSIS-RTOS v2) simulating distributed control — IPC via message queues and task notifications, with a circular-buffer logger for sensor streams.",
      tr: "Distributed control'ü simüle eden multi-tasking bir RTOS uygulaması (FreeRTOS, CMSIS-RTOS v2) — message queue ve task notification ile IPC, sensor stream'leri için circular-buffer logger.",
    },
    highlights: {
      en: [
        "FreeRTOS / CMSIS-RTOS v2; IPC via message queues + task notifications.",
        "Circular-buffer logger for sensor streams.",
      ],
      tr: [
        "FreeRTOS / CMSIS-RTOS v2; message queue + task notification ile IPC.",
        "Sensor stream'leri için circular-buffer logger.",
      ],
    },
    stack: ["C", "FreeRTOS", "CMSIS-RTOS v2", "IPC", "Embedded"],
    categories: ["systems"],
    accent: "amber",
    links: {},
  },
  {
    id: "mips16-pipeline",
    no: "11",
    title: "MIPS16 Pipeline",
    badge: { en: "C · ARCH", tr: "C · ARCH" },
    subtitle: {
      en: "A CYCLE-LEVEL SIMULATOR FOR THE MIPS16 INSTRUCTION SET",
      tr: "MIPS16 INSTRUCTION SET İÇİN CYCLE-LEVEL SİMÜLATÖR",
    },
    blurb: {
      en: "A cycle-level simulator for the MIPS16 instruction set, modelling pipeline stages and the data / control hazards between them.",
      tr: "MIPS16 instruction set için cycle-level bir simülatör; pipeline stage'leri ve aralarındaki data / control hazard'larını modelliyor.",
    },
    highlights: {
      en: [
        "Cycle-level pipeline model.",
        "Detection and resolution of data and control hazards.",
      ],
      tr: [
        "Cycle-level pipeline modeli.",
        "Data ve control hazard'larının tespiti ve çözümü.",
      ],
    },
    stack: ["C", "Pipelining", "Hazards"],
    categories: ["systems"],
    accent: "violet",
    links: { repo: "https://github.com/Urthella/MIPS16" },
  },
  {
    id: "dolap-sale-prediction",
    no: "12",
    title: "Dolap Sale Prediction",
    badge: { en: "PYTHON · ML", tr: "PYTHON · ML" },
    subtitle: {
      en: "PREDICTS WHETHER A SECOND-HAND LISTING WILL SELL",
      tr: "BİR İKİNCİ EL İLANIN SATILIP SATILMAYACAĞINI TAHMİN EDER",
    },
    blurb: {
      en: "Predicts whether a second-hand marketplace listing will sell — feature engineering and an XGBoost classifier reaching ROC-AUC 0.815, with a scraping pipeline and two-pass labeling.",
      tr: "Bir ikinci el marketplace ilanının satılıp satılmayacağını tahmin eder — feature engineering ve ROC-AUC 0.815'e ulaşan bir XGBoost classifier, scraping pipeline ve two-pass labeling ile.",
    },
    highlights: {
      en: [
        "XGBoost classifier, ROC-AUC 0.815.",
        "Scraping pipeline + two-pass labeling.",
      ],
      tr: [
        "XGBoost classifier, ROC-AUC 0.815.",
        "Scraping pipeline + two-pass labeling.",
      ],
    },
    stack: ["Python", "XGBoost", "scikit-learn", "pandas"],
    categories: ["ml"],
    accent: "acid",
    links: { repo: "https://github.com/thefcan/dolap-sale-prediction" },
  },
  {
    id: "cnn-mnist",
    no: "13",
    title: "CNN · MNIST",
    badge: { en: "PYTHON · DL", tr: "PYTHON · DL" },
    subtitle: {
      en: "AN OPTIMISED CONVOLUTIONAL NETWORK FOR MNIST DIGITS",
      tr: "MNIST RAKAMLARI İÇİN OPTİMİZE EDİLMİŞ CONVOLUTIONAL NETWORK",
    },
    blurb: {
      en: "Optimised a convolutional network for MNIST digit recognition, tuning architecture and training to reach 99.29% test accuracy.",
      tr: "MNIST digit recognition için bir convolutional network'ü optimize ettim; architecture ve training tuning ile %99.29 test accuracy.",
    },
    highlights: {
      en: [
        "TensorFlow/Keras CNN; 99.29% test accuracy.",
        "Architecture and training hyperparameter tuning.",
      ],
      tr: [
        "TensorFlow/Keras CNN; %99.29 test accuracy.",
        "Architecture ve training hyperparameter tuning.",
      ],
    },
    stack: ["TensorFlow", "Keras", "CNN"],
    categories: ["ml"],
    accent: "hot",
    links: {},
  },
]

export const MORE_PROJECTS = [
  "Algorithm Analyzer (Java 17 + React 19)",
  "FEC / ARQ Study (Python)",
  "PatiMatch (Web · UI/UX)",
  "quiz-api · movies · MarketX · bash-script2",
]
