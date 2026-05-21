import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import hero from "@/assets/hero-recycling.jpg";

export function HeroCinematic({ children, image = hero }: { children: ReactNode; image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // All transforms are zeroed-out under reduced motion
  const z = (v: number) => (reduced ? 0 : v);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, z(160)]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, z(-80)]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + z(0.08)]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", `${z(3)}px`]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.88]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, z(110)]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, z(-160)]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, z(220)]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, z(-80)]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative hero-3d overflow-hidden min-h-[100svh]">
      {/* Parallax image background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY, scale, filter: useTransform(blur, (b) => `blur(${b}) saturate(110%)`) }}
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              overlayOpacity,
              (o) =>
                `linear-gradient(180deg, color-mix(in oklab, var(--charcoal) ${o * 100}%, transparent) 0%, color-mix(in oklab, var(--charcoal) ${Math.min(0.95, o + 0.2) * 100}%, transparent) 100%)`,
            ),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-charcoal)]/85 via-[color:var(--color-charcoal)]/30 to-transparent" />
      </motion.div>

      {/* Floating ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <motion.div
          style={{ y: blob1Y }}
          className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full float-slow"
          // Background as inline style for the radial mix
          // Stays GPU-cheap, blob is large & blurred
          // (filter included via class via floatY util)
          // eslint-disable-next-line react/forbid-dom-props
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--eco) 80%, transparent), transparent 65%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: blob2Y }}
          className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full float-med"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--bluemist) 75%, transparent), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: blob3Y }}
          className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full float-fast"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--eco-soft) 65%, transparent), transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        </motion.div>

        {/* Slow rotating ring — reinforces circular brand */}
        <motion.div
          style={{ rotate: ringRotate }}
          className="absolute right-12 bottom-16 h-72 w-72 rounded-full border border-white/15 spin-slow hidden lg:block"
        />
        <div className="absolute right-24 bottom-28 h-56 w-56 rounded-full border border-white/10 hidden lg:block" />
      </div>

      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* Foreground content with reverse parallax */}
      <motion.div style={{ y: fgY, opacity: contentOpacity }} className="relative z-10">
        {children}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <span className="block h-10 w-px bg-white/40 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-4 bg-white animate-[scrollCue_1.6s_ease-in-out_infinite]" />
        </span>
      </motion.div>
      <style>{`@keyframes scrollCue { 0%{transform:translateY(-100%)} 100%{transform:translateY(250%)} }`}</style>
    </section>
  );
}
