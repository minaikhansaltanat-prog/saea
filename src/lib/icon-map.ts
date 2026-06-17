import {
  Ship,
  Network,
  FlaskConical,
  ClipboardCheck,
  Handshake,
  Cpu,
  TrendingUp,
  Landmark,
  Scale,
  Wallet,
  Users,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Ship,
  Network,
  FlaskConical,
  ClipboardCheck,
  Handshake,
  Cpu,
  TrendingUp,
  Landmark,
  Scale,
  Wallet,
  Users,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Handshake;
}
