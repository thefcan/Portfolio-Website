# Portfolio Website — furkankarafil.me

Neo-brutalist / retro-arcade portfolio. Next.js 16 (App Router, Turbopack) +
React 19 + Tailwind v4 + React Three Fiber. Package manager: **pnpm**.
Deployed on Vercel — every push to `main` auto-deploys to https://furkankarafil.me.

## Working agreement

- **Communicate in Turkish** (code, commits and comments stay in English).
- Flow: **one improvement = one commit** → the user reviews it on the live
  site → revert from git history if disliked. Keep commits independently
  revertable.
- The user pushes to `main` himself; prepare commits, don't push.
- **NEVER touch or commit `todo.md`** — it's the user's untracked scratch
  file. Always `git add` explicit paths, never `git add .`/`-A`.
- CV/portfolio PDF link updates are the user's job — don't do them.

## Performance guardrails (hard-won — don't regress)

Lighthouse (prod build): **mobile 92 / desktop 97, a11y 100, seo 100**.

- three.js must stay OUT of the critical path. `IdCard3D` is reached only
  via `next/dynamic` and mounts on the visitor's **first interaction**
  (`useFirstInteraction` in `hero-section.tsx`). The boot screen card is
  pure CSS (`BootCard`). Never import from `components/three/id-card-3d.tsx`
  statically — use `components/three/id-card-static.tsx` for the static card.
- Don't add eager WebGL/canvas-heavy components (animated backgrounds like
  Aurora/Particles would undo this). Prefer CSS or framer-motion effects;
  avoid adding gsap (framer-motion is already in the bundle).

## Conventions

- Every user-facing string is bilingual EN/TR via `lib/i18n.ts` (`LText`,
  `t()`); data lives in `lib/profile.ts` / `lib/projects.ts` / `lib/resume.ts`.
- `prefers-reduced-motion` must be honoured: `usePrefersReducedMotion` +
  `revealClass` for JS reveals, the `@media` block in `app/globals.css` for
  CSS loops. New animations need a reduced-motion story.
- Brutalist styling: thick black borders + hard neon shadows via `.brutal*`
  classes and the `--bs` CSS var; palette tokens in `app/globals.css`
  (`--acid`, `--hot`, `--cyan`, `--violet`, `--amber`).
- shadcn MCP + `@react-bits` registry are configured (`components.json`,
  `.mcp.json`). Install React Bits with the `-TS-TW` variants, e.g.
  `pnpm dlx shadcn@latest add @react-bits/GlitchText-TS-TW`.
