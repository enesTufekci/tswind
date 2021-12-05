import { extend, styled } from "styled";

export const Container = styled.div(
  {
    collapse: {
      sm: "sm:container",
      md: "md:container",
      lg: "lg:container",
      xl: "xl:container",
      xxl: "xxl:container",
    },
  },
  "bg-white mx-auto"
);

export const Box = styled.div({
  p: {
    default: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-8",
    xl: "p-16",
  },
  px: {
    default: "",
    sm: "px-2",
    md: "px-4",
    lg: "px-8",
    xl: "px-16",
  },
  py: {
    default: "",
    sm: "py-2",
    md: "py-4",
    lg: "py-8",
    xl: "py-16",
  },
  bleed: {
    default: "",
    sm: "-mx-2",
    md: "-mx-4",
    lg: "-mx-8",
    xl: "-mx-16",
  },
});

export const Flex = extend(Box).div(
  {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    spaceX: {
      default: "",
      sm: "space-x-2",
      md: "space-x-4",
      lg: "space-x-8",
      xl: "space-x-16",
    },
    spaceY: {
      default: "",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-8",
      xl: "space-y-16",
    },
  },
  "flex"
);
