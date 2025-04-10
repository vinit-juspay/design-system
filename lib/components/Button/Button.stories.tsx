import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Search, Plus, ArrowRight } from 'lucide-react';

type ButtonProps = React.ComponentProps<typeof Button>;

type ExtendedButtonArgs = ButtonProps & {
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
};

const meta: Meta<ExtendedButtonArgs> = {
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
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    subType: {
      control: 'select',
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

    showLeadingIcon: {
      control: 'boolean',
      description: 'Show leading icon',
      table: { category: 'Icons' },
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Show trailing icon',
      table: { category: 'Icons' },
    },

    leadingIcon: { control: false, table: { disable: true } },
    trailingIcon: { control: false, table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ExtendedButtonArgs>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: 'Primary Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  render: args => {
    const { showLeadingIcon, showTrailingIcon, ...buttonArgs } = args;
    return (
      <Button
        {...buttonArgs}
        leadingIcon={showLeadingIcon ? Search : undefined}
        trailingIcon={showTrailingIcon ? ArrowRight : undefined}
      />
    );
  },
};

export const WithIcons: Story = {
  args: {
    buttonType: 'primary',
    children: 'Search & Go',
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
  render: args => (
    <Button
      {...args}
      leadingIcon={args.showLeadingIcon ? Search : undefined}
      trailingIcon={args.showTrailingIcon ? ArrowRight : undefined}
    />
  ),
};

export const IconOnly: Story = {
  args: {
    buttonType: 'primary',
    subType: 'iconOnly',
    'aria-label': 'Add item',
    showLeadingIcon: true,
  },
  render: args => <Button {...args} leadingIcon={args.showLeadingIcon ? Plus : undefined} />,
};

export const Link: Story = {
  args: {
    buttonType: 'primary',
    subType: 'link',
    children: 'Link Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  render: args => (
    <Button
      {...args}
      leadingIcon={args.showLeadingIcon ? Search : undefined}
      trailingIcon={args.showTrailingIcon ? ArrowRight : undefined}
    />
  ),
};

export const Loading: Story = {
  args: {
    buttonType: 'primary',
    children: 'Loading',
    isLoading: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    children: 'Disabled',
    isDisabled: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Small: Story = {
  args: {
    buttonType: 'primary',
    size: 'sm',
    children: 'Small Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Medium: Story = {
  args: {
    buttonType: 'primary',
    size: 'md',
    children: 'Medium Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Large: Story = {
  args: {
    buttonType: 'primary',
    size: 'lg',
    children: 'Large Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    children: 'Secondary Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Danger: Story = {
  args: {
    buttonType: 'danger',
    children: 'Danger Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Success: Story = {
  args: {
    buttonType: 'success',
    children: 'Success Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};
