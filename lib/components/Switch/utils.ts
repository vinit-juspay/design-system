import { cn } from '../../utils';
import { SwitchSize } from './types';
import { themeConfig } from '../../themeConfig';

export const getSwitchGroupClassNames = (className?: string): string => {
  return cn(themeConfig.euler.radio.container, className);
};

export const getSwitchGroupLabelClassNames = (): string => {
  return themeConfig.euler.radio.groupLabel;
};

export const getSwitchContainerClassNames = (): string => {
  return themeConfig.euler.radio.baseStyles;
};

export const getSwitchContentWrapperClassNames = (): string => {
  return themeConfig.euler.radio.wrapper;
};

export const getSwitchRootClassNames = (
  size: SwitchSize,
  disabled: boolean,
  checked: boolean,
  className: string = ''
): string => {
  const theme = themeConfig.euler.switch;

  let bgColorClass;
  if (disabled) {
    bgColorClass = checked ? theme.states.disabled : theme.states.inactive;
  } else {
    bgColorClass = checked ? theme.states.enabled : theme.states.inactive;
  }

  return cn(theme.baseStyles, theme.sizes[size].root, bgColorClass, className);
};

export const getSwitchThumbClassNames = (size: SwitchSize, checked: boolean): string => {
  const theme = themeConfig.euler.switch;
  const thumbBaseClasses = theme.thumb.baseStyles;
  const sizeClasses = theme.sizes[size].thumb;
  const positionClasses = checked ? theme.sizes[size].thumbOn : theme.sizes[size].thumbOff;

  return cn(thumbBaseClasses, sizeClasses, positionClasses);
};

export const getSwitchLabelClassNames = (size: SwitchSize, disabled: boolean): string => {
  const theme = themeConfig.euler.radio;

  return cn(theme.label.base, theme.sizes[size].label, disabled && theme.label.disabled);
};

export const getSwitchSubtextClassNames = (size: SwitchSize, disabled: boolean): string => {
  const theme = themeConfig.euler.radio;
  const switchTheme = themeConfig.euler.switch;

  return cn(theme.subtext, switchTheme.sizes[size].subtext, disabled && theme.disabledSubtext);
};

export const getSwitchRightSlotClassNames = (): string => {
  return themeConfig.euler.radio.rightSlot;
};
