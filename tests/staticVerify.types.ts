import { defineStaticPost } from "../src/staticVerify";

defineStaticPost("Hello world");

// @ts-expect-error empty static posts are rejected
defineStaticPost("");

// @ts-expect-error whitespace-only static posts are rejected
defineStaticPost("   ");

// @ts-expect-error banned words are rejected in static literals
defineStaticPost("this is spam");

declare const runtimeText: string;

// @ts-expect-error broad runtime strings must use runtime verification
defineStaticPost(runtimeText);
