import { describe, expect, it } from "vitest";

import { defaultGuidelines } from "../src/guidelines";
import {
  bannedWordRule,
  maxLengthRule,
  nonEmptyRule,
  suspiciousLinkRule,
} from "../src/rules";

describe("guideline rules", () => {
  it("rejects empty posts", () => {
    expect(nonEmptyRule.evaluate("   ", defaultGuidelines)?.code).toBe(
      "EMPTY_POST",
    );
  });

  it("rejects posts longer than the configured limit", () => {
    const result = maxLengthRule.evaluate("hello", {
      ...defaultGuidelines,
      maxLength: 3,
    });

    expect(result).toMatchObject({
      code: "TOO_LONG",
      metadata: {
        actualLength: 5,
        maxLength: 3,
      },
    });
  });

  it("matches banned words as tokens", () => {
    expect(
      bannedWordRule.evaluate("This looks like a scam.", defaultGuidelines)
        ?.code,
    ).toBe("BANNED_WORD");
  });

  it("does not match banned words inside larger words", () => {
    expect(bannedWordRule.evaluate("I like scampi.", defaultGuidelines)).toBe(
      null,
    );
  });

  it("detects suspicious link markers", () => {
    expect(
      suspiciousLinkRule.evaluate(
        "Visit https://suspicious.example/free",
        defaultGuidelines,
      )?.code,
    ).toBe("SUSPICIOUS_LINK");
  });
});
