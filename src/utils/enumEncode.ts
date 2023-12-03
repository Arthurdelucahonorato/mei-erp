export function enumEncode(enumObj: any, name: string): string {
    const keys = Object.keys(enumObj);
    const enumValues = keys.map(key => ({ value: key, name: enumObj[key] }));
    return enumValues.find((v) => v.name === name)?.value || name
}