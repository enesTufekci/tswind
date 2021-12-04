import React, { ForwardedRef } from "react";
import { ComponentProps, createContext, forwardRef } from "react";
import { WindComponent } from "./createComponent";
import { Elements, Flags } from "./types";

interface RefContextValue {
  ref: ForwardedRef<any>;
}
export const RefContext = createContext({} as RefContextValue);

export function withRef<T extends Flags, K extends Elements>(
  Component: WindComponent<T, K>,
  displayName?: string
) {
  const _Component = (
    props: ComponentProps<typeof Component>,
    ref: ForwardedRef<K>
  ) => {
    return (
      <RefContext.Provider value={{ ref }}>
        <Component {...props} />
      </RefContext.Provider>
    );
  };

  _Component.displayName = displayName || (Component as any).displayName;
  return forwardRef(_Component);
}
