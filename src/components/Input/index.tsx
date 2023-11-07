import React, { forwardRef, ComponentProps } from "react";
import Lov from '@/components/Lov'

type InputProps = {
  label?: string;
  htmlFor?: string;
  errorMessage?: string;
  required?: boolean;
  lovButton?: LovType;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ htmlFor, label, errorMessage, className, required, lovButton, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex flex-row">
          <label
            htmlFor={htmlFor}
            className="block text-gray-700 dark:text-white text-sm font-semibold truncate"
          >
            {label}
          </label>
          {required && (
            <p className="text-red-500 text-sm font-semibold pl-1">{"*"}</p>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <input
            {...props}
            ref={ref}
            id={htmlFor}
            className={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-200 dark:bg-theme-dark.100 leading-tight focus:outline-none focus:shadow-outline h-10 ${errorMessage && " border-[1px] border-red-500"}`}
          />
          {lovButton &&
            <Lov title={lovButton.title} listLabels={lovButton.listLabels} listValues={lovButton.listValues} onClick={lovButton.onClick} />
          }
        </div>

        {errorMessage && (
          <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>
        )}
      </div>
    );
  }
);
