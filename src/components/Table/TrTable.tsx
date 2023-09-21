import { ComponentProps, ReactNode } from "react"

type TrTableProps = {
    children: ReactNode
} & ComponentProps<'tr'>

export const TrTable = ({children, className, ...props}: TrTableProps) => {
    return <tr { ...props}  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${className}`}>
        {children}
    </tr>
}