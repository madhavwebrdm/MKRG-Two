import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mounts Lenis + GSAP ScrollTrigger and wires up declarative animations via data attributes.
 *
 * Available data attributes (auto-applied site-wide):
 *   data-anim="rise"         — fade + rise from below
 *   data-anim="rise-left"    — fade + slide from left
 *   data-anim="rise-right"   — fade + slide from right
 *   data-anim="scale"        — fade + scale up
 *   data-anim="stagger"      — stagger direct children rising
 *   data-anim="split"        — word-by-word reveal of element text
 *   data-anim="zoom"         — image zoom-out over scroll (scrub)
 *   data-parallax="0.2"      — vertical parallax with the given speed
 *   data-mask                — clip-path mask reveal from bottom
 *   data-draw-path           — animate svg <path> from 0 → full length on scroll
 *   data-pin                 — pin section while content (children) translates upward
 *   data-bg-shift            — scrub background-position-y on the element
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      // ─ Fade + rise variants ──────────────────────────────────────────────
      const riseConfigs: Array<[string, gsap.TweenVars]> = [
        ["[data-anim='rise']", { y: 60, opacity: 0 }],
        ["[data-anim='rise-left']", { x: -80, opacity: 0 }],
        ["[data-anim='rise-right']", { x: 80, opacity: 0 }],
        ["[data-anim='scale']", { scale: 0.9, opacity: 0 }],
      ];
      riseConfigs.forEach(([sel, from]) => {
        gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
          gsap.from(el, {
            ...from,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });

      // ─ Staggered children rise ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-anim='stagger']").forEach((el) => {
        gsap.from(el.children, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      // ─ Word-by-word headline reveal ──────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-anim='split']").forEach((el) => {
        if (el.dataset.splitDone) return;
        const text = el.textContent || "";
        el.innerHTML = text
          .split(/(\s+)/)
          .map((w) =>
            /^\s+$/.test(w)
              ? w
              : `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block will-change-transform" data-word>${w}</span></span>`,
          )
          .join("");
        el.dataset.splitDone = "1";
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ─ Parallax media ────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ─ Image zoom-out on scrub ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-anim='zoom']").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // ─ Mask reveal (clip-path inset) ─────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          },
        );
      });

      // ─ SVG path draw on scroll ───────────────────────────────────────────
      gsap.utils.toArray<SVGPathElement>("[data-draw-path]").forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      });

      // ─ Background position scrub ─────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-bg-shift]").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: "30%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // ─ Pin block while inner content rises ───────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((wrapper) => {
        const inner = wrapper.querySelector<HTMLElement>("[data-pin-inner]");
        if (!inner) return;
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: () => `+=${wrapper.offsetHeight - window.innerHeight}`,
          pin: inner,
          pinSpacing: false,
        });
      });
    });

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    // Refresh after the first paint cycle so heights settle (custom fonts/images)
    const tid = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(tid);
      ro.disconnect();
      ctx.revert();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);
  return null;
}
