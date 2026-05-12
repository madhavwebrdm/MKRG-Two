import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Vertura" },
      { name: "description", content: "Seven-stage circular process: collection, segregation, transportation, dismantling, recycling, recovery and disposal." },
      { property: "og:title", content: "Process — Vertura" },
      { property: "og:description", content: "Traceable seven-stage circular process." },
    ],
  }),
  component: Process,
});

const STEPS = [
  { t: "Collection", d: "Scheduled, traceable pickups across our authorised pan-India network." },
  { t: "Segregation", d: "Sorting at certified MRFs combining manual expertise with AI-assisted vision systems." },
  { t: "Transportation", d: "GPS-tracked, manifest-controlled movement to the appropriate processing facility." },
  { t: "Dismantling", d: "Compliant teardown that liberates valuable components for recovery." },
  { t: "Recycling", d: "Mechanical and chemical processes engineered for high-purity output." },
  { t: "Material Recovery", d: "Refining of metals, polymers, glass and rare elements back to commodity grade." },
  { t: "Responsible Disposal", d: "Closed-loop disposal of residual waste through PCB-approved partners." },
];

function Process() {
  return (
    <>
      <PageHero eyebrow="The Process" title="From waste to resource, in seven traceable steps." lead="A unified operating model designed for compliance, transparency and recovery efficiency at industrial scale." image={logistics} />

      <section className="py-28">
        <div className="container-tight">
          {STEPS.map((s, i) => (
            <Reveal key={s.t}>
              <div className="grid md:grid-cols-12 gap-8 py-10 border-t border-border last:border-b group">
                <div className="md:col-span-2 display text-5xl text-muted-foreground/50 group-hover:text-[color:var(--color-eco)] transition-colors">{String(i+1).padStart(2,'0')}</div>
                <div className="md:col-span-4"><h3 className="display text-3xl">{s.t}</h3></div>
                <div className="md:col-span-6"><p className="text-muted-foreground leading-relaxed text-lg">{s.d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
