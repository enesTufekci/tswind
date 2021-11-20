# tswind

Wind is a small utility library to make working with React and Tailwindcss easier and more maintainable.

## Motivation

This looks alright.

```tsx
const Button = ({ children, ...buttonProps }) => (
  <button
    className="bg-red-100 font-bold tracking-wide px-8 py-4 text-sm"
    {...buttonProps}
  >
    {children}
  </button>
);
```

What about this?

```tsx
const Button = ({ children, variant, ...buttonProps }) => (
  <button
    className={`${
      variant === "primary"
        ? "bg-red-100"
        : "bg-transparent border-2 border-red-100"
    } font-bold tracking-wide px-8 py-4 text-sm`}
    {...buttonProps}
  >
    {children}
  </button>
);
```

What about this?!

```tsx
const Button = ({ children, variant, ...buttonProps }) => (
  <button
    className={`${
      variant === "primary"
        ? "bg-red-100"
        : "bg-transparent border-2 border-red-100"
    } ${
      size === "large" ? "py-8" : "py-4  text-sm"
    } font-bold tracking-wide px-8 `}
    {...buttonProps}
  >
    {children}
  </button>
);
```

- React and tailwindcss are amazing tools to build UIs but it is not an easy task to keep components clean, readable and maintainable in a growing project.

- It is not a hard task to put class names together, infact there are a lot of ways to achive such simple task. But using different techniques to create class names for components can lead to inconsistency and refactoring problems.

- tailwindcss provides built-in directives to help code organisation but they only work in `.css` files. Even though this is a very good approach, it negates the advantage of having logic, markup and styling in a single file.

- There are really good CSS-in-JS like libraries use tailwindcss under the hood but they add another tool to the existing tool chain. (Not all of them)

- tswind aims for clean and maintainable code with simple API without compromising on tailwindcss' rapid styling pace.

- Components created with tswind have typescript support, it infers the prop types from variations. In the following example `variant` and `size` props will be typed as `'primary' | 'secondary'` amd `'normal' | 'large'` respectively.

## Example

```tsx
import { wind } from "tswind";

const Button = wind.button(
  {
    variant: {
      primary: "bg-red-100",
      secondary: "bg-transparent border-2 border-red-100",
    },
    size: {
      normal: "py-4 text-sm",
      large: "py-8",
    },
  },
  "font-bold tracking-wide px-8"
);

const Buttons = () => (
  <>
    <Button>Primary</Button>
    <Button size="large">Primary Large</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="secondary" size="large">
      Secondary Large
    </Button>
  </>
);
```

## Installation

```sh
npm i tswind
```

## Prerequisites

Tailwindcss has to be set up in the project. Please follow [this](https://tailwindcss.com/docs/installation) instructions.

## Usage

### Basic component

```tsx
const Button = wind.button("bg-indigo-700 rounded-md shadow-md text-white");
```

### Component with flags

```tsx
const Button = wind.button(
  { variants: { primary: "bg-red-100", secondary: "bg-green-100" } },
  "px-4 py-2"
);
```

### Extending Components

```tsx
const LinkButton = wind.extend(Button).a("text-semibold");
```
