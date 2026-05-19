import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
  video?: string;
  poster?: string;
};

export function PageHero({ eyebrow, title, lead, image, video, poster }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const r = el.getBoundingClientRect();
          setY(Math.min(1, Math.max(0, -r.top / (r.height || 1))));
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const hasMedia = !!(image || video);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${hasMedia ? "min-h-[78vh] flex items-end pb-20 pt-40 text-white" : "pt-24 lg:pt-32 pb-20"}`}
    >
      {hasMedia && (
        <>
          <div
            className="absolute inset-0 -z-10"
            style={{ transform: `translate3d(0, ${y * 120}px, 0) scale(${1 + y * 0.06})`, transition: "transform 120ms linear" }}
          >
            {video ? (
              <video
                src={video}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={image} alt="" className="h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-charcoal)]/70 via-[color:var(--color-charcoal)]/50 to-[color:var(--color-charcoal)]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-charcoal)]/70 via-transparent to-transparent" />
          </div>
          <div
            className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full -z-10 float-slow"
            style={{
              background: "radial-gradient(circle, color-mix(in oklab, var(--eco) 70%, transparent), transparent 65%)",
              filter: "blur(50px)",
            }}
            aria-hidden
          />
        </>
      )}
      <div className="container-tight grid lg:grid-cols-12 gap-12 items-end relative">
        <div className="lg:col-span-8">
          <Reveal>
            <p className={`eyebrow ${hasMedia ? "text-white/70" : ""}`}>
              <span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className={`display mt-6 text-5xl md:text-7xl lg:text-8xl leading-[0.95] ${hasMedia ? "text-white" : ""}`}>{title}</h1>
          </Reveal>
        </div>
        {lead && (
          <Reveal delay={220} className="lg:col-span-4">
            <p className={`text-lg leading-relaxed ${hasMedia ? "text-white/80" : "text-muted-foreground"}`}>{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
