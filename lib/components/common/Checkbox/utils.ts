import { themeConfig } from '../../../themeConfig';
import { cn } from '../../../utils';
import { CheckboxSize, CheckboxPosition } from './types';

export const getCheckboxClassNames = (
  size: CheckboxSize,
  disabled: boolean,
  className: string = ''
): string => {
  const { baseStyles, sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];
  const stateClasses = disabled ? states.disabled : states.enabled;
  
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

export const getLabelClassNames = (
  size: CheckboxSize,
  disabled: boolean
): string => {
  const { sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];
  const labelState = disabled ? states.labelDisabled : states.labelEnabled;
  
  return cn(sizeClasses.fontSize, labelState);
};

export const getContainerClassNames = (
  position: CheckboxPosition
): string => {
  const { position: positionStyles } = themeConfig.euler.checkbox;
  
  return cn(
    positionStyles.wrapper, 
    position === CheckboxPosition.LEFT ? positionStyles.left : positionStyles.right
  );
}; 