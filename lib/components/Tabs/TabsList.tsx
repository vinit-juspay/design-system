import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils';
import { TabsListProps } from './types';
import { getTabsStyles, getSizeStyles, getBaseStyles, getExpandedStyles } from './utils';

const TabsList = React.forwardRef<
  HTMLDivElement,
  TabsListProps
>(({ className, variant = "underline", size = "md", expanded = false, ...props }, ref) => {
  const styles = getTabsStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const baseStyles = getBaseStyles();
  const expandedStyles = getExpandedStyles(expanded);
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        baseStyles,
        styles.list,
        sizeStyles,
        expanded && expandedStyles,
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = 'TabsList';

export default TabsList;