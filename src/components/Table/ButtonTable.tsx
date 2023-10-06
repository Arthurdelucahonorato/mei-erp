import { ComponentProps, ReactNode } from "react"

type ButtonTableProps = {
    children: ReactNode
} & ComponentProps<'button'>

export const ButtonTable = ({ children, className, ...props }: ButtonTableProps) => {
    return <button {...props} className={`font-medium text-gray-500 dark:text-white bg-gray-100 dark:bg-gray-700 p-2 rounded-xl aspect-square ${className}`}>
        {children}
    </button>
}