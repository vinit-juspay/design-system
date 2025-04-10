import { TextInputSize, TextInputState } from './types';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

const inputTheme = themeConfig.euler.input;

export const getInputBaseClasses = (
  size: TextInputSize = 'md',
  state: TextInputState = 'default',
  leftSlot?: React.ReactNode,
  rightSlot?: React.ReactNode
) => {
  const hasLeftSlot = !!leftSlot;
  const hasRightSlot = !!rightSlot;
  const states = inputTheme.inputBase.states;  
  return cn(
    inputTheme.inputBase.base,
    inputTheme.inputBase.sizes[size],
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
    hasLeftSlot && inputTheme.inputBase.slots.left,
    hasRightSlot && inputTheme.inputBase.slots.right,
  );
  
  
};

export const getInputClasses = (
  state: TextInputState = 'default',
  leftSlot?: React.ReactNode,
  rightSlot?: React.ReactNode
) => {
  const hasLeftSlot = !!leftSlot;
  const hasRightSlot = !!rightSlot;
  const states = inputTheme.input.states;
  
  let paddingClass = inputTheme.input.padding.default;
  if (hasLeftSlot && hasRightSlot) {
    paddingClass = inputTheme.input.padding.withBothSlots;
  } else if (hasLeftSlot) {
    paddingClass = inputTheme.input.padding.withLeftSlot;
  } else if (hasRightSlot) {
    paddingClass = inputTheme.input.padding.withRightSlot;
  }
  
  return cn(
    inputTheme.input.base,
    paddingClass,
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
    inputTheme.label.base,
    inputTheme.label.color,
    {
      'after:content-["*"] after:ml-0.5 after:text-red-500': mandatory,
    }
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
    state === 'error' ? inputTheme.hint.error : state === 'success' ? inputTheme.hint.success : inputTheme.hint.color
  );
};

export const getSlotClasses = (position: 'left' | 'right') => {
  return cn(
    inputTheme.slot.base,
    inputTheme.slot.positions[position]
  );
}; 