import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

export const getBreadcrumbItemClassNames = (
  isCurrentPage: boolean
): string => {
  const breadcrumbTheme = themeConfig.euler.breadcrumb;
  
  return cn(
    breadcrumbTheme.item.default,
    isCurrentPage 
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
