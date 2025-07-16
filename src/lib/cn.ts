import clsx from "clsx";

// Utility function for conditional class names
export const cn = (...classes: (string | undefined)[]) =>
  clsx(classes.filter(Boolean).join(" "));
