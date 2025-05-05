import { cn } from '../../utils';
import { RadioSize } from './types';
import { themeConfig } from '../../themeConfig';

export const getRadioGroupClassNames = (className?: string): string => {
  return cn(themeConfig.euler.radio.container, className);
};

export const getRadioGroupLabelClassNames = (): string => {
  return themeConfig.euler.radio.groupLabel;
};

export const getRadioWrapperClassNames = (): string => {
  return themeConfig.euler.radio.baseStyles;
};

export const getRadioInputClassNames = (
  size: RadioSize,
  isDisabled: boolean
): string => {
  const theme = themeConfig.euler.radio;
  
  return cn(
    theme.input.base,
    theme.sizes[size].input,
    isDisabled && theme.input.disabled
  );
};

export const getRadioLabelClassNames = (
  size: RadioSize,
  isDisabled: boolean
): string => {
  const theme = themeConfig.euler.radio;
  
  return cn(
    theme.label.base,
    theme.sizes[size].label,
    isDisabled && theme.label.disabled
  );
};

export const getRadioSubtextClassNames = (
  size: RadioSize,
  isDisabled: boolean
): string => {
  const theme = themeConfig.euler.radio;
  
  return cn(
    theme.subtext,
    theme.sizes[size].subtext,
    isDisabled && theme.disabledSubtext
  );
};

export const getRadioRightSlotClassNames = (): string => {
  return themeConfig.euler.radio.rightSlot;
};

export const getRadioContentWrapperClassNames = (): string => {
  return themeConfig.euler.radio.wrapper;
}; 