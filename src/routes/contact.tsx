import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import {
  MagneticButton,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/site/animations";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logistics from "@/assets/logistics.jpg";
import { motion, type Variants } from "motion/react";

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
      <PageHero
        eyebrow="Get in touch"
        title="Let's design your circular programme."
        lead="Tell us about your operations, materials and reporting requirements. We typically respond within one business day."
        image={logistics}
      />

      <section className="pb-32">
        <div className="container-tight grid lg:grid-cols-12 gap-12">
          <ScrollReveal direction="right" className="lg:col-span-7">
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="rounded-2xl bg-card border border-border p-8 md:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" name="name" required />
                <Field label="Work email" type="email" name="email" required />
                <Field label="Company" name="company" />
                <Field label="Industry" name="industry" />
              </div>
              <Field label="How can we help?" name="msg" textarea />
              <motion.div variants={fieldVariants}>
                <MagneticButton as="button" className="mt-6 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium cursor-pointer">
                  <span className="inline-flex items-center gap-2">
                    {sent ? "Thank you — we'll be in touch" : "Send enquiry"} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.form>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-5">
            <ScrollStagger className="space-y-8" staggerChildren={0.08}>
              <ScrollStaggerItem>
                <Info icon={Mail} title="Email" lines={["partnerships@vertura.eco", "support@vertura.eco"]} />
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <Info icon={Phone} title="Phone" lines={["+91 22 6105 8800", "+65 6812 4400"]} />
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <Info icon={MapPin} title="Headquarters" lines={["Madhav KRG House", "Bandra Kurla Complex", "Mumbai 400051, India"]} />
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="rounded-2xl overflow-hidden border border-border h-72"
                >
                  <iframe
                    title="Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.85%2C19.05%2C72.88%2C19.07&layer=mapnik"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </motion.div>
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <div className="grid sm:grid-cols-3 gap-3">
                  {["Mumbai", "Bengaluru", "Delhi", "Pune", "Chennai", "Singapore"].map((c) => (
                    <motion.span
                      key={c}
                      whileHover={{ y: -2, backgroundColor: "color-mix(in oklab, var(--color-eco) 12%, var(--color-background))" }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="text-sm rounded-full border border-border px-4 py-2 text-center text-muted-foreground cursor-default"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </ScrollStaggerItem>
            </ScrollStagger>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
};

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls = "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-eco)]/40 focus:border-[color:var(--color-eco)]/60 transition";
  return (
    <motion.label
      variants={fieldVariants}
      className={`block ${textarea ? "sm:col-span-2 mt-5" : ""}`}
    >
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} className={cls} />
      ) : (
        <input required={required} type={type} name={name} className={cls} />
      )}
    </motion.label>
  );
}

function Info({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="flex gap-5">
      <motion.span
        whileHover={{ scale: 1.08, rotate: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-[color:var(--color-eco)]"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="display text-lg leading-snug mt-1">{l}</p>
        ))}
      </div>
    </div>
  );
}
