import { TooltipSize, TooltipArrow } from './Tooltip.types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../lib/utils';

/**
 * Generates the appropriate class names for a tooltip based on its size
 * 
 * @param {TooltipSize} size - The size of the tooltip (sm or lg)
 * @returns {string} Combined Tailwind CSS class names for the tooltip
 */
export const getTooltipClassNames = (size: TooltipSize): string => {
  const theme = themeConfig.euler.tooltip;
  const tooltipSize = theme.sizes[size];

  return cn(
    theme.baseStyles,
    tooltipSize.padding,
    tooltipSize.fontSize,
    tooltipSize.borderRadius,
    tooltipSize.maxWidth
  );
};

/**
 * Generates the appropriate class names for a tooltip arrow based on its position
 * 
 * @param {TooltipArrow} arrow - The position of the arrow
 * @returns {object} Object containing arrow classes and side/align props for Radix UI
 */
export const getArrowStyles = (arrow: TooltipArrow) => {
  const theme = themeConfig.euler.tooltip;
  
  // Default positioning (top arrow)
  let side = 'top';
  let align = 'center';
  let showArrow = true;
  
  switch (arrow) {
    case 'right':
      side = 'left';
      align = 'center';
      break;
    case 'left':
      side = 'right';
      align = 'center';
      break;
    case 'bottomCenter':
      side = 'bottom';
      align = 'center';
      break;
    case 'bottomLeft':
      side = 'bottom';
      align = 'start';
      break;
    case 'bottomRight':
      side = 'bottom';
      align = 'end';
      break;
    case 'topCenter':
      side = 'top';
      align = 'center';
      break;
    case 'topLeft':
      side = 'top';
      align = 'start';
      break;
    case 'topRight':
      side = 'top';
      align = 'end';
      break;
    case 'none':
      showArrow = false;
      break;
    default:
      // Default is top with center alignment
      break;
  }

  return {
    arrowClassName: cn(theme.arrow.baseStyles),
    side,
    align,
    showArrow
  };
};

/**
 * Generates the appropriate class names for the content container of the tooltip
 * 
 * @returns {string} Combined Tailwind CSS class names for the tooltip content
 */
export const getContentContainerClassNames = (): string => {
  const theme = themeConfig.euler.tooltip;
  
  return cn(
    'flex',
    theme.content.baseStyles
  );
}; 