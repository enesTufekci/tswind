import * as React from "react";
import { ComponentProps } from "react";
import { styled } from "tswind";

const textColors = {
  text: "text-gray-800",
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-orange-500",
};

export const TextStyled = styled.p({
  heading: {
    h4: "text-md",
    h3: "font-black tracking-widest",
    h2: "text-xl font-semibold",
    h1: "text-2xl font-bold tracking-wide text-opacity-90",
  },
  color: textColors,
});

export function Text({
  heading = "h4",
  ...props
}: ComponentProps<typeof TextStyled>): JSX.Element {
  return <TextStyled as={heading} heading={heading} {...props}></TextStyled>;
}

interface HProps extends ComponentProps<typeof TextStyled> {
  tag?: "h1" | "h2" | "h3" | "h4";
}

export function H({ tag = "h4", ...props }: HProps): JSX.Element {
  return <TextStyled as={tag} {...props} />;
}
