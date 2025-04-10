import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { OTPDigits } from './types';
import { TextInputState } from '../TextInput/types';

const { otpInput: otpTheme, input: inputTheme } = themeConfig.euler;

export const getOTPContainerClasses = () => {
  return otpTheme.container.base;
};

export const getInputsContainerClasses = (digits: OTPDigits = '6') => {
  return cn(
    otpTheme.inputsContainer.base,
    otpTheme.inputsContainer.digits[digits]
  );
};

export const getDigitInputClasses = (state: TextInputState = 'default') => {
  return cn(
    otpTheme.digit.base,
    state === 'default' && [
      otpTheme.digit.states.default,
      otpTheme.digit.states.hover,
    ],
    state === 'focused' && otpTheme.digit.states.focused,
    state === 'filled' && otpTheme.digit.states.filled,
    state === 'error' && otpTheme.digit.states.error,
    state === 'disabled' && otpTheme.digit.states.disabled
  );
};

export const getLabelClasses = () => {
  return cn(
    inputTheme.label.base,
    inputTheme.label.color
  );
};

export const getSublabelClasses = () => {
  return cn(
    inputTheme.sublabel.base,
    inputTheme.sublabel.color
  );
};

export const getHintClasses = (state: TextInputState = 'default') => {
  return cn(
    inputTheme.hint.base,
    state === 'error' ? inputTheme.hint.error : inputTheme.hint.color
  );
}; 