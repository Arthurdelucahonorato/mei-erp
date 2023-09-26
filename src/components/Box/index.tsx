import React, { ComponentProps, ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
} & ComponentProps<"div">;

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <div
      {...props}
      className={`block rounded-xl bg-primary-fifth-tone border-primary-third-tone dark:border-gray-800 dark:bg-gray-900 p-8 shadow-xl transition dark:hover:border-primary/10 hover:shadow-primary/10 ${className}`}
    >
      {children}
    </div>
  );
}
