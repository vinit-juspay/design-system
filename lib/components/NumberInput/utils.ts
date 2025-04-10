import { themeConfig } from '../../themeConfig';

const { numberInput: numberTheme } = themeConfig.euler;

export const getStepperClasses = () => {
  return `${numberTheme.stepper.base}`;
};

export const getStepperButtonClasses = (isDown?: boolean) => {
  return `${numberTheme.stepper.button.base} 
    ${numberTheme.stepper.button.states.default} 
    ${numberTheme.stepper.button.states.hover} 
    ${numberTheme.stepper.button.states.active}
    ${isDown ? numberTheme.stepper.button.divider : ''}`.trim();
};

export const getStepperIconClasses = () => {
  return numberTheme.stepper.button.icon;
};

export const getNumberInputClasses = () => {
  return numberTheme.input.base;
}; 