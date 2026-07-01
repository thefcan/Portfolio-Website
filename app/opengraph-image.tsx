import { ImageResponse } from "next/og"

// Auto-wired by the App Router into both openGraph.images and twitter.images.
// A neo-brutalist "access card" preview that matches the site's identity, so
// sharing the link on LinkedIn / X / WhatsApp shows an on-brand card.

export const alt =
  "Furkan Can Karafil — Computer Engineer · Games + Backend/DevOps"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#0e0e11"
const INK2 = "#16161a"
const PAPER = "#f4f0e4"
const ACID = "#c6ff3a"
const HOT = "#ff2e88"
const MUTED = "#9a9aa3"

// pull just the glyphs we render from Google Fonts (small, fast subset)
const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ·/+.-#>&()"

async function loadFont(family: string, weight: number) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(GLYPHS)}`
    const css = await (
      await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    ).text()
    const src = css.match(/src: url\((.+?)\) format/)
    if (!src) return null
    const buf = await (await fetch(src[1])).arrayBuffer()
    return buf
  } catch {
    return null
  }
}

const Chip = ({ label }: { label: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      border: `3px solid ${PAPER}`,
      background: INK2,
      color: PAPER,
      padding: "8px 18px",
      fontFamily: "Mono",
      fontSize: 26,
      fontWeight: 700,
      boxShadow: `5px 5px 0 ${ACID}`,
    }}
  >
    {label}
  </div>
)

export default async function Image() {
  const [grotesk, mono700, mono500] = await Promise.all([
    loadFont("Space+Grotesk", 700),
    loadFont("JetBrains+Mono", 700),
    loadFont("JetBrains+Mono", 500),
  ])

  const fonts = [
    grotesk && { name: "Grotesk", data: grotesk, weight: 700 as const, style: "normal" as const },
    mono700 && { name: "Mono", data: mono700, weight: 700 as const, style: "normal" as const },
    mono500 && { name: "Mono", data: mono500, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 64,
          fontFamily: "Mono",
          color: PAPER,
          position: "relative",
        }}
      >
        {/* neon frame accent */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            right: 22,
            bottom: 22,
            border: `4px solid ${INK2}`,
          }}
        />

        {/* top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Mono",
            fontWeight: 500,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 18, height: 18, background: ACID, marginRight: 14 }} />
            <span style={{ color: MUTED, letterSpacing: 2 }}>AVAILABLE FOR WORK</span>
          </div>
          <span style={{ color: ACID }}>furkankarafil.me</span>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Grotesk",
              fontWeight: 700,
              fontSize: 108,
              lineHeight: 1.02,
            }}
          >
            <span style={{ color: PAPER }}>FURKAN CAN</span>
            <span style={{ color: ACID }}>KARAFIL</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 26 }}>
            <div
              style={{
                display: "flex",
                background: HOT,
                color: INK,
                border: `3px solid ${INK}`,
                boxShadow: `6px 6px 0 ${PAPER}`,
                padding: "10px 22px",
                fontFamily: "Mono",
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: 2,
              }}
            >
              COMPUTER ENGINEER
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "#cfcfd4",
              fontFamily: "Mono",
              fontWeight: 500,
              fontSize: 30,
            }}
          >
            Games (Unity / C#)  +  Backend & DevOps (Go / Docker / K8s)
          </div>
        </div>

        {/* bottom chips */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 16 }}>
            <Chip label="Unity" />
            <Chip label="Go" />
            <Chip label="Docker" />
            <Chip label="Kubernetes" />
            <Chip label="RAG" />
          </div>
          <span style={{ display: "flex", color: MUTED, fontFamily: "Mono", fontWeight: 700, fontSize: 24 }}>
            ID · 2026
          </span>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  )
}
