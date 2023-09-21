import { ComponentProps, ReactNode } from "react"

type TdTableProps = {
    children: ReactNode
} & ComponentProps<'td'>

export const TdTable = ({children, className, ...props}: TdTableProps) => {
    return <td { ...props} className={`w-4 p-4 ${className}`}>
        {children}
    </td>
}