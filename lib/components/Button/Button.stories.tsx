import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { ButtonType, ButtonSize, ButtonSubType } from './types';

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
      options: Object.values(ButtonType),
      description: 'The visual style of the button',
      table: {
        defaultValue: { summary: ButtonType.PRIMARY },
      },
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
      description: 'The size of the button',
      table: {
        defaultValue: { summary: ButtonSize.MEDIUM },
      },
    },
    subType: {
      control: 'select',
      options: Object.values(ButtonSubType),
      description: 'The sub-type of the button',
      table: {
        defaultValue: { summary: ButtonSubType.DEFAULT },
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
    buttonType: ButtonType.PRIMARY,
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
    buttonType: ButtonType.PRIMARY,
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
    buttonType: ButtonType.PRIMARY,
    subType: ButtonSubType.ICON_ONLY,
    showLeadingIcon: true,
    showTrailingIcon: false,
    'aria-label': 'Add item',
  },
  render: args => <Button {...args} leadingIcon={args.showLeadingIcon ? Plus : undefined} />,
};

export const Link: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    subType: ButtonSubType.LINK,
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
    buttonType: ButtonType.PRIMARY,
    children: 'Loading',
    isLoading: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Disabled: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    children: 'Disabled',
    isDisabled: true,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Small: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.SMALL,
    children: 'Small Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Medium: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.MEDIUM,
    children: 'Medium Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Large: Story = {
  args: {
    buttonType: ButtonType.PRIMARY,
    size: ButtonSize.LARGE,
    children: 'Large Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Secondary: Story = {
  args: {
    buttonType: ButtonType.SECONDARY,
    children: 'Secondary Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Danger: Story = {
  args: {
    buttonType: ButtonType.DANGER,
    children: 'Danger Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const Success: Story = {
  args: {
    buttonType: ButtonType.SUCCESS,
    children: 'Success Button',
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};
