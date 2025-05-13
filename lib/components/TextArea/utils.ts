import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';

const { textArea: textAreaTheme, input: inputTheme } = themeConfig.euler;

export const getTextAreaContainerClasses = () => {
  return textAreaTheme.container;
};

export const getTextAreaClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  const states = textAreaTheme.textarea.states;

  // base-specific classes
  const baseClasses = [textAreaTheme.textarea.base];

  // Apply state-specific classes
  const stateClasses = [];

  // If state is ERROR, only apply error classes regardless of focus state
  if (state === TextInputState.ERROR) {
    stateClasses.push(states.default, states.error);
  } else if (state === TextInputState.DEFAULT) {
    stateClasses.push(states.default, states.hover);
  } else if (state === TextInputState.FOCUSED) {
    stateClasses.push(states.default, states.focused);
  } else if (state === TextInputState.FILLED) {
    stateClasses.push(states.default, states.hover); // Keep hover for filled state
  } else if (state === TextInputState.DISABLED) {
    stateClasses.push(states.disabled);
  }

  return cn(...baseClasses, ...stateClasses);
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
