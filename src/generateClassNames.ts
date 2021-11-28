import { Flags, Token, ThemeTokenProcessor } from "./types";

type GenerateClassNamesParams = {
  flags: Flags;
  tokens: Token | Token[];
  flagProps: Record<string, string>;
  themeTokenProcessor: ThemeTokenProcessor;
};

function processTokens(
  tokens: Token | Token[],
  processor: ThemeTokenProcessor
): string {
  if (Array.isArray(tokens)) {
    return tokens
      .map((token) => processTokens(token, processor))
      .flat()
      .join(" ");
  }
  if (typeof tokens === "function") {
    return processor(tokens);
  }
  return tokens;
}

export function generateClassNames({
  flagProps,
  flags,
  tokens,
  themeTokenProcessor,
}: GenerateClassNamesParams): string {
  return [
    processTokens(tokens, themeTokenProcessor),
    Object.entries(flags)
      .map(([key, value]) =>
        processTokens(
          value[flagProps[key]]
            ? value[flagProps[key]]
            : Object.values(value)[0],
          themeTokenProcessor
        )
      )
      .join(" "),
  ]
    .filter((item) => item !== "")
    .join(" ");
}
