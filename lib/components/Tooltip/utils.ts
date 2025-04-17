import { themeConfig } from "../../themeConfig";
import { cn } from "../../utils";
import { TooltipSize, TooltipSlotDirection } from "./types";

export const getTooltipClassNames = (size: TooltipSize) : string => {
  const tooltipTheme = themeConfig.euler.tooltip;
  const tooltipSize = tooltipTheme.sizes[size];

  return cn(
    tooltipTheme.baseStyles,
    tooltipSize.padding,
    tooltipSize.fontSize,
    tooltipSize.borderRadius,
    tooltipSize.maxWidth
  )
}

export const getArrowClassNames = () : string => {
  const tooltipTheme = themeConfig.euler.tooltip;

  return cn(tooltipTheme.arrow.baseStyles);
}

export const getSlotClassNames = (direction: TooltipSlotDirection, size: TooltipSize) : string => {
  const tooltipTheme = themeConfig.euler.tooltip;
  const tooltipSize = tooltipTheme.sizes[size];

  return cn(tooltipSize.slotSize, "flex items-center justify-center", direction === TooltipSlotDirection.LEFT ? 'mr-1.5' : 'ml-1.5');
}