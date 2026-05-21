import { motion, useScroll, useSpring } from "motion/react";

/** Slim eco-coloured progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.25,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-[color:var(--color-eco)] via-[color:var(--color-eco-soft)] to-[color:var(--color-bluemist)]"
    />
  );
}
