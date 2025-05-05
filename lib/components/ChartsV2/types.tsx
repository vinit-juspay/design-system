import { ReactNode } from 'react';

type DataPoint = {
  primary: {
    label: string;
    val: number;
  };
  aux?: {
    label: string;
    val: string;
  }[];
};

export type NewNestedDataPoint = {
  name: string;
  data: {
    [key: string]: DataPoint;
  };
};

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

export enum ChartTypeV2 {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
}

export enum ChartLegendPositionV2 {
  TOP = 'top',
  RIGHT = 'right',
}

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
  // activeKeys: string[] | null;
  // handleLegendClick: (dataKey: string) => void;
  // setSelectedKeys: (keys: string[]) => void;
  // stacked?: boolean;
  // onReset: () => void;
  // handleLegendEnter: (dataKey: string) => void;
  // handleLegendLeave: () => void;
  // hoveredKey: string | null;
};
