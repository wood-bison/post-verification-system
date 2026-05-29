export type ViolationCode =
  | "NON_STRING"
  | "EMPTY_POST"
  | "TOO_LONG"
  | "BANNED_WORD"
  | "SUSPICIOUS_LINK";

export type Violation = {
  code: ViolationCode;
  message: string;
  metadata?: Record<string, string | number>;
};

declare const verifiedPostBrand: unique symbol;

export type VerifiedPost = string & {
  readonly [verifiedPostBrand]: true;
};

export type VerificationResult =
  | {
      ok: true;
      post: VerifiedPost;
    }
  | {
      ok: false;
      violations: Violation[];
    };

export type GuidelineConfig = {
  maxLength: number;
  bannedWords: readonly string[];
  suspiciousLinkMarkers: readonly string[];
};

export function toVerifiedPost(text: string): VerifiedPost {
  return text as VerifiedPost;
}
