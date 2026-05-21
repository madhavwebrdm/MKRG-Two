import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
  /** Scroll-velocity reactivity. 0 = none, 1 = nudge with scroll velocity. */
  scrollReact?: number;
}

/**
 * Infinite marquee row driven by GSAP. Scroll velocity nudges the speed,
 * giving a satisfying "react to scroll" feel without breaking the loop.
 */
export function Marquee({
  items,
  speed = 38,
  className = "",
  itemClassName = "",
  separator = "·",
  scrollReact = 1,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // We duplicate items in JSX; animate translateX -50% for seamless loop.
      const tween = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        },
      );
      tweenRef.current = tween;

      if (scrollReact > 0) {
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            const target = 1 + Math.min(3, Math.abs(v) / 800) * scrollReact;
            const dir = v >= 0 ? 1 : -1;
            gsap.to(tween, {
              timeScale: target * dir,
              duration: 0.4,
              overwrite: true,
            });
          },
        });
        return () => {
          st.kill();
        };
      }
    },
    { scope: ref as React.MutableRefObject<HTMLElement>, dependencies: [items.length, speed] },
  );

  // Reset on unmount to avoid leaks
  useEffect(
    () => () => {
      tweenRef.current?.kill();
    },
    [],
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-12 pr-12">
            {items.map((it, i) => (
              <span key={`${dup}-${i}`} className={`inline-flex items-center gap-12 ${itemClassName}`}>
                <span>{it}</span>
                <span aria-hidden className="text-[color:var(--color-eco-soft)]/70">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
