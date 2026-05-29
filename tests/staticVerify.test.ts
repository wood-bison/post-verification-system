import { describe, expect, it } from "vitest";

import { defineStaticPost } from "../src/staticVerify";

describe("defineStaticPost", () => {
  it("returns the original static text at runtime", () => {
    expect(defineStaticPost("Hello from a static post")).toBe(
      "Hello from a static post",
    );
  });
});
