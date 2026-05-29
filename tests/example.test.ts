import { describe, expect, it } from "vitest";

import { handleUserSubmittedPost } from "../src/example";

describe("handleUserSubmittedPost", () => {
  it("publishes valid user-submitted content", () => {
    const result = handleUserSubmittedPost("Hello world");

    expect(result.status).toBe("published");
    if (result.status !== "published") {
      throw new Error("Expected post to be published");
    }
    expect(result.published.text).toBe("Hello world");
  });

  it("rejects invalid user-submitted content", () => {
    const result = handleUserSubmittedPost("spam");

    expect(result.status).toBe("rejected");
    if (result.status !== "rejected") {
      throw new Error("Expected post to be rejected");
    }
    expect(result.violations[0]?.code).toBe("BANNED_WORD");
  });
});
