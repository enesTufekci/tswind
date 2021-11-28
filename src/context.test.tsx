import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createTheme } from "./context";
import { styled } from "./styled";

const { theme, ThemeProvider, useTheme } = createTheme({
  light: {
    color: {
      primary: "light.color.primary",
      secondary: "light.color.secondary",
    },
    bg: {
      primary: "light.bg.primary",
      secondary: "light.bg.secondary",
    },
  },
  dark: {
    color: {
      primary: "dark.color.primary",
      secondary: "dark.color.secondary",
    },
    bg: {
      primary: "dark.bg.primary",
      secondary: "dark.bg.secondary",
    },
  },
});

describe("context and theme", () => {
  test("#1", async () => {
    const Button = styled.button({
      variant: {
        primary: [theme.color.primary, theme.bg.primary],
        secondary: [theme.color.secondary, theme.bg.secondary],
      },
    });

    const Component = () => {
      const { setTheme } = useTheme();
      return (
        <>
          <Button
            data-testid="primary"
            onClick={() =>
              setTheme((theme) => (theme === "dark" ? "light" : "dark"))
            }
          >
            Primary
          </Button>
          <Button data-testid="secondary" variant="secondary">
            Secondary
          </Button>
        </>
      );
    };

    render(
      <ThemeProvider defaultTheme="dark">
        <Component />
      </ThemeProvider>
    );

    const primaryBtn = await screen.findByTestId("primary");
    const secondaryBtn = await screen.findByTestId("secondary");

    expect(primaryBtn.className).toEqual("dark.color.primary dark.bg.primary");
    expect(secondaryBtn.className).toEqual(
      "dark.color.secondary dark.bg.secondary"
    );

    fireEvent.click(primaryBtn);
    expect(primaryBtn.className).toEqual(
      "light.color.primary light.bg.primary"
    );
    expect(secondaryBtn.className).toEqual(
      "light.color.secondary light.bg.secondary"
    );

    fireEvent.click(primaryBtn);

    expect(primaryBtn.className).toEqual("dark.color.primary dark.bg.primary");
    expect(secondaryBtn.className).toEqual(
      "dark.color.secondary dark.bg.secondary"
    );
  });
});
