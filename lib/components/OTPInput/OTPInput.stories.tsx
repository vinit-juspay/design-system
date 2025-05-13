import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import OTPInput from './OTPInput';
import { TextInputState } from '../TextInput/types';
import { OTPDigits } from './types';
const meta = {
  title: 'Components/Input/OTPInput',
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
      options: ['default', 'error', 'disabled'],
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
    mandatory: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the inputs',
    },
    successMessage: {
      control: 'text',
      description: 'Success message displayed below the inputs',
    },
    infoTooltip: {
      control: 'text',
      description: 'Tooltip text displayed below the inputs',
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
    digits: OTPDigits.SIX,
    state: TextInputState.DEFAULT,
    mandatory: true,
    successMessage: 'Verification code is valid',
    errorMessage: 'Invalid verification code',
    infoTooltip: 'The verification code was sent to your email or phone',
    onChange: fn(),
  },
};

export const FourDigits: Story = {
  args: {
    ...Default.args,
    digits: OTPDigits.FOUR,
    sublabel: '4-digit code',
  },
};

export const WithInfo: Story = {
  args: {
    ...Default.args,
    infoTooltip: 'The verification code was sent to your email or phone',
  },
};

export const Focused: Story = {
  args: {
    ...Default.args,
    state: TextInputState.FOCUSED,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.FILLED,
    value: '123456',
  },
};

export const FourDigitsFilled: Story = {
  args: {
    ...Default.args,
    digits: OTPDigits.FOUR,
    state: TextInputState.FILLED,
    value: '1234',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: TextInputState.ERROR,
    errorMessage: 'Invalid verification code',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DISABLED,
    hintText: 'You cannot edit this field',
  },
};
