import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';

const { textArea: textAreaTheme, input: inputTheme } = themeConfig.euler;

export const getTextAreaContainerClasses = () => {
  return textAreaTheme.container.base;
};

export const getTextAreaClasses = (state: TextInputState = 'default') => {
  const states = textAreaTheme.textarea.states;  
  return cn(
    textAreaTheme.textarea.base,
    state === 'default' && [
      states.default,
      states.hover,
    ],
    state === 'hover' && [
      states.default,
      states.hover,
    ],
    state === 'focused' && [
      states.focused,
    ],
    state === 'error' && [
      states.error,
    ],
    state === 'disabled' && [
      states.disabled,
    ],
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