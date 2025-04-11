import { SnackbarType, SnackbarPosition } from './types';
import { themeConfig } from '../../themeConfig';

export const getSnackbarStyles = (type: SnackbarType) => {
  return themeConfig.euler.snackbar.type[type];
};

export const getPositionStyles = (position: SnackbarPosition) => {
  return themeConfig.euler.snackbar.position[position];
};

export const getBaseStyles = () => {
  return themeConfig.euler.snackbar.base;
}; 