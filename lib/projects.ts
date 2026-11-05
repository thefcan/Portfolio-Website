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
      en: "UNITY MATCH-3 — 120 LEVELS ON AN ENGINE-FREE, UNIT-TESTED C# CORE",
      tr: "UNITY MATCH-3 — ENGINE'DEN BAĞIMSIZ, UNIT-TEST'Lİ C# CORE ÜZERİNDE 120 SEVİYE",
    },
    blurb: {
      en: "A Candy-Crush-style match-3 built architecture-first: every game rule lives in a C# assembly the compiler forbids from touching UnityEngine, and Unity only draws, animates and forwards input. It grew from a prototype into a 120-level, six-chapter game — each new mechanic added without touching the levels before it.",
      tr: "Architecture-first kurulmuş, Candy Crush tarzı bir match-3: oyunun tüm kuralları, compiler'ın UnityEngine'e dokunmasını yasakladığı bir C# assembly'sinde; Unity yalnızca çizer, animate eder ve input'u iletir. Bir prototipten 120 seviyelik, altı bölümlük bir oyuna büyüdü — her yeni mekanik önceki seviyelere dokunmadan eklendi.",
    },
    highlights: {
      en: [
        "651 rule tests run in ~4 s with no Unity installed — the same sources build as a plain .NET project, and CI runs them on every push.",
        "The cascade resolver returns a recording of every wave; the view only replays it, so rules and animation can never drift apart.",
        "Everything generated in code — candies, UI, app icon, sound effects and music — plus a probe that drives a real player build to screenshot every panel and record the gameplay GIF.",
      ],
      tr: [
        "651 kural testi, Unity kurulu olmadan ~4 saniyede koşar — aynı kaynaklar düz bir .NET projesi olarak build olur ve CI her push'ta çalıştırır.",
        "Cascade resolver her dalganın bir recording'ini döndürür; view yalnızca onu oynatır, bu yüzden kurallar ve animasyon asla birbirinden kopamaz.",
        "Her şey kodla üretilir — şekerler, UI, app icon, ses efektleri ve müzik — ayrıca gerçek bir player build'ini süren, her paneli screenshot'layan ve gameplay GIF'ini kaydeden bir probe.",
      ],
    },
    stack: ["Unity 2022.3", "C#", ".NET", "NUnit", "State / Observer / Pool / Factory", "GitHub Actions", "Unity Gaming Services"],
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
    id: "femheat",
    no: "04",
    title: "femheat",
    badge: { en: "SYSTEMS · C++", tr: "SİSTEM · C++" },
    subtitle: {
      en: "2D FEM HEAT-CONDUCTION SOLVER IN MODERN C++17 — VALIDATED BY MMS",
      tr: "MODERN C++17 İLE 2D FEM HEAT-CONDUCTION SOLVER — MMS İLE DOĞRULANDI",
    },
    blurb: {
      en: "A 2D steady-state heat-conduction FEM solver in modern C++17 — element assembly and solver written from scratch, validated by the Method of Manufactured Solutions.",
      tr: "Modern C++17 ile 2D steady-state heat-conduction FEM solver — element assembly ve solver sıfırdan yazıldı, Method of Manufactured Solutions ile doğrulandı.",
    },
    highlights: {
      en: [
        "From-scratch element assembly and solver.",
        "Method of Manufactured Solutions validation with convergence-rate checks.",
        "CMake + GoogleTest + CI.",
      ],
      tr: [
        "Sıfırdan element assembly ve solver.",
        "Convergence-rate check'leriyle Method of Manufactured Solutions doğrulaması.",
        "CMake + GoogleTest + CI.",
      ],
    },
    stack: ["C++17", "CMake", "GoogleTest", "FEM", "Numerical Methods"],
    categories: ["systems"],
    accent: "amber",
    links: { repo: "https://github.com/thefcan/femheat" },
  },
  {
    id: "k8s-resilience-harness",
    no: "05",
    title: "k8s-resilience-harness",
    badge: { en: "DEVOPS · K8S", tr: "DEVOPS · K8S" },
    subtitle: {
      en: "CHAOS-TESTING HARNESS FOR KUBERNETES — FAULT INJECTION & RECOVERY MEASUREMENT",
      tr: "KUBERNETES İÇİN CHAOS-TESTING HARNESS — FAULT INJECTION & RECOVERY ÖLÇÜMÜ",
    },
    blurb: {
      en: "A chaos-testing harness for Kubernetes — pod-kill fault injection with steady-state hypothesis verdicts and recovery-time measurement, tested against client-go fakes and a kind cluster in CI.",
      tr: "Kubernetes için bir chaos-testing harness — steady-state hypothesis verdict'leriyle pod-kill fault injection ve recovery-time ölçümü; client-go fake'leri ve CI'da kind cluster ile test edildi.",
    },
    highlights: {
      en: [
        "Pod-kill fault injection with steady-state hypothesis verdicts.",
        "Recovery-time measurement and reporting.",
        "client-go fake-clientset unit tests + kind-in-CI that fails the build on hypothesis violation.",
      ],
      tr: [
        "Steady-state hypothesis verdict'leriyle pod-kill fault injection.",
        "Recovery-time ölçümü ve raporlama.",
        "client-go fake-clientset unit testleri + hypothesis ihlalinde build'i kıran kind-in-CI.",
      ],
    },
    stack: ["Go", "Kubernetes", "client-go", "kind", "Chaos Engineering"],
    categories: ["systems"],
    accent: "hot",
    links: { repo: "https://github.com/thefcan/k8s-resilience-harness" },
  },
  {
    id: "reveil",
    no: "06",
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
    no: "07",
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
    no: "08",
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
    no: "09",
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
    no: "10",
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
    no: "11",
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
    no: "12",
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
    id: "dolap-sale-prediction",
    no: "13",
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
    no: "14",
    title: "CNN · MNIST",
    badge: { en: "PYTHON · DL", tr: "PYTHON · DL" },
    subtitle: {
      en: "AN OPTIMISED CONVOLUTIONAL NETWORK FOR MNIST DIGITS",
      tr: "MNIST RAKAMLARI İÇİN OPTİMİZE EDİLMİŞ CONVOLUTIONAL NETWORK",
    },
    blurb: {
      en: "Optimised a convolutional network for MNIST digit recognition, tuning architecture and training to reach 99.30% test accuracy.",
      tr: "MNIST digit recognition için bir convolutional network'ü optimize ettim; architecture ve training tuning ile %99.30 test accuracy.",
    },
    highlights: {
      en: [
        "TensorFlow/Keras CNN; 99.30% test accuracy.",
        "Architecture and training hyperparameter tuning.",
      ],
      tr: [
        "TensorFlow/Keras CNN; %99.30 test accuracy.",
        "Architecture ve training hyperparameter tuning.",
      ],
    },
    stack: ["TensorFlow", "Keras", "CNN"],
    categories: ["ml"],
    accent: "hot",
    links: { repo: "https://github.com/thefcan/mnist-cnn-experiments" },
  },
]

export const MORE_PROJECTS = [
  "Algorithm Analyzer (Java 17 + React 19)",
  "FEC / ARQ Study (Python)",
  "PatiMatch (Web · UI/UX)",
  "quiz-api · movies · MarketX · bash-script2",
]
