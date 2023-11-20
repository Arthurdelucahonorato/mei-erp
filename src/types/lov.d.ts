type LovType = {
    children?: ReactNode;
    title: String;
    listValues?: PaginatedResult<any[]>;
    listLabels: string[];
    onClick: (selectedValue: any[]) => void;
}