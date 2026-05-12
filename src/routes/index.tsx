import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Recycle, Battery, Cpu, Box, Truck, ShieldCheck, Globe2, Leaf, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-recycling.jpg";
import sust from "@/assets/sustainability.jpg";
import ewaste from "@/assets/ewaste.jpg";
import plastic from "@/assets/plastic.jpg";
import logistics from "@/assets/logistics.jpg";
import corporate from "@/assets/corporate.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";

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
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-tight pt-12 lg:pt-20 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow"><span className="h-px w-8 bg-[color:var(--color-eco)]" /> ESG · Circular Economy · Since 2008</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
                Transforming waste<br />
                into <span className="text-gradient-eco">sustainable value.</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Madhav KRG builds the industrial infrastructure that allows enterprises and governments to close the loop on waste — responsibly, traceably and at scale.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:opacity-90 transition">
                  Partner with us <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/sustainability" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)] transition-colors">
                  View ESG impact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-6">
                <Stat value={2.4} suffix="M+" label="Tonnes processed" />
                <Stat value={620} suffix="+" label="Enterprise clients" />
                <Stat value={48} suffix=" States" label="Operational coverage" />
                <Stat value={99.6} suffix="%" label="Material recovery" />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="container-tight">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-elegant)]">
              <img src={hero} alt="Industrial recycling facility" width={1920} height={1080} className="w-full h-[68vh] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-charcoal)]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Material Recovery Facility · Pune</p>
                <h3 className="display mt-3 text-2xl md:text-3xl">Engineered for scale, designed for the planet.</h3>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

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
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Link to="/services" className="group block h-full rounded-2xl bg-card border border-border p-8 hover:border-[color:var(--color-eco)]/60 hover:shadow-[var(--shadow-card)] transition-all">
                  <s.icon className="h-7 w-7 text-[color:var(--color-eco)]" />
                  <h3 className="mt-8 display text-xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground group-hover:text-[color:var(--color-eco)] transition-colors">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
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
                <Reveal key={p.t} delay={i * 80}>
                  <li className="ml-8 pb-12 last:pb-0 relative">
                    <span className="absolute -left-[42px] top-1 grid h-8 w-8 place-items-center rounded-full bg-background border border-border text-xs font-medium">{String(i+1).padStart(2,'0')}</span>
                    <h3 className="display text-xl">{p.t}</h3>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed max-w-md">{p.d}</p>
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
              <div key={ind} className="bg-card p-8 hover:bg-accent/30 transition-colors">
                <p className="display text-lg">{ind}</p>
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
              <Reveal key={c.title} delay={i * 100}>
                <article className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-card)] transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.tag}</p>
                    <h3 className="display mt-3 text-xl">{c.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
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

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="display text-4xl"><Counter to={value} suffix={suffix} /></p>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}

const SERVICES = [
  { icon: Cpu, title: "E-Waste Recycling", desc: "Authorised dismantling and recovery for end-of-life electronics with full chain-of-custody." },
  { icon: Recycle, title: "Plastic Waste Management", desc: "EPR-aligned plastic collection and recycling across rigid, flexible and multilayer streams." },
  { icon: Battery, title: "Battery Recycling", desc: "Safe handling and recovery of Li-ion and lead-acid batteries through licensed facilities." },
  { icon: Box, title: "IT Asset Disposal", desc: "Secure ITAD with NIST-grade data destruction and value recovery on retired hardware." },
  { icon: Truck, title: "Reverse Logistics", desc: "Pan-India collection network and digitised pick-up scheduling at enterprise scale." },
  { icon: ShieldCheck, title: "EPR Compliance", desc: "Turnkey Extended Producer Responsibility — credits, filings, audits and dashboards." },
];

const PROCESS = [
  { t: "Collection", d: "Scheduled pickups via our authorised fleet across 28 states." },
  { t: "Segregation", d: "Manual and AI-assisted sorting at certified MRFs." },
  { t: "Dismantling & Shredding", d: "Compliant teardown for material liberation." },
  { t: "Material Recovery", d: "Refining of metals, polymers and rare elements." },
  { t: "Responsible Disposal", d: "Closed-loop disposal of residuals with PCB-approved partners." },
];

const INDUSTRIES = ["Corporate", "Manufacturing", "IT & Tech", "Government", "Education", "Retail", "Healthcare", "Telecom"];

const CASES = [
  { title: "Closing the loop for a Fortune 500 IT major", tag: "ITAD · 4,200 t", desc: "Designed a national reverse-logistics network handling 4,200 tonnes of e-waste annually.", img: ewaste },
  { title: "EPR programme for a global FMCG leader", tag: "Plastic · EPR", desc: "Achieved 100% plastic neutrality across 12 brand SKUs within 14 months.", img: plastic },
  { title: "Smart-city battery recovery initiative", tag: "Battery · Govt.", desc: "Deployed 220 collection nodes processing 1,800 t of Li-ion annually.", img: logistics },
];
