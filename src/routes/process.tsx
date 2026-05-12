import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import logistics from "@/assets/logistics.jpg";
import { useCmsList } from "@/lib/cms";
import { processStepsQuery, type ProcessStep } from "@/lib/sanity";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Madhav KRG" },
      { name: "description", content: "Seven-stage circular process: collection, segregation, transportation, dismantling, recycling, recovery and disposal." },
      { property: "og:title", content: "Process — Madhav KRG" },
      { property: "og:description", content: "Traceable seven-stage circular process." },
    ],
  }),
  component: Process,
});

const FALLBACK_STEPS: ProcessStep[] = [
  { _id: "1", order: 1, title: "Collection", description: "Scheduled, traceable pickups across our authorised pan-India network." },
  { _id: "2", order: 2, title: "Segregation", description: "Sorting at certified MRFs combining manual expertise with AI-assisted vision systems." },
  { _id: "3", order: 3, title: "Transportation", description: "GPS-tracked, manifest-controlled movement to the appropriate processing facility." },
  { _id: "4", order: 4, title: "Dismantling", description: "Compliant teardown that liberates valuable components for recovery." },
  { _id: "5", order: 5, title: "Recycling", description: "Mechanical and chemical processes engineered for high-purity output." },
  { _id: "6", order: 6, title: "Material Recovery", description: "Refining of metals, polymers, glass and rare elements back to commodity grade." },
  { _id: "7", order: 7, title: "Responsible Disposal", description: "Closed-loop disposal of residual waste through PCB-approved partners." },
];

function Process() {
  const STEPS = useCmsList<ProcessStep>("processSteps", processStepsQuery, FALLBACK_STEPS);
  return (
    <>
      <PageHero eyebrow="The Process" title="From waste to resource, in seven traceable steps." lead="A unified operating model designed for compliance, transparency and recovery efficiency at industrial scale." image={logistics} />

      <section className="py-28">
        <div className="container-tight">
          {STEPS.map((s, i) => (
            <Reveal key={s._id}>
              <div className="grid md:grid-cols-12 gap-8 py-10 border-t border-border last:border-b group">
                <div className="md:col-span-2 display text-5xl text-muted-foreground/50 group-hover:text-[color:var(--color-eco)] transition-colors">{String(i+1).padStart(2,'0')}</div>
                <div className="md:col-span-4"><h3 className="display text-3xl">{s.title}</h3></div>
                <div className="md:col-span-6"><p className="text-muted-foreground leading-relaxed text-lg">{s.description}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
