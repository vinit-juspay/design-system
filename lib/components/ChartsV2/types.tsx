import { ReactNode } from "react";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type DataPoint = {
  primary: {
    label: string;
    val: number;
  };
  aux?: {
    label: string;
    val: number;
  }[];
};

export enum ChartLegendPositionV2 {
  TOP = 'top',
  RIGHT = 'right',
}

export enum ChartTypeV2 {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
}

export type NewNestedDataPoint = {
  name: string;
  data: {
    [key: string]: DataPoint;
  };
};

export interface RenderChartProps {
  flattenedData: FlattenedDataPoint[];
  chartType: ChartTypeV2;
  hoveredKey: string | null;
  lineKeys: string[];
  colors: string[];
  setHoveredKey: (key: string | null) => void;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: NewNestedDataPoint[];
  selectedKeys: string[];
}

export interface ChartsV2Props {
  chartType?: ChartTypeV2;
  data: NewNestedDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  metrics?: string[];
  slot1?: ReactNode;
  slot2?: ReactNode;
  slot3?: ReactNode;
  legendPosition?: ChartLegendPositionV2;
  chartHeaderSlot: ReactNode;
}

export type FlattenedDataPoint = {
  name: string;
  [key: string]: number | string;
};

export type ChartHeaderPropsV2 = {
  slot1: React.ReactNode;
  slot2: React.ReactNode;
  slot3: React.ReactNode;
  chartHeaderSlot: ReactNode;
};

export type ChartLegendsPropsV2 = {
  chartContainerRef: React.RefObject<HTMLDivElement>;
  keys: string[];
  colors: string[];
  handleLegendClick: (key: string) => void;
  handleLegendEnter: (key: string) => void;
  handleLegendLeave: () => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  hoveredKey: string | null;
  activeKeys: string[] | null;
  stacked?: boolean;
};

export interface CustomTooltipV2Props extends TooltipProps<ValueType, NameType> {
  hoveredKey: string | null;
  originalData: NewNestedDataPoint[];
  setHoveredKey: (key: string) => void;
  chartType: ChartTypeV2;
  selectedKeys: string[];
}