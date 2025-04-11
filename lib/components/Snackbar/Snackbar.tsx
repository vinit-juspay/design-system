import React, { useEffect, useState } from 'react';
import { cn } from '../../utils';
import { SnackbarProps } from './types';
import { getSnackbarStyles, getPositionStyles, getBaseStyles, getIconComponentType } from './utils';
import { X } from 'lucide-react';

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      type = 'info',
      heading,
      message,
      alertMessage,
      showIcon = true,
      autoClose = true,
      position = 'topRight',
      onClose,
      className,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const styles = getSnackbarStyles(type);
    const positionStyles = getPositionStyles(position);
    const baseStyles = getBaseStyles();

    const handleClose = () => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    };

    useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [autoClose, handleClose]);

    const IconComponent = getIconComponentType(type);
    const iconElement = IconComponent ? <IconComponent className="h-5 w-5" /> : null;

    if (!visible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles.container,
          styles.backgroundColor,
          positionStyles,
          className
        )}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {showIcon && iconElement && (
              <div className={cn(baseStyles.icon, styles.iconColor)}>
                {iconElement}
              </div>
            )}
            {heading && <h3 className={cn("text-body-lg font-600", styles.textColor)}>{heading}</h3>}
          </div>
          {!autoClose && (
            <button
              onClick={handleClose}
              className={cn(baseStyles.closeButton, styles.textColor)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {(message || alertMessage) && (
          <div className="mt-1 pl-7 flex flex-col gap-1">
            {message && <p className={cn("text-body-md font-500 break-words", styles.textColor)}>{message}</p>}
            {alertMessage && <p className={cn("text-body-md font-600", styles.textColor)}>{alertMessage}</p>}
          </div>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

export default Snackbar;