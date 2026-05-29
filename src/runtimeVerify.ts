import { defaultGuidelines } from "./guidelines";
import { defaultRules, type GuidelineRule } from "./rules";
import type { GuidelineConfig, VerificationResult, Violation } from "./types";
import { toVerifiedPost } from "./types";

export function verifyUserPost(
  input: unknown,
  config: GuidelineConfig = defaultGuidelines,
  rules: readonly GuidelineRule[] = defaultRules,
): VerificationResult {
  if (typeof input !== "string") {
    return {
      ok: false,
      violations: [
        {
          code: "NON_STRING",
          message: "Post must be a string.",
        },
      ],
    };
  }

  const violations = rules
    .map((rule) => rule.evaluate(input, config))
    .filter((violation): violation is Violation => violation !== null);

  if (violations.length > 0) {
    return {
      ok: false,
      violations,
    };
  }

  return {
    ok: true,
    post: toVerifiedPost(input),
  };
}
