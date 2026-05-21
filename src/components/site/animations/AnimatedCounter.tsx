import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

/**
 * Counts a number from 0 → target the first time it scrolls into view.
 * Uses GSAP for the easing curve and ScrollTrigger for the entry signal.
 */
export function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className = "",
  decimals,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      const dec = decimals ?? (to % 1 !== 0 ? 1 : 0);

      const tween = gsap.to(obj, {
        v: to,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          const value = dec > 0 ? obj.v.toFixed(dec) : Math.round(obj.v).toLocaleString();
          el.textContent = `${prefix}${value}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        paused: true,
      });

      // Kick after mount so SSR/hydration doesn't fight it
      tween.play();
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref as React.MutableRefObject<HTMLElement>, dependencies: [to] },
  );

  // Render the final value as initial text — animation will overwrite, but avoids layout shift
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {`${prefix}0${suffix}`}
    </span>
  );
}
