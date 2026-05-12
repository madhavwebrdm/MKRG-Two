import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowUpRight } from "lucide-react";
import ewaste from "@/assets/ewaste.jpg";
import plastic from "@/assets/plastic.jpg";
import logistics from "@/assets/logistics.jpg";
import sust from "@/assets/sustainability.jpg";
import corp from "@/assets/corporate.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Madhav KRG" },
      { name: "description", content: "Perspectives on circular economy, ESG trends, e-waste regulation and sustainability leadership." },
      { property: "og:title", content: "Insights — Madhav KRG" },
      { property: "og:description", content: "Sustainability, ESG and circular-economy thinking." },
    ],
  }),
  component: Insights,
});

const POSTS = [
  { t: "Why EPR is the new compliance frontier for FMCG", c: "Regulation", d: "How new EPR rules are reshaping packaging strategy across consumer goods.", img: plastic, date: "May 2026" },
  { t: "The hidden value in retired enterprise hardware", c: "ITAD", d: "Recovery economics, security risk and the case for circular IT.", img: ewaste, date: "Apr 2026" },
  { t: "Designing reverse logistics that scale", c: "Operations", d: "Lessons from operating a 28-state network handling 600 t per day.", img: logistics, date: "Mar 2026" },
  { t: "Climate accounting for circular companies", c: "ESG", d: "Why scope-3 reporting is the next boardroom conversation.", img: sust, date: "Feb 2026" },
  { t: "Building credibility into ESG disclosures", c: "Reporting", d: "What audit-ready sustainability reporting actually requires.", img: corp, date: "Jan 2026" },
  { t: "Battery recovery: India's next industrial sector", c: "Industry", d: "The shape of a domestic Li-ion recovery market through 2030.", img: logistics, date: "Dec 2025" },
];

function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Perspectives from the circular frontier." lead="Field notes, regulatory analysis and ESG thinking from the people building the recycling sector." />

      <section className="py-20">
        <div className="container-tight">
          <Reveal>
            <article className="group grid md:grid-cols-2 gap-10 items-center pb-16 border-b border-border">
              <div className="overflow-hidden rounded-2xl">
                <img src={POSTS[0].img} alt={POSTS[0].t} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <p className="eyebrow">Featured · {POSTS[0].c}</p>
                <h2 className="display mt-5 text-4xl md:text-5xl leading-tight">{POSTS[0].t}</h2>
                <p className="mt-5 text-muted-foreground leading-relaxed text-lg">{POSTS[0].d}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--color-eco)] transition">Read article <ArrowUpRight className="h-4 w-4" /></p>
              </div>
            </article>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 80}>
                <article className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-card)] transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.t} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.c} · {p.date}</p>
                    <h3 className="display mt-3 text-xl leading-snug">{p.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
