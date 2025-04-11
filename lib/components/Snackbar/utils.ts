import { useState, useEffect } from 'react';
import { SnackbarType, SnackbarPosition } from './types';
import { themeConfig } from '../../themeConfig';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export const getSnackbarStyles = (type: SnackbarType) => {
  return themeConfig.euler.snackbar.type[type];
};

export const getPositionStyles = (position: SnackbarPosition) => {
  return themeConfig.euler.snackbar.position[position];
};

export const getBaseStyles = () => {
  return themeConfig.euler.snackbar.base;
};

export const getIconComponentType = (type: SnackbarType) => {
  switch (type) {
    case 'info':
      return Info;
    case 'warning':
      return AlertCircle;
    case 'error':
      return XCircle;
    case 'success':
      return CheckCircle;
    default:
      return null;
  }
};

export const useSnackbarLogic = (autoClose: boolean, onClose?: () => void) => {
  const [visible, setVisible] = useState(true);

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

  return { visible, handleClose };
}; 