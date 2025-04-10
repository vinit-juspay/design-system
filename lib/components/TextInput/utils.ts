import { TextInputSize, TextInputState } from './types';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

const textInputTheme = themeConfig.euler.textInput;

export const getInputBaseClasses = (
  size: TextInputSize = 'md',
  state: TextInputState = 'default',
  leftSlot?: React.ReactNode,
  rightSlot?: React.ReactNode
) => {
  const hasLeftSlot = !!leftSlot;
  const hasRightSlot = !!rightSlot;
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
    state === 'error' && [
      states.error,
    ],
    state === 'disabled' && [
      states.disabled,
    ],
    // Apply other states directly
    hasLeftSlot && textInputTheme.inputBase.slots.left,
    hasRightSlot && textInputTheme.inputBase.slots.right,
  );
  
  
};

export const getInputClasses = (state: TextInputState = 'default') => {
  const states = textInputTheme.input.states;  
  return cn(
    textInputTheme.input.base,
    state === 'default' && [
      states.default,
    ],
    state === 'disabled' && [
      states.disabled,
    ],
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
    state === 'error' ? textInputTheme.hint.error : state === 'success' ? textInputTheme.hint.success : textInputTheme.hint.color
  );
};

export const getSlotClasses = (position: 'left' | 'right') => {
  return cn(
    textInputTheme.slot.base,
    textInputTheme.slot.positions[position]
  );
}; 