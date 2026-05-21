import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  innerClassName?: string;
  speed?: number;
  scale?: number;
  rounded?: string;
  overlay?: boolean;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}

/**
 * Image with smooth scroll-driven vertical parallax + subtle scale.
 * Inner image is over-scaled so parallax stays masked within its container.
 */
export function ParallaxImage({
  src,
  alt = "",
  className = "",
  innerClassName = "",
  speed = 0.2,
  scale = 1.18,
  rounded = "rounded-2xl",
  overlay = false,
  style,
  loading = "lazy",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yPct = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`${-speed * 50}%`, `${speed * 50}%`],
  );
  const dynScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale * 1.02, scale, scale * 1.02]);

  return (
    <div ref={ref} style={style} className={`relative overflow-hidden ${rounded} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={{ y: yPct, scale: dynScale }}
        className={`h-full w-full object-cover ${innerClassName}`}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      )}
    </div>
  );
}

/** Wraps arbitrary children with a scroll-driven Y parallax. */
export function Parallax({
  children,
  speed = 0.2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [speed * 60, -speed * 60]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
