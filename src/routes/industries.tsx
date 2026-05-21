import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ScrollStagger, ScrollStaggerItem } from "@/components/site/animations";
import { Building2 } from "lucide-react";
import { useCmsList } from "@/lib/cms";
import { industriesQuery, type Industry } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import { motion } from "motion/react";
import corp from "@/assets/corporate.jpg";

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
      <PageHero
        eyebrow="Industries"
        title="Sector-specific programmes, engineered to your context."
        lead="Recycling is rarely one-size-fits-all. We design dedicated workflows tuned to the materials, footprint and compliance posture of your industry."
        image={corp}
      />

      <section className="py-20">
        <ScrollStagger className="container-tight grid md:grid-cols-2 gap-6" staggerChildren={0.08} amount={0.1}>
          {ITEMS.map((it) => {
            const Icon = resolveIcon(it.icon, Building2);
            return (
              <ScrollStaggerItem key={it._id}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative rounded-2xl bg-card border border-border p-10 hover:bg-[color:var(--color-charcoal)] hover:text-white transition-all duration-500 overflow-hidden"
                >
                  <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[color:var(--color-eco)] opacity-0 blur-3xl group-hover:opacity-25 transition-opacity duration-700" />
                  <Icon className="relative h-8 w-8 text-[color:var(--color-eco)] group-hover:text-[color:var(--color-eco-soft)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
                  <h3 className="display mt-8 text-3xl relative">{it.title}</h3>
                  <p className="mt-4 text-muted-foreground group-hover:text-white/70 transition max-w-md leading-relaxed relative">
                    {it.description}
                  </p>
                </motion.div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </section>
    </>
  );
}
