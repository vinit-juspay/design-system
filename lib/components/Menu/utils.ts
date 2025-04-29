import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

// Gets class names from theme config based on path
const getThemeClasses = (path: string): string => {
  const parts = path.split('.');
  let current: any = themeConfig.euler.menu;

  for (const part of parts) {
    if (current[part] === undefined) {
      return '';
    }
    current = current[part];
  }

  return current;
};

// Path constants for menu theme elements
const THEME_PATHS = {
  menu: 'baseStyles',
  menuItem: 'menuItem.baseStyles',
  label: 'label.baseStyles',
  separator: 'separator.baseStyles',
  icon: 'menuItem.icon',
  searchContainer: 'search.baseStyles',
  searchInput: 'search.input',
  subtext: 'menuItem.subtext',
  shortcut: 'menuItem.shortcut',

  // Layout paths
  layout: {
    threeColumn: 'layout.threeColumn',
    columnContent: 'layout.columnContent',
    flexColumn: 'layout.flexColumn',
    leftSlot: 'layout.leftSlot',
    rightSlotsContainer: 'layout.rightSlotsContainer',
    menuItemRightContainer: 'layout.menuItemRightContainer',
  },
};

// Menu container classes
export const getMenuClassNames = (): string => getThemeClasses(THEME_PATHS.menu);

// Menu item classes
export const getMenuItemClassNames = (disabled: boolean = false): string => {
  return cn(getThemeClasses(THEME_PATHS.menuItem), {
    'data-[disabled]': disabled,
  });
};

// Checkbox and radio menu item classes (reuses menu item classes)
export const getCheckClassNames = (disabled: boolean = false): string =>
  getMenuItemClassNames(disabled);

// Simple getter functions for theme paths
export const getLabelClassNames = (): string => getThemeClasses(THEME_PATHS.label);
export const getSeparatorClassNames = (): string => getThemeClasses(THEME_PATHS.separator);
export const getIconClassNames = (): string => getThemeClasses(THEME_PATHS.icon);
export const getSearchContainerClassNames = (): string =>
  getThemeClasses(THEME_PATHS.searchContainer);
export const getSearchInputClassNames = (): string => getThemeClasses(THEME_PATHS.searchInput);
export const getSubtextClassNames = (): string => getThemeClasses(THEME_PATHS.subtext);
export const getShortcutClassNames = (): string => getThemeClasses(THEME_PATHS.shortcut);

// Color variant classes
export const getColorClassNames = (color?: string): string => {
  if (!color) return '';
  return getThemeClasses(`menuItem.colors.${color}`) || '';
};

// Layout element classes
export const getLayoutClassNames = (element: string): string =>
  getThemeClasses(`layout.${element}`);

// Convenience methods for layout elements
export const getThreeColumnLayoutClassNames = (): string =>
  getThemeClasses(THEME_PATHS.layout.threeColumn);
export const getColumnContentClassNames = (): string =>
  getThemeClasses(THEME_PATHS.layout.columnContent);
export const getFlexColumnClassNames = (): string => getThemeClasses(THEME_PATHS.layout.flexColumn);
export const getLeftSlotClassNames = (): string => getThemeClasses(THEME_PATHS.layout.leftSlot);
export const getRightSlotsContainerClassNames = (): string =>
  getThemeClasses(THEME_PATHS.layout.rightSlotsContainer);
export const getMenuItemRightContainerClassNames = (): string =>
  getThemeClasses(THEME_PATHS.layout.menuItemRightContainer);
