import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { ButtonType } from '../Button/types';
import { AlertActionPlacement, AlertStyle, AlertVariant } from './types';

const getThemeKey = (variant: AlertVariant): keyof typeof themeConfig.euler.alert.styles.fill => {
  switch (variant) {
    case AlertVariant.PRIMARY:
      return 'primary';
    case AlertVariant.SUCCESS:
      return 'success';
    case AlertVariant.ERROR:
      return 'error';
    case AlertVariant.WARNING:
      return 'warning';
    case AlertVariant.NEUTRAL:
      return 'neutral';
    case AlertVariant.PURPLE:
      return 'purple';
    case AlertVariant.ORANGE:
      return 'orange';
  }
};

export const getButtonTypeFromAlert = (variant: AlertVariant): ButtonType => {
	switch (variant) {
		case AlertVariant.PRIMARY:
			return 'primary';
		case AlertVariant.SUCCESS:
			return 'success';
		case AlertVariant.ERROR:
			return 'danger';
		default:
			return 'secondary';
	}
};

const getActionPlacementKey = (placement: AlertActionPlacement): keyof typeof themeConfig.euler.alert.alertActionPlacement => {
  switch (placement) {
    case AlertActionPlacement.BOTTOM:
      return 'default';
    case AlertActionPlacement.RIGHT:
      return 'actionsRight';
  }
};

export const getAlertContainerStyles = (variant: AlertVariant, style: AlertStyle) => {
  const baseStyles = themeConfig.euler.alert.base.alertContainer;
  const themeKey = getThemeKey(variant);
  const variantStyles = themeConfig.euler.alert.styles[style][themeKey];

  return cn(
    baseStyles,
     variantStyles.background,
     style !== AlertStyle.FILL &&variantStyles.border,
  );
};

export const getAlertBodyContainerStyles = () => {
  return themeConfig.euler.alert.actionButton.container;
};

export const getAlertDividerStyles = () => {
  return themeConfig.euler.alert.base.divider;
};

export const getAlertHeaderContainerStyles = () => {
  return themeConfig.euler.alert.base.headerContainer;
};

export const getAlertIconStyles = () => {
  return cn(themeConfig.euler.alert.icon.container, themeConfig.euler.alert.icon.size);
};

export const getHeaderClassNames = () => {
  return themeConfig.euler.alert.typography.title;
};

export const getBodyClassNames = (actionPlacement: AlertActionPlacement) => {
  const actionPlacementKey = getActionPlacementKey(actionPlacement);

  return themeConfig.euler.alert.alertActionPlacement[actionPlacementKey];
};

export const getDescriptionClassNames = () => {
  return themeConfig.euler.alert.typography.description;
};

export const getActionButtonStyles = (variant: AlertVariant) => {
  return cn(
    themeConfig.euler.alert.actionButton.base,
    themeConfig.euler.alert.actionButton.colors[variant]
  )

};

export const getCloseButtonClassNames = () => {
  return cn(
    themeConfig.euler.alert.base.closeButton,
  )
}; 