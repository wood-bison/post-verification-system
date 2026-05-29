import { randomUUID } from "node:crypto";

import type { VerifiedPost } from "./types";

export type PublishedPost = {
  id: string;
  text: string;
  publishedAt: Date;
};

export function publishPost(
  post: VerifiedPost,
  now: Date = new Date(),
): PublishedPost {
  return {
    id: randomUUID(),
    text: post,
    publishedAt: now,
  };
}
