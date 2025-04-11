import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type AlertType = 'primary' | 'success' | 'purple' | 'warning' | 'neutral' | 'error' | 'orange';
export type AlertStyle = 'fill' | 'subtle' | 'noFill';
export type ActionButtonsCount = 0 | 1 | 2;
export type ActionPlacement = 'bottom' | 'right';

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The type/color variant of the alert
   * @default 'primary'
   */
  type?: AlertType;
  
  /**
   * The visual style of the alert
   * @default 'fill'
   */
  alertStyle?: AlertStyle;
  
  /**
   * Number of action buttons to display
   * @default 0
   */
  actionButtons?: ActionButtonsCount;
  
  /**
   * Placement of action buttons
   * @default 'bottom'
   */
  actionPlacement?: ActionPlacement;
  
  /**
   * The title of the alert
   */
  title?: string;
  
  /**
   * The description/content of the alert
   */
  description?: string;
  
  /**
   * Primary action button text
   */
  primaryActionText?: string;
  
  /**
   * Secondary action button text
   */
  secondaryActionText?: string;
  
  /**
   * Handler for primary action button click
   */
  onPrimaryAction?: () => void;
  
  /**
   * Handler for secondary action button click
   */
  onSecondaryAction?: () => void;
  
  /**
   * Handler for close button click
   */
  onClose?: () => void;
  
  /**
   * Whether the alert is dismissible
   * @default true
   */
  isDismissible?: boolean;
  
  /**
   * Custom icon to display
   */
  icon?: React.ElementType;
  
  /**
   * Custom content to render instead of title/description
   */
  children?: ReactNode;
  
  /**
   * Button subType for action buttons
   */
  buttonSubType?: 'default' | 'link';
}
