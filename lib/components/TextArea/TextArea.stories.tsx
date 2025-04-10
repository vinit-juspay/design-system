import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TextArea from './TextArea';

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
      description: 'Whether the textarea is required',
    },
    rows: {
      control: 'number',
      description: 'Number of rows to display',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters allowed',
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
    hintText: 'Please provide any comments or suggestions',
    showLabel: true,
    showSublabel: true,
    showHint: true,
    showInfo: false,
    mandatory: false,
    rows: 4,
    onChange: fn(),
  },
};

export const Mandatory: Story = {
  args: {
    ...Default.args,
    mandatory: true,
    sublabel: '',
  },
};

export const WithInfo: Story = {
  args: {
    ...Default.args,
    showInfo: true,
    infoTooltip: 'Your feedback helps us improve our service',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: 'error',
    hintText: 'Please enter at least 10 characters',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: 'disabled',
  },
};