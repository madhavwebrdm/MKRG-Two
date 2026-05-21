import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/process", label: "Process" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();

  // Compact the header subtly as user scrolls
  const headerHeight = useTransform(scrollY, [0, 200], [80, 64], { clamp: true });
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.92], { clamp: true });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    if (latest > 120 && latest - previous > 8) setHidden(true);
    else if (previous - latest > 6 || latest < 60) setHidden(false);
  });

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,color,border-color] duration-500 ${
        scrolled
          ? "glass border-b border-border/60 text-foreground"
          : "bg-transparent text-white"
      }`}
    >
      <motion.div
        style={{ height: headerHeight }}
        className="container-tight flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.span
            style={{ scale: logoScale }}
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className={`grid h-9 w-9 place-items-center rounded-md ${
              scrolled
                ? "bg-primary text-primary-foreground"
                : "bg-white text-[color:var(--color-charcoal)]"
            }`}
          >
            <Leaf className="h-4 w-4" />
          </motion.span>
          <span className="display text-lg tracking-tight">
            Madhav KRG<span className="text-[color:var(--color-eco-soft)]">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors ${
                  scrolled
                    ? active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    : active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                }`}
              >
                <span className="relative z-10">{n.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={`absolute inset-x-3 bottom-1.5 h-px ${
                      scrolled ? "bg-[color:var(--color-eco)]" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-white text-[color:var(--color-charcoal)] hover:bg-white/90"
              }`}
            >
              Request a Proposal
            </Link>
          </motion.div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden grid h-10 w-10 place-items-center rounded-md border ${
            scrolled ? "border-border" : "border-white/30 text-white"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container-tight py-4 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={n.to} className="block py-2.5 text-base text-foreground/80 hover:text-foreground">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                className="mt-3 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium"
              >
                Request a Proposal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
