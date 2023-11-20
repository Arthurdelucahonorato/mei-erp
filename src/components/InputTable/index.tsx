import React, { forwardRef, ComponentProps } from "react";
import Lov from '@/components/Lov'

type InputProps = {
    htmlFor?: string;
    errorMessage?: string;
    required?: boolean;
    lovButton?: LovType;
    textDirection?: string;
} & ComponentProps<"input">;

export const InputTable = forwardRef<HTMLInputElement, InputProps>(
    ({ htmlFor, errorMessage, className, required, lovButton, textDirection, ...props }, ref) => {
        return (
            <div className={`flex flex-col py-1.5 ${className}`}>
                <div className="flex flex-row">
                    <input
                        {...props}
                        ref={ref}
                        id={htmlFor}
                        className={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-200 dark:bg-theme-dark.100 leading-tight focus:outline-none focus:shadow-outline h-10 ${errorMessage && " border-[1px] border-red-500"} ${textDirection}`}
                    />
                    {lovButton &&
                        <Lov title={lovButton.title} listLabels={lovButton.listLabels} listValues={lovButton.listValues} onClick={lovButton.onClick} />
                    }
                </div>
            </div>
        );
    }
);
