import { TextInputSize, TextInputState } from './types';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

const textInputTheme = themeConfig.euler.textInput;

export const getInputBaseClasses = (
  size: TextInputSize = 'md',
  state: TextInputState = 'default',
  showLeftSlot: boolean = false,
  showRightSlot: boolean = false
) => {
  const states = textInputTheme.inputBase.states;  
  return cn(
    textInputTheme.inputBase.base,
    textInputTheme.inputBase.sizes[size],
    // Apply default state and its hover
    state === 'default' && [
      states.default,
      states.hover,
      states.focused,
    ],
    // Apply other states directly
    showLeftSlot && textInputTheme.inputBase.slots.left,
    showRightSlot && textInputTheme.inputBase.slots.right,
  );
  
  
};

export const getInputClasses = () => {
  return cn(
    textInputTheme.input.base
  );
};

export const getLabelClasses = (mandatory: boolean = false) => {
  return cn(
    textInputTheme.label.base,
    textInputTheme.label.color,
    {
      'after:content-["*"] after:ml-0.5 after:text-red-500': mandatory,
    }
  );
};

export const getSublabelClasses = () => {
  return cn(
    textInputTheme.sublabel.base,
    textInputTheme.sublabel.color
  );
};

export const getHintClasses = (state: TextInputState = 'default') => {
  return cn(
    textInputTheme.hint.base,
    state === 'error' ? textInputTheme.hint.error : textInputTheme.hint.color
  );
};

export const getSlotClasses = (position: 'left' | 'right') => {
  return cn(
    textInputTheme.slot.base,
    textInputTheme.slot.positions[position]
  );
}; 