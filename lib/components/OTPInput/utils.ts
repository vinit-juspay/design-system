import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { OTPDigits } from './types';
import { TextInputState } from '../TextInput/types';

const { otpInput: otpTheme, input: inputTheme } = themeConfig.euler;

export const getOTPContainerClasses = () => {
  return otpTheme.container.base;
};

export const getInputsContainerClasses = (digits: OTPDigits = OTPDigits.SIX) => {
  return cn(otpTheme.inputsContainer.base, otpTheme.inputsContainer.digits[digits]);
};

export const getDigitInputClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  return cn(
    otpTheme.digit.base,
    state === TextInputState.ERROR && otpTheme.digit.states.error,
    state === TextInputState.DISABLED && otpTheme.digit.states.disabled,
    state !== TextInputState.ERROR &&
      state !== TextInputState.DISABLED &&
      (state === TextInputState.FOCUSED
        ? otpTheme.digit.states.focused
        : state === TextInputState.FILLED
          ? otpTheme.digit.states.filled
          : [otpTheme.digit.states.default, otpTheme.digit.states.hover]),
    state === TextInputState.FOCUSED && otpTheme.digit.states.focused
  );
};

export const getLabelClasses = () => {
  return cn(inputTheme.label.base, inputTheme.label.color);
};

export const getSublabelClasses = () => {
  return cn(inputTheme.sublabel.base, inputTheme.sublabel.color);
};

export const getHintClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  return cn(
    inputTheme.hint.base,
    state === TextInputState.ERROR ? inputTheme.hint.error : inputTheme.hint.color
  );
};
