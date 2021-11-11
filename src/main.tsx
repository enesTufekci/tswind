import * as React from "react";

import { createElement, HTMLAttributes, DetailedHTMLProps } from "react";

type Elements = HTMLElementTagNameMap;

type Input = { [key: string]: { [key: string]: string } };

type Output<T extends Input> = { [key in keyof T]: keyof T[key] };

type Token = string;

interface WindComponent<K extends keyof Elements> {
  <T extends Input>(
    props: DetailedHTMLProps<HTMLAttributes<Elements[K]>, Elements[K]> &
      Partial<Output<T>>
  ): JSX.Element;
  computedClasses: string;
}

interface WindComponentFactory<K extends keyof Elements> {
  <T extends Input>(input: T | Token, ...tokens: Token[]): WindComponent<K>;
}

type Wind = {
  [K in keyof Elements]: WindComponentFactory<K>;
} & {
  extend: <K extends keyof Elements>(
    component: WindComponent<K>
  ) => WindComponentFactory<K>;
};

export const wind: Wind = new Proxy(Object.create({}), {
  get: function (_, prop: string, __) {
    if (prop === "a") {
      return "world";
    }
    return create(prop as any);
  },
});

function create<T extends keyof Elements>(tagName: T) {
  return function <K extends Input>(input: K | Token, ...tokens: Token[]) {
    console.log(input, tokens, tagName);
    const computedClasses: string[] = [...tokens];
    return (props: Elements[T] & Partial<Output<K>>) => {
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

export const BetterInput = wind.extend(Button)("hello");

export const Test = () => (
  <>
    <Button variant="secondary" />
    <Input />
  </>
);
