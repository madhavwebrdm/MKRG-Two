import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Mode = "word" | "char" | "line";

interface SplitTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  y?: number;
}

const renderSplit = (text: string, mode: Mode) => {
  if (mode === "char") {
    return Array.from(text).map((ch, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom"
        style={{ lineHeight: "1.1em" }}
      >
        <span data-split className="inline-block will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      </span>
    ));
  }
  // word & line — wrap words; "line" mode is achieved via wrapping + scroll natural line breaks.
  return text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) ? (
      <span key={i}>{part}</span>
    ) : (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom"
        style={{ lineHeight: "1.1em" }}
      >
        <span data-split className="inline-block will-change-transform">
          {part}
        </span>
      </span>
    ),
  );
};

/** Scroll-triggered word/character reveal driven by GSAP. */
export function SplitText({
  children,
  as: Tag = "span",
  className = "",
  mode = "word",
  delay = 0,
  duration = 1,
  stagger = 0.055,
  start = "top 85%",
  once = true,
  y = 110,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const text = typeof children === "string" ? children : "";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !text) return;
      const items = el.querySelectorAll<HTMLElement>("[data-split]");
      if (!items.length) return;

      gsap.set(items, { yPercent: y, opacity: 0 });
      gsap.to(items, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power4.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    },
    { scope: ref as React.MutableRefObject<HTMLElement>, dependencies: [text] },
  );

  return (
    <Tag ref={ref} className={className}>
      {text ? renderSplit(text, mode) : children}
    </Tag>
  );
}
