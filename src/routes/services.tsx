import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import {
  MagneticButton,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  SplitText,
  TiltCard,
} from "@/components/site/animations";
import { Recycle, ArrowUpRight } from "lucide-react";
import ewaste from "@/assets/ewaste.jpg";
import { useCmsList } from "@/lib/cms";
import { servicesQuery, type Service } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";

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

const FALLBACK_SERVICES: Service[] = [
  { _id: "1", icon: "Cpu", title: "E-Waste Recycling", description: "Authorised dismantling and material recovery for end-of-life electronics with R2v3-grade traceability.", bullets: ["Chain-of-custody reporting", "Component-level recovery", "CPCB authorisation"] },
  { _id: "2", icon: "Recycle", title: "Plastic Waste Management", description: "EPR-aligned collection and recycling across rigid, flexible and multilayer plastics.", bullets: ["Brand neutrality programmes", "PRO partnerships", "Verified credits"] },
  { _id: "3", icon: "Battery", title: "Battery Recycling", description: "Safe handling, transport and recovery of Li-ion and lead-acid batteries through licensed facilities.", bullets: ["Thermal-safety protocols", "Black mass recovery", "Closed-loop disposal"] },
  { _id: "4", icon: "Box", title: "IT Asset Disposal", description: "Secure ITAD with NIST-grade data destruction and value recovery on retired hardware.", bullets: ["NIST 800-88 wipe", "Asset tagging", "Resale value share"] },
  { _id: "5", icon: "Truck", title: "Reverse Logistics", description: "Pan-India collection network with digital pickup scheduling and live route visibility.", bullets: ["28-state coverage", "GPS-tracked fleet", "SLA-backed pickups"] },
  { _id: "6", icon: "ShieldCheck", title: "EPR Compliance", description: "Turnkey Extended Producer Responsibility — credits, filings, audits and dashboards.", bullets: ["End-to-end credits", "Quarterly filings", "Audit-ready records"] },
  { _id: "7", icon: "Lock", title: "Data Destruction", description: "Certified physical and software-based destruction for regulated industries.", bullets: ["DOD 5220.22-M", "On-site shredding", "Destruction certificate"] },
  { _id: "8", icon: "Factory", title: "Industrial Waste Management", description: "Tailored programmes for hazardous and non-hazardous industrial residuals.", bullets: ["Site-level audits", "Waste profiling", "Co-processing tie-ups"] },
  { _id: "9", icon: "PackageCheck", title: "Collection & Transportation", description: "Authorised vehicles and trained crews for safe, compliant material movement.", bullets: ["Manifest tracking", "Trained handlers", "All-India network"] },
];

function Services() {
  const SERVICES = useCmsList<Service>("services", servicesQuery, FALLBACK_SERVICES);
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="A full-stack circular economy partner."
        lead="Nine integrated services across collection, recovery, compliance and reporting — engineered as one operating system for your sustainability programme."
        image={ewaste}
      />

      <section className="py-20">
        <ScrollStagger className="container-tight grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.07} amount={0.1}>
          {SERVICES.map((s) => {
            const Icon = resolveIcon(s.icon, Recycle);
            return (
              <ScrollStaggerItem key={s._id}>
                <TiltCard maxTilt={6} className="h-full">
                  <article className="group rounded-2xl bg-card border border-border p-8 h-full hover:border-[color:var(--color-eco)]/60 hover:shadow-[var(--shadow-card)] transition-all">
                    <Icon className="h-8 w-8 text-[color:var(--color-eco)] transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110" />
                    <h3 className="display mt-8 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    <ul className="mt-6 space-y-2 text-sm">
                      {(s.bullets ?? []).map((bi) => (
                        <li key={bi} className="flex gap-3 text-muted-foreground">
                          <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--color-eco)]" />
                          {bi}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider group-hover:text-[color:var(--color-eco)] transition"
                    >
                      Discuss programme
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </Link>
                  </article>
                </TiltCard>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </section>

      <section className="py-32">
        <div className="container-tight">
          <ScrollReveal direction="scale">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={ewaste}
                alt="Workers sorting e-waste"
                loading="lazy"
                className="w-full aspect-[21/9] object-cover"
                data-anim="zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-charcoal)]/85 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-tight">
                  <div className="max-w-xl text-white">
                    <p className="eyebrow text-white/60">
                      <span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Engineered programmes
                    </p>
                    <h3 className="display mt-5 text-4xl md:text-5xl">
                      <SplitText as="span" mode="word">Built for the boardroom and the loading dock.</SplitText>
                    </h3>
                    <MagneticButton className="mt-8 rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium cursor-pointer">
                      <Link to="/contact" className="inline-flex items-center gap-2">
                        Request a proposal <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
