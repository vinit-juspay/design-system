import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { CheckboxSize } from './types';

export const getCheckboxClassNames = (
  size: CheckboxSize,
  disabled: boolean,
  checked: boolean | 'indeterminate' = false,
  className: string = ''
): string => {
  const { baseStyles, sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];

  let stateClasses;
  if (disabled) {
    if (checked) {
      // Checked and disabled: primary-200 bg and no border
      stateClasses = 'bg-jp-primary-200 border-0';
    } else {
      // Unchecked and disabled: gray-150 border and gray-50 bg
      stateClasses = 'border-jp-gray-150 bg-jp-gray-50';
    }
  } else {
    stateClasses = disabled ? states.disabled : states.enabled;
  }

  return cn(baseStyles, sizeClasses.root, stateClasses, className);
};

export const getIndicatorClassNames = (
  size: CheckboxSize,
  indicatorClassName: string = ''
): string => {
  const { indicator, sizes } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];

  return cn(indicator.baseStyles, sizeClasses.indicator, indicatorClassName);
};

export const getCheckIconClassNames = (
  size: CheckboxSize,
  checkIconClassName: string = ''
): string => {
  const { indicator, sizes } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];

  return cn(indicator.icon, sizeClasses.checkIcon, checkIconClassName);
};

export const getLabelClassNames = (size: CheckboxSize, disabled: boolean): string => {
  const { sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];
  const labelState = disabled ? states.labelDisabled : states.labelEnabled;

  return cn(sizeClasses.fontSize, labelState);
};

export const getContainerClassNames = (): string => {
  const { position: positionStyles } = themeConfig.euler.checkbox;

  return cn(positionStyles.wrapper);
};

export const getCheckboxContentWrapperClassNames = (): string => {
  return themeConfig.euler.checkbox.wrapper || 'flex items-center';
};

export const getCheckboxRightSlotClassNames = (): string => {
  return themeConfig.euler.checkbox.rightSlot || 'ml-1.5';
};

export const getCheckboxSubtextClassNames = (size: CheckboxSize, disabled: boolean): string => {
  const theme = themeConfig.euler.checkbox;

  return cn(
    theme.subtext || 'text-jp-gray-400 font-normal',
    theme.sizes[size].subtext ||
      (size === CheckboxSize.SMALL ? 'text-body-sm ml-5 mt-1' : 'text-jp-body-md ml-4 mt-1'),
    disabled && (theme.disabledSubtext || 'text-jp-gray-200')
  );
};
