import { createElement, DetailedHTMLProps, HTMLAttributes } from "react";
import { isNil, collect } from "./utils";

type Token = string;
type Config = Record<string, Record<string, Token>>;
type StyleProps<Config> = { [K in keyof Config]: keyof Config[K] };

type ComponentProps<T extends keyof HTMLElementTagNameMap> = DetailedHTMLProps<
  HTMLAttributes<HTMLElementTagNameMap[T]>,
  HTMLElementTagNameMap[T]
>;

interface Wind {
  div: <T extends Config>(
    config?: T | Token,
    ...tokens: Token[]
  ) => (props: ComponentProps<"div"> & Partial<StyleProps<T>>) => JSX.Element;
}

const createWind = (): Wind => {
  return {
    div: (config = "", ...tokens) => {
      const hasConfig = typeof config !== "string";
      const configKeys = hasConfig ? Object.keys(config ?? {}) : [];

      return (props) => {
        const [styleProps, componentProps] = collect(
          props,
          hasConfig ? configKeys : []
        );

        const styleTokens = hasConfig
          ? Object.entries(config).map(([key, item]) => {
              return styleProps[key]
                ? item[styleProps[key]]
                : Object.values(item)[0];
            })
          : [config];

        const classNames = [componentProps.className, ...styleTokens, ...tokens]
          .filter((item) => !isNil(item))
          .join(" ");

        return createElement("div", {
          ...componentProps,
          ...(classNames.length ? { className: classNames } : {}),
        });
      };
    },
  };
};

export const wind = createWind();
