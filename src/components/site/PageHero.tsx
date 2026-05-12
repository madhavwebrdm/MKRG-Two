import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead?: string; image?: string }) {
  return (
    <section className="relative pt-12 lg:pt-20 pb-20">
      <div className="container-tight grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow"><span className="h-px w-8 bg-[color:var(--color-eco)]" /> {eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display mt-6 text-5xl md:text-7xl leading-[0.95]">{title}</h1>
          </Reveal>
        </div>
        {lead && (
          <Reveal delay={220} className="lg:col-span-4">
            <p className="text-lg text-muted-foreground leading-relaxed">{lead}</p>
          </Reveal>
        )}
      </div>
      {image && (
        <Reveal>
          <div className="container-tight mt-16">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={image} alt="" className="w-full h-[55vh] object-cover" />
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
