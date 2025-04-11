import { AlertType, AlertStyle, ActionPlacement } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Retrieves container class names based on alert type and style
 */
export const getAlertContainerClassNames = (
  type: AlertType,
  style: AlertStyle
): string => {
  const theme = themeConfig.euler.alert;
  
  const baseClasses = theme.layout.container;
  const backgroundClass = theme.styles[style]?.[type]?.background || '';
  
  let borderClass = '';
  if (style !== 'fill') {
    const borderColorClass = theme.styles[style]?.[type]?.border || '';
    borderClass = theme.border.default + ' ' + borderColorClass;
  }
  
  return cn(baseClasses, backgroundClass, borderClass);
};

/**
 * Retrieves content container class names
 */
export const getContentContainerClassNames = (): string => {
  return themeConfig.euler.alert.layout.content;
};

/**
 * Retrieves title class names
 */
export const getTitleClassNames = (): string => {
  return themeConfig.euler.alert.typography.title;
};

/**
 * Retrieves description class names
 */
export const getDescriptionClassNames = (): string => {
  return themeConfig.euler.alert.typography.description;
};

/**
 * Retrieves action container class names based on placement
 */
export const getActionsContainerClassNames = (
  actionPlacement: ActionPlacement
): string => {
  const theme = themeConfig.euler.alert;
  
  const placementClass = actionPlacement === 'bottom' 
    ? theme.layout.bottomActions
    : theme.layout.rightActions;
  
  return cn(theme.layout.actions, placementClass);
};

/**
 * Retrieves icon class names based on alert type and style
 */
export const getIconClassNames = (
  type: AlertType,
  style: AlertStyle
): string => {
  const theme = themeConfig.euler.alert;
  
  const sizeClass = theme.icon.size;
  const colorClass = theme.styles[style]?.[type]?.iconColor || '';
  
  return cn(sizeClass, colorClass);
};

/**
 * Retrieves close button class names
 */
export const getCloseButtonClassNames = (): string => {
  return themeConfig.euler.alert.closeButton.base;
};

/**
 * Retrieves action button class names based on alert type and subtype
 */
export const getActionButtonClassNames = (
  type: AlertType,
  subType: 'button' | 'link' = 'button'
): string => {
  const theme = themeConfig.euler.alert;
  
  const baseClasses = theme.actionButton.base;
  
  if (subType === 'link') {
    return cn(
      baseClasses,
      theme.actionButton.link,
      theme.actionButton.linkColors[type] || theme.actionButton.linkColors.neutral
    );
  }
  
  return cn(baseClasses, theme.actionButton.button);
};
