import { ReactNode, InputHTMLAttributes } from 'react';

export enum DropdownInputSize {
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum DropdownInputState {
  DEFAULT = 'default',
  HOVER = 'hover',
  FOCUSED = 'focused',
  FILLED = 'filled',
  ERROR = 'error',
  DISABLED = 'disabled',
  SUCCESS = 'success',
}

export enum DropdownPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface DropdownInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  /** Hint text displayed below the input */
  hintText?: string;
  /** Label text displayed above the input */
  label?: string;
  /** Optional element to display in the left side of the input */
  leftSlot?: ReactNode;
  /** Whether the field is mandatory */
  mandatory?: boolean;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Optional element to display in the right side of the input */
  rightSlot?: ReactNode;
  /** Size of the input */
  size?: DropdownInputSize;
  /** Visual state of the input */
  state?: DropdownInputState;
  /** Secondary label text, e.g. "(optional)" */
  sublabel?: string;
  /** Selected dropdown option value */
  value?: string;
  /** Text value for the input field */
  inputValue?: string;
  /** Content for the tooltip shown when info icon is clicked */
  infoTooltip?: string;
  /** Success message shown below the input */
  successMessage?: string;
  /** Array of options for the dropdown */
  options: DropdownOption[];
  /** Callback when a dropdown option is selected */
  onOptionSelect?: (option: DropdownOption) => void;
  /** Callback when the input value changes */
  onChange?: (value: string) => void;
  /** Whether to show the selected option inside the input field */
  showSelectedOptionInInput?: boolean;
  /** Width of the dropdown section (e.g., '80px', '25%') */
  dropdownWidth?: string;
  /** Placeholder text for the dropdown when no option is selected */
  dropdownPlaceholder?: string;
  /** Position of the dropdown (left or right) */
  dropdownPosition?: DropdownPosition;
} 