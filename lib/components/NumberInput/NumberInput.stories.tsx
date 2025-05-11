import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign, Mail } from 'lucide-react';
import { NumberInput } from '../../main';
import { TextInputSize, TextInputState } from '../TextInput/types';

const meta = {
  title: 'Components/Input/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
    label: {
      control: 'text',
    },
    sublabel: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    hintText: {
      control: 'text',
    },
    mandatory: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    value: {
      control: 'number',
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Amount',
    sublabel: '(optional)',
    placeholder: 'Enter amount',
    hintText: 'Enter the amount in USD',

    rightSlot: <DollarSign className="text-gray-400 w-4 h-4" />,
    leftSlot: <DollarSign className="text-gray-400 w-4 h-4" />,
  },
};

export const Mandatory: Story = {
  args: {
    ...Default.args,
    mandatory: true,
    sublabel: undefined,

  },
};

export const WithLeftIcon: Story = {
  args: {
    ...Default.args,
    leftSlot: <Mail className="text-gray-400 w-4 h-4" />,

  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: TextInputSize.LARGE,
  },
};

export const WithoutStepper: Story = {
  args: {
    ...Default.args,
  },
};

export const WithMinMax: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 100,
    value: 50,
    hintText: 'Value is limited between 0 and 100',
  },
};

export const WithStep: Story = {
  args: {
    ...Default.args,
    step: 10,
    value: 50,
    hintText: 'Value changes in steps of 10',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: TextInputState.ERROR,
    hintText: 'Please enter a valid number',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DISABLED,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DEFAULT,
    value: 42,
  },
}; 