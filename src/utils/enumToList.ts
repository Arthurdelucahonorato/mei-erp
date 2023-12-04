export function enumToList(enumObj: any): { value: string; name: string }[] {
    const keys = Object.keys(enumObj);
    return keys.map(key => ({ value: key, name: enumObj[key] }));
}