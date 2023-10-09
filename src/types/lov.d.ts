type LovType = {
    children?: ReactNode;
    title: String;
    listValues: any[];
    listLabels: string[];
    onClick: (selectedValue: any[]) => void;
}