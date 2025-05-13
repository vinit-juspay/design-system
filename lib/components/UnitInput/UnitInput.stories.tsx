import type { Meta, StoryObj } from '@storybook/react';
import { UnitInput } from '../../main';
import { TextInputState, TextInputSize } from '../TextInput/types';
import { Mail, ArrowRight } from 'lucide-react';
import { UnitPosition } from './types';

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
      options: ['default', 'error', 'disabled', 'success'],
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
    value: {
      control: 'text',
    },
  },
} satisfies Meta<typeof UnitInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Measurement',
    placeholder: 'Placeholder Text',
    unitText: 'cm',
    unitPosition: UnitPosition.SUFFIX,
    hintText: 'Enter a value with unit',
    size: TextInputSize.MEDIUM,
    state: TextInputState.DEFAULT,
    mandatory: false,
    sublabel: '(optional)',
    value: '100',
    infoTooltip: 'This is additional information about the field',
    successMessage: 'Input is valid',
    errorMessage: 'This field contains an error',
    leftSlot: <Mail className="w-4 h-4 text-gray-400" />,
    rightSlot: <ArrowRight className="w-4 h-4 text-gray-400" />,
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Weight',
    sublabel: '(optional)',
    placeholder: 'Enter weight',
    unitText: 'kg',
    unitPosition: UnitPosition.SUFFIX,
    hintText: 'Enter weight in kilograms',
    size: TextInputSize.MEDIUM,
    state: TextInputState.DEFAULT,
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Price',
    placeholder: 'Enter price',
    unitText: '$',
    unitPosition: UnitPosition.PREFIX,
    hintText: 'Enter price in USD',
    size: TextInputSize.MEDIUM,
    state: TextInputState.DEFAULT,
  },
};

export const WithMandatory: Story = {
  args: {
    label: 'Email',
    placeholder: 'username',
    unitText: '@example.com',
    unitPosition: UnitPosition.SUFFIX,
    hintText: 'Enter your username only',
    size: TextInputSize.MEDIUM,
    state: TextInputState.DEFAULT,
    mandatory: true,
  },
};

export const WithLargeSize: Story = {
  args: {
    ...Default.args,
    size: TextInputSize.LARGE,
    label: 'Large Input',
  },
};

export const WithErrorState: Story = {
  args: {
    ...Default.args,
    state: TextInputState.ERROR,
    label: 'Error State',
    errorMessage: 'This field contains an error',
  },
};

export const WithSuccessState: Story = {
  args: {
    ...Default.args,
    state: TextInputState.SUCCESS,
    label: 'Success State',
    successMessage: 'Input is valid',
    value: '100',
  },
};

export const WithDisabledState: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DISABLED,
    label: 'Disabled Input',
    value: '50',
  },
};

export const WithInfoTooltip: Story = {
  args: {
    ...Default.args,
    label: 'With Tooltip',
    infoTooltip: 'This is additional information about the field',
  },
};

export const WithLeftSlot: Story = {
  args: {
    ...Default.args,
    leftSlot: <Mail className="w-4 h-4 text-gray-400" />,
    rightSlot: undefined,
  },
};

export const WithRightSlot: Story = {
  args: {
    ...Default.args,
    leftSlot: undefined,
    rightSlot: <ArrowRight className="w-4 h-4 text-gray-400" />,
  },
};
