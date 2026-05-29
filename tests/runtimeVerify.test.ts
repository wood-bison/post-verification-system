import { describe, expect, it } from "vitest";

import { verifyUserPost } from "../src/runtimeVerify";

describe("verifyUserPost", () => {
  it("rejects non-string input", () => {
    const result = verifyUserPost({ text: "hello" });

    expect(result).toEqual({
      ok: false,
      violations: [
        {
          code: "NON_STRING",
          message: "Post must be a string.",
        },
      ],
    });
  });

  it("returns all matching violations", () => {
    const result = verifyUserPost("spam https://suspicious.example");

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected verification to fail");
    }

    expect(result.violations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "BANNED_WORD" }),
        expect.objectContaining({ code: "SUSPICIOUS_LINK" }),
      ]),
    );
  });

  it("returns a verified post for valid input", () => {
    const result = verifyUserPost("Hello world");

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected verification to pass");
    }

    expect(result.post).toBe("Hello world");
  });

  it("accepts custom config", () => {
    const result = verifyUserPost("hello", {
      maxLength: 3,
      bannedWords: [],
      suspiciousLinkMarkers: [],
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected verification to fail");
    }
    expect(result.violations[0]?.code).toBe("TOO_LONG");
  });

  it("accepts custom rule sets", () => {
    const result = verifyUserPost("spam", undefined, []);

    expect(result.ok).toBe(true);
  });
});
