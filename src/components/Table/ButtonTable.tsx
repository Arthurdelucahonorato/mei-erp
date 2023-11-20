import { ComponentProps, ReactNode } from "react";

type ButtonTableProps = {
  children: ReactNode;
  variant?: "default" | "red" | "primarySecondary";
} & ComponentProps<"button">;

export const ButtonTable = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonTableProps) => {
  const variantClasses = {
    default: "text-gray-500 dark:text-white bg-gray-100 dark:bg-theme-dark.100",
    red: "bg-red-600 text-white",
    primarySecondary: "bg-primary text-white dark:bg-secondary",
  };
  return (
    <button
      {...props}
      className={`font-medium py-2 px-4 rounded-lg hover:scale-110 transition-transform ${className} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};
