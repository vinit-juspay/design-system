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
  chartHeaderSlot: ReactNode;
}


export type ChartLegendsProps = {
  chartContainerRef: React.RefObject<HTMLDivElement>;
  keys: string[];
  activeKeys: string[] | null;
  handleLegendClick: (dataKey: string) => void;
  colors: string[];
  setSelectedKeys: (keys: string[]) => void;
  stacked?: boolean;
  onReset: () => void;
  handleLegendEnter: (dataKey: string) => void;
  handleLegendLeave: () => void;
  hoveredKey: string | null;
}


export type ChartHeaderProps = {
  slot1: React.ReactNode;
  slot2: React.ReactNode;
  slot3: React.ReactNode;
  chartHeaderSlot: ReactNode;
}
