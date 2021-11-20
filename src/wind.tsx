import { createElement, ForwardedRef, forwardRef, ReactElement } from "react";
import { isNil, collect } from "./utils";

type Token = string;
type Config = Record<string, Record<string, Token>>;
type StyleProps<Config> = { [K in keyof Config]: keyof Config[K] };
type Elements = keyof JSX.IntrinsicElements;

interface WindComponent<T extends Config, K extends Elements> {
  (props: JSX.IntrinsicElements[K] & Partial<StyleProps<T>>): ReactElement;
}

type Wind<T0 extends Config = {}> = {
  [K in Elements]: <T extends Config>(
    config?: T | Token,
    ...tokens: Token[]
  ) => WindComponent<T & T0, K>;
} & {
  extend: <T extends Config, K extends Elements>(
    Component: WindComponent<T, K>
  ) => Wind<T>;
};

function createWindComponent<TagName extends Elements, T extends Config>(
  tagName: TagName,
  config?: T | Token,
  ...tokens: Token[]
): WindComponent<T, TagName> {
  const hasConfig = typeof config !== "string";
  const configKeys = hasConfig ? Object.keys(config ?? {}) : [];

  const Component = (
    props: JSX.IntrinsicElements[TagName] & Partial<StyleProps<T>>,
    ref: ForwardedRef<TagName>
  ) => {
    const [styleProps, componentProps] = collect(
      props,
      hasConfig ? configKeys : []
    );

    const styleTokens = hasConfig
      ? Object.entries(config ?? {}).map(([key, item]) => {
          return styleProps[key]
            ? item[styleProps[key]]
            : Object.values(item)[0];
        })
      : [config];

    const classNames = [componentProps.className, ...styleTokens, ...tokens]
      .filter((item) => !isNil(item))
      .join(" ");

    return createElement(tagName, {
      ref,
      ...componentProps,
      ...(classNames.length ? { className: classNames } : {}),
    });
  };

  const _Component = forwardRef(Component);
  (_Component as any).windConfig = hasConfig ? config : undefined;
  (_Component as any).windTokens = hasConfig ? tokens : [...tokens, config];
  _Component.displayName = `Wind${tagName}`;

  return _Component as any as WindComponent<T, TagName>;
}

export const createWind = <T extends Config = {}, K0 extends Elements = "div">(
  Component?: WindComponent<T, K0>
): Wind<T> => {
  return new Proxy(
    {},
    {
      get: (_, prop: Elements | "extend", __) => {
        if (prop === "extend") {
          return <T extends Config, K extends Elements>(
            Component: WindComponent<T, K>
          ) => createWind(Component);
        }
        return <T extends Config>(config: T | Token, ...tokens: Token[]) => {
          if (!Component) {
            return createWindComponent(prop, config, ...tokens);
          }
          const inheritConfig = (Component as any).windConfig;
          const inheritTokens = (Component as any).windTokens || [];
          const noConfig = typeof config === "string";
          const noInheritConfig = typeof inheritConfig === "string";

          let finalConfig;
          let finalTokens = [...tokens, ...inheritTokens];

          if (noConfig && noInheritConfig) {
            finalConfig = {};
            finalTokens.push(`${inheritConfig} ${config}`);
          }

          if (noInheritConfig) {
            finalTokens.push(inheritConfig);
          } else {
            finalConfig = { ...finalConfig, ...inheritConfig };
          }

          if (noConfig) {
            finalTokens.push(config);
          } else {
            finalConfig = { ...finalConfig, ...config };
          }

          return createWindComponent(prop, finalConfig, ...finalTokens);
        };
      },
    }
  ) as Wind<T>;
};

export const wind = createWind();
