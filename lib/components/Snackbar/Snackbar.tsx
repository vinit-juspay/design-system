import React from 'react';
import { cn } from '../../utils';
import { SnackbarProps } from './types';
import {
  getSnackbarStyles,
  getPositionStyles,
  getBaseStyles,
  getLayoutStyles,
  getIconComponentType,
  useSnackbarLogic,
} from './utils';
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
    const { visible, handleClose } = useSnackbarLogic(position, autoClose, onClose);

    const styles = getSnackbarStyles(type);
    const positionStyles = getPositionStyles(position);
    const baseStyles = getBaseStyles();
    const layoutStyles = getLayoutStyles();

    const IconComponent = getIconComponentType(type);
    const iconElement = IconComponent ? <IconComponent className="h-5 w-5" /> : null;

    if (!visible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles.container, styles.backgroundColor, positionStyles, className)}
        role="alert"
        aria-live="assertive"
      >
        <div className={layoutStyles.headerContainer}>
          <div className={layoutStyles.headerContent}>
            {showIcon && iconElement && (
              <div className={cn(baseStyles.icon, styles.iconColor)}>{iconElement}</div>
            )}
            {heading && <h3 className={cn(layoutStyles.heading)}>{heading}</h3>}
          </div>
          {!autoClose && (
            <button
              onClick={handleClose}
              className={cn(baseStyles.closeButton)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {(message || alertMessage) && (
          <div className={layoutStyles.messageContainer}>
            {message && <p className={cn(layoutStyles.message)}>{message}</p>}
            {alertMessage && (
              <p className={cn(layoutStyles.alertMessage)}>{alertMessage}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

export default Snackbar;
