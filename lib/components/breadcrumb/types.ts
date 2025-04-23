import { ReactNode } from 'react';

export enum BreadcrumbVariant {
  DEFAULT = 'default',
  TRUNCATED = 'truncated',
}

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  showLeftSlot?: boolean;
  showRightSlot?: boolean;
  className?: string;
}

/**
 * Internal props used by the BreadcrumbItem component
 * Extends the public BreadcrumbItemProps with additional internal properties
 */
export interface BreadcrumbItemInternalProps extends BreadcrumbItemProps {
  isLast?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  variant?: BreadcrumbVariant;
  className?: string;
}
