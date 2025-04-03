import { ButtonSize, ButtonType, ButtonSubType } from './Button.types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../lib/utils';

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
    gap-2 transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2
    disabled:opacity-50 disabled:pointer-events-none
  `;

  if (subType === 'link') {
    return cn(
      baseClasses,
      buttonSize.fontSize,
      theme.linkColors[type].text,
      theme.linkColors[type].hover,
      theme.linkColors[type].focus
    );
  }

  if (subType === 'iconOnly') {
    return cn(
      baseClasses,
      buttonSize.height,
      'aspect-square p-0',
      buttonType.backgroundColor,
      buttonType.textColor,
      buttonType.hoverBackgroundColor,
      buttonType.borderColor,
      theme.borderRadius
    );
  }

  return cn(
    baseClasses,
    buttonSize.height,
    buttonSize.padding,
    buttonSize.fontSize,
    buttonType.backgroundColor,
    buttonType.textColor,
    buttonType.hoverBackgroundColor,
    buttonType.borderColor,
    theme.borderRadius
  );
}; 