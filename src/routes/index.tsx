import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Recycle, ArrowRight } from "lucide-react";
import sust from "@/assets/sustainability.jpg";
import ewaste from "@/assets/ewaste.jpg";
import plastic from "@/assets/plastic.jpg";
import logistics from "@/assets/logistics.jpg";
import corporate from "@/assets/corporate.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { HeroCinematic } from "@/components/site/HeroCinematic";
import { useCmsList } from "@/lib/cms";
import {
  servicesQuery, industriesQuery, processStepsQuery, caseStudiesQuery, impactMetricsQuery,
  urlFor, type Service, type Industry, type ProcessStep, type CaseStudy, type ImpactMetric,
} from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madhav KRG — Transforming Waste Into Sustainable Value" },
      { name: "description", content: "Enterprise circular-economy infrastructure: e-waste, plastic, battery, EPR compliance and reverse logistics, delivered with measurable ESG outcomes." },
      { property: "og:title", content: "Madhav KRG — Transforming Waste Into Sustainable Value" },
      { property: "og:description", content: "Enterprise circular-economy infrastructure with measurable ESG outcomes." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  const SERVICES_DATA = useCmsList<Service>("home-services", servicesQuery, FALLBACK_SERVICES);
  const SERVICES = SERVICES_DATA.slice(0, 6);
  const PROCESS = useCmsList<ProcessStep>("home-process", processStepsQuery, FALLBACK_PROCESS);
  const INDUSTRIES = useCmsList<Industry>("home-industries", industriesQuery, FALLBACK_INDUSTRIES);
  const CASES = useCmsList<CaseStudy>("home-cases", caseStudiesQuery, FALLBACK_CASES);
  const IMPACT = useCmsList<ImpactMetric>("home-impact", impactMetricsQuery, FALLBACK_IMPACT, { group: "home" });
  return (
    <>
      {/* HERO */}
      <HeroCinematic>
        <div className="container-tight pt-32 lg:pt-44 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-12 items-end text-white">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow text-white/70"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> ESG · Circular Economy · Since 2008</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display mt-6 text-5xl sm:text-7xl lg:text-[7rem] leading-[0.92] text-white">
                Transforming waste<br />
                into <span className="italic font-light text-[color:var(--color-eco-soft)]">sustainable value.</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 max-w-xl text-lg text-white/75 leading-relaxed">
                Madhav KRG builds the industrial infrastructure that allows enterprises and governments to close the loop on waste — responsibly, traceably and at scale.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition">
                  Partner with us <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/sustainability" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                  View ESG impact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Floating stat strip */}
        <div className="container-tight pb-20 lg:pb-28">
          <Reveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md">
              {[
                { v: 2.4, s: "M+", l: "Tonnes processed" },
                { v: 620, s: "+", l: "Enterprise clients" },
                { v: 48, s: " States", l: "Coverage" },
                { v: 99.6, s: "%", l: "Material recovery" },
              ].map((x) => (
                <div key={x.l} className="p-6 md:p-8 bg-white/5">
                  <p className="display text-3xl md:text-4xl text-white"><Counter to={x.v} suffix={x.s} /></p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/65">{x.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </HeroCinematic>

      {/* CLIENT MARQUEE */}
      <section className="py-16 border-y border-border bg-muted/40">
        <div className="container-tight">
          <p className="eyebrow mb-8">Trusted by enterprises and governments</p>
          <div className="overflow-hidden">
            <div className="marquee flex gap-16 whitespace-nowrap text-2xl md:text-3xl display text-muted-foreground/70">
              {Array(2).fill(0).map((_, i) => (
                <div key={i} className="flex gap-16">
                  {["Tata Consultancy","Reliance","Infosys","Siemens","Schneider","HDFC","Maruti","Adani","Wipro","HCL","ITC"].map((c) => (
                    <span key={c+i} className="opacity-80 hover:opacity-100 transition-opacity">{c}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28">
        <div className="container-tight grid lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">About Madhav KRG</p>
            <h2 className="display mt-5 text-4xl md:text-5xl leading-tight">
              Industrial-grade circularity for an enterprise era.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We design, build and operate end-to-end recovery infrastructure across nine waste streams. Our facilities, fleet and EPR credit network combine to deliver fully traceable circular outcomes — backed by audit-grade reporting your sustainability committee can rely on.
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-8">
              {[
                { k: "16", v: "Years operating" },
                { k: "32", v: "Recovery facilities" },
                { k: "ISO", v: "14001 / 45001 / R2v3" },
              ].map((i) => (
                <div key={i.v}>
                  <p className="display text-3xl">{i.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{i.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-8 mb-16">
            <Reveal>
              <p className="eyebrow">Capabilities</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">A full-stack recycling partner.</h2>
            </Reveal>
            <Reveal delay={120}>
              <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)]">All services <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = resolveIcon(s.icon, Recycle);
              return (
              <Reveal key={s._id} delay={i * 80}>
                <Link to="/services" className="group block h-full rounded-2xl bg-card border border-border p-8 hover:border-[color:var(--color-eco)]/60 hover:shadow-[var(--shadow-card)] transition-all">
                  <Icon className="h-7 w-7 text-[color:var(--color-eco)]" />
                  <h3 className="mt-8 display text-xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground group-hover:text-[color:var(--color-eco)] transition-colors">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="py-32 bg-[color:var(--color-charcoal)] text-white">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow text-white/60"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Measured Impact</p>
            <h2 className="display mt-6 text-4xl md:text-6xl max-w-4xl">Numbers that move the needle on real sustainability.</h2>
          </Reveal>
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { n: 2400000, s: "+", l: "Tonnes diverted from landfill" },
              { n: 184000, s: " t", l: "CO₂e emissions avoided" },
              { n: 96, s: "%", l: "Material recovery efficiency" },
              { n: 12000, s: "+", l: "Green jobs supported" },
            ].map((x) => (
              <Reveal key={x.l}>
                <div className="border-t border-white/15 pt-8">
                  <p className="display text-5xl md:text-6xl text-white"><Counter to={x.n} suffix={x.s} /></p>
                  <p className="mt-4 text-sm text-white/60 max-w-[16rem]">{x.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32">
        <div className="container-tight grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">The Process</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">A traceable journey from collection to recovery.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Every kilogram is logged, weighed and traced through our chain-of-custody system, giving you audit-ready reporting at every stage.</p>
            <Link to="/process" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)]">Explore the process <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="relative border-l border-border">
              {PROCESS.map((p, i) => (
                <Reveal key={p._id} delay={i * 80}>
                  <li className="ml-8 pb-12 last:pb-0 relative">
                    <span className="absolute -left-[42px] top-1 grid h-8 w-8 place-items-center rounded-full bg-background border border-border text-xs font-medium">{String(i+1).padStart(2,'0')}</span>
                    <h3 className="display text-xl">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-md">{p.description}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow">Industries We Serve</p>
            <h2 className="display mt-5 text-4xl md:text-5xl max-w-3xl">Tailored circular programmes for every sector.</h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {INDUSTRIES.map((ind) => (
              <div key={ind._id} className="bg-card p-8 hover:bg-accent/30 transition-colors">
                <p className="display text-lg">{ind.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BLOCKS */}
      <section className="py-32">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl">
              <img src={sust} alt="Sustainability" loading="lazy" className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Sustainability</p>
                <h3 className="display mt-3 text-3xl">Aligning operations with the SDGs.</h3>
                <Link to="/sustainability" className="mt-6 inline-flex items-center gap-2 text-sm">Read commitments <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid gap-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={corporate} alt="Corporate" loading="lazy" className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={logistics} alt="Logistics" loading="lazy" className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">Outcomes for organisations that lead.</h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <Reveal key={c._id} delay={i * 100}>
                <article className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-card)] transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.coverImage ? urlFor(c.coverImage).width(1000).height(750).url() : (FALLBACK_CASES[i % FALLBACK_CASES.length].fallbackImg ?? ewaste)} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.tag}</p>
                    <h3 className="display mt-3 text-xl">{c.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container-tight">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-charcoal)] text-white p-12 md:p-20">
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-eco)] blur-[120px] opacity-30" />
              <div className="relative max-w-3xl">
                <p className="eyebrow text-white/60"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Let's build the loop</p>
                <h2 className="display mt-6 text-4xl md:text-6xl leading-[1.05]">Ready to turn your waste into a verifiable ESG advantage?</h2>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link>
                  <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">Explore services <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const FALLBACK_SERVICES: Service[] = [
  { _id: "s1", icon: "Cpu", title: "E-Waste Recycling", description: "Authorised dismantling and recovery for end-of-life electronics with full chain-of-custody." },
  { _id: "s2", icon: "Recycle", title: "Plastic Waste Management", description: "EPR-aligned plastic collection and recycling across rigid, flexible and multilayer streams." },
  { _id: "s3", icon: "Battery", title: "Battery Recycling", description: "Safe handling and recovery of Li-ion and lead-acid batteries through licensed facilities." },
  { _id: "s4", icon: "Box", title: "IT Asset Disposal", description: "Secure ITAD with NIST-grade data destruction and value recovery on retired hardware." },
  { _id: "s5", icon: "Truck", title: "Reverse Logistics", description: "Pan-India collection network and digitised pick-up scheduling at enterprise scale." },
  { _id: "s6", icon: "ShieldCheck", title: "EPR Compliance", description: "Turnkey Extended Producer Responsibility — credits, filings, audits and dashboards." },
];

const FALLBACK_PROCESS: ProcessStep[] = [
  { _id: "p1", order: 1, title: "Collection", description: "Scheduled pickups via our authorised fleet across 28 states." },
  { _id: "p2", order: 2, title: "Segregation", description: "Manual and AI-assisted sorting at certified MRFs." },
  { _id: "p3", order: 3, title: "Dismantling & Shredding", description: "Compliant teardown for material liberation." },
  { _id: "p4", order: 4, title: "Material Recovery", description: "Refining of metals, polymers and rare elements." },
  { _id: "p5", order: 5, title: "Responsible Disposal", description: "Closed-loop disposal of residuals with PCB-approved partners." },
];

const FALLBACK_INDUSTRIES: Industry[] = [
  { _id: "i1", title: "Corporate" }, { _id: "i2", title: "Manufacturing" }, { _id: "i3", title: "IT & Tech" }, { _id: "i4", title: "Government" },
  { _id: "i5", title: "Education" }, { _id: "i6", title: "Retail" }, { _id: "i7", title: "Healthcare" }, { _id: "i8", title: "Telecom" },
];

type CaseStudyLocal = CaseStudy & { fallbackImg?: string };
const FALLBACK_CASES: CaseStudyLocal[] = [
  { _id: "c1", title: "Closing the loop for a Fortune 500 IT major", tag: "ITAD · 4,200 t", description: "Designed a national reverse-logistics network handling 4,200 tonnes of e-waste annually.", fallbackImg: ewaste },
  { _id: "c2", title: "EPR programme for a global FMCG leader", tag: "Plastic · EPR", description: "Achieved 100% plastic neutrality across 12 brand SKUs within 14 months.", fallbackImg: plastic },
  { _id: "c3", title: "Smart-city battery recovery initiative", tag: "Battery · Govt.", description: "Deployed 220 collection nodes processing 1,800 t of Li-ion annually.", fallbackImg: logistics },
];

const FALLBACK_IMPACT: ImpactMetric[] = [
  { _id: "m1", value: 2400000, suffix: "+", label: "Tonnes diverted from landfill", group: "home" },
  { _id: "m2", value: 184000, suffix: " t", label: "CO₂e emissions avoided", group: "home" },
  { _id: "m3", value: 96, suffix: "%", label: "Material recovery efficiency", group: "home" },
  { _id: "m4", value: 12000, suffix: "+", label: "Green jobs supported", group: "home" },
];
