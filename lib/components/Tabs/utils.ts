import { TabsSize, TabsStyles, TabsVariant } from './types';
import { themeConfig } from '../../themeConfig';

export const getTabsStyles = (variant: TabsVariant): TabsStyles => {
  return {
    list: themeConfig.euler.tabs.variant[variant].list,
    trigger: themeConfig.euler.tabs.variant[variant].trigger
  };
};

export const getSizeStyles = (size: TabsSize): string => {
  return themeConfig.euler.tabs.sizes[size].height;
}; 