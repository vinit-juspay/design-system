import { themeConfig } from '../../themeConfig';
import { ChartLegendPosition } from './types';

const GREEN = '#00C951'; // jp-green-500
const BLUE = '#2B7FFF';  // jp-primary-500
const RED = '#FB2C36';   // jp-red-500
const YELLOW = '#FF8904'; // jp-orange-400
const PURPLE = '#AD46FF'; // jp-purple-500
const CYAN = '#00D492';  // jp-green-400

export const DEFAULT_COLORS = [GREEN, BLUE, RED, YELLOW, PURPLE, CYAN];

export const getChartContainer = () => {
  return themeConfig.euler.chart.base.chartContainer;
};

export const getChartContentContainer = (legendPosition: ChartLegendPosition) => {
  return themeConfig.euler.chart.base.chartContentContainer[legendPosition];
};

export const getChartHeaderContainer = () => {
  return themeConfig.euler.chart.base.chartHeader.container;
};

export const getChartSlotContainer = () => {
  return themeConfig.euler.chart.base.chartHeader.slotContainer;
};

export const getChartLegendContainer = () => {
  return themeConfig.euler.chart.base.chartLegend.container;
};

export const getChartLegendItemsContainer = () => {
  return themeConfig.euler.chart.base.chartLegend.legendItemsContainer;
};

export const getChartLegendItem = () => {
  return themeConfig.euler.chart.base.chartLegend.legendItem;
};

export const getChartLegendMarker = () => {
  return themeConfig.euler.chart.base.chartLegend.legendMarker;
};

export const getChartLegendResetButton = () => {
  return themeConfig.euler.chart.base.chartLegend.resetButton;
};

export const getChartStackedLegendContainer = () => {
  return themeConfig.euler.chart.base.chartLegend.stackedLegendContainer;
};

export const getChartTooltipContainer = () => {
  return themeConfig.euler.chart.base.tooltip.container;
};

export const getChartLegendItemText = () => {
  return themeConfig.euler.chart.base.chartLegend.legendItemText;
};

export const getChartConfig = () => {
  return themeConfig.euler.chart.config;
};
