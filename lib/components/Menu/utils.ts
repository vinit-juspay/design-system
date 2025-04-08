import { MenuSize } from './types';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

/**
 * Generates the appropriate class names for a menu based on its size
 * These classes will be applied to the main menu container
 * 
 * @param {MenuSize} size - The size of the menu (sm or lg)
 * @returns {string} Combined Tailwind CSS class names for the menu
 */
export const getMenuClassNames = (size: MenuSize): string => {
  // Assuming themeConfig has a menu configuration similar to tooltip
  const theme = themeConfig.euler.menu;
  const menuSize = theme.sizes[size];

  return cn(
    theme.baseStyles,
    menuSize.fontSize,
    menuSize.borderRadius,
    menuSize.minWidth
  );
};

/**
 * Generates the appropriate class names for menu items
 * 
 * @param {boolean} disabled - Whether the item is disabled
 * @param {MenuSize} size - The size of the menu
 * @returns {string} Combined Tailwind CSS class names for the menu item
 */
export const getMenuItemClassNames = (disabled: boolean = false, size: MenuSize = 'sm'): string => {
  const theme = themeConfig.euler.menu;
  const menuSize = theme.sizes[size];
  
  return cn(
    theme.item.baseStyles,
    disabled ? theme.item.disabled : '',
    menuSize.itemPadding
  );
};

/**
 * Generates the appropriate class names for label items
 * 
 * @param {MenuSize} size - The size of the menu
 * @returns {string} Combined Tailwind CSS class names for the label
 */
export const getLabelClassNames = (size: MenuSize = 'sm'): string => {
  const theme = themeConfig.euler.menu;
  const menuSize = theme.sizes[size];
  
  return cn(
    theme.label.baseStyles,
    menuSize.labelPadding
  );
};

/**
 * Generates the appropriate class names for separator items
 * 
 * @returns {string} Combined Tailwind CSS class names for the separator
 */
export const getSeparatorClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  
  return cn(
    theme.separator.baseStyles
  );
};

/**
 * Generates the appropriate class names for checkbox and radio items
 * 
 * @param {boolean} checked - Whether the item is checked
 * @param {MenuSize} size - The size of the menu
 * @returns {string} Combined Tailwind CSS class names for the item
 */
export const getCheckClassNames = (checked: boolean = false, size: MenuSize = 'sm'): string => {
  const theme = themeConfig.euler.menu;
  const menuSize = theme.sizes[size];
  
  return cn(
    theme.checkbox.baseStyles,
    checked ? theme.checkbox.checked : '',
    menuSize.checkPadding
  );
};

/**
 * Generates the appropriate class names for icons in menu items
 * 
 * @param {MenuSize} size - The size of the menu
 * @returns {string} Combined Tailwind CSS class names for the icon
 */
export const getIconClassNames = (size: MenuSize = 'sm'): string => {
  const theme = themeConfig.euler.menu;
  const menuSize = theme.sizes[size];
  
  return cn(
    menuSize.iconSize,
    'mr-2 inline-block'
  );
}; 