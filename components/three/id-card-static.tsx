// Static (non-WebGL) ID card. Lives in its own module so importing it does
// NOT pull three.js/R3F into the bundle — id-card-3d.tsx is reached only via
// next/dynamic, keeping the ~900KB three chunk out of the critical path.

import { profile } from "@/lib/profile"

export function initials() {
  const a = profile.firstName.trim()[0] ?? "F"
  const b = profile.lastName.trim()[0] ?? "K"
  return (a + (profile.firstName.split(" ")[1]?.[0] ?? "") + b).toUpperCase()
}

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
