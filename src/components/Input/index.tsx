import React, { forwardRef, ComponentProps } from "react";

type InputProps = {
  label?: string;
  htmlFor?: string;
  errorMessage?: string;
} & ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ htmlFor, label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={htmlFor}
          className="block text-gray-700 text-sm font-semibold"
        >
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          id={htmlFor}
          className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
        )}
      </div>
    );
  }
);
