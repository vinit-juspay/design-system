import { ReactNode } from 'react';

export enum AlertVariant {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  PURPLE = 'purple',
  ORANGE = 'orange',
  NEUTRAL = 'neutral',
}

export enum AlertActionPlacement {
  BOTTOM = 'bottom',
  RIGHT = 'right',
}

export enum AlertStyle {
  FILL = 'fill',
  SUBTLE = 'subtle',
  NO_FILL = 'noFill',
}

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  heading: string;
  description: string;
  variant?: AlertVariant;
  style?: AlertStyle;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  onClose?: () => void;
  icon?: ReactNode;
  actionPlacement?: AlertActionPlacement;
} 