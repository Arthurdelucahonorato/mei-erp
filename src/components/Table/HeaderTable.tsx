import { ComponentProps, ReactNode } from "react"

type HeaderTableProps = {
    headers: string[]
} & ComponentProps<'thead'>

export const HeaderTable = ({ headers, className, ...props }: HeaderTableProps) => {
    return <thead {...props} className={`sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-theme-dark.100 dark:text-gray-400 ${className}`}>
        <tr>
            {headers.map((head, index) =>
                <th key={index} scope="col" className="p-4">
                    {head}
                </th>
            )
            }
        </tr>
    </thead>
}
