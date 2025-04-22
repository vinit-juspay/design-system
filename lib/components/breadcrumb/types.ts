export enum BreadcrumbSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum BreadcrumbVariant {
  DEFAULT = 'default',
  TRUNCATED = 'truncated',
}

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  variant?: BreadcrumbVariant;
  className?: string;
}
