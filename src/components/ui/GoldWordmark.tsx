import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type PolymorphicProps<T extends ElementType> = {
  /** Render as a different HTML element (e.g., "span", "h2"). */
  as?: T;
  /** Wordmark text to display. */
  text: string;
  /** Apply a gold gradient text treatment. */
  animated?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export default function GoldWordmark<T extends ElementType = "h1">(
  { as, text, animated = false, className, ...rest }: PolymorphicProps<T>
) {
  const Tag = (as || "h1") as ElementType;

  return (
    <Tag
      className={clsx(
        "font-display tracking-tight",
        animated
          ? "bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gold-700))] via-[hsl(var(--gold-500))] to-[hsl(var(--gold-700))]"
          : undefined,
        className
      )}
      {...rest}
    >
      {text}
    </Tag>
  );
}
