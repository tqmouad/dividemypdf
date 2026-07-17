/**
 * Centralized, typed configuration.
 *
 * Every limit, plan tier, and tunable value lives here so that:
 *  - No magic numbers are scattered through validation/UI code.
 *  - Introducing a Premium tier later is a config change, not a refactor.
 */

export type PlanTier = "free" | "premium";

export interface PlanLimits {
  /** Maximum number of pages a source PDF may contain. */
  maxPages: number;
  /** Maximum source file size, in bytes. */
  maxFileSizeBytes: number;
  /** Whether batch (multi-file) uploads are allowed. */
  batchUploads: boolean;
}

export const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
  free: {
    maxPages: 10,
    maxFileSizeBytes: 20 * 1024 * 1024, // 20 MB
    batchUploads: false,
  },
  premium: {
    // Reserved for future use — not enforced or sold today.
    maxPages: 500,
    maxFileSizeBytes: 200 * 1024 * 1024,
    batchUploads: true,
  },
};

/** Current active tier for the whole app. Flip this when Premium ships. */
export const CURRENT_PLAN: PlanTier = "free";

export function getActiveLimits(): PlanLimits {
  return PLAN_LIMITS[CURRENT_PLAN];
}

export const APP_CONFIG = {
  name: "DivideMyPDF",
  tagline: "Split PDF files instantly. Secure. Fast. Free.",
  domain: "https://dividemypdf.com",
  supportEmail: "hello@dividemypdf.com",
  accentColor: "#2563EB",
} as const;

/** Reserved slots for future analytics/ads — intentionally empty in the MVP. */
export const INTEGRATIONS = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? null,
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID ?? null,
  adSlotIds: {
    belowFold: process.env.NEXT_PUBLIC_AD_SLOT_BELOW_FOLD ?? null,
    footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER ?? null,
  },
} as const;
