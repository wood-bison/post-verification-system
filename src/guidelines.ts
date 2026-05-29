import type { GuidelineConfig } from "./types";

export const defaultGuidelines = {
  maxLength: 280,
  bannedWords: ["spam", "scam", "hate"],
  suspiciousLinkMarkers: ["suspicious.example", "free-money"],
} as const satisfies GuidelineConfig;
