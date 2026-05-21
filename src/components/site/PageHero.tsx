import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SplitText } from "@/components/site/animations/SplitText";
import { ScrollReveal } from "@/components/site/animations/ScrollReveal";

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
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 140]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const blobY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const hasMedia = !!(image || video);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${
        hasMedia ? "min-h-[78vh] flex items-end pb-20 pt-40 text-white" : "pt-24 lg:pt-32 pb-20"
      }`}
    >
      {hasMedia && (
        <>
          <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
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
          </motion.div>
          <motion.div
            style={{ y: blobY }}
            className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full -z-10 float-slow"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "radial-gradient(circle, color-mix(in oklab, var(--eco) 70%, transparent), transparent 65%)",
                filter: "blur(50px)",
              }}
            />
          </motion.div>
        </>
      )}
      <motion.div
        style={hasMedia ? { y: contentY, opacity: contentOpacity } : undefined}
        className="container-tight grid lg:grid-cols-12 gap-12 items-end relative"
      >
        <div className="lg:col-span-8">
          <ScrollReveal>
            <p className={`eyebrow ${hasMedia ? "text-white/70" : ""}`}>
              <span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> {eyebrow}
            </p>
          </ScrollReveal>
          <h1 className={`display mt-6 text-5xl md:text-7xl lg:text-8xl leading-[0.95] ${hasMedia ? "text-white" : ""}`}>
            <SplitText as="span" mode="word" delay={0.1}>{title}</SplitText>
          </h1>
        </div>
        {lead && (
          <ScrollReveal delay={0.4} className="lg:col-span-4">
            <p className={`text-lg leading-relaxed ${hasMedia ? "text-white/80" : "text-muted-foreground"}`}>
              {lead}
            </p>
          </ScrollReveal>
        )}
      </motion.div>
    </section>
  );
}
