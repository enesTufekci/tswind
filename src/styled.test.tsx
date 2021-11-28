import React from "react";
import { styled } from "./styled";
import { screen, render, fireEvent } from "@testing-library/react";

describe("styled", () => {
  test("no flags and tokens", () => {
    const Div = styled.div();
    const { container } = render(<Div />);
    expect(container.innerHTML).toEqual("<div></div>");
  });

  test("single token", () => {
    const Div = styled.div("flex");
    const { container } = render(<Div />);
    expect(container.innerHTML).toEqual('<div class="flex"></div>');
  });

  test("single array of tokens", () => {
    const Div = styled.div(["flex", "col"]);
    const { container } = render(<Div />);
    expect(container.innerHTML).toEqual('<div class="flex col"></div>');
  });

  test("single array of tokens and tokens", () => {
    const Div = styled.div(["flex", "col"], "bg-red", "p-2", [
      "border-2",
      "border-red",
    ]);
    const { container } = render(<Div />);
    expect(container.innerHTML).toEqual(
      '<div class="flex col bg-red p-2 border-2 border-red"></div>'
    );
  });

  test("single flag", () => {
    const Div = styled.div({
      direction: { row: "row", col: "col" },
    });
    const { container } = render(
      <>
        <Div />
        <Div direction="col" />
      </>
    );
    expect(container.innerHTML).toEqual(
      '<div class="row"></div><div class="col"></div>'
    );
  });

  test("multiple flags", () => {
    const Div = styled.div({
      direction: { row: "row", col: "col" },
      bg: { dark: "bg-dark", light: "bg-light" },
    });
    const { container } = render(
      <>
        <Div />
        <Div direction="col" />
        <Div bg="light" />
        <Div direction="col" bg="light" />
      </>
    );
    expect(container.querySelectorAll("div").length).toEqual(4);
    expect(container.querySelectorAll("div").item(0).className).toEqual(
      "row bg-dark"
    );
    expect(container.querySelectorAll("div").item(1).className).toEqual(
      "col bg-dark"
    );
    expect(container.querySelectorAll("div").item(2).className).toEqual(
      "row bg-light"
    );
    expect(container.querySelectorAll("div").item(3).className).toEqual(
      "col bg-light"
    );
  });

  test("single flag and token", () => {
    const Div = styled.div(
      {
        direction: { row: "row", col: ["col", "foo bar"] },
      },
      ["flex bg-red-100"]
    );
    const { container } = render(
      <>
        <Div />
        <Div direction="col" />
      </>
    );
    const divs = container.querySelectorAll("div");
    expect(divs.item(0).className).toEqual("flex bg-red-100 row");
    expect(divs.item(1).className).toEqual("flex bg-red-100 col foo bar");
  });

  test("ref", async () => {
    const Input = styled.input();

    const fn = jest.fn();
    const Component = () => {
      const [value, setValue] = React.useState("");

      const ref = React.createRef<HTMLInputElement>();
      return (
        <Input
          onChange={(event) => {
            const { value } = event.target;
            fn(ref.current?.value);
            setValue(value);
          }}
          value={value}
          ref={ref}
          data-testid="input"
        ></Input>
      );
    };

    render(<Component />);

    const input = await screen.findByTestId("input");
    expect(input).toBeTruthy();
    fireEvent.change(input, {
      target: {
        value: "hello",
      },
    });
    expect(fn).toHaveBeenNthCalledWith(1, "hello");
  });
});
