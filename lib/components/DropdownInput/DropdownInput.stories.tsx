import { Meta, StoryObj } from '@storybook/react';
import { User, Mail, Phone, Lock, Search } from 'lucide-react';
import DropdownInput from './DropdownInput';
import { DropdownInputSize, DropdownInputState, DropdownPosition } from './types';

const meta: Meta<typeof DropdownInput> = {
  title: 'Components/DropdownInput',
  component: DropdownInput,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    sublabel: '(optional)',
    placeholder: 'Select or enter text',
    hintText: 'This is a hint text to help user',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    dropdownPlaceholder: 'Select',
    showSelectedOptionInInput: true,
    mandatory: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DropdownInputSize),
      description: 'Size of the input component',
    },
    state: {
      control: 'select',
      options: Object.values(DropdownInputState),
      description: 'Visual state of the input component',
    },
    dropdownPosition: {
      control: 'select',
      options: Object.values(DropdownPosition),
      description: 'Position of the dropdown (left or right)',
    },
    leftSlot: {
      control: false,
      description: 'Optional element to display on the left side of the input',
    },
    rightSlot: {
      control: false,
      description: 'Optional element to display on the right side of the input',
    },
    options: {
      control: 'object',
      description: 'Array of options for the dropdown',
    },
    onChange: { action: 'changed' },
    onOptionSelect: { action: 'option selected' },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownInput>;

// Basic Example
export const Default: Story = {
  args: {},
};

// Different Sizes
export const Medium: Story = {
  args: {
    size: DropdownInputSize.MEDIUM,
  },
};

export const Large: Story = {
  args: {
    size: DropdownInputSize.LARGE,
  },
};

// Different States
export const Hover: Story = {
  args: {
    state: DropdownInputState.HOVER,
  },
};

export const Focused: Story = {
  args: {
    state: DropdownInputState.FOCUSED,
  },
};

export const Filled: Story = {
  args: {
    state: DropdownInputState.FILLED,
    value: 'option1',
    inputValue: 'Option 1',
  },
};

export const Error: Story = {
  args: {
    state: DropdownInputState.ERROR,
    errorMessage: 'This field has an error',
  },
};

export const Success: Story = {
  args: {
    state: DropdownInputState.SUCCESS,
    successMessage: 'Successfully validated',
  },
};

export const Disabled: Story = {
  args: {
    state: DropdownInputState.DISABLED,
    inputValue: 'You cannot change this',
  },
};

// Dropdown Positions
export const LeftDropdown: Story = {
  args: {
    dropdownPosition: DropdownPosition.LEFT,
  },
};

export const RightDropdown: Story = {
  args: {
    dropdownPosition: DropdownPosition.RIGHT,
  },
};

// With Icons in Options
export const WithIconOptions: Story = {
  args: {
    options: [
      { label: 'User', value: 'user', icon: <User size={16} /> },
      { label: 'Mail', value: 'mail', icon: <Mail size={16} /> },
      { label: 'Phone', value: 'phone', icon: <Phone size={16} /> },
    ],
  },
};

// With Slots
export const WithLeftSlot: Story = {
  args: {
    leftSlot: <Search className="h-4 w-4 text-gray-500" />,
  },
};

export const WithRightSlot: Story = {
  args: {
    rightSlot: <Lock className="h-4 w-4 text-gray-500" />,
  },
};

export const WithBothSlots: Story = {
  args: {
    leftSlot: <Search className="h-4 w-4 text-gray-500" />,
    rightSlot: <Lock className="h-4 w-4 text-gray-500" />,
  },
};

// With Tooltip
export const WithInfoTooltip: Story = {
  args: {
    infoTooltip: 'This is additional information about this field',
  },
};

// Required Input
export const Required: Story = {
  args: {
    mandatory: true,
  },
};

// Custom Width for Dropdown
export const CustomDropdownWidth: Story = {
  args: {
    dropdownWidth: '120px',
  },
};

// Hide Selected Option in Input
export const HideSelectedOptionInInput: Story = {
  args: {
    showSelectedOptionInInput: false,
  },
};

// Playground
export const Playground: Story = {
  args: {
    label: 'Contact Method',
    sublabel: '(pick one)',
    options: [
      { label: 'Email', value: 'email', icon: <Mail size={16} /> },
      { label: 'Phone', value: 'phone', icon: <Phone size={16} /> },
      { label: 'In Person', value: 'in-person', icon: <User size={16} /> },
    ],
    hintText: 'How would you like to be contacted?',
    mandatory: true,
    size: DropdownInputSize.LARGE,
    placeholder: 'Select contact method',
    dropdownPosition: DropdownPosition.LEFT,
  },
};
