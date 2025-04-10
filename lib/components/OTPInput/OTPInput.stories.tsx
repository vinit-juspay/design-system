import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import OTPInput from './OTPInput';

const meta = {
  title: 'Input/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    digits: {
      control: 'select',
      options: ['4', '6'],
      description: 'Number of OTP digit inputs',
      table: {
        defaultValue: { summary: '6' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focused', 'filled', 'error', 'disabled'],
      description: 'The state of the OTP inputs',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text for the OTP input',
    },
    sublabel: {
      control: 'text',
      description: 'Additional helper text below the label',
    },
    hintText: {
      control: 'text',
      description: 'Hint text displayed below the inputs',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label',
    },
    showSublabel: {
      control: 'boolean',
      description: 'Whether to show the sublabel',
    },
    showHint: {
      control: 'boolean',
      description: 'Whether to show the hint text',
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show the info tooltip',
    },
    mandatory: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Verification Code',
    sublabel: '(required)',
    hintText: 'Enter the verification code sent to your device',
    digits: '6',
    state: 'default',
    showLabel: true,
    showSublabel: true,
    showHint: true,
    showInfo: false,
    mandatory: true,
    onChange: fn(),
  },
};

export const FourDigits: Story = {
  args: {
    ...Default.args,
    digits: '4',
    sublabel: '4-digit code',
  },
};

export const WithInfo: Story = {
  args: {
    ...Default.args,
    showInfo: true,
    infoTooltip: 'The verification code was sent to your email or phone',
  },
};

export const Focused: Story = {
  args: {
    ...Default.args,
    state: 'focused',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: 'filled',
    value: '123456',
  },
};

export const FourDigitsFilled: Story = {
  args: {
    ...Default.args,
    digits: '4',
    state: 'filled',
    value: '1234',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: 'error',
    hintText: 'Invalid verification code',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: 'disabled',
    hintText: 'You cannot edit this field',
  },
}; 