import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TabsVariant = 'boxed' | 'floating' | 'underline';
export type TabsSize = 'md' | 'lg';

export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string;
  variant?: TabsVariant;
  size?: TabsSize;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  children: string | number;
}

export interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

export type TabsStyles = {
  list: string;
  trigger: string;
} 