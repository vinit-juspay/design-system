import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TooltipSide, TooltipSize, TooltipSlotDirection } from './types';

export const getTooltipClassNames = (size: TooltipSize): string => {
  const tooltipTheme = themeConfig.euler.tooltip;
  const tooltipSize = tooltipTheme.sizes[size];

  return cn(
    tooltipTheme.baseStyles,
    tooltipSize.padding,
    tooltipSize.fontSize,
    tooltipSize.borderRadius,
    tooltipSize.maxWidth
  );
};

export const getArrowClassNames = (): string => {
  const tooltipTheme = themeConfig.euler.tooltip;

  return cn(tooltipTheme.arrow.baseStyles);
};


export const getArrowPosition = (
  side: TooltipSide,
  position: { top: number; left: number },
  tooltipRef: React.RefObject<HTMLDivElement | null>,
  arrowHeight: number,
  arrowWidth: number,
  tooltipBgColor: string
) => {
  const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
  const tooltipWidth = tooltipRef.current?.offsetWidth || 0;

  const adjustedArrowHeight = side === TooltipSide.TOP || side === TooltipSide.BOTTOM 
    ? arrowHeight * 0.75  
    : arrowHeight;
  const adjustedArrowWidth = side === TooltipSide.TOP || side === TooltipSide.BOTTOM 
    ? arrowWidth * 1.5   
    : arrowWidth;

  const baseStyles = {
    position: 'fixed' as const,
    width: 0,
    height: 0,
    borderStyle: 'solid' as const,
    zIndex: 1000,
  };

  const positions = {
    [TooltipSide.TOP]: {
      top: position.top + tooltipHeight,
      left: position.left + tooltipWidth / 2,
      transform: 'translateX(-50%)',
      borderWidth: `${adjustedArrowHeight}px ${adjustedArrowWidth / 2}px 0 ${adjustedArrowWidth / 2}px`,
      borderColor: `${tooltipBgColor} transparent transparent transparent`,
    },
    [TooltipSide.BOTTOM]: {
      top: position.top - adjustedArrowHeight,
      left: position.left + tooltipWidth / 2,
      transform: 'translateX(-50%)',
      borderWidth: `0 ${adjustedArrowWidth / 2}px ${adjustedArrowHeight}px ${adjustedArrowWidth / 2}px`,
      borderColor: `transparent transparent ${tooltipBgColor} transparent`,
    },
    [TooltipSide.LEFT]: {
      top: position.top + tooltipHeight / 2,
      left: (position.left -0.5) + tooltipWidth,
      transform: 'translateY(-50%)',
      borderWidth: `${arrowHeight / 2}px 0 ${arrowHeight / 2}px ${arrowWidth}px`,
      borderColor: `transparent transparent transparent ${tooltipBgColor}`,
    },
    [TooltipSide.RIGHT]: {
      top: position.top + tooltipHeight / 2,
      left: position.left - arrowWidth,
      transform: 'translateY(-50%)',
      borderWidth: `${arrowHeight / 2}px ${arrowWidth}px ${arrowHeight / 2}px 0`,
      borderColor: `transparent ${tooltipBgColor} transparent transparent`,
    },
  };

  return {
    ...baseStyles,
    ...positions[side],
  };
};


export const getSlotClassNames = (direction: TooltipSlotDirection, size: TooltipSize): string => {
  const tooltipTheme = themeConfig.euler.tooltip;
  const tooltipSize = tooltipTheme.sizes[size];

  return cn(
    tooltipSize.slotSize,
    'flex items-center justify-center',
    direction === TooltipSlotDirection.LEFT ? 'mr-1.5' : 'ml-1.5'
  );
};
