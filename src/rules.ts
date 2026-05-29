import type { GuidelineConfig, Violation } from "./types";

export type GuidelineRule = {
  name: string;
  evaluate: (text: string, config: GuidelineConfig) => Violation | null;
};

export const nonEmptyRule: GuidelineRule = {
  name: "non-empty",
  evaluate: (text) =>
    text.trim().length === 0
      ? {
          code: "EMPTY_POST",
          message: "Post must not be empty.",
        }
      : null,
};

export const maxLengthRule: GuidelineRule = {
  name: "max-length",
  evaluate: (text, config) =>
    text.length > config.maxLength
      ? {
          code: "TOO_LONG",
          message: `Post must be at most ${config.maxLength} characters.`,
          metadata: {
            actualLength: text.length,
            maxLength: config.maxLength,
          },
        }
      : null,
};

export const bannedWordRule: GuidelineRule = {
  name: "banned-word",
  evaluate: (text, config) => {
    const tokens = tokenizeWords(text);
    const bannedWord = config.bannedWords.find((word) =>
      tokens.has(word.toLowerCase()),
    );

    return bannedWord
      ? {
          code: "BANNED_WORD",
          message: `Post contains a banned word: ${bannedWord}.`,
          metadata: {
            bannedWord,
          },
        }
      : null;
  },
};

export const suspiciousLinkRule: GuidelineRule = {
  name: "suspicious-link",
  evaluate: (text, config) => {
    const normalizedText = text.toLowerCase();
    const marker = config.suspiciousLinkMarkers.find((value) =>
      normalizedText.includes(value.toLowerCase()),
    );

    return marker
      ? {
          code: "SUSPICIOUS_LINK",
          message: `Post contains a suspicious link marker: ${marker}.`,
          metadata: {
            marker,
          },
        }
      : null;
  },
};

export const defaultRules: readonly GuidelineRule[] = [
  nonEmptyRule,
  maxLengthRule,
  bannedWordRule,
  suspiciousLinkRule,
];

function tokenizeWords(text: string): ReadonlySet<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}_]+/u)
      .filter(Boolean),
  );
}
