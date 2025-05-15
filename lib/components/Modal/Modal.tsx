import { forwardRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button, ButtonType } from '../Button';
import { ModalProps } from './types';
import {
  getModalClasses,
  getHeaderClasses,
  getContentClasses,
  getFooterClasses,
  getBackdropClasses,
  getContainerClasses,
} from './utils';
import { useScrollLock } from '../../hooks/useScrollLock';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      children,
      primaryButtonText,
      secondaryButtonText,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      primaryButtonDisabled = false,
      secondaryButtonDisabled = false,
      className,
      showCloseButton = true,
      showHeader = true,
      showFooter = true,
      closeOnBackdropClick = true,
      primaryButtonType = ButtonType.PRIMARY,
      secondaryButtonType = ButtonType.SECONDARY,
      customHeader,
      customFooter,
      headerRightSlot,
      showDivider = true,
    },
    ref
  ) => {
    useScrollLock(isOpen);

    const handleBackdropClick = useCallback(
      (_e: React.MouseEvent) => {
        if (closeOnBackdropClick) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    const handleModalClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);

    if (!isOpen) return null;

    const renderHeader = () => {
      if (!showHeader) return null;

      if (customHeader) {
        return <div className="flex-shrink-0">{customHeader}</div>;
      }

      return (
        <div className={getHeaderClasses(showDivider)}>
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2">
              {title && (
                <p id="modal-title" className="text-sm font-semibold text-gray-700 word-break">
                  {title}
                </p>
              )}
              {headerRightSlot}
            </div>
            {subtitle && (
              <p className="text-jp-body-md text-gray-500 font-normal word-break mt-1">{subtitle}</p>
            )}
          </div>
          {showCloseButton && (
            <X onClick={onClose} className="h-5 w-5 text-gray-500 cursor-pointer flex-shrink-0" />
          )}
        </div>
      );
    };

    const renderFooter = () => {
      if (!showFooter) return null;

      if (customFooter) {
        return <div className="flex-shrink-0">{customFooter}</div>;
      }

      if (!primaryButtonText && !secondaryButtonText) return null;

      return (
        <div className={getFooterClasses(showDivider)}>
          {secondaryButtonText && (
            <Button
              buttonType={secondaryButtonType}
              onClick={onSecondaryButtonClick}
              disabled={secondaryButtonDisabled}
            >
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button
              buttonType={primaryButtonType}
              onClick={onPrimaryButtonClick}
              disabled={primaryButtonDisabled}
            >
              {primaryButtonText}
            </Button>
          )}
        </div>
      );
    };

    return (
      <div className={getContainerClasses()}>
        <div
          className={getBackdropClasses()}
          onClick={handleBackdropClick}
          role="presentation"
          aria-hidden="true"
        />

        <div
          ref={ref}
          className={getModalClasses(className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleModalClick}
        >
          {renderHeader()}

          <div className={getContentClasses()}>
            <div className="word-break">{children}</div>
          </div>

          {renderFooter()}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
