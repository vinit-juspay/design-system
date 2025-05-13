import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
import { TextInputState } from '../TextInput/types';

const meta = {
  title: 'Components/Input/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'The state of the textarea',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text for the textarea',
    },
    sublabel: {
      control: 'text',
      description: 'Additional helper text below the label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    hintText: {
      control: 'text',
      description: 'Hint text displayed below the textarea',
    },
    mandatory: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    rows: {
      control: 'number',
      description: 'Number of rows to display',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the textarea',
    },
    successMessage: {
      control: 'text',
      description: 'Success message displayed below the textarea',
    },
    infoTooltip: {
      control: 'text',
      description: 'Tooltip text displayed below the textarea',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Your Feedback',
    sublabel: '(optional)',
    placeholder: 'Enter your feedback here',
    mandatory: false,
    rows: 4,
    hintText: 'Please provide any comments or suggestions',
    errorMessage: 'Please enter a valid email address',
    successMessage: 'Email address is valid',
    infoTooltip: 'Additional information about this field',
  },
};

export const Mandatory: Story = {
  args: {
    ...Default.args,
    mandatory: true,
    sublabel: undefined,
    infoTooltip: undefined,
  },
};

export const WithInfo: Story = {
  args: {
    ...Default.args,
    sublabel: undefined,
    infoTooltip: 'Your feedback helps us improve our service',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: TextInputState.ERROR,
    errorMessage: 'Please enter a valid paragraph',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    state: TextInputState.SUCCESS,
    successMessage: 'Paragraph is valid',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DISABLED,
  },
};
