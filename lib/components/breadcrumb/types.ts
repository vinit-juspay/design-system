import { ReactNode } from 'react';

/**
 * Breadcrumb variants
 * DEFAULT - always shows all items regardless of count
 * TRUNCATED - shows dropdown for middle items when count exceeds threshold
 */
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
  /**
   * Array of breadcrumb items to display
   */
  items: BreadcrumbItemProps[];
  
  /**
   * Optional variant to force specific behavior
   * If not provided, behavior is determined by the item count:
   * - ≤ 4 items: all items displayed (DEFAULT behavior)
   * - > 4 items: truncated with dropdown (TRUNCATED behavior)
   */
  variant?: BreadcrumbVariant;
  
  /**
   * Optional class name to apply to the container
   */
  className?: string;
}
