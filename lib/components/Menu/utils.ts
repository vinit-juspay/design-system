import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

/**
 * Generates the appropriate class names for a menu
 * These classes will be applied to the main menu container
 * 
 * @returns {string} Combined Tailwind CSS class names for the menu
 */
export const getMenuClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.baseStyles;
};

/**
 * Generates the appropriate class names for menu items
 * 
 * @param {boolean} disabled - Whether the item is disabled
 * @returns {string} Combined Tailwind CSS class names for the menu item
 */
export const getMenuItemClassNames = (disabled: boolean = false): string => {
  const theme = themeConfig.euler.menu;
  
  return cn(theme.item.baseStyles, {
    'data-[disabled]': disabled
  });
};

/**
 * Generates the appropriate class names for label items
 * 
 * @returns {string} Combined Tailwind CSS class names for the label
 */
export const getLabelClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.label.baseStyles;
};

/**
 * Generates the appropriate class names for separator items
 * 
 * @returns {string} Combined Tailwind CSS class names for the separator
 */
export const getSeparatorClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.separator.baseStyles;
};

/**
 * Generates the appropriate class names for checkbox and radio items
 * 
 * @param {boolean} checked - Whether the item is checked
 * @returns {string} Combined Tailwind CSS class names for the item
 */
export const getCheckClassNames = (checked: boolean = false): string => {
  const theme = themeConfig.euler.menu;
  
  return cn(
    theme.checkbox.baseStyles,
    checked ? theme.checkbox.checked : ''
  );
};

/**
 * Generates the appropriate class names for icons in menu items
 * 
 * @returns {string} Combined Tailwind CSS class names for the icon
 */
export const getIconClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.item.icon;
}; 