import {
  Cpu, Recycle, Battery, Box, Truck, ShieldCheck, Lock, Factory, PackageCheck,
  Building2, Landmark, GraduationCap, ShoppingBag, HeartPulse, Antenna, Globe2,
  Leaf, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Cpu, Recycle, Battery, Box, Truck, ShieldCheck, Lock, Factory, PackageCheck,
  Building2, Landmark, GraduationCap, ShoppingBag, HeartPulse, Antenna, Globe2, Leaf,
};

export function resolveIcon(name?: string, fallback: LucideIcon = Recycle): LucideIcon {
  if (!name) return fallback;
  return map[name] ?? fallback;
}
