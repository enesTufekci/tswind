import { normalizeConfig } from "./normalizeConfig";
import { Flags, Theme, Token } from "./types";

const tokens: Token[] = ["t1", "t2", (_t: Theme) => ""];
const flags: Flags = { variant: { primary: "", secondary: "" } };

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
      tokens: tokens.reverse(),
    });
  });

  test("custom", () => {
    const config = {
      _flags: ["bg-red-100"],
      __flags: { direction: { row: "row", col: "col" } },
      _tokens: [],
      __tokens: ["bg-gray-100", "flex"],
    };
    expect(normalizeConfig(...Object.values(config).flat())).toEqual({
      flags: { direction: { row: "row", col: "col" } },
      tokens: ["flex", "bg-gray-100", "bg-red-100"],
    });
  });
});
