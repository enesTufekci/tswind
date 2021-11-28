import { normalizeConfig } from "./normalizeConfig";
import { Flags, Theme, Token } from "./types";

const tokens: Token[] = ["t1", "t2", (_t: Theme) => ""];
const tokens2: Token[] = ["t1", "t2", (_t: Theme) => ""];
const flags: Flags = { variant: { primary: "", secondary: "" } };
const flags2: Flags = { variant: { primary: "a", secondary: "b" } };
const flags3: Flags = { color: { primary: "a", secondary: "b" } };

describe("normalizeConfig", () => {
  test("with no config", () => {
    expect(normalizeConfig(undefined)).toEqual({ flags: {}, tokens: [] });
  });
  test("with only flags", () => {
    expect(normalizeConfig(flags, undefined)).toEqual({
      flags,
      tokens: [],
    });
  });
  test("with only tokens", () => {
    expect(normalizeConfig(tokens, undefined, {})).toEqual({
      flags: {},
      tokens,
    });
  });
  test("with tokens and flags", () => {
    expect(
      normalizeConfig(
        flags,
        tokens,
        flags2,
        tokens2,
        tokens[0],
        tokens[2],
        flags3,
        undefined
      )
    ).toEqual({
      flags: { ...flags2, ...flags3 },
      tokens: [...tokens, tokens2[2]],
    });
  });
});
