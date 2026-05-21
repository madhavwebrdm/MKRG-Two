import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

/**
 * Vertical process timeline with an SVG line that draws itself as the user scrolls,
 * and step nodes that "ignite" once the line reaches them.
 */
export function ProcessTimeline({ steps, className = "" }: ProcessTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  return (
    <ol ref={ref} className={`relative ${className}`}>
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-px"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--color-border)" strokeWidth="0.4" />
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="var(--color-eco)"
          strokeWidth="0.6"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>

      {steps.map((step, i) => (
        <TimelineNode key={step.id} index={i} step={step} scrollY={scrollYProgress} total={steps.length} />
      ))}
    </ol>
  );
}

function TimelineNode({
  step,
  index,
  total,
  scrollY,
}: {
  step: TimelineStep;
  index: number;
  total: number;
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const t = total === 1 ? 0 : index / (total - 1);
  // Node lights up just before the line passes it.
  const activation = useTransform(scrollY, [Math.max(0, t - 0.05), Math.min(1, t + 0.05)], [0, 1]);
  const bg = useTransform(activation, (v) =>
    `color-mix(in oklab, var(--color-eco) ${v * 100}%, var(--background))`,
  );
  const borderColor = useTransform(activation, (v) =>
    `color-mix(in oklab, var(--color-eco) ${v * 100}%, var(--color-border))`,
  );
  const textColor = useTransform(activation, (v) => (v > 0.5 ? "#fff" : "var(--foreground)"));
  const dotScale = useTransform(activation, [0, 1], [1, 1.18]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative pl-12 pb-12 last:pb-0"
    >
      <motion.span
        style={{ background: bg, borderColor, color: textColor, scale: dotScale }}
        className="absolute -left-[14px] top-0.5 grid h-9 w-9 place-items-center rounded-full border text-[11px] font-medium"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <h3 className="display text-xl md:text-2xl">{step.title}</h3>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-md">
        {step.description}
      </p>
    </motion.li>
  );
}
