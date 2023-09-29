import { ComponentProps, ReactNode } from "react"

type TdTableProps = {
    children: ReactNode,
    isButton?: boolean
} & ComponentProps<'td'>

export const TdTable = ({ children, className, isButton, ...props }: TdTableProps) => {
    return <td {...props} className={` ${isButton ? "w-1" : "w-4 p-4 whitespace-nowrap"} ${className}`}>
        {children}
    </td>
}