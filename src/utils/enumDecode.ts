export function enumDecode(enumObj: any, value: string): string {
    const keys = Object.keys(enumObj);
    const enumValues = keys.map(key => ({ value: key, name: enumObj[key] }));
    return enumValues.find((v) => v.value === value)?.name || value
}