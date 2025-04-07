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

  const baseClasses = `
    inline-flex items-center justify-center
    transition-all duration-200
    disabled:pointer-events-none
    ${theme.fontWeight}
    ${theme.fontFamily}
  `;

  let focusClasses = '';
  if (type === 'secondary') {
    focusClasses = 'focus-visible:outline-gray-100 focus-visible:outline-2 focus:outline-gray-100 focus:outline-2 focus:bg-white focus:border-gray-150';
  } else if (type === 'danger') {
    focusClasses = 'focus-visible:outline-red-100 focus-visible:outline-2 focus:outline-red-100 focus:outline-2';
  } else if (type === 'success') {
    focusClasses = 'focus-visible:outline-green-200 focus-visible:outline-2 focus:outline-green-200 focus:outline-2';
  } else {
    focusClasses = 'focus-visible:outline-primary-200 focus-visible:outline-2 focus:outline-primary-200 focus:outline-2';
  }

  if (subType === 'link') {
    return cn(
      baseClasses,
      focusClasses,
      buttonSize.fontSize,
      theme.linkColors[type].text,
      theme.linkColors[type].hover,
      theme.linkColors[type].focus
    );
  }

  if (subType === 'iconOnly') {
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
  
  return cn(
    buttonSize.iconSize,
    isLoading && 'animate-spin'
  );
};

export const getTextClassNames = (size: ButtonSize): string => {
  const theme = themeConfig.euler.button;
  const buttonSize = theme.sizes[size];
  
  return cn(
    buttonSize.fontSize
  );
}; 