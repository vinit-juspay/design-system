import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils';
import { TabsTriggerProps } from './types';
import { themeConfig } from '../../themeConfig';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, value, variant = "underline", size = "md", children, leftSlot, rightSlot, ...props }, ref) => {

  const styles = themeConfig.euler.tabs.variant[variant];
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        themeConfig.euler.tabs.base.trigger,
        styles.trigger,
        className
      )}
      {...props}
    >
      {leftSlot && <span className="mr-2">{leftSlot}</span>}
      {children}
      {rightSlot && <span className="ml-2">{rightSlot}</span>}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger; 