import { useEffect } from "react";
import Lenis from "lenis";

/** Mounts Lenis for buttery-smooth, momentum-based page scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    let id = 0;
    function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}
