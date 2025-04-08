import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils';
import { TabsListProps } from './types';
import { themeConfig } from '../../themeConfig';

const TabsList = React.forwardRef<
  HTMLDivElement,
  TabsListProps
>(({ className, variant = "underline", size = "md", ...props }, ref) => {
  const styles = themeConfig.euler.tabs.variant[variant];
  const sizeStyles = themeConfig.euler.tabs.sizes[size];
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex w-full items-center",
        styles.list,
        sizeStyles.height,
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = 'TabsList';

export default TabsList;