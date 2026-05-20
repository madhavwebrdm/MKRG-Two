import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Default visible; only hide-then-reveal for items below the initial fold.
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Already in / above viewport — stay visible
    if (r.top < vh * 0.95) return;
    // Hide first, then animate in on intersection
    setSeen(false);
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setSeen(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${armed ? "reveal" : ""} ${seen ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
