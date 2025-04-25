import { NestedDataPoint } from "./types";

const colorMap: Record<string, string> = {
    '#8EC5FF': '#BEDBFF',
    "#00C951": "#B9F8CF",
    "#C27AFF": "#E9D4FF",
    "#FB2C36": "#FFC9C9",
    "#00D492": "#DCFCE7",
    "#2B7FFF": "#DBEAFE",
    "#AD46FF": "#F3E8FF",
    "#FF8904": "#FFEDD4"
}

export const getAltColor = (color: string) => {
    return colorMap[color] || color + '4D'; 
}


export const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return value;
        value = parsedValue;
    }

    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
};

// Transform camelCase to Capitalized Text
export const capitaliseCamelCase = (text: string): string => {
    if (!text) return '';
    const words = text.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
    return words.map((word) => {
        if (word.toUpperCase() === word && word.length > 1) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
};

export const transformData = (data: NestedDataPoint[], keys: string[]): any[] => {
    return data.map(point => {
        const transformed: any = { name: point.name };

        keys.forEach(key => {
            const nestedData = point[key];
            if (nestedData && nestedData.primary && nestedData.primary.val !== undefined) {
                transformed[key] = nestedData.primary.val;
            }
        });

        return transformed;
    });
};

export const getKeys = (data: NestedDataPoint[]): string[] => {
    return (data && data.length > 0
        ? Object.keys(data[0]).filter(key =>
            key !== 'name' &&
            typeof data[0][key] === 'object' &&
            data[0][key] !== null &&
            data[0][key].primary !== undefined)
        : []);
};