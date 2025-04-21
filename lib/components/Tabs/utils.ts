import { TabsSize, TabsStyles, TabsVariant } from './types';
import { themeConfig } from '../../themeConfig';

export const getTabsStyles = (variant: TabsVariant): TabsStyles => {
  return {
    list: themeConfig.euler.tabs.variant[variant].list,
    trigger: themeConfig.euler.tabs.variant[variant].trigger,
  };
};

export const getSizeStyles = (size: TabsSize): string => {
  return themeConfig.euler.tabs.sizes[size].height;
};

export const getBaseStyles = (): string => {
  return themeConfig.euler.tabs.base.list;
};

export const getExpandedStyles = (expanded: boolean): string => {
  return expanded ? themeConfig.euler.tabs.expanded : '';
};

export const getUnderlineOffset = (size: TabsSize): string => {
  return themeConfig.euler.tabs.sizes[size].underlineOffset || '';
};
