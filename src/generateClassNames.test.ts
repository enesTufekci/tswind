import { generateClassNames } from "./generateClassNames";
import type { Theme, ThemeTokenProcessor } from "./types";

const theme: Theme = {
  color: {
    primary: "text-orange-600",
    secondary: "text-indigo-600",
  },
};

const color = {
  primary: (theme: Theme) => theme.color.primary,
  secondary: (theme: Theme) => theme.color.secondary,
};

const processor: ThemeTokenProcessor = (fn) => {
  return fn(theme);
};

describe("generateClassNames", () => {
  it("minimal", () => {
    expect(
      generateClassNames({
        flags: {
          variant: {
            primary: [color.primary, "bg-green-600"],
            secondary: [color.secondary, "bg-blue-600"],
          },
        },
        flagProps: {},
        tokens: "",
        themeTokenProcessor: processor,
      })
    ).toEqual("text-orange-600 bg-green-600");
  });

  it("complex", () => {
    expect(
      generateClassNames({
        flags: {
          variant: {
            primary: [color.primary, "bg-green-600"],
            secondary: [color.secondary, "bg-blue-600"],
          },
        },
        flagProps: { variant: "secondary" },
        tokens: [color.primary, "flex"],
        themeTokenProcessor: processor,
      })
    ).toEqual("text-orange-600 flex text-indigo-600 bg-blue-600");
  });
});
