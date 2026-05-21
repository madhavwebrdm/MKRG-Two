import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    case "scale": return { scale: 0.92 };
    case "fade": return {};
  }
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 60,
  once = true,
  amount = 0.15,
  className = "",
  as = "div",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, ...offsetFor(direction, distance) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 0.61, 0.36, 1],
          },
        },
      };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its direct ScrollReveal-aware children. */
export function ScrollStagger({
  children,
  className = "",
  staggerChildren = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STAGGER_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function ScrollStaggerItem({
  children,
  className = "",
  variants = STAGGER_ITEM_VARIANTS,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
