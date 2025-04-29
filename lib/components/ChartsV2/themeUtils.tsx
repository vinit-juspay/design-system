import { themeConfig } from '../../themeConfig';
import { ChartLegendPositionV2 } from './types';

export const getChartContainer = () => {
  return themeConfig.euler.chart.base.chartContainer;
};

export const getChartContentContainer = (legendPosition: ChartLegendPositionV2) => {
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
