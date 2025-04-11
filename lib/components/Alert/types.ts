import { ComponentPropsWithoutRef, ReactNode, ElementType } from 'react';

/**
 * Alert component type/color variants
 */
export type AlertType = 
  | 'primary'  // Blue theme (default)
  | 'success'  // Green theme
  | 'purple'   // Purple theme
  | 'warning'  // Yellow theme
  | 'neutral'  // Gray theme
  | 'error'    // Red theme
  | 'orange';  // Orange theme

/**
 * Alert visual style variants
 */
export type AlertStyle = 
  | 'fill'     // Colored background
  | 'subtle'   // Lighter colored background 
  | 'noFill';  // Transparent background with border

/**
 * Number of action buttons to display
 */
export type ActionButtonsCount = 0 | 1 | 2;

/**
 * Placement options for action buttons
 */
export type ActionPlacement = 'bottom' | 'right';

/**
 * Props for the Alert component
 */
export interface AlertProps extends Omit<ComponentPropsWithoutRef<'div'>, 'style'> {
  /** The type/color variant of the alert @default 'primary' */
  type?: AlertType;
  
  /** The visual style of the alert @default 'fill' */
  style?: AlertStyle;
  
  /** Number of action buttons to display @default 0 */
  actionButtons?: ActionButtonsCount;
  
  /** Placement of action buttons @default 'bottom' */
  actionPlacement?: ActionPlacement;
  
  /** The title of the alert */
  title?: string;
  
  /** The description/content of the alert */
  description?: string;
  
  /** Primary action button text @default 'Primary Action' */
  primaryActionText?: string;
  
  /** Secondary action button text @default 'Secondary Action' */
  secondaryActionText?: string;
  
  /** Handler for primary action button click */
  onPrimaryAction?: () => void;
  
  /** Handler for secondary action button click */
  onSecondaryAction?: () => void;
  
  /** Handler for close button click */
  onClose?: () => void;
  
  /** Whether the alert has a close icon @default true */
  hasCloseIcon?: boolean;
  
  /** Custom icon to display */
  icon?: ElementType;
  
  /** Custom content to render instead of title/description */
  children?: ReactNode;
  
  /** Whether to show the alert main icon @default true */
  hasMainIcon?: boolean;
}
