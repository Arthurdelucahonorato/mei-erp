import { ComponentProps, ReactNode } from "react"

type TableProps = {
    children: ReactNode
} & ComponentProps<'table'>

export const RootTable = ({ children, className, ...props }: TableProps) => {
    return <table {...props} className={`w-full sm:rounded-lg text-sm text-left text-gray-500 dark:text-gray-400 ${className}`}>
        {children}
    </table>
}