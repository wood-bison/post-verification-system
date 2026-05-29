# Post Verification System

TypeScript solution for checking text posts against a small set of social-platform community guidelines.

The main design point is the split between compile-time and runtime verification:

- static string literals can be checked by TypeScript;
- real user-submitted text is only known at runtime;
- valid runtime input is branded as `VerifiedPost`;
- publishing code accepts only `VerifiedPost`.

## Approach

```text
Static literal -> defineStaticPost(...) -> VerifiedPost or compile-time error
User input     -> verifyUserPost(...)   -> VerifiedPost or violations
VerifiedPost   -> publishPost(...)
```

TypeScript cannot fully verify something like `req.body.text` at compile time, because the value does not exist yet. The compiler can still help after runtime validation by preventing raw strings from reaching `publishPost`.

## Guidelines

The demo rules are intentionally small:

- input must be a string;
- post must not be empty;
- post must not exceed the configured max length;
- banned words are matched as standalone tokens;
- suspicious link markers are matched as substrings.

Runtime rules use a small registry:

```ts
type GuidelineRule = {
  name: string;
  evaluate: (text: string, config: GuidelineConfig) => Violation | null;
};
```

The validator runs the configured rules and collects all violations.

## Example

```ts
const result = verifyUserPost(req.body.text);

if (result.ok) {
  publishPost(result.post);
}
```

This does not compile:

```ts
publishPost("raw unverified text");
```

There is also an assertion-style API:

```ts
assertVerifiedPost(input);
publishPost(input);
```

## TypeScript Features

- branded type: `VerifiedPost`;
- discriminated union: `VerificationResult`;
- assertion function: `assertVerifiedPost`;
- template literal and conditional types for static literals;
- `as const satisfies GuidelineConfig` for typed config with preserved literals;
- `@ts-expect-error` type tests.

## Complexity

For the default runtime rules:

- non-empty: `O(L)`;
- max length: `O(1)`;
- banned words: `O(L + B)`;
- suspicious markers: `O(L * M)`.

`L` is post length, `B` is banned-word count, and `M` is suspicious-marker count. Space is `O(T + V)`, where `T` is unique tokens and `V` is violations.

For a large banned-word dictionary, I would switch to a trie or Aho-Corasick style matcher.

## Run

```bash
npm ci
npm test
npm run typecheck
```
