import { Link } from "@tanstack/react-router";
import { Leaf, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 bg-[color:var(--color-charcoal)] text-[color:oklch(0.92_0.01_95)]">
      <div className="container-tight py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--color-eco)] text-[color:var(--color-charcoal)]"><Leaf className="h-4 w-4" /></span>
              <span className="display text-lg">Madhav KRG.</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              An enterprise circular-economy partner enabling responsible recycling, EPR compliance and measurable ESG outcomes for the world's most ambitious organisations.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--color-charcoal)] px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <FooterCol title="Company" links={[["About","/about"],["Sustainability","/sustainability"],["Insights","/insights"],["Contact","/contact"]]} />
            <FooterCol title="Services" links={[["E-Waste","/services"],["Plastic","/services"],["Battery","/services"],["EPR Compliance","/services"]]} />
            <FooterCol title="Resources" links={[["Process","/process"],["Industries","/industries"],["Case Studies","/insights"],["ESG Reports","/sustainability"]]} />
          </div>
        </div>

        <div className="hairline mt-16 pt-8 border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Madhav KRG Circular Systems. All rights reserved.</p>
          <p className="flex items-center gap-6">
            <span>ISO 14001</span><span>ISO 45001</span><span>R2v3</span><span>CPCB Authorised</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-white/50">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to} className="text-white/80 hover:text-white transition-colors">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
