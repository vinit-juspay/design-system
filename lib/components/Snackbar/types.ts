export type SnackbarType = 'info' | 'warning' | 'error' | 'success';

export type SnackbarPosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface SnackbarProps {
  type: SnackbarType;
  heading?: string;
  message?: string;
  alertMessage?: string;
  showIcon?: boolean;
  autoClose?: boolean;
  position?: SnackbarPosition;
  onClose?: () => void;
  className?: string;
}
