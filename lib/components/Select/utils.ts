import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { 
  getMenuItemClassNames,
  getLabelClassNames, 
  getSeparatorClassNames,
  getIconClassNames
} from '../Menu/utils';

/**
 * Get class names for the Select trigger based on size
 * @param size - Size variant of the select
 * @param disabled - Whether the select is disabled
 * @returns - Class names string
 */
export const getSelectTriggerClassNames = (size: 'sm' | 'md' | 'lg' = 'md', disabled: boolean = false) => {
  const sizeClasses = themeConfig.euler.select.sizes[size];
  
  return cn(
    themeConfig.euler.select.baseStyles,
    sizeClasses.height,
    sizeClasses.fontSize,
    sizeClasses.padding,
    disabled && 'disabled:cursor-not-allowed disabled:opacity-50'
  );
};

/**
 * Get class names for the Select icon
 * @param size - Size variant of the select
 * @returns - Class names string
 */
export const getSelectIconClassNames = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeClasses = themeConfig.euler.select.sizes[size];
  
  return cn(
    themeConfig.euler.select.icon.baseStyles,
    sizeClasses.iconSize
  );
};

/**
 * Get class names for the Select content (dropdown)
 * @returns - Class names string
 */
export const getSelectContentClassNames = () => {
  return cn(themeConfig.euler.select.content.baseStyles);
};

/**
 * Get class names for the Select viewport
 * @returns - Class names string
 */
export const getSelectViewportClassNames = () => {
  return cn(themeConfig.euler.select.viewport.baseStyles);
};

/**
 * Get class names for individual Select items, reusing Menu item styles
 * @param disabled - Whether the item is disabled
 * @returns - Class names string
 */
export const getSelectItemClassNames = (disabled: boolean = false) => {
  // Reuse the Menu item styles
  return getMenuItemClassNames(disabled);
};

/**
 * Get class names for the Select item indicator
 * @returns - Class names string
 */
export const getSelectItemIndicatorClassNames = () => {
  return cn(themeConfig.euler.menu.checkbox.indicator);
};

/**
 * Get class names for the Select item icon, reusing Menu icon styles
 * @returns - Class names string
 */
export const getSelectItemIconClassNames = () => {
  // Reuse the Menu icon styles
  return getIconClassNames();
};

/**
 * Get class names for the Select label, reusing Menu label styles
 * @returns - Class names string
 */
export const getSelectLabelClassNames = () => {
  // Reuse the Menu label styles
  return getLabelClassNames();
};

/**
 * Get class names for the Select separator, reusing Menu separator styles
 * @returns - Class names string
 */
export const getSelectSeparatorClassNames = () => {
  // Reuse the Menu separator styles
  return getSeparatorClassNames();
};

/**
 * Get class names for the Select scroll button
 * @returns - Class names string
 */
export const getSelectScrollButtonClassNames = () => {
  return cn(themeConfig.euler.select.scrollButton.baseStyles);
}; 