import * as React from "react";

import { createElement, HTMLAttributes, DetailedHTMLProps } from "react";

type Elements = HTMLElementTagNameMap;
type Config = { [key: string]: { [key: string]: string } };
type Props<T extends Config> = { [key in keyof T]: keyof T[key] };
type Token = string;

interface WindComponent<K extends keyof Elements> {
  <T extends Config>(
    props: DetailedHTMLProps<HTMLAttributes<Elements[K]>, Elements[K]> &
      Partial<Props<T>>
  ): JSX.Element;
  computedClasses: string;
}

interface WindComponentFactory<K extends keyof Elements, R extends Config> {
  <T extends Config>(
    input: (T & R) | Token,
    ...tokens: Token[]
  ): WindComponent<K>;
}

type Wind<T extends Config = {}> = {
  [K in keyof Elements]: WindComponentFactory<K, T>;
} & {
  extend: <K extends keyof Elements>(
    component: WindComponent<K>
  ) => Omit<Wind<T>, "extend">;
};

export const wind: Wind = new Proxy(Object.create({}), {
  get: function (_, tagName: string, __) {
    return create(tagName as any);
  },
});

wind.extend = (() => {}) as any;

function create<T extends keyof Elements>(tagName: T) {
  return function <K extends Config>(input: K | Token, ...tokens: Token[]) {
    console.log(input, tokens, tagName);
    const computedClasses: string[] = [...tokens];
    return (props: Elements[T] & Partial<Props<K>>) => {
      return createElement(tagName, {
        ...props,
        className: [props.className, ...computedClasses].join(" "),
      });
    };
  };
}

const Button = wind.button(
  {
    variant: {
      primary: "",
      secondary: "",
    },
  },
  "bg-gray-100"
);

export const Stack = wind.div("flex flex-col");

export const Rows = wind.div("flex");

const Input = wind.input({ value: { foo: "" } }, "bg-gray-100");

export const BetterInput = wind.extend(Button);

export const Test = () => (
  <>
    <Button variant="secondary" />
    <Input />
  </>
);
