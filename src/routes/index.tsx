import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Recycle, ArrowRight } from "lucide-react";
import sust from "@/assets/sustainability.jpg";
import ewaste from "@/assets/ewaste.jpg";
import plastic from "@/assets/plastic.jpg";
import logistics from "@/assets/logistics.jpg";
import corporate from "@/assets/corporate.jpg";
import { Reveal } from "@/components/site/Reveal";
import { HeroCinematic } from "@/components/site/HeroCinematic";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import {
  AnimatedCounter,
  MagneticButton,
  Marquee,
  ParallaxImage,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  SplitText,
  Spotlight,
  TiltCard,
} from "@/components/site/animations";
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
        <div className="container-tight pt-28 lg:pt-36 pb-16 lg:pb-20 grid lg:grid-cols-12 gap-12 items-end text-white">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow text-white/70"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> ESG · Circular Economy · Since 2008</p>
            </Reveal>
            <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] text-white">
              <SplitText as="span" mode="word">Transforming waste</SplitText>
              <br />
              <SplitText as="span" mode="word" delay={0.2}>into </SplitText>
              <span className="italic font-light text-[color:var(--color-eco-soft)]">
                <SplitText as="span" mode="word" delay={0.35}>sustainable value.</SplitText>
              </span>
            </h1>
            <ScrollReveal delay={0.7} duration={0.9}>
              <p className="mt-8 max-w-xl text-lg text-white/75 leading-relaxed">
                Madhav KRG builds the industrial infrastructure that allows enterprises and governments to close the loop on waste — responsibly, traceably and at scale.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.9}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton className="rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium cursor-pointer">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Partner with us <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
                <Link to="/sustainability" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                  View ESG impact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Floating stat strip */}
        <div className="container-tight pb-16 lg:pb-20">
          <ScrollStagger className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md">
            {[
              { v: 2.4, s: "M+", l: "Tonnes processed", d: 1 },
              { v: 620, s: "+", l: "Enterprise clients" },
              { v: 48, s: " States", l: "Coverage" },
              { v: 99.6, s: "%", l: "Material recovery", d: 1 },
            ].map((x) => (
              <ScrollStaggerItem key={x.l} className="p-6 md:p-8 bg-white/5">
                <p className="display text-3xl md:text-4xl text-white">
                  <AnimatedCounter to={x.v} suffix={x.s} decimals={x.d} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/65">{x.l}</p>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </HeroCinematic>

      {/* CLIENT MARQUEE — scroll-velocity reactive */}
      <section className="py-16 border-y border-border bg-muted/40">
        <div className="container-tight">
          <p className="eyebrow mb-8">Trusted by enterprises and governments</p>
        </div>
        <Marquee
          items={["Tata Consultancy", "Reliance", "Infosys", "Siemens", "Schneider", "HDFC", "Maruti", "Adani", "Wipro", "HCL", "ITC"]}
          itemClassName="text-2xl md:text-3xl display text-muted-foreground/70"
          speed={42}
        />
      </section>

      {/* INTRO */}
      <section className="py-28">
        <div className="container-tight grid lg:grid-cols-12 gap-16 items-center">
          <ScrollReveal direction="right" className="lg:col-span-5">
            <p className="eyebrow">About Madhav KRG</p>
            <h2 className="display mt-5 text-4xl md:text-5xl leading-tight">
              <SplitText as="span" mode="word">Industrial-grade circularity for an enterprise era.</SplitText>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-7">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We design, build and operate end-to-end recovery infrastructure across nine waste streams. Our facilities, fleet and EPR credit network combine to deliver fully traceable circular outcomes — backed by audit-grade reporting your sustainability committee can rely on.
            </p>
            <ScrollStagger className="mt-10 grid sm:grid-cols-3 gap-8" staggerChildren={0.1}>
              {[
                { k: "16", v: "Years operating" },
                { k: "32", v: "Recovery facilities" },
                { k: "ISO", v: "14001 / 45001 / R2v3" },
              ].map((i) => (
                <ScrollStaggerItem key={i.v}>
                  <p className="display text-3xl">{i.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{i.v}</p>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES — tilt-cards with stagger */}
      <section className="py-28 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-8 mb-16">
            <ScrollReveal>
              <p className="eyebrow">Capabilities</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                <SplitText as="span" mode="word">A full-stack recycling partner.</SplitText>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)]">All services <ArrowRight className="h-4 w-4" /></Link>
            </ScrollReveal>
          </div>

          <ScrollStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.08} amount={0.1}>
            {SERVICES.map((s) => {
              const Icon = resolveIcon(s.icon, Recycle);
              return (
                <ScrollStaggerItem key={s._id}>
                  <TiltCard className="h-full">
                    <Link to="/services" className="group block h-full rounded-2xl bg-card border border-border p-8 hover:border-[color:var(--color-eco)]/60 hover:shadow-[var(--shadow-card)] transition-all">
                      <Icon className="h-7 w-7 text-[color:var(--color-eco)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
                      <h3 className="mt-8 display text-xl">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                      <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground group-hover:text-[color:var(--color-eco)] transition-colors">
                        Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </TiltCard>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStagger>
        </div>
      </section>

      {/* IMPACT NUMBERS — spotlight + animated counters */}
      <Spotlight color="color-mix(in oklab, var(--color-eco) 35%, transparent)">
        <section className="py-32 bg-[color:var(--color-charcoal)] text-white">
          <div className="container-tight">
            <ScrollReveal>
              <p className="eyebrow text-white/60"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Measured Impact</p>
              <h2 className="display mt-6 text-4xl md:text-6xl max-w-4xl">
                <SplitText as="span" mode="word">Numbers that move the needle on real sustainability.</SplitText>
              </h2>
            </ScrollReveal>
            <ScrollStagger className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12" staggerChildren={0.1}>
              {(IMPACT.length
                ? IMPACT
                : [
                    { _id: "i1", value: 2400000, suffix: "+", label: "Tonnes diverted from landfill" },
                    { _id: "i2", value: 184000, suffix: " t", label: "CO₂e emissions avoided" },
                    { _id: "i3", value: 96, suffix: "%", label: "Material recovery efficiency" },
                    { _id: "i4", value: 12000, suffix: "+", label: "Green jobs supported" },
                  ]
              ).map((x) => (
                <ScrollStaggerItem key={x._id ?? x.label}>
                  <div className="border-t border-white/15 pt-8">
                    <p className="display text-5xl md:text-6xl text-white">
                      <AnimatedCounter to={x.value as number} suffix={x.suffix ?? ""} />
                    </p>
                    <p className="mt-4 text-sm text-white/60 max-w-[16rem]">{x.label}</p>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>
      </Spotlight>

      {/* PROCESS — animated timeline with SVG path-draw */}
      <section className="py-32">
        <div className="container-tight grid lg:grid-cols-12 gap-16">
          <ScrollReveal direction="right" className="lg:col-span-5">
            <p className="eyebrow">The Process</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              <SplitText as="span" mode="word">A traceable journey from collection to recovery.</SplitText>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every kilogram is logged, weighed and traced through our chain-of-custody system, giving you audit-ready reporting at every stage.
            </p>
            <Link to="/process" className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)] group">
              Explore the process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ProcessTimeline
              steps={PROCESS.map((p) => ({ id: p._id, title: p.title, description: p.description }))}
            />
          </div>
        </div>
      </section>

      {/* INDUSTRIES — stagger reveal */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <ScrollReveal>
            <p className="eyebrow">Industries We Serve</p>
            <h2 className="display mt-5 text-4xl md:text-5xl max-w-3xl">
              <SplitText as="span" mode="word">Tailored circular programmes for every sector.</SplitText>
            </h2>
          </ScrollReveal>

          <ScrollStagger
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            staggerChildren={0.05}
            amount={0.1}
          >
            {INDUSTRIES.map((ind) => (
              <ScrollStaggerItem key={ind._id} className="bg-card p-8 hover:bg-accent/30 transition-colors hover:-translate-y-1 duration-500 will-change-transform">
                <p className="display text-lg">{ind.title}</p>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* IMAGE BLOCKS — parallax images */}
      <section className="py-32">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          <ScrollReveal direction="right">
            <div className="relative">
              <ParallaxImage src={sust} alt="Sustainability" speed={0.18} className="aspect-[4/5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Sustainability</p>
                <h3 className="display mt-3 text-3xl">Aligning operations with the SDGs.</h3>
                <Link to="/sustainability" className="mt-6 inline-flex items-center gap-2 text-sm group">
                  Read commitments
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.15}>
            <div className="grid gap-6">
              <ParallaxImage src={corporate} alt="Corporate" speed={0.12} className="aspect-[16/10]" />
              <ParallaxImage src={logistics} alt="Logistics" speed={0.22} className="aspect-[16/9]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-32 bg-muted/30 border-y border-border">
        <div className="container-tight">
          <ScrollReveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              <SplitText as="span" mode="word">Outcomes for organisations that lead.</SplitText>
            </h2>
          </ScrollReveal>
          <ScrollStagger className="mt-16 grid md:grid-cols-3 gap-6" staggerChildren={0.1} amount={0.15}>
            {CASES.map((c, i) => (
              <ScrollStaggerItem key={c._id}>
                <TiltCard maxTilt={5} className="h-full">
                  <article className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-card)] transition-all h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          c.coverImage
                            ? urlFor(c.coverImage).width(1000).height(750).url()
                            : (FALLBACK_CASES[i % FALLBACK_CASES.length].fallbackImg ?? ewaste)
                        }
                        alt={c.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-7">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.tag}</p>
                      <h3 className="display mt-3 text-xl">{c.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                    </div>
                  </article>
                </TiltCard>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container-tight">
          <ScrollReveal direction="scale">
            <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-charcoal)] text-white p-12 md:p-20">
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-eco)] blur-[120px] opacity-30" />
              <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-[color:var(--color-bluemist)] blur-[100px] opacity-20" />
              <div className="relative max-w-3xl">
                <p className="eyebrow text-white/60"><span className="h-px w-8 bg-[color:var(--color-eco-soft)]" /> Let's build the loop</p>
                <h2 className="display mt-6 text-4xl md:text-6xl leading-[1.05]">
                  <SplitText as="span" mode="word">Ready to turn your waste into a verifiable ESG advantage?</SplitText>
                </h2>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <MagneticButton className="rounded-full bg-white text-[color:var(--color-charcoal)] px-7 py-3.5 text-sm font-medium cursor-pointer">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Talk to our team <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </MagneticButton>
                  <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">Explore services <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
