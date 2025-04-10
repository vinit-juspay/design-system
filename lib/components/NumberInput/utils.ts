import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

const { numberInput: numberTheme } = themeConfig.euler;

export const getStepperClasses = () => {
  return `${numberTheme.stepper.base}`;
};

export const getStepperButtonClasses = (isDown?: boolean, size?: 'md' | 'lg') => {
  const sizes = numberTheme.stepper.button.sizes;

  return cn(
    numberTheme.stepper.button.base,
    numberTheme.stepper.button.states.default,
    numberTheme.stepper.button.states.hover,
    numberTheme.stepper.button.states.active,
    isDown ? numberTheme.stepper.button.divider : '',
    size === 'md' && [
      sizes.md
    ],
    size === 'lg' && [
      sizes.lg
    ],
  );
};

export const getStepperIconClasses = () => {
  return numberTheme.stepper.button.icon;
};

export const getNumberInputClasses = () => {
  return numberTheme.input.base;
};

export const getRightSlotWithStepperClasses = () => {
  return cn(
    themeConfig.euler.input.slot.base, // Get base slot styling from common input theme
    numberTheme.slot.rightWithStepper
  );
}; 