import React, { ComponentProps } from "react";

type ButtonProps = {
  variant?: "default" | "ghost" | "primary";
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "bg-primary dark:bg-secondary hover:bg-primary/90 text-white",
    ghost:
      "bg-transparent border-white text-white border hover:border-opacity-50 hover:border-primary hover:text-primary",
    primary:
      "bg-primary dark:bg-secondary  text-white hover:bg-primary-second-tone",
  };

  return (
    <button
      {...props}
      className={`w-full duration-200 text-sm py-2.5 px-4 font-semibold rounded focus:outline-none focus:shadow-outline ${className} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
