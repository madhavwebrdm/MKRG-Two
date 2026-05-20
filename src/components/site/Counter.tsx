import { useEffect, useRef, useState } from "react";

/**
 * Rolling-digit counter.
 * Each digit slides from 0 → its target like an odometer.
 * The layout is locked to the final formatted width so commas and digits
 * never shift horizontally during the animation.
 */
export function Counter({
  to,
  suffix = "",
  duration = 2200,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  // Build a stable layout matching the final formatted string.
  const targetStr = Math.round(to).toLocaleString();
  const numDigits = Math.round(to).toString().length;
  const padded = Math.round(val).toString().padStart(numDigits, "0");
  let pi = 0;
  const layout: { kind: "digit" | "sep"; ch: string }[] = [];
  for (const tch of targetStr) {
    if (tch === ",") {
      layout.push({ kind: "sep", ch: tch });
    } else {
      layout.push({ kind: "digit", ch: padded[pi++] ?? "0" });
    }
  }

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      <span className="inline-flex">
        {layout.map((slot, i) =>
          slot.kind === "sep" ? (
            <span key={`s-${i}`}>{slot.ch}</span>
          ) : (
            <Digit key={`d-${i}`} value={parseInt(slot.ch, 10)} />
          ),
        )}
      </span>
      {suffix ? <span style={{ whiteSpace: "pre" }}>{suffix}</span> : null}
    </span>
  );
}

function Digit({ value }: { value: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: "1em", width: "0.62em", lineHeight: 1 }}
    >
      <span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        style={{
          transform: `translateY(-${value}em)`,
          transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
          lineHeight: 1,
        }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} style={{ height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}
