import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils';
import { TabsProps } from './types';
import { themeConfig } from '../../themeConfig';

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    className={cn(themeConfig.euler.tabs.base.root, className)}
    {...props}
    ref={ref}
  />
));
Tabs.displayName = 'Tabs';

export default Tabs;
