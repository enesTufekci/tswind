import React from "react";
import { render } from "@testing-library/react";
import { createComponent } from "./createComponent";

describe("createComponent", () => {
  it("test", () => {
    const Div = createComponent({
      element: "div",
      flags: {},
      tokens: ["t1"],
    });
    const { container } = render(<Div></Div>);
    expect(container.innerHTML).toEqual('<div class="t1"></div>');
  });
});
