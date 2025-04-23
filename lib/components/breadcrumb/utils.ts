import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Retrieves class names for breadcrumb items based on whether it's the last item
 * Last items get active styling, while other items get hover effects
 * 
 * @param isLast - Whether this is the last item in the breadcrumb trail
 * @returns Tailwind CSS class string
 */
export const getBreadcrumbItemClassNames = (
  isLast: boolean
): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return cn(
    breadcrumbTheme.item.default,
    isLast 
      ? breadcrumbTheme.item.active
      : breadcrumbTheme.item.hover,
    breadcrumbTheme.sizes.md
  );
};

/**
 * Retrieves class names for the breadcrumb container
 * 
 * @returns Tailwind CSS class string
 */
export const getBreadcrumbContainerClassNames = (): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return cn(
    breadcrumbTheme.base.container
  );
};

/**
 * Retrieves class names for the divider between breadcrumb items
 * 
 * @returns Tailwind CSS class string
 */
export const getDividerClassNames = (): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return cn(
    breadcrumbTheme.base.divider
  );
};

/**
 * Retrieves class names for the "more" button that shows hidden breadcrumb items
 * 
 * @param isActive - Whether the dropdown is currently active/open
 * @returns Tailwind CSS class string
 */
export const getMoreButtonClassNames = (isActive: boolean = false): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return cn(
    breadcrumbTheme.moreButton.base,
    isActive 
      ? breadcrumbTheme.moreButton.active
      : cn(breadcrumbTheme.moreButton.default, breadcrumbTheme.moreButton.hover)
  );
};

/**
 * Retrieves class names for the dropdown menu and items
 * 
 * @returns Object containing container and item class strings
 */
export const getDropdownClassNames = (): { container: string; item: string } => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return {
    container: breadcrumbTheme.dropdown.container,
    item: breadcrumbTheme.dropdown.item,
  };
};

/**
 * Retrieves class names for icon slots in breadcrumb items
 * 
 * @param position - Whether the icon is positioned on the left or right
 * @returns Tailwind CSS class string
 */
export const getIconSlotClassNames = (position: 'left' | 'right'): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return breadcrumbTheme.iconSlot[position];
};
