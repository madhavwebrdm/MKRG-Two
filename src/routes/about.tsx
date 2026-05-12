import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import corp from "@/assets/corporate.jpg";
import sust from "@/assets/sustainability.jpg";
import { useCmsList } from "@/lib/cms";
import { milestonesQuery, leadersQuery, urlFor, type Milestone, type Leader } from "@/lib/sanity";

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

const FALLBACK_LEADERS: Leader[] = [
  { _id: "1", name: "Arjun Mehta", role: "Founder & CEO" },
  { _id: "2", name: "Lakshmi Iyer", role: "Chief Sustainability Officer" },
  { _id: "3", name: "Daniel Park", role: "Chief Operations Officer" },
  { _id: "4", name: "Maya Suresh", role: "VP, Compliance & EPR" },
];

const FALLBACK_MILESTONES: Milestone[] = [
  { _id: "1", year: "2008", title: "Founded in Mumbai", description: "Launched as a single MRF serving 12 corporate clients." },
  { _id: "2", year: "2013", title: "First R2-certified facility", description: "Achieved international standards for responsible recycling." },
  { _id: "3", year: "2017", title: "National network", description: "Expanded reverse-logistics operations to 18 states." },
  { _id: "4", year: "2021", title: "EPR Cloud launched", description: "Released our digital compliance and traceability platform." },
  { _id: "5", year: "2024", title: "2.4M tonnes processed", description: "Crossed cumulative diversion milestone with 32 facilities." },
];

function About() {
  const LEADERS = useCmsList<Leader>("leaders", leadersQuery, FALLBACK_LEADERS);
  const MILESTONES = useCmsList<Milestone>("milestones", milestonesQuery, FALLBACK_MILESTONES);
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
            {LEADERS.map((p, i) => (
              <Reveal key={p._id} delay={i*80}>
                <div className="rounded-2xl bg-card border border-border p-8 h-full">
                  {p.photo ? (
                    <img src={urlFor(p.photo).width(600).height(600).url()} alt={p.name} loading="lazy" className="aspect-square rounded-xl object-cover mb-6" />
                  ) : (
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-[color:var(--color-eco-soft)] to-[color:var(--color-bluemist)] mb-6 opacity-80" />
                  )}
                  <p className="display text-xl">{p.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.role}</p>
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
              {MILESTONES.map((m, i) => (
                <Reveal key={m._id} delay={i*80}>
                  <li className="ml-8 pb-12 last:pb-0 relative">
                    <span className="absolute -left-[42px] top-1 grid h-8 w-8 place-items-center rounded-full bg-background border border-border text-xs">{m.year.slice(2)}</span>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.year}</p>
                    <h3 className="display text-xl mt-1">{m.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm max-w-md">{m.description}</p>
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
