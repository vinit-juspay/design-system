import { ButtonType } from '../Button';
import { ReactElement, ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactElement;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonDisabled?: boolean;
  secondaryButtonDisabled?: boolean;
  className?: string;
  showCloseButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  closeOnBackdropClick?: boolean;
  primaryButtonType?: ButtonType;
  secondaryButtonType?: ButtonType;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  headerRightSlot?: ReactNode;
  showDivider?: boolean;
}
