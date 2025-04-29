import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';

const { textArea: textAreaTheme, input: inputTheme } = themeConfig.euler;

export const getTextAreaContainerClasses = () => {
  return textAreaTheme.container.base;
};

export const getTextAreaClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  // Base classes that apply to all states
  const baseClasses = [
    textAreaTheme.textarea.base,
  ];
  
  // State-specific classes
  const stateClasses = [];
  
  if (state === TextInputState.DEFAULT) {
    stateClasses.push(textAreaTheme.textarea.states.default, textAreaTheme.textarea.states.hover);
  } else if (state === TextInputState.FOCUSED) {
    stateClasses.push(textAreaTheme.textarea.states.default, textAreaTheme.textarea.states.focused);
  } else if (state === TextInputState.FILLED) {
    stateClasses.push(textAreaTheme.textarea.states.default, textAreaTheme.textarea.states.hover);
  } else if (state === TextInputState.ERROR) {
    stateClasses.push(textAreaTheme.textarea.states.error);
  } else if (state === TextInputState.DISABLED) {
    stateClasses.push(textAreaTheme.textarea.states.disabled);
  }
  
  return cn(...baseClasses, ...stateClasses);
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

export const getHintClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  return cn(
    inputTheme.hint.base,
    state === TextInputState.ERROR ? inputTheme.hint.error : inputTheme.hint.color
  );
}; 