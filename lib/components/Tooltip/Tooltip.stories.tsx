import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { TooltipAlign, TooltipSide, TooltipSize, TooltipSlotDirection } from './types';
import { Button } from '../../main';
import { ButtonType } from '../Button/types';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display inside the tooltip',
    },
    side: {
      control: 'select',
      options: Object.values(TooltipSide),
      description: 'Position of the tooltip relative to the trigger',
    },
    align: {
      control: 'select',
      options: Object.values(TooltipAlign),
      description: 'Alignment of the tooltip',
    },
    size: {
      control: 'select',
      options: Object.values(TooltipSize),
      description: 'Size of the tooltip',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
    },
    slotDirection: {
      control: 'select',
      options: Object.values(TooltipSlotDirection),
      description: 'Direction of the slot content',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay before showing the tooltip (in ms)',
    },
    offset: {
      control: 'number',
      description: 'Offset from the trigger element (in px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Small tooltip" size={TooltipSize.SMALL}>
        <Button>Small</Button>
      </Tooltip>
      <Tooltip
        content="Large tooltip with more content that wraps to multiple lines"
        size={TooltipSize.LARGE}
      >
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-10">
      <Tooltip content="Top tooltip" side={TooltipSide.TOP}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side={TooltipSide.RIGHT}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side={TooltipSide.BOTTOM}>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side={TooltipSide.LEFT}>
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Tooltip content="Start aligned" side={TooltipSide.TOP} align={TooltipAlign.START}>
          <Button>Start</Button>
        </Tooltip>
        <Tooltip content="Center aligned" side={TooltipSide.TOP} align={TooltipAlign.CENTER}>
          <Button>Center</Button>
        </Tooltip>
        <Tooltip content="End aligned" side={TooltipSide.TOP} align={TooltipAlign.END}>
          <Button>End</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithoutArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    children: <Button>No Arrow</Button>,
    showArrow: false,
  },
};

export const WithSlot: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip
        content="Tooltip with left slot"
        slot={<span className="text-blue-500">ℹ️</span>}
        slotDirection={TooltipSlotDirection.LEFT}
      >
        <Button>Left Slot</Button>
      </Tooltip>
      <Tooltip
        content="Tooltip with right slot"
        slot={<span className="text-blue-500">ℹ️</span>}
        slotDirection={TooltipSlotDirection.RIGHT}
      >
        <Button>Right Slot</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  args: {
    content: 'Tooltip with 1000ms delay',
    children: <Button>Long Delay</Button>,
    delayDuration: 1000,
  },
};

export const CustomOffset: Story = {
  args: {
    content: 'Tooltip with 20px offset',
    children: <Button>Large Offset</Button>,
    offset: 20,
  },
};

const ControlledTooltipDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Tooltip' : 'Open Tooltip'}
      </Button>
      <div className="mt-4">
        <Tooltip content="Controlled tooltip" open={isOpen}>
          <Button buttonType={ButtonType.SECONDARY}>Hover me (controlled)</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export const ControlledTooltip: Story = {
  render: () => <ControlledTooltipDemo />,
};
