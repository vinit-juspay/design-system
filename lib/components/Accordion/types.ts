import { ReactNode } from 'react';

export enum AccordionType {
  BORDER = 'border',
  NO_BORDER = 'noborder',
}

export enum AccordionChevronPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface AccordionItemProps {
  /** Unique value for the accordion item */
  value: string;
  /** Main title text */
  title: string;
  /** Optional secondary text displayed below the title */
  subtext?: string;
  /** Optional element displayed to the left of the title */
  leftSlot?: ReactNode;
  /** Optional element displayed to the right of the title */
  rightSlot?: ReactNode;
  /** Optional element displayed to the right of the subtext */
  subtextSlot?: ReactNode;
  /** Content of the accordion item */
  children: ReactNode;
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /** Optional additional className for this item */
  className?: string;
  /** Position of the chevron icon */
  chevronPosition?: AccordionChevronPosition;
}

export interface AccordionProps {
  /** Child accordion items */
  children: ReactNode;
  /** Type of accordion styling */
  accordionType?: AccordionType;
  /** Default expanded value(s) */
  defaultValue?: string | string[];
  /** Current expanded value(s) - for controlled component */
  value?: string | string[];
  /** Whether multiple items can be expanded simultaneously */
  isCollapsible?: boolean;
  /** Whether multiple items can be opened simultaneously */
  isMultiple?: boolean;
  /** Callback when expanded value(s) change */
  onValueChange?: (value: string | string[]) => void;
  /** Optional additional className */
  className?: string;
}
