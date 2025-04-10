import type { Meta, StoryObj } from '@storybook/react';
import { UnitInput } from '../../main';

const meta = {
  title: 'Components/Input/UnitInput',
  component: UnitInput,
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
      options: ['default', 'hover', 'focused', 'filled', 'error', 'disabled'],
    },
    unitPosition: {
      control: 'select',
      options: ['prefix', 'suffix'],
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
    unitText: {
      control: 'text',
    },
    hintText: {
      control: 'text',
    },
    mandatory: {
      control: 'boolean',
    },
    showUnit: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
  },
} satisfies Meta<typeof UnitInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Weight',
    sublabel: '(optional)',
    placeholder: 'Enter weight',
    unitText: 'kg',
    unitPosition: 'suffix',
    hintText: 'Enter weight in kilograms',
    showUnit: true,
    size: 'md',
    state: 'default',
  },
};

export const TextWithSuffix: Story = {
  args: {
    label: 'Username',
    sublabel: '(required)',
    placeholder: 'Enter username',
    unitText: '@company.com',
    unitPosition: 'suffix',
    hintText: 'Enter your username only',
    showUnit: true,
    size: 'md',
    state: 'default',
    mandatory: true,
  },
};

export const TextWithPrefix: Story = {
  args: {
    label: 'Twitter Handle',
    placeholder: 'username',
    unitText: '@',
    unitPosition: 'prefix',
    hintText: 'Enter your Twitter handle without the @ symbol',
    showUnit: true,
    size: 'md',
    state: 'default',
  },
};

export const EmailWithDomain: Story = {
  args: {
    label: 'Email',
    placeholder: 'username',
    unitText: '@example.com',
    unitPosition: 'suffix',
    hintText: 'Enter your username only',
    showUnit: true,
    size: 'md',
    state: 'default',
    mandatory: true,
  },
};

export const CurrencyExample: Story = {
  args: {
    label: 'Price',
    unitPosition: 'prefix',
    unitText: '$',
    hintText: 'Enter price in dollars',
    showUnit: true,
    size: 'md',
    state: 'default',
    value: '19.99',
  },
};

export const PercentageExample: Story = {
  args: {
    label: 'Discount',
    unitPosition: 'suffix',
    unitText: '%',
    hintText: 'Enter discount percentage',
    showUnit: true,
    size: 'md',
    state: 'default',
    value: '15',
  },
};

export const PhoneWithCountryCode: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '123456789',
    unitText: '+1',
    unitPosition: 'prefix',
    hintText: 'Enter your phone number without country code',
    showUnit: true,
    size: 'md',
    state: 'default',

  },
};

export const WithoutUnit: Story = {
  args: {
    label: 'Unit Input',
    sublabel: 'Without unit',
    placeholder: 'Placeholder',
    showUnit: false,
    hintText: 'Unit input without any unit displayed',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: 'error',
    hintText: 'Please enter a valid value',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unit Input',
    sublabel: 'Sublabel text',
    placeholder: 'Placeholder',
    unitText: 'kg',
    state: 'disabled',
    hintText: 'Hint text message',
  },
};

export const Filled: Story = {
  args: {
    label: 'Unit Input',
    sublabel: 'With filled value',
    unitText: 'km',
    state: 'filled',
    value: '100',
    hintText: 'Shows a filled input field',
  },
}; 