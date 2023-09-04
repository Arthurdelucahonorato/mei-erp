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
    default: "bg-altGray text-code text-white hover:bg-[#263B50]",
    ghost:
      "bg-transparent border-white text-white border hover:border-opacity-50",
    primary: "bg-accent text-primary hover:bg-[#FFAC6B]",
  };

  return (
    <button
      {...props}
      className={`w-full bg-gray-800 duration-200 hover:bg-gray-900 text-white text-sm py-2.5 px-4 font-semibold rounded focus:outline-none focus:shadow-outline ${variantClasses[variant]}`}
      type="button"
    >
      {children}
    </button>
  );
}
