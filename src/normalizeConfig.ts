import { Flags, Token } from "./types";

export function normalizeConfig(
  ...items: (Token | Token[] | Flags | undefined)[]
) {
  let flags: Flags = {};
  let tokens: Token[] = [];

  for (const item of items) {
    if (typeof item === "string" || typeof item === "function") {
      tokens.push(item);
    } else if (Array.isArray(item)) {
      const { flags: _flags, tokens: _tokens } = normalizeConfig(
        ...items.flat()
      );
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
