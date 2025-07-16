import { cn } from "@/lib/cn";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-200",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
