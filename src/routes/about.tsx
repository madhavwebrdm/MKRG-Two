import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import corp from "@/assets/corporate.jpg";
import sust from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Madhav KRG Circular Systems" },
      { name: "description", content: "An enterprise circular-economy partner with 16 years of operating history across 32 facilities and 28 states." },
      { property: "og:title", content: "About Madhav KRG" },
      { property: "og:description", content: "16 years operating circular-economy infrastructure for enterprises and governments." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Madhav KRG"
        title="An infrastructure company for the circular age."
        lead="Founded in 2008, Madhav KRG operates the recovery infrastructure that allows enterprises to meet ESG commitments at industrial scale, with traceability your auditors can verify."
        image={corp}
      />

      <section className="py-28">
        <div className="container-tight grid lg:grid-cols-2 gap-20">
          <Reveal>
            <p className="eyebrow">Vision</p>
            <h2 className="display mt-5 text-4xl">A world where no resource is wasted.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">We see waste not as residue but as a misplaced resource. Our vision is a fully circular industrial economy where every molecule re-enters the value chain.</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Mission</p>
            <h2 className="display mt-5 text-4xl">Make responsible recycling effortless for enterprise.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">We deliver compliant, transparent and measurable recycling outcomes, removing the complexity of EPR, ESG reporting and reverse logistics from our partners' shoulders.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <Reveal><p className="eyebrow">Leadership</p><h2 className="display mt-5 text-4xl md:text-5xl">A team that has built sectors before.</h2></Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "Arjun Mehta", r: "Founder & CEO" },
              { n: "Lakshmi Iyer", r: "Chief Sustainability Officer" },
              { n: "Daniel Park", r: "Chief Operations Officer" },
              { n: "Maya Suresh", r: "VP, Compliance & EPR" },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i*80}>
                <div className="rounded-2xl bg-card border border-border p-8 h-full">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[color:var(--color-eco-soft)] to-[color:var(--color-bluemist)] mb-6 opacity-80" />
                  <p className="display text-xl">{p.n}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Our Journey</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">Sixteen years of building circular infrastructure.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ol className="relative border-l border-border">
              {[
                { y: "2008", t: "Founded in Mumbai", d: "Launched as a single MRF serving 12 corporate clients." },
                { y: "2013", t: "First R2-certified facility", d: "Achieved international standards for responsible recycling." },
                { y: "2017", t: "National network", d: "Expanded reverse-logistics operations to 18 states." },
                { y: "2021", t: "EPR Cloud launched", d: "Released our digital compliance and traceability platform." },
                { y: "2024", t: "2.4M tonnes processed", d: "Crossed cumulative diversion milestone with 32 facilities." },
              ].map((m, i) => (
                <Reveal key={m.y} delay={i*80}>
                  <li className="ml-8 pb-12 last:pb-0 relative">
                    <span className="absolute -left-[42px] top-1 grid h-8 w-8 place-items-center rounded-full bg-background border border-border text-xs">{m.y.slice(2)}</span>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.y}</p>
                    <h3 className="display text-xl mt-1">{m.t}</h3>
                    <p className="mt-2 text-muted-foreground text-sm max-w-md">{m.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight grid md:grid-cols-2 gap-16 items-center">
          <Reveal><img src={sust} alt="Sustainability" loading="lazy" className="rounded-2xl w-full aspect-[4/5] object-cover" /></Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Why Choose Madhav KRG</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">Industrial scale with boutique accountability.</h2>
            <ul className="mt-8 space-y-5">
              {["Audit-grade traceability across every kilogram","Pan-India reverse-logistics network","ISO 14001, 45001 and R2v3 certified","Dedicated ESG reporting dashboards","Zero-landfill commitment by 2030"].map((b)=> (
                <li key={b} className="flex gap-4 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--color-eco)]" />{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
