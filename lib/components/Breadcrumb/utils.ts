import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Retrieves class names for breadcrumb items based on whether it's the active item
 * Active items get active styling (darker color, semibold), while other items get hover effects
 * 
 * @param isActive - Whether this is the active/last item in the breadcrumb trail
 * @returns Tailwind CSS class string
 */
export const getBreadcrumbItemClassNames = (
  isActive: boolean
): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  // Apply default styles to all items
  const baseStyles = [
    breadcrumbTheme.item.default,
    breadcrumbTheme.sizes.md
  ];
  
  // Apply active or hover styling based on item status
  if (isActive) {
    baseStyles.push(breadcrumbTheme.item.active);
  } else {
    baseStyles.push(breadcrumbTheme.item.hover);
  }
  
  return cn(...baseStyles);
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
