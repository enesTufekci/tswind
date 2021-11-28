import { generateClassNames } from "./generateClassNames";
import { createElement, ForwardedRef, forwardRef, useContext } from "react";
import { Elements, Flags, Token } from "./types";
import { Context } from "./context";

type StyleProps<T extends Flags> = {
  [K in keyof T]: keyof T[K];
};

type WindComponentProps<T extends Flags, K extends Elements> = Partial<
  StyleProps<T>
> &
  JSX.IntrinsicElements[K] & { as?: Elements };

export type WindComponent<T extends Flags, K extends Elements> = (
  props: WindComponentProps<T, K>
) => JSX.Element;

interface CreateComponentParams {
  element: Elements;
  flags: Flags;
  tokens: Token[];
}

export function createComponent<T extends Flags, K extends Elements>({
  element,
  flags,
  tokens,
}: CreateComponentParams) {
  const _Component = (
    props: WindComponentProps<T, K>,
    ref: ForwardedRef<K>
  ) => {
    const { processor } = useContext(Context);
    const { as = element, ...rest } = props;
    //TODO: fix
    const htmlTag = (as ? as : element) as keyof JSX.IntrinsicElements;
    let flagProps: Record<string, any> = {};
    let componentProps: Record<string, any> = {};

    for (const key in rest) {
      if (Object.keys(flags).includes(key)) {
        flagProps[key] = rest[key];
      } else {
        componentProps[key] = rest[key];
      }
    }

    const className = generateClassNames({
      flags,
      flagProps,
      tokens,
      themeTokenProcessor: processor,
    }).trim();

    return createElement(htmlTag, {
      ref,
      ...(className ? { className } : {}),
      ...componentProps,
    });
  };

  const Component = forwardRef(_Component) as any;
  (Component as any)._flags = flags;
  (Component as any)._tokens = tokens;

  return Component as WindComponent<T, K>;
}
