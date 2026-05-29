import { defaultGuidelines } from "./guidelines";
import type { VerifiedPost } from "./types";
import { toVerifiedPost } from "./types";

type StaticBannedWord = (typeof defaultGuidelines.bannedWords)[number];
type Whitespace = " " | "\n" | "\r" | "\t";

type TrimLeft<Text extends string> = Text extends `${Whitespace}${infer Rest}`
  ? TrimLeft<Rest>
  : Text;

type TrimRight<Text extends string> = Text extends `${infer Rest}${Whitespace}`
  ? TrimRight<Rest>
  : Text;

type Trim<Text extends string> = TrimLeft<TrimRight<Text>>;

type ContainsBannedWord<
  Text extends string,
  Word extends string,
> = Lowercase<Text> extends `${string}${Lowercase<Word>}${string}`
  ? true
  : false;

type ContainsAnyBannedWord<Text extends string> =
  StaticBannedWord extends infer Word
    ? Word extends string
      ? ContainsBannedWord<Text, Word> extends true
        ? true
        : never
      : never
    : never;

type StaticPostInput<Text extends string> =
  string extends Text
    ? never
    : Trim<Text> extends ""
      ? never
      : true extends ContainsAnyBannedWord<Text>
        ? never
        : Text;

export function defineStaticPost<const Text extends string>(
  text: StaticPostInput<Text>,
): VerifiedPost {
  return toVerifiedPost(text);
}
