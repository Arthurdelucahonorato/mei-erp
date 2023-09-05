import React, { ComponentProps } from "react";

type ButtonProps = {
  variant?: "default" | "ghost" | "primary";
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "default",
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "bg-gray-800 hover:bg-gray-900",
    ghost:
      "bg-transparent border-gray-600 text-gray-900 border hover:border-opacity-50",
    primary: "bg-accent-second-purple text-gray-900 hover:bg-accent",
  };

  return (
    <button
      {...props}
      className={`w-full duration-200  text-white text-sm py-2.5 px-4 font-semibold rounded focus:outline-none focus:shadow-outline ${variantClasses[variant]}`}
      type="button"
    >
      {children}
    </button>
  );
}
