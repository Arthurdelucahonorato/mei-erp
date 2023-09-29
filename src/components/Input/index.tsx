import React, { forwardRef, ComponentProps } from "react";

type InputProps = {
  label?: string;
  htmlFor?: string;
  errorMessage?: string;
  required?: boolean;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ htmlFor, label, errorMessage, className, required, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex flex-row">
          <label
            htmlFor={htmlFor}
            className="block text-gray-700 dark:text-white text-sm font-semibold"
          >
            {label}
          </label>
          {required && (
            <p className="text-red-500 text-sm font-semibold pl-1">{"*"}</p>
          )}
        </div>
        <input
          {...props}
          ref={ref}
          id={htmlFor}
          className={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 ${errorMessage && " border-[1px] border-red-500"}`}
        />
        {errorMessage && (
          <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>
        )}
      </div>
    );
  }
);
