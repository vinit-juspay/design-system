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
 * @returns {string} Combined Tailwind CSS class names for the item
 */
export const getCheckClassNames = (disabled: boolean = false): string => {
  const theme = themeConfig.euler.menu;
  // Reuse the standard menu item classes to maintain consistency
  return getMenuItemClassNames(disabled);
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

/**
 * Generates the appropriate class names for the search container
 * 
 * @returns {string} Combined Tailwind CSS class names for the search container
 */
export const getSearchContainerClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.search.baseStyles;
};

/**
 * Generates the appropriate class names for the search input
 * 
 * @returns {string} Combined Tailwind CSS class names for the search input
 */
export const getSearchInputClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.search.input;
};

/**
 * Generates the appropriate class names for menu item subtext
 * 
 * @returns {string} Combined Tailwind CSS class names for the subtext
 */
export const getSubtextClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.item.subtext;
};

/**
 * Generates the appropriate class names for a menu item shortcut
 * 
 * @returns {string} Combined Tailwind CSS class names for the shortcut
 */
export const getShortcutClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.item.shortcut;
};

/**
 * Generates the appropriate class names for a menu item with a specific color
 * 
 * @param {string | undefined} color - The color variant to apply
 * @returns {string} Combined Tailwind CSS class names for the colored menu item
 */
export const getColorClassNames = (color?: string): string => {
  if (!color) return '';
  
  const theme = themeConfig.euler.menu;
  return theme.item.colors[color as keyof typeof theme.item.colors] || '';
};

/**
 * Generates the appropriate class names for the 3-column layout container
 * 
 * @returns {string} Combined Tailwind CSS class names for the 3-column layout
 */
export const getThreeColumnLayoutClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.layout.threeColumn;
};

/**
 * Generates the appropriate class names for the content column
 * 
 * @returns {string} Combined Tailwind CSS class names for the content column
 */
export const getColumnContentClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.layout.columnContent;
};

/**
 * Generates the appropriate class names for flex column layout
 * 
 * @returns {string} Combined Tailwind CSS class names for flex column layout
 */
export const getFlexColumnClassNames = (): string => {
  const theme = themeConfig.euler.menu;
  return theme.layout.flexColumn;
}; 