import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "div" | "a";
  onClick?: () => void;
}

/** Button that magnetically tracks the cursor on hover. */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });

  // Subtle inner counter-translate for label
  const ix = useTransform(x, (v) => v * 0.4);
  const iy = useTransform(y, (v) => v * 0.4);

  const onMove = (e: MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const MotionTag = motion[as] as typeof motion.div;
  const MotionInner = motion.span;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y }}
      className={`relative inline-flex ${className}`}
    >
      <MotionInner style={{ x: ix, y: iy }} className="inline-flex w-full items-center justify-center gap-2">
        {children}
      </MotionInner>
    </MotionTag>
  );
}
