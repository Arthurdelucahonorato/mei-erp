import React, { forwardRef, ComponentProps } from "react";

type TextareaProps = {
  label?: string;
  htmlFor?: string;
  errorMessage?: string;
} & ComponentProps<"textarea">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ htmlFor, label, errorMessage, className, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label
          htmlFor={htmlFor}
          className="block text-gray-700 dark:text-white text-sm font-semibold"
        >
          {label}
        </label>
        <textarea
          {...props}
          ref={ref}
          id={htmlFor}
          className={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 ${className}`}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
        )}
      </div>
    );
  }
);
