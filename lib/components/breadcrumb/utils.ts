import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';


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


export const getBreadcrumbContainerClassNames = (): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;

  return cn(
    breadcrumbTheme.base.container
  );
};


export const getDividerClassNames = (): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;

  return cn(
    breadcrumbTheme.base.divider
  );
};


export const getMoreButtonClassNames = (isActive: boolean = false): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;

  return cn(
    breadcrumbTheme.moreButton.base,
    isActive
      ? breadcrumbTheme.moreButton.active
      : cn(breadcrumbTheme.moreButton.default, breadcrumbTheme.moreButton.hover)
  );
};


export const getDropdownClassNames = (): { container: string; item: string } => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;

  return {
    container: breadcrumbTheme.dropdown.container,
    item: breadcrumbTheme.dropdown.item,
  };
};


export const getIconSlotClassNames = (position: 'left' | 'right'): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;

  return breadcrumbTheme.iconSlot[position];
};
