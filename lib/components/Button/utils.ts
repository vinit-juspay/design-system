import { ButtonSize, ButtonType, ButtonSubType } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

export const getButtonClassNames = (
  type: ButtonType,
  size: ButtonSize,
  subType: ButtonSubType
): string => {
  const theme = themeConfig.euler.button;
  const buttonType = theme.buttonType[type];
  const buttonSize = theme.sizes[size];
  const baseClasses = theme.base.container;
  const focusClasses = buttonType.focusClasses || '';

  if (subType === ButtonSubType.LINK) {
    return cn(
      baseClasses,
      focusClasses,
      buttonSize.fontSize,
      theme.linkColors[type].text,
      theme.linkColors[type].hover,
      theme.linkColors[type].focus,
      theme.linkColors[type].disabled
    );
  }

  if (subType === ButtonSubType.ICON_ONLY) {
    return cn(
      baseClasses,
      focusClasses,
      buttonSize.height,
      'aspect-square p-0',
      buttonType.backgroundColor,
      buttonType.textColor,
      buttonType.hoverBackgroundColor,
      buttonType.activeBackgroundColor,
      buttonType.borderColor,
      buttonType.disabledBackgroundColor,
      theme.borderRadius
    );
  }

  return cn(
    baseClasses,
    focusClasses,
    buttonSize.height,
    buttonSize.padding,
    buttonSize.fontSize,
    buttonSize.gap,
    buttonType.backgroundColor,
    buttonType.textColor,
    buttonType.hoverBackgroundColor,
    buttonType.activeBackgroundColor,
    buttonType.borderColor,
    buttonType.disabledBackgroundColor,
    theme.borderRadius
  );
};

export const getIconClassNames = (size: ButtonSize, isLoading: boolean): string => {
  const theme = themeConfig.euler.button;
  const buttonSize = theme.sizes[size];

  return cn(buttonSize.iconSize, isLoading && theme.base.loading);
};

export const getTextClassNames = (size: ButtonSize): string => {
  const theme = themeConfig.euler.button;
  const buttonSize = theme.sizes[size];

  return cn(buttonSize.fontSize, theme.base.text);
};
