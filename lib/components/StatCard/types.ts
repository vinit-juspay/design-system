import type { ReactNode } from 'react';

export enum StatCardVariant {
  LINE = 'line',
  PROGRESS_BAR = 'progress-bar',
  BAR = 'bar',
  NUMBER = 'number',
}

export enum ChangeType {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export interface ChartDataPoint {
  value: number;
  label: string;
}

export interface StatCardChange {
  value: number;
  type: ChangeType;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: StatCardChange;
  subtitle?: string;
  variant: StatCardVariant;
  chartData?: ChartDataPoint[];
  progressValue?: number;
  className?: string;
  titleIcon?: ReactNode;
  actionIcon?: ReactNode;
  helpIconText?: string;
}
