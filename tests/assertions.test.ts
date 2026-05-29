import { describe, expect, it } from "vitest";

import { assertVerifiedPost } from "../src/assertions";
import { publishPost } from "../src/publish";

describe("assertVerifiedPost", () => {
  it("narrows valid unknown input to VerifiedPost", () => {
    const input: unknown = "Hello world";

    assertVerifiedPost(input);

    expect(publishPost(input).text).toBe("Hello world");
  });

  it("throws for invalid input", () => {
    expect(() => assertVerifiedPost("spam")).toThrow(
      "Post violates community guidelines: BANNED_WORD",
    );
  });
});
