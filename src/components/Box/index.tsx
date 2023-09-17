import React, { ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
};

export function Box({ children }: BoxProps) {
  return (
    <div className="block rounded-xl bg-primary-fifth-tone border-primary-third-tone dark:border-gray-800 dark:bg-gray-900 p-8 shadow-xl transition dark:hover:border-primary/10 hover:shadow-primary/10">
      {children}
    </div>
  );
}