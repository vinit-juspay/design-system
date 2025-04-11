import { AlertType, AlertStyle, ActionPlacement } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Gets the container class names for the alert
 */
export const getAlertContainerClassNames = (
  type: AlertType,
  style: AlertStyle
): string => {
  const theme = themeConfig.euler.alert;
  
  // Base layout classes
  const baseClasses = theme.layout.container;
  
  // Background color based on type and style
  const backgroundClass = theme.styles[style]?.[type]?.background || '';
  
  // Border handling based on style
  let borderClass = '';
  
  if (style !== 'fill') {
    // For noFill and subtle, use 1.5px border
    const borderColorClass = theme.styles[style]?.[type]?.border || '';
    borderClass = `border-[2px] ${borderColorClass}`;
  }
  
  return cn(
    baseClasses,
    backgroundClass,
    borderClass
  );
};

/**
 * Gets the content container class names for the alert
 */
export const getContentContainerClassNames = (): string => {
  const theme = themeConfig.euler.alert;
  
  // Match Figma specs exactly
  return cn(
    "flex flex-row items-start gap-2 flex-1 self-stretch",
    theme.layout.content
  );
};

/**
 * Gets the title class names
 */
export const getTitleClassNames = (): string => {
  const theme = themeConfig.euler.alert;
  
  return cn(
    theme.typography.title
  );
};

/**
 * Gets the description class names
 */
export const getDescriptionClassNames = (): string => {
  const theme = themeConfig.euler.alert;
  
  return cn(
    theme.typography.description
  );
};

/**
 * Gets the actions container class names
 */
export const getActionsContainerClassNames = (
  actionPlacement: ActionPlacement
): string => {
  const theme = themeConfig.euler.alert;
  const baseClasses = "flex gap-5"; // 20px gap between buttons
  
  // Different classes based on action placement
  const placementClass = actionPlacement === 'bottom' 
    ? "" // No margin needed, parent has gap
    : theme.layout.rightActions;
  
  return cn(
    baseClasses,
    placementClass
  );
};

/**
 * Gets the icon class names
 */
export const getIconClassNames = (
  type: AlertType,
  style: AlertStyle
): string => {
  const theme = themeConfig.euler.alert;
  
  const sizeClass = theme.icon.size;
  const colorClass = theme.styles[style]?.[type]?.iconColor || '';
  
  return cn(
    sizeClass,
    colorClass
  );
};

/**
 * Gets the close button class names
 */
export const getCloseButtonClassNames = (): string => {
  const theme = themeConfig.euler.alert;
  return cn(
    "p-0.5 rounded-sm text-gray-400 hover:text-gray-600 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30",
    theme.closeButton.base
  );
};
