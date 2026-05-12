import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import sust from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Vertura" },
      { name: "description", content: "Our ESG initiatives, carbon reduction metrics, SDG alignment and circular-economy commitments." },
      { property: "og:title", content: "Sustainability — Vertura" },
      { property: "og:description", content: "Measurable ESG outcomes and SDG-aligned commitments." },
      { property: "og:image", content: "/og-sustainability.jpg" },
    ],
  }),
  component: Sustainability,
});

function Sustainability() {
  return (
    <>
      <PageHero eyebrow="Sustainability" title="ESG outcomes, measured at industrial scale." lead="Our sustainability programme is built around four commitments: carbon reduction, circular materials, equitable green jobs and transparent reporting." image={sust} />

      <section className="py-32">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow">Impact this year</p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { n: 184000, s: " t", l: "CO₂e avoided" },
              { n: 2400000, s: "+", l: "Tonnes recovered" },
              { n: 96, s: "%", l: "Recovery rate" },
              { n: 12000, s: "+", l: "Green jobs" },
            ].map((x) => (
              <Reveal key={x.l}>
                <div className="border-t border-border pt-8">
                  <p className="display text-5xl md:text-6xl"><Counter to={x.n} suffix={x.s} /></p>
                  <p className="mt-4 text-sm text-muted-foreground">{x.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Circular Model</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">A loop, not a line.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Our model designs out waste at every step — from material recovery to refurbishment, remanufacturing and re-entry into the supply chain.</p>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {["Reduce","Reuse","Recover","Regenerate"].map((p, i) => (
              <Reveal key={p} delay={i*80}>
                <div className="rounded-2xl bg-card border border-border p-8 h-full">
                  <p className="display text-6xl text-[color:var(--color-eco)]">0{i+1}</p>
                  <h3 className="display mt-6 text-2xl">{p}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">A continuous loop where every output becomes the next input.</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow">SDG Alignment</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">Our work supports nine UN Sustainable Development Goals.</h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {[6,7,8,9,11,12,13,14,15].map((n) => (
              <Reveal key={n} delay={n*20}>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[color:var(--color-eco)] to-[color:var(--color-bluemist)] grid place-items-center text-white display text-2xl">SDG {n}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
