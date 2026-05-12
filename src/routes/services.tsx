import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Cpu, Recycle, Battery, Box, Truck, ShieldCheck, Lock, Factory, PackageCheck, ArrowUpRight } from "lucide-react";
import ewaste from "@/assets/ewaste.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Madhav KRG" },
      { name: "description", content: "End-to-end recycling capabilities: e-waste, plastic, battery, ITAD, EPR, reverse logistics and industrial waste management." },
      { property: "og:title", content: "Services — Madhav KRG" },
      { property: "og:description", content: "Nine integrated capabilities across the circular value chain." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Cpu, t: "E-Waste Recycling", d: "Authorised dismantling and material recovery for end-of-life electronics with R2v3-grade traceability.", b: ["Chain-of-custody reporting","Component-level recovery","CPCB authorisation"] },
  { icon: Recycle, t: "Plastic Waste Management", d: "EPR-aligned collection and recycling across rigid, flexible and multilayer plastics.", b: ["Brand neutrality programmes","PRO partnerships","Verified credits"] },
  { icon: Battery, t: "Battery Recycling", d: "Safe handling, transport and recovery of Li-ion and lead-acid batteries through licensed facilities.", b: ["Thermal-safety protocols","Black mass recovery","Closed-loop disposal"] },
  { icon: Box, t: "IT Asset Disposal", d: "Secure ITAD with NIST-grade data destruction and value recovery on retired hardware.", b: ["NIST 800-88 wipe","Asset tagging","Resale value share"] },
  { icon: Truck, t: "Reverse Logistics", d: "Pan-India collection network with digital pickup scheduling and live route visibility.", b: ["28-state coverage","GPS-tracked fleet","SLA-backed pickups"] },
  { icon: ShieldCheck, t: "EPR Compliance", d: "Turnkey Extended Producer Responsibility — credits, filings, audits and dashboards.", b: ["End-to-end credits","Quarterly filings","Audit-ready records"] },
  { icon: Lock, t: "Data Destruction", d: "Certified physical and software-based destruction for regulated industries.", b: ["DOD 5220.22-M","On-site shredding","Destruction certificate"] },
  { icon: Factory, t: "Industrial Waste Management", d: "Tailored programmes for hazardous and non-hazardous industrial residuals.", b: ["Site-level audits","Waste profiling","Co-processing tie-ups"] },
  { icon: PackageCheck, t: "Collection & Transportation", d: "Authorised vehicles and trained crews for safe, compliant material movement.", b: ["Manifest tracking","Trained handlers","All-India network"] },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="A full-stack circular economy partner."
        lead="Nine integrated services across collection, recovery, compliance and reporting — engineered as one operating system for your sustainability programme."
      />

      <section className="py-20">
        <div className="container-tight grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80}>
              <article className="group rounded-2xl bg-card border border-border p-8 h-full hover:border-[color:var(--color-eco)]/60 hover:shadow-[var(--shadow-card)] transition-all">
                <s.icon className="h-8 w-8 text-[color:var(--color-eco)]" />
                <h3 className="display mt-8 text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.b.map((bi) => <li key={bi} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--color-eco)]" />{bi}</li>)}
                </ul>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider group-hover:text-[color:var(--color-eco)] transition">Discuss programme <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <img src={ewaste} alt="Workers sorting e-waste" loading="lazy" className="w-full aspect-[21/9] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-charcoal)]/85 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-tight">
                  <div className="max-w-xl text-white">
                    <p className="eyebrow text-white/60"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Engineered programmes</p>
                    <h3 className="display mt-5 text-4xl md:text-5xl">Built for the boardroom and the loading dock.</h3>
                    <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition">Request a proposal <ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
