import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead?: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden text-white min-h-[78vh] flex items-end pt-32 pb-20">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      <div className="container-tight relative grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow text-white/80"><span className="h-px w-8 bg-[color:var(--color-eco)]" /> {eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display mt-6 text-5xl md:text-7xl leading-[0.95] text-white">{title}</h1>
          </Reveal>
        </div>
        {lead && (
          <Reveal delay={220} className="lg:col-span-4">
            <p className="text-lg text-white/80 leading-relaxed">{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
