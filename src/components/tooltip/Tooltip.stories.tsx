import type { Meta, StoryObj } from '@storybook/react';
import { Info, HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import { Button } from '../../../lib/main';

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
      description: 'The content of the tooltip',
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: 'The size of the tooltip',
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
    arrow: {
      control: 'select',
      options: ['default', 'right', 'left', 'bottomCenter', 'bottomLeft', 'bottomRight', 'topCenter', 'topLeft', 'topRight', 'none'],
      description: 'The position of the arrow',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    hasSlot: {
      control: 'boolean',
      description: 'Whether the tooltip has a slot',
    },
    slotDirection: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'The direction of the slot',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    providerProps: {
      control: 'object',
      description: 'Props for the tooltip provider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const Large: Story = {
  args: {
    content: 'This is a large tooltip with more text content',
    size: 'lg',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const WithLeftSlot: Story = {
  args: {
    content: 'Information tooltip',
    hasSlot: true,
    slot: Info,
    slotDirection: 'left',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const WithRightSlot: Story = {
  args: {
    content: 'Help tooltip',
    hasSlot: true,
    slot: HelpCircle,
    slotDirection: 'right',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const NoArrow: Story = {
  args: {
    content: 'Tooltip without arrow',
    arrow: 'none',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const RightArrow: Story = {
  args: {
    content: 'Tooltip with right arrow',
    arrow: 'right',
    children: <Button buttonType="primary" size="md">Hover me</Button>,
  },
};

export const Delayed: Story = {
  args: {
    content: 'This tooltip appears after a delay',
    providerProps: { delayDuration: 1000 },
    children: <Button buttonType="primary" size="md">Hover me (1s delay)</Button>,
  },
}; 