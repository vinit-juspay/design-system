import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils';
import { TabsContentProps } from './types';
import { themeConfig } from '../../themeConfig';

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(themeConfig.euler.tabs.content, className)}
      {...props}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export default TabsContent;
