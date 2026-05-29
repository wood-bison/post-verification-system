import { publishPost, type PublishedPost } from "./publish";
import { verifyUserPost } from "./runtimeVerify";
import type { Violation } from "./types";

export type UserPostResult =
  | {
      status: "published";
      published: PublishedPost;
    }
  | {
      status: "rejected";
      violations: Violation[];
    };

export function handleUserSubmittedPost(input: unknown): UserPostResult {
  const result = verifyUserPost(input);

  if (!result.ok) {
    return {
      status: "rejected",
      violations: result.violations,
    };
  }

  return {
    status: "published",
    published: publishPost(result.post),
  };
}
