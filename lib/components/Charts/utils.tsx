import { ReactNode } from "react";

export enum ChartType {
    LINE = 'line',
    BAR = 'bar',
    PIE = 'pie'
}

export enum ChartLegendPosition {
    TOP = 'top',
    RIGHT = 'right',
}

export interface NestedDataPoint {
    name: string;
    [key: string]: any;
}

export interface ChartProps {
    type: ChartType;
    data: NestedDataPoint[];
    width?: string | number;
    height?: string | number;
    colors?: string[];
    xAxisLabel?: string;
    yAxisLabel?: string;
    metrics?: string[];
    slot1?: ReactNode;
    slot2?: ReactNode;
    slot3?: ReactNode;
    legendPosition?: ChartLegendPosition;
}


export type ChartLegendsProps = {
    chartContainerRef: React.RefObject<HTMLDivElement>;
    keys: string[];
    activeKeys: string[] | null;
    handleLegendClick: (dataKey: string) => void;
    colors: string[];
    setSelectedKeys: (keys: string[]) => void;
    stacked?: boolean;
}


export type ChartHeaderProps = {
    metrics: string[];
    selectedMetric: string;
    handleMetricChange: (metric: string) => void;
    slot1: React.ReactNode;
    slot2: React.ReactNode;
    slot3: React.ReactNode;
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
    return words.map((word, index) => {
        if (word.toUpperCase() === word && word.length > 1) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
};