import { ComponentProps, ReactNode } from "react"

type TrTableProps = {
    children: ReactNode
} & ComponentProps<'tr'>

export const TrTable = ({ children, className, ...props }: TrTableProps) => {
    return <tr {...props} className={`bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.200 hover:bg-gray-50 dark:hover:bg-theme-dark.200 ${className}`}>
        {children}
    </tr>
}