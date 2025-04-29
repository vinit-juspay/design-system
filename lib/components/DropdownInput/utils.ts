import { ReactNode } from 'react';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import { DropdownInputSize, DropdownInputState, DropdownPosition } from './types';

const inputTheme = themeConfig.euler.input;
const dropdownInputTheme = themeConfig.euler.dropdownInput;

export enum SlotPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export const getInputBaseClasses = (
  size: DropdownInputSize = DropdownInputSize.MEDIUM,
  state: DropdownInputState = DropdownInputState.DEFAULT,
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
  
  if (state === DropdownInputState.DEFAULT) {
    stateClasses.push(states.default, states.hover);
  } else if (state === DropdownInputState.FOCUSED) {
    stateClasses.push(states.default, states.focused);
  } else if (state === DropdownInputState.FILLED) {
    stateClasses.push(states.default, states.hover); // Keep hover for filled state
  } else if (state === DropdownInputState.ERROR) {
    stateClasses.push(states.error);
  } else if (state === DropdownInputState.DISABLED) {
    stateClasses.push(states.disabled);
  }
  
  return cn(...baseClasses, ...stateClasses);
};

export const getInputClasses = (
  state: DropdownInputState = DropdownInputState.DEFAULT,
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
    paddingClass,
    dropdownInputTheme.input.base
  ];
  
  // State-specific classes
  const stateClasses = [];
  
  if (state === DropdownInputState.DEFAULT || state === DropdownInputState.FILLED) {
    stateClasses.push(states.default);
  } else if (state === DropdownInputState.DISABLED) {
    stateClasses.push(states.disabled);
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

export const getHintClasses = (state: DropdownInputState = DropdownInputState.DEFAULT) => {
  return cn(
    inputTheme.hint.base,
    state === DropdownInputState.ERROR ? inputTheme.hint.error : 
      state === DropdownInputState.SUCCESS ? inputTheme.hint.success : 
      inputTheme.hint.color
  );
};

export const getSlotClasses = (position: SlotPosition) => {
  return cn(
    inputTheme.slot.base,
    inputTheme.slot.positions[position]
  );
};

export const getDropdownClasses = (position: DropdownPosition) => {
  return cn(
    dropdownInputTheme.dropdown.base,
    position === DropdownPosition.LEFT 
      ? dropdownInputTheme.dropdown.positions.left 
      : dropdownInputTheme.dropdown.positions.right
  );
};

export const getDropdownOptionContainerClasses = () => {
  return cn(dropdownInputTheme.dropdown.option.container);
};

export const getDropdownOptionLabelClasses = () => {
  return cn(dropdownInputTheme.dropdown.option.label);
};

export const getDropdownOptionIconClasses = () => {
  return cn(dropdownInputTheme.dropdown.option.icon);
};

export const getDropdownChevronClasses = () => {
  return cn(dropdownInputTheme.dropdown.option.chevron);
};

export const getDropdownPlaceholderClasses = () => {
  return cn(dropdownInputTheme.dropdown.option.placeholder);
};

export const getInputWithLeftPaddingClasses = () => {
  return cn(dropdownInputTheme.input.withLeftPadding);
};

export const getDropdownMenuClasses = () => {
  return cn(dropdownInputTheme.menu.base);
};

export const getDropdownMenuItemClasses = (isActive: boolean = false) => {
  return cn(
    dropdownInputTheme.menu.item.base,
    isActive && dropdownInputTheme.menu.item.active
  );
};

export const getDropdownMenuItemContentClasses = () => {
  return cn(dropdownInputTheme.menu.item.content);
};

export const getDropdownMenuItemIconClasses = () => {
  return cn(dropdownInputTheme.menu.item.icon);
};

export const getDropdownMenuItemTextClasses = () => {
  return cn(dropdownInputTheme.menu.item.text);
};

export const getDropdownMenuItemCheckIconClasses = () => {
  return cn(dropdownInputTheme.menu.item.checkIcon);
};

export const getDropdownWithLeftSlotClass = () => {
  return cn(dropdownInputTheme.dropdown.withLeftSlot);
}; 