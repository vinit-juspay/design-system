import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TextInputSize } from '../TextInput/types';

const { numberInput: numberInputTheme } = themeConfig.euler;

export const getStepperClasses = () => {
  return cn(
    numberInputTheme.stepper.base
  );
};

export const getStepperButtonClasses = (
  hasDivider: boolean, 
  size: TextInputSize = TextInputSize.MEDIUM
) => {
  return cn(
    numberInputTheme.stepper.button.base,
    numberInputTheme.stepper.button.states.default,
    numberInputTheme.stepper.button.states.hover,
    numberInputTheme.stepper.button.states.active,
    numberInputTheme.stepper.button.sizes[size],
    hasDivider && numberInputTheme.stepper.button.divider
  );
};

export const getStepperIconClasses = () => {
  return cn(
    numberInputTheme.stepper.button.icon
  );
};

export const getNumberInputClasses = () => {
  return cn(
    numberInputTheme.input.base
  );
};

export const getRightSlotWithStepperClasses = () => {
  return cn(
    numberInputTheme.slot.rightWithStepper
  );
}; 