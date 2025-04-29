import { TextInputSize, TextInputState } from './types';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import { ReactNode } from 'react';

const inputTheme = themeConfig.euler.input;

export enum SlotPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export const getInputBaseClasses = (
  size: TextInputSize = TextInputSize.MEDIUM,
  state: TextInputState = TextInputState.DEFAULT,
  leftSlot?: ReactNode,
  rightSlot?: ReactNode
) => {
  const hasLeftSlot = !!leftSlot;
  const hasRightSlot = !!rightSlot;
  const states = inputTheme.inputBase.states;  
  
  // Extract the base classes that apply to all states
  const baseClasses = [
    inputTheme.inputBase.base,
    inputTheme.inputBase.sizes[size],
    hasLeftSlot && inputTheme.inputBase.slots.left,
    hasRightSlot && inputTheme.inputBase.slots.right,
  ];
  
  // Apply state-specific classes
  const stateClasses = [];
  
  if (state === TextInputState.DEFAULT) {
    stateClasses.push(states.default, states.hover);
  } else if (state === TextInputState.FOCUSED) {
    stateClasses.push(states.default, states.focused);
  } else if (state === TextInputState.FILLED) {
    stateClasses.push(states.default, states.hover); // Keep hover for filled state
  } else if (state === TextInputState.ERROR) {
    stateClasses.push(states.error);
  } else if (state === TextInputState.DISABLED) {
    stateClasses.push(states.disabled);
  }
  
  return cn(...baseClasses, ...stateClasses);
};

export const getInputClasses = (
  state: TextInputState = TextInputState.DEFAULT,
  leftSlot?: ReactNode,
  rightSlot?: ReactNode
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
  
  // Base classes regardless of state
  const baseClasses = [
    inputTheme.input.base,
    paddingClass
  ];
  
  // State-specific classes
  const stateClasses = [];
  
  if (state === TextInputState.DEFAULT || state === TextInputState.FILLED) {
    stateClasses.push(states.default);
  } else if (state === TextInputState.DISABLED) {
    stateClasses.push(states.disabled);
  }
  
  return cn(...baseClasses, ...stateClasses);
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

export const getHintClasses = (state: TextInputState = TextInputState.DEFAULT) => {
  return cn(
    inputTheme.hint.base,
    state === TextInputState.ERROR ? inputTheme.hint.error : 
      state === TextInputState.SUCCESS ? inputTheme.hint.success : 
      inputTheme.hint.color
  );
};

export const getSlotClasses = (position: SlotPosition) => {
  return cn(
    inputTheme.slot.base,
    inputTheme.slot.positions[position]
  );
}; 