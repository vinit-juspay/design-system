import React, { useEffect } from 'react';
import { cn } from '../../utils';
import { SnackbarProps } from './types';
import { getSnackbarStyles, getPositionStyles, getBaseStyles } from './utils';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

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
      children,
    },
    ref
  ) => {
    const styles = getSnackbarStyles(type);
    const positionStyles = getPositionStyles(position);
    const baseStyles = getBaseStyles();

    useEffect(() => {
      if (autoClose && onClose) {
        const timer = setTimeout(() => {
          onClose();
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [autoClose, onClose]);

    const getIcon = () => {
      switch (type) {
        case 'info':
          return <Info className="h-5 w-5" />;
        case 'warning':
          return <AlertCircle className="h-5 w-5" />;
        case 'error':
          return <XCircle className="h-5 w-5" />;
        case 'success':
          return <CheckCircle className="h-5 w-5" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles.container,
          styles.backgroundColor,
          styles.textColor,
          positionStyles,
          className
        )}
      >
        {showIcon && (
          <div className={cn(baseStyles.icon, styles.iconColor)}>
            {getIcon()}
          </div>
        )}
        <div className={baseStyles.content}>
          {heading && <h3 className="font-semibold">{heading}</h3>}
          {message && <p>{message}</p>}
          {alertMessage && <p className="text-sm opacity-80">{alertMessage}</p>}
          {children}
        </div>
        {!autoClose && onClose && (
          <button
            onClick={onClose}
            className={cn(baseStyles.closeButton, styles.textColor)}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

export default Snackbar; 