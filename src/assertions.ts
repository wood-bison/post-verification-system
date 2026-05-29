import { verifyUserPost } from "./runtimeVerify";
import type { GuidelineConfig, VerifiedPost } from "./types";

export function assertVerifiedPost(
  input: unknown,
  config?: GuidelineConfig,
): asserts input is VerifiedPost {
  const result = verifyUserPost(input, config);

  if (!result.ok) {
    const codes = result.violations
      .map((violation) => violation.code)
      .join(", ");

    throw new Error(`Post violates community guidelines: ${codes}`);
  }
}
