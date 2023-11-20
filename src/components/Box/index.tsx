import React, { ComponentProps, ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
} & ComponentProps<"div">;

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <div
      {...props}
      className={`block rounded-xl bg-theme-light.50 border-primary-third-tone dark:border-gray-800 dark:bg-theme-dark.150 p-8 shadow-xl transition dark:hover:border-primary/10 hover:shadow-theme-light.400/10 dark:hover:shadow-theme-dark.200/10 ${className}`}
    >
      {children}
    </div>
  );
}
