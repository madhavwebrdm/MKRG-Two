import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Madhav KRG" },
      { name: "description", content: "Talk to our enterprise sustainability team. Offices in Mumbai, Bengaluru, Delhi and Singapore." },
      { property: "og:title", content: "Contact — Madhav KRG" },
      { property: "og:description", content: "Enterprise sustainability team — offices across India and Singapore." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Let's design your circular programme." lead="Tell us about your operations, materials and reporting requirements. We typically respond within one business day." image={logistics} />

      <section className="pb-32">
        <div className="container-tight grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl bg-card border border-border p-8 md:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" name="name" required />
                <Field label="Work email" type="email" name="email" required />
                <Field label="Company" name="company" />
                <Field label="Industry" name="industry" />
              </div>
              <Field label="How can we help?" name="msg" textarea />
              <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:opacity-90 transition">
                {sent ? "Thank you — we'll be in touch" : "Send enquiry"} <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="space-y-8">
              <Info icon={Mail} title="Email" lines={["partnerships@vertura.eco","support@vertura.eco"]} />
              <Info icon={Phone} title="Phone" lines={["+91 22 6105 8800","+65 6812 4400"]} />
              <Info icon={MapPin} title="Headquarters" lines={["Madhav KRG House","Bandra Kurla Complex","Mumbai 400051, India"]} />

              <div className="rounded-2xl overflow-hidden border border-border h-72">
                <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=72.85%2C19.05%2C72.88%2C19.07&layer=mapnik" className="w-full h-full" loading="lazy" />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {["Mumbai","Bengaluru","Delhi","Pune","Chennai","Singapore"].map((c) => (
                  <span key={c} className="text-sm rounded-full border border-border px-4 py-2 text-center text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", textarea, required }: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls = "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-eco)]/40 focus:border-[color:var(--color-eco)]/60 transition";
  return (
    <label className={`block ${textarea ? "sm:col-span-2 mt-5" : ""}`}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {textarea ? <textarea name={name} rows={5} className={cls} /> : <input required={required} type={type} name={name} className={cls} />}
    </label>
  );
}

function Info({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="flex gap-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-[color:var(--color-eco)]"><Icon className="h-5 w-5" /></span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
        {lines.map((l) => <p key={l} className="display text-lg leading-snug mt-1">{l}</p>)}
      </div>
    </div>
  );
}
