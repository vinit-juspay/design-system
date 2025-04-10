import { AlertType, AlertStyle, ActionPlacement } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Gets the container class names for the alert
 */
export const getAlertContainerClassNames = (
  type: AlertType,
  style: AlertStyle,
  actionPlacement: ActionPlacement
): string => {
  const theme = themeConfig.euler.alert;
  
  // Base layout classes
  const baseClasses = theme.layout.container;
  
  // Height based on action placement
  const heightClass = actionPlacement === 'bottom' 
    ? theme.layout.heightWithBottomActions 
    : theme.layout.heightWithRightActions;
  
  // Background color based on type and style
  const backgroundClass = theme.styles[style]?.[type]?.background || '';
  
  // Border color based on type and style
  const borderClass = theme.styles[style]?.[type]?.border || '';
  
  return cn(
    baseClasses,
    heightClass,
    backgroundClass,
    borderClass
  );
};

/**
 * Gets the content container class names
 */
export const getContentContainerClassNames = (
  actionPlacement: ActionPlacement
): string => {
  const theme = themeConfig.euler.alert;
  
  return cn(
    theme.layout.content,
    actionPlacement === 'bottom' 
      ? theme.layout.contentWithBottomActions 
      : theme.layout.contentWithRightActions
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
  
  return cn(
    theme.layout.actions,
    actionPlacement === 'bottom' 
      ? theme.layout.bottomActions 
      : theme.layout.rightActions
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
    theme.closeButton.base
  );
};
