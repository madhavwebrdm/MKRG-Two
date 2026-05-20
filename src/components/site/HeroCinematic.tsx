import { useEffect, useRef, useState, type ReactNode } from "react";
import hero from "@/assets/hero-recycling.jpg";

export function HeroCinematic({ children, image = hero }: { children: ReactNode; image?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          // progress: 0 at top of viewport, 1 once fully scrolled past
          const p = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
          setY(p);
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Derived transforms
  const bgY = y * 160;          // background drifts up slower
  const fgY = y * -60;          // foreground drifts opposite
  const blurAmt = 2 + y * 10;
  const overlay = 0.6 + y * 0.25;
  const tiltX = (1 - y) * 6;    // subtle 3D recline that flattens on scroll
  const scale = 1 + y * 0.08;

  return (
    <section ref={ref} className="relative hero-3d overflow-hidden min-h-[100svh]">
      {/* Parallax image bg */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: `translate3d(0, ${bgY}px, 0) scale(${scale})`,
          transition: "transform 120ms linear",
        }}
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: `blur(${blurAmt * 0.15}px) saturate(105%)` }}
        />
        {/* Gradient overlays for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              `linear-gradient(180deg, color-mix(in oklab, var(--charcoal) ${overlay * 100}%, transparent) 0%, color-mix(in oklab, var(--charcoal) ${Math.min(0.9,(overlay + 0.2)) * 100}%, transparent) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-charcoal)]/85 via-[color:var(--color-charcoal)]/30 to-transparent" />
      </div>

      {/* Floating 3D blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full float-slow"
          style={{
            background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--eco) 80%, transparent), transparent 65%)",
            filter: "blur(40px)",
            transform: `translate3d(0, ${y * -120}px, 0)`,
          }}
        />
        <div
          className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full float-med"
          style={{
            background: "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--bluemist) 75%, transparent), transparent 70%)",
            filter: "blur(60px)",
            transform: `translate3d(0, ${y * 180}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full float-fast"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--eco-soft) 65%, transparent), transparent 70%)",
            filter: "blur(70px)",
            transform: `translate3d(0, ${y * -60}px, 0)`,
          }}
        />
        {/* Subtle rotating ring */}
        <div
          className="absolute right-12 bottom-16 h-72 w-72 rounded-full border border-white/15 spin-slow hidden lg:block"
          style={{ transform: `rotate(${y * 90}deg)` }}
        />
        <div
          className="absolute right-24 bottom-28 h-56 w-56 rounded-full border border-white/10 hidden lg:block"
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* Foreground content with reverse parallax + slight 3D tilt */}
      <div
        className="tilt-in"
        style={{
          transform: `translate3d(0, ${fgY}px, 0) rotateX(${tiltX}deg)`,
          transition: "transform 120ms linear",
        }}
      >
        {children}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="block h-10 w-px bg-white/40 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-4 bg-white animate-[scrollCue_1.6s_ease-in-out_infinite]" />
        </span>
      </div>
      <style>{`@keyframes scrollCue { 0%{transform:translateY(-100%)} 100%{transform:translateY(250%)} }`}</style>
    </section>
  );
}
