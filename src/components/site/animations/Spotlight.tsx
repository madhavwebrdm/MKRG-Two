import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Section wrapper that follows the mouse with a soft coloured spotlight.
 * Falls back gracefully when reduced motion is requested.
 */
export function Spotlight({
  children,
  className = "",
  size = 480,
  color = "color-mix(in oklab, var(--color-eco) 28%, transparent)",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-0 rounded-full blur-3xl"
          style={{
            x,
            y,
            width: size,
            height: size,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle, ${color}, transparent 65%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
