import React from "react";

type RevenuesBoxProps = {
  title: string;
  value: number;
  variationPercent?: number;
};

export function RevenuesBox({
  title,
  value,
  variationPercent,
}: RevenuesBoxProps) {
  return (
    <article className="rounded-lg h-full flex flex-col items-start justify-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <p className="text-2xl font-medium mt-2 text-gray-500">R$ {value}</p>
      </div>
      {variationPercent && (
        <div className="flex gap-2 mt-2 items-center">
          <div
            className={`flex gap-1  p-1 ${
              variationPercent <= 0
                ? "text-red-600 bg-red-100"
                : "text-green-600 bg-green-100"
            }  rounded`}
          >
            {variationPercent <= 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            )}
            <p className="flex gap-2 text-xs">
              <span className="font-medium "> {variationPercent}%</span>
            </p>
          </div>

          <span className="text-gray-500 text-xs">
            {" "}
            Comparado ao mês anterior{" "}
          </span>
        </div>
      )}
    </article>
  );
}
