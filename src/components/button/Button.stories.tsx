import type { Meta, StoryObj } from '@storybook/react';
import { Search, ArrowRight, Plus } from 'lucide-react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success'],
      description: 'The visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    subType: {
      control: 'radio',
      options: ['default', 'iconOnly', 'link'],
      description: 'The sub-type of the button',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    buttonType: 'danger',
    size: 'md',
    children: 'Danger Button',
  },
};

export const Success: Story = {
  args: {
    buttonType: 'success',
    size: 'md',
    children: 'Success Button',
  },
};

export const WithIcons: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    children: 'Search',
    leadingIcon: Search,
    trailingIcon: ArrowRight,
  },
};

export const IconOnly: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    subType: 'iconOnly',
    leadingIcon: Plus,
    'aria-label': 'Add item',
  },
};

export const Link: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    subType: 'link',
    children: 'Learn more',
  },
};

export const Loading: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    isLoading: true,
    children: 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    isDisabled: true,
    children: 'Disabled',
  },
};

export const Small: Story = {
  args: {
    buttonType: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    buttonType: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
}; 