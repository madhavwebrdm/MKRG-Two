import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Mounts Lenis + GSAP ScrollTrigger for buttery scroll & premium animations. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    // Drive GSAP ScrollTrigger off Lenis' scroll
    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Generic premium animations applied to any element with [data-anim]
    const ctx = gsap.context(() => {
      // Fade + rise
      gsap.utils.toArray<HTMLElement>("[data-anim='rise']").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      // Staggered children rise
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
      // Word-by-word headline reveal
      gsap.utils.toArray<HTMLElement>("[data-anim='split']").forEach((el) => {
        if (el.dataset.splitDone) return;
        const html = el.innerHTML;
        // wrap each word
        const text = el.textContent || "";
        el.innerHTML = text
          .split(/(\s+)/)
          .map((w) =>
            /^\s+$/.test(w)
              ? w
              : `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block will-change-transform" data-word>${w}</span></span>`
          )
          .join("");
        el.dataset.splitDone = "1";
        void html;
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      // Parallax media
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
    });

    // Re-measure after fonts/images settle
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      ctx.revert();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);
  return null;
}
