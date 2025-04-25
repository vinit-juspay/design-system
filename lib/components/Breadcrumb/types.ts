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
  className?: string;
  isActive?: boolean;
}

export interface BreadcrumbItemInternalProps {
  label: string;
  href?: string;
  onClick?: () => void;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
  isLast?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  variant?: BreadcrumbVariant;
  className?: string;
}
