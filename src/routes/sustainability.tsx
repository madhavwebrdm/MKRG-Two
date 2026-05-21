import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import {
  AnimatedCounter,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  SplitText,
  TiltCard,
} from "@/components/site/animations";
import sust from "@/assets/sustainability.jpg";
import { useCmsList } from "@/lib/cms";
import { impactMetricsQuery, type ImpactMetric } from "@/lib/sanity";
import { motion } from "motion/react";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Madhav KRG" },
      { name: "description", content: "Our ESG initiatives, carbon reduction metrics, SDG alignment and circular-economy commitments." },
      { property: "og:title", content: "Sustainability — Madhav KRG" },
      { property: "og:description", content: "Measurable ESG outcomes and SDG-aligned commitments." },
      { property: "og:image", content: "/og-sustainability.jpg" },
    ],
  }),
  component: Sustainability,
});

const FALLBACK_METRICS: ImpactMetric[] = [
  { _id: "1", value: 184000, suffix: " t", label: "CO₂e avoided", group: "sustainability" },
  { _id: "2", value: 2400000, suffix: "+", label: "Tonnes recovered", group: "sustainability" },
  { _id: "3", value: 96, suffix: "%", label: "Recovery rate", group: "sustainability" },
  { _id: "4", value: 12000, suffix: "+", label: "Green jobs", group: "sustainability" },
];

function Sustainability() {
  const METRICS = useCmsList<ImpactMetric>("impactSustainability", impactMetricsQuery, FALLBACK_METRICS, { group: "sustainability" });
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="ESG outcomes, measured at industrial scale."
        lead="Our sustainability programme is built around four commitments: carbon reduction, circular materials, equitable green jobs and transparent reporting."
        image={sust}
      />

      <section className="py-32">
        <div className="container-tight">
          <ScrollReveal>
            <p className="eyebrow">Impact this year</p>
          </ScrollReveal>
          <ScrollStagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12" staggerChildren={0.1}>
            {METRICS.map((x) => (
              <ScrollStaggerItem key={x._id}>
                <div className="border-t border-border pt-8">
                  <p className="display text-5xl md:text-6xl">
                    <AnimatedCounter to={x.value} suffix={x.suffix ?? ""} />
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">{x.label}</p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight grid lg:grid-cols-12 gap-12">
          <ScrollReveal direction="right" className="lg:col-span-5">
            <p className="eyebrow">Circular Model</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              <SplitText as="span" mode="word">A loop, not a line.</SplitText>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our model designs out waste at every step — from material recovery to refurbishment, remanufacturing and re-entry into the supply chain.
            </p>
          </ScrollReveal>
          <ScrollStagger className="lg:col-span-7 grid sm:grid-cols-2 gap-6" staggerChildren={0.08}>
            {["Reduce", "Reuse", "Recover", "Regenerate"].map((p, i) => (
              <ScrollStaggerItem key={p}>
                <TiltCard maxTilt={5} className="h-full">
                  <div className="rounded-2xl bg-card border border-border p-8 h-full">
                    <p className="display text-6xl text-[color:var(--color-eco)]">0{i + 1}</p>
                    <h3 className="display mt-6 text-2xl">{p}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      A continuous loop where every output becomes the next input.
                    </p>
                  </div>
                </TiltCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <ScrollReveal>
            <p className="eyebrow">SDG Alignment</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              <SplitText as="span" mode="word">Our work supports nine UN Sustainable Development Goals.</SplitText>
            </h2>
          </ScrollReveal>
          <ScrollStagger
            className="mt-16 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4"
            staggerChildren={0.05}
            amount={0.1}
          >
            {[6, 7, 8, 9, 11, 12, 13, 14, 15].map((n) => (
              <ScrollStaggerItem key={n}>
                <motion.div
                  whileHover={{ rotate: [-2, 2, -1, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square rounded-xl bg-gradient-to-br from-[color:var(--color-eco)] to-[color:var(--color-bluemist)] grid place-items-center text-white display text-2xl cursor-pointer shadow-lg shadow-[color:var(--color-eco)]/10"
                >
                  SDG {n}
                </motion.div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>
    </>
  );
}
