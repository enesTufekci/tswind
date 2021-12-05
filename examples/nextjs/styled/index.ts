import { styled, createTheme, extend } from "tswind";

const { theme, ThemeProvider, useTheme } = createTheme({
  light: {},
  dark: {},
});

export { styled, extend, theme, ThemeProvider, useTheme };
