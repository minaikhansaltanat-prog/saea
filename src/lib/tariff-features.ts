import type { Tariff } from "./db/types";

export interface TariffFeatureFlags {
  inboundLimit: number | "unlimited";
  outboundLimit: number | "unlimited";
  tenderAlerts: boolean;
  analytics: "none" | "basic" | "full" | "full+";
  personalManager: boolean;
  featured: boolean;
  twoFactor: boolean;
}

export const TARIFF_FEATURES: Record<Tariff, TariffFeatureFlags> = {
  START: { inboundLimit: 5, outboundLimit: 3, tenderAlerts: false, analytics: "none", personalManager: false, featured: false, twoFactor: false },
  STANDART: { inboundLimit: 50, outboundLimit: 30, tenderAlerts: true, analytics: "basic", personalManager: false, featured: false, twoFactor: true },
  PREMIUM: { inboundLimit: "unlimited", outboundLimit: "unlimited", tenderAlerts: true, analytics: "full", personalManager: true, featured: false, twoFactor: true },
  PLATINUM: { inboundLimit: "unlimited", outboundLimit: "unlimited", tenderAlerts: true, analytics: "full+", personalManager: true, featured: true, twoFactor: true },
  ACADEMY: { inboundLimit: "unlimited", outboundLimit: "unlimited", tenderAlerts: true, analytics: "full", personalManager: true, featured: false, twoFactor: true },
};

export function hasAnalytics(tariff: Tariff): boolean {
  return TARIFF_FEATURES[tariff].analytics !== "none";
}
