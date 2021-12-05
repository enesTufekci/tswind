import { styled } from "styled";

export const Button = styled.button(
  {
    variant: {
      primary: ["bg-indigo-600", "text-white"],
      secondary: ["border-yellow-600 text-yellow-600 font-light"],
    },
  },
  ["px-4 py-1"],
  ["text-sm tracking-wide font-bold"],
  ["border-2 border-transparent rounded-md shadow-lg"]
);
