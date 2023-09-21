import { ComponentProps, ReactNode } from "react"

type BodyTableProps = {
    children: ReactNode
} & ComponentProps<'tbody'>

export const BodyTable = ({children, className, ...props}:BodyTableProps) => {
    return <tbody {...props} className={`overflow-y-auto bg-red-400 ${className}`}>
        {children}
    </tbody>
}