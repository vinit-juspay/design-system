import { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './index';
import { Button } from '../Button';
import { ButtonGroupSize, ButtonGroupMode } from './types';
import { ButtonType } from '../Button/types';

// Define an interface for our story args that includes the special control
interface ButtonGroupStoryArgs {
  size?: ButtonGroupSize;
  isStacked?: boolean;
  mode?: ButtonGroupMode;
  numberOfButtons?: number; // Storybook-only control
}

const meta: Meta<ButtonGroupStoryArgs> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['children', 'className'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ButtonGroupSize),
      description: 'The size of buttons in the group',
      table: {
        defaultValue: { summary: ButtonGroupSize.MEDIUM },
      },
    },
    isStacked: {
      control: 'boolean',
      description: 'Whether buttons should be stacked without spacing',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    mode: {
      control: 'select',
      options: Object.values(ButtonGroupMode),
      description: 'Button group mode for type handling',
      table: {
        defaultValue: { summary: ButtonGroupMode.SINGLE_PRIMARY },
      },
    },
    numberOfButtons: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Number of buttons to show (Storybook control only)',
      defaultValue: 2,
      table: {
        category: 'Storybook Controls',
      },
    },
  },
  render: args => {
    const {
      numberOfButtons = 2,
      mode = ButtonGroupMode.SINGLE_PRIMARY,
      ...buttonGroupProps
    } = args;

    // Generate the specified number of buttons
    const buttons = Array.from({ length: numberOfButtons }, (_, index) => {
      // Set different button types based on index
      let buttonType;

      if (mode === ButtonGroupMode.NO_TRANSFORM) {
        // In NO_TRANSFORM mode, use a variety of button types
        const types = [
          ButtonType.PRIMARY,
          ButtonType.DANGER,
          ButtonType.SUCCESS,
          ButtonType.SECONDARY,
        ];
        buttonType = types[index % types.length];
      } else {
        // For other modes, follow the standard pattern (first PRIMARY, rest SECONDARY)
        buttonType = index === 0 ? ButtonType.PRIMARY : ButtonType.SECONDARY;
      }

      return <Button key={index} buttonType={buttonType} text={`Button ${index + 1}`} />;
    });

    return (
      <ButtonGroup {...buttonGroupProps} mode={mode}>
        {buttons}
      </ButtonGroup>
    );
  },
};

export default meta;
type Story = StoryObj<ButtonGroupStoryArgs>;

// Default story uses the render function from meta
export const Default: Story = {
  args: {
    size: ButtonGroupSize.MEDIUM,
    isStacked: true,
    mode: ButtonGroupMode.SINGLE_PRIMARY,
    numberOfButtons: 2,
  },
};

export const NotStacked: Story = {
  args: {
    ...Default.args,
    isStacked: false,
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: ButtonGroupSize.SMALL,
    numberOfButtons: 3,
  },
};

export const MediumSize: Story = {
  args: {
    ...Default.args,
    size: ButtonGroupSize.MEDIUM,
    numberOfButtons: 3,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: ButtonGroupSize.LARGE,
    numberOfButtons: 3,
  },
};

// For stories with special button types, we need a custom render function
export const MixedButtonTypes: Story = {
  render: args => {
    const { size, isStacked, mode } = args;
    return (
      <ButtonGroup size={size} isStacked={isStacked} mode={mode}>
        <Button key="1" buttonType={ButtonType.PRIMARY} text="Primary" />
        <Button key="2" buttonType={ButtonType.DANGER} text="Danger" />
        <Button key="3" buttonType={ButtonType.SUCCESS} text="Success" />
      </ButtonGroup>
    );
  },
  args: {
    size: ButtonGroupSize.MEDIUM,
    isStacked: true,
    mode: ButtonGroupMode.SINGLE_PRIMARY,
  },
};

export const NoTransformMode: Story = {
  render: args => {
    const { size, isStacked } = args;
    return (
      <ButtonGroup size={size} isStacked={isStacked} mode={ButtonGroupMode.NO_TRANSFORM}>
        <Button key="1" buttonType={ButtonType.PRIMARY} text="Original Primary" />
        <Button key="2" buttonType={ButtonType.DANGER} text="Original Danger" />
        <Button key="3" buttonType={ButtonType.SUCCESS} text="Original Success" />
        <Button key="4" buttonType={ButtonType.SECONDARY} text="Original Secondary" />
      </ButtonGroup>
    );
  },
  args: {
    size: ButtonGroupSize.MEDIUM,
    isStacked: true,
  },
};

export const AllSecondaryMode: Story = {
  render: args => {
    const { size, isStacked } = args;
    return (
      <ButtonGroup size={size} isStacked={isStacked} mode={ButtonGroupMode.ALL_SECONDARY}>
        <Button key="1" buttonType={ButtonType.PRIMARY} text="Forced Secondary 1" />
        <Button key="2" buttonType={ButtonType.DANGER} text="Forced Secondary 2" />
        <Button key="3" buttonType={ButtonType.SUCCESS} text="Forced Secondary 3" />
      </ButtonGroup>
    );
  },
  args: {
    size: ButtonGroupSize.MEDIUM,
    isStacked: true,
  },
};
