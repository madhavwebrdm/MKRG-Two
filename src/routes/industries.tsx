import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Building2, Factory, Cpu, Landmark, GraduationCap, ShoppingBag, HeartPulse, Antenna } from "lucide-react";
import { useCmsList } from "@/lib/cms";
import { industriesQuery, type Industry } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import hero from "@/assets/hero-recycling.jpg";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Madhav KRG" },
      { name: "description", content: "Tailored circular programmes for corporate, manufacturing, IT, government, education, retail, healthcare and telecom." },
      { property: "og:title", content: "Industries — Madhav KRG" },
      { property: "og:description", content: "Sector-specific recycling and EPR programmes." },
    ],
  }),
  component: Industries,
});

const FALLBACK_ITEMS: Industry[] = [
  { _id: "1", icon: "Building2", title: "Corporate Offices", description: "ITAD, e-waste and consumables programmes for multi-site enterprises." },
  { _id: "2", icon: "Factory", title: "Manufacturing", description: "Industrial residuals, scrap recovery and hazardous-waste handling at scale." },
  { _id: "3", icon: "Cpu", title: "IT Companies", description: "Secure data destruction and circular asset disposition for tech leaders." },
  { _id: "4", icon: "Landmark", title: "Government", description: "Smart-city, municipal and PSU recycling tenders, compliantly delivered." },
  { _id: "5", icon: "GraduationCap", title: "Education", description: "Campus-wide recycling for universities, research labs and ed-tech operators." },
  { _id: "6", icon: "ShoppingBag", title: "Retail Chains", description: "Reverse logistics for packaging, electronics and store-level waste streams." },
  { _id: "7", icon: "HeartPulse", title: "Healthcare", description: "Specialised handling for non-bio-medical regulated waste streams." },
  { _id: "8", icon: "Antenna", title: "Telecom", description: "Tower equipment recovery, battery recycling and EPR for OEMs." },
];

function Industries() {
  const ITEMS = useCmsList<Industry>("industries", industriesQuery, FALLBACK_ITEMS);
  return (
    <>
      <PageHero eyebrow="Industries" title="Sector-specific programmes, engineered to your context." lead="Recycling is rarely one-size-fits-all. We design dedicated workflows tuned to the materials, footprint and compliance posture of your industry." image={hero} />

      <section className="py-20">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          {ITEMS.map((it, i) => {
            const Icon = resolveIcon(it.icon, Building2);
            return (
            <Reveal key={it._id} delay={(i % 2) * 80}>
              <div className="group rounded-2xl bg-card border border-border p-10 hover:bg-[color:var(--color-charcoal)] hover:text-white transition-all duration-500">
                <Icon className="h-8 w-8 text-[color:var(--color-eco)] group-hover:text-[color:var(--color-eco-soft)] transition" />
                <h3 className="display mt-8 text-3xl">{it.title}</h3>
                <p className="mt-4 text-muted-foreground group-hover:text-white/70 transition max-w-md leading-relaxed">{it.description}</p>
              </div>
            </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
