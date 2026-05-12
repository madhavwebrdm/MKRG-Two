import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Building2, Factory, Cpu, Landmark, GraduationCap, ShoppingBag, HeartPulse, Antenna } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Vertura" },
      { name: "description", content: "Tailored circular programmes for corporate, manufacturing, IT, government, education, retail, healthcare and telecom." },
      { property: "og:title", content: "Industries — Vertura" },
      { property: "og:description", content: "Sector-specific recycling and EPR programmes." },
    ],
  }),
  component: Industries,
});

const ITEMS = [
  { i: Building2, t: "Corporate Offices", d: "ITAD, e-waste and consumables programmes for multi-site enterprises." },
  { i: Factory, t: "Manufacturing", d: "Industrial residuals, scrap recovery and hazardous-waste handling at scale." },
  { i: Cpu, t: "IT Companies", d: "Secure data destruction and circular asset disposition for tech leaders." },
  { i: Landmark, t: "Government", d: "Smart-city, municipal and PSU recycling tenders, compliantly delivered." },
  { i: GraduationCap, t: "Education", d: "Campus-wide recycling for universities, research labs and ed-tech operators." },
  { i: ShoppingBag, t: "Retail Chains", d: "Reverse logistics for packaging, electronics and store-level waste streams." },
  { i: HeartPulse, t: "Healthcare", d: "Specialised handling for non-bio-medical regulated waste streams." },
  { i: Antenna, t: "Telecom", d: "Tower equipment recovery, battery recycling and EPR for OEMs." },
];

function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Sector-specific programmes, engineered to your context." lead="Recycling is rarely one-size-fits-all. We design dedicated workflows tuned to the materials, footprint and compliance posture of your industry." />

      <section className="py-20">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * 80}>
              <div className="group rounded-2xl bg-card border border-border p-10 hover:bg-[color:var(--color-charcoal)] hover:text-white transition-all duration-500">
                <it.i className="h-8 w-8 text-[color:var(--color-eco)] group-hover:text-[color:var(--color-eco-soft)] transition" />
                <h3 className="display mt-8 text-3xl">{it.t}</h3>
                <p className="mt-4 text-muted-foreground group-hover:text-white/70 transition max-w-md leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
