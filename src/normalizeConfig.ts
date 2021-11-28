import { Flags, Token } from "./types";

export function normalizeConfig(
  ...items: (Token | Token[] | Flags | undefined)[]
) {
  let flags: Flags = {};
  let tokens: Token[] = [];

  // reverse items because the latest added token is pushed
  // first when components are extended.
  for (const item of items.reverse()) {
    if (typeof item === "string" || typeof item === "function") {
      tokens.push(item);
    } else if (Array.isArray(item)) {
      const { flags: _flags, tokens: _tokens } = normalizeConfig(...item);
      tokens.push(..._tokens);
      flags = { ...flags, ..._flags };
    } else if (typeof item !== "undefined") {
      flags = { ...flags, ...item };
    }
  }
  return {
    flags,
    tokens: Array.from(new Set(tokens)),
  };
}
