"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { profile } from "@/lib/profile"

/* ------------------------------------------------------------------ */
/* small client hooks                                                  */
/* ------------------------------------------------------------------ */
function useMounted() {
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  return m
}

function usePrefersReducedMotion() {
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

// normalized [-1,1] window pointer, shared, updated lazily
function useGlobalPointer() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const on = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ref.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", on, { passive: true })
    return () => window.removeEventListener("pointermove", on)
  }, [])
  return ref
}

// cheap WebGL feature test so machines without it fall back gracefully
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ */
/* card face — drawn to a 2D canvas, used as a texture                 */
/* ------------------------------------------------------------------ */
const C = {
  paper: "#f4f0e4",
  ink: "#0b0b0d",
  acid: "#c6ff3a",
  hot: "#ff2e88",
  cyan: "#34e2ff",
  amber: "#ffb000",
}

function initials() {
  const a = profile.firstName.trim()[0] ?? "F"
  const b = profile.lastName.trim()[0] ?? "K"
  return (a + (profile.firstName.split(" ")[1]?.[0] ?? "") + b).toUpperCase()
}

function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: string) {
  ctx.fillStyle = C.ink
  let cx = x
  for (let i = 0; cx < x + w; i++) {
    const code = seed.charCodeAt(i % seed.length)
    const bw = ((code % 4) + 1) * 2
    if (i % 2 === 0) ctx.fillRect(cx, y, bw, h)
    cx += bw + 2
  }
}

function drawCardFace(canvas: HTMLCanvasElement, photo: HTMLImageElement | null) {
  const W = 768
  const H = 1075
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, W, H)

  // paper
  ctx.fillStyle = C.paper
  ctx.fillRect(0, 0, W, H)

  // outer thick border
  ctx.strokeStyle = C.ink
  ctx.lineWidth = 16
  ctx.strokeRect(8, 8, W - 16, H - 16)

  // header bar
  ctx.fillStyle = C.acid
  ctx.fillRect(24, 24, W - 48, 104)
  ctx.fillStyle = C.ink
  ctx.fillRect(24, 124, W - 48, 8)
  ctx.fillStyle = C.ink
  ctx.font = "700 38px 'Courier New', monospace"
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"
  ctx.fillText("// ACCESS", 44, 78)
  ctx.textAlign = "right"
  ctx.fillText("ALL·AREAS", W - 44, 78)

  // photo box
  const pb = { x: (W - 372) / 2, y: 168, s: 372 }
  ctx.fillStyle = C.ink
  ctx.fillRect(pb.x - 10, pb.y - 10, pb.s + 20, pb.s + 20)
  if (photo) {
    // cover-fit
    const r = Math.max(pb.s / photo.width, pb.s / photo.height)
    const dw = photo.width * r
    const dh = photo.height * r
    ctx.save()
    ctx.beginPath()
    ctx.rect(pb.x, pb.y, pb.s, pb.s)
    ctx.clip()
    // black & white headshot (matches the brutalist monochrome aesthetic)
    ctx.filter = "grayscale(1) contrast(1.06)"
    // anchor slightly above centre so a portrait's face frames nicely
    ctx.drawImage(photo, pb.x + (pb.s - dw) / 2, pb.y + (pb.s - dh) * 0.34, dw, dh)
    ctx.restore()
  } else {
    ctx.fillStyle = "#161616"
    ctx.fillRect(pb.x, pb.y, pb.s, pb.s)
    ctx.fillStyle = C.acid
    ctx.font = "900 150px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(initials(), W / 2, pb.y + pb.s / 2 - 12)
    ctx.fillStyle = "#8a8a8a"
    ctx.font = "700 22px 'Courier New', monospace"
    ctx.fillText("[ NO PHOTO ]", W / 2, pb.y + pb.s - 36)
  }
  // acid corner notch on photo
  ctx.fillStyle = C.acid
  ctx.beginPath()
  ctx.moveTo(pb.x, pb.y)
  ctx.lineTo(pb.x + 46, pb.y)
  ctx.lineTo(pb.x, pb.y + 46)
  ctx.closePath()
  ctx.fill()

  // name
  ctx.fillStyle = C.ink
  ctx.textAlign = "center"
  ctx.font = "900 70px Arial, sans-serif"
  ctx.fillText(profile.firstName, W / 2, 648)
  ctx.fillText(profile.lastName, W / 2, 724)

  // role strip
  ctx.fillStyle = C.hot
  ctx.fillRect(80, 760, W - 160, 56)
  ctx.fillStyle = "#fff"
  ctx.font = "700 30px 'Courier New', monospace"
  ctx.fillText(profile.roleCard, W / 2, 789)

  // tags
  ctx.fillStyle = C.ink
  ctx.font = "700 26px 'Courier New', monospace"
  ctx.fillText("GAMES // BACKEND // DEVOPS", W / 2, 856)

  // divider
  ctx.fillRect(48, 892, W - 96, 4)

  // chip (amber)
  ctx.fillStyle = C.amber
  ctx.fillRect(56, 916, 96, 74)
  ctx.strokeStyle = C.ink
  ctx.lineWidth = 4
  ctx.strokeRect(56, 916, 96, 74)
  ctx.beginPath()
  ctx.moveTo(56, 953)
  ctx.lineTo(152, 953)
  ctx.moveTo(104, 916)
  ctx.lineTo(104, 990)
  ctx.stroke()

  // barcode + id
  drawBarcode(ctx, 200, 916, W - 256, 50, "FURKANCANKARAFIL2026")
  ctx.fillStyle = C.ink
  ctx.textAlign = "right"
  ctx.font = "700 24px 'Courier New', monospace"
  ctx.fillText(profile.idNo, W - 56, 982)

  // footer url
  ctx.textAlign = "center"
  ctx.font = "700 26px 'Courier New', monospace"
  ctx.fillText(profile.site, W / 2, 1028)
}

function useCardTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas")
    drawCardFace(canvas, null)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.userData.canvas = canvas
    return tex
  }, [])

  useEffect(() => {
    if (!profile.photoUrl) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      drawCardFace(texture.userData.canvas as HTMLCanvasElement, img)
      texture.needsUpdate = true
    }
    img.src = profile.photoUrl
  }, [texture])

  return texture
}

/* ------------------------------------------------------------------ */
/* holographic back layer (shader)                                     */
/* ------------------------------------------------------------------ */
const holoVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`
const holoFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  uniform float uTime;
  vec3 hue(float h){
    vec3 c = abs(mod(h*6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0;
    return clamp(c, 0.0, 1.0);
  }
  void main(){
    float fres = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.0);
    float h = fract(vUv.x*0.7 + vUv.y*0.5 + uTime*0.05 + fres*0.7);
    vec3 col = hue(h);
    col = mix(vec3(0.03,0.03,0.05), col, 0.30 + fres*0.7);
    gl_FragColor = vec4(col, 1.0);
  }
`

/* ------------------------------------------------------------------ */
/* the 3D card mesh                                                    */
/* ------------------------------------------------------------------ */
function CardMesh({ mode, reduced }: { mode: "loading" | "hero"; reduced?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const texture = useCardTexture()
  const pointer = useGlobalPointer()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  const W = 2.3
  const H = 3.22

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    const g = group.current
    if (!g) return
    const d = Math.min(dt, 0.05)
    const k = reduced ? 0.3 : 1 // soften motion when the user prefers reduced motion
    if (mode === "loading") {
      g.rotation.y += d * (reduced ? 0.3 : 1.1)
      g.rotation.x = Math.sin(t * 0.7) * 0.14 * k
      g.position.y = Math.sin(t * 1.3) * 0.06 * k
    } else {
      const amp = reduced ? 0.4 : 1
      const ty = pointer.current.x * 0.6 * amp
      const tx = -pointer.current.y * 0.4 * amp
      g.rotation.y += (ty - g.rotation.y) * 0.07
      g.rotation.x += (tx - g.rotation.x) * 0.07
      g.position.y = Math.sin(t * 1.0) * 0.07 * k
    }
  })

  return (
    <group ref={group}>
      {/* holographic back */}
      <mesh position={[0, 0, -0.09]}>
        <planeGeometry args={[W * 1.07, H * 1.05]} />
        <shaderMaterial vertexShader={holoVertex} fragmentShader={holoFragment} uniforms={uniforms} />
      </mesh>
      {/* black edge / thickness */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[W * 1.015, H * 1.012]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* face */}
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* subtle sheen */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* lanyard hole */}
      <mesh position={[0, H / 2 + 0.16, 0]}>
        <ringGeometry args={[0.07, 0.13, 28]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* static fallback (reduced-motion / pre-mount)                        */
/* ------------------------------------------------------------------ */
export function IdCardStatic({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="mx-auto w-[280px] max-w-full bg-paper text-ink brutal-lg select-none"
        style={{ ["--bs" as string]: "var(--cyan)" }}
      >
        <div className="flex items-center justify-between border-b-[3px] border-black bg-acid px-3 py-2 font-mono text-xs font-bold">
          <span>// ACCESS</span>
          <span>ALL·AREAS</span>
        </div>
        <div className="p-4">
          <div className="relative mx-auto aspect-square w-44 overflow-hidden border-[3px] border-black bg-[#161616]">
            {profile.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="absolute inset-0 h-full w-full object-cover grayscale"
                style={{ objectPosition: "50% 28%" }}
              />
            ) : (
              <>
                <div className="absolute inset-0 grid place-items-center font-black text-5xl text-acid">{initials()}</div>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-neutral-400">[ NO PHOTO ]</span>
              </>
            )}
            <div className="absolute left-0 top-0 h-0 w-0 border-l-[26px] border-t-[26px] border-l-acid border-t-transparent" />
          </div>
          <div className="mt-3 text-center font-black leading-none">
            <div className="text-2xl">{profile.firstName}</div>
            <div className="text-2xl">{profile.lastName}</div>
          </div>
          <div className="mt-2 bg-hot py-1 text-center font-mono text-xs font-bold text-white">{profile.roleCard}</div>
          <div className="mt-2 text-center font-mono text-[10px] font-bold">GAMES // BACKEND // DEVOPS</div>
          <div className="mt-3 border-t-[3px] border-black pt-2 text-center font-mono text-[10px] font-bold">
            {profile.site}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* public component                                                    */
/* ------------------------------------------------------------------ */
export function IdCard3D({
  mode = "hero",
  className,
}: {
  mode?: "loading" | "hero"
  className?: string
}) {
  const mounted = useMounted()
  const reduced = usePrefersReducedMotion()
  const webglRef = useRef<boolean | undefined>(undefined)
  if (webglRef.current === undefined && typeof window !== "undefined") {
    webglRef.current = hasWebGL()
  }

  // SSR / pre-mount, or no WebGL → graceful static card (page still animates via CSS)
  if (!mounted || webglRef.current === false) {
    return <IdCardStatic className={className} />
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <CardMesh mode={mode} reduced={reduced} />
      </Canvas>
    </div>
  )
}

export default IdCard3D
