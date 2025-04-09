import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";
import Button from "../Button/Button";
import { Info, HelpCircle, AlertCircle } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg"],
      description: "The size of the tooltip",
      table: {
        defaultValue: { summary: "sm" },
      },
    },
    arrow: {
      control: "select",
      options: [
        "default",
        "right",
        "left",
        "bottomCenter",
        "bottomLeft",
        "bottomRight",
        "topCenter",
        "topLeft",
        "topRight",
        "none",
      ],
      description: "The position of the tooltip arrow",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    slotDirection: {
      control: "select",
      options: ["left", "right"],
      description: "The direction of the slot icon",
      table: {
        defaultValue: { summary: "left" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const WithSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Small tooltip" size="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="Large tooltip with more text for demonstration" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
};

export const WithArrowPositions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Tooltip content="Top Left" arrow="topLeft">
        <Button>Top Left</Button>
      </Tooltip>
      <Tooltip content="Top Center" arrow="topCenter">
        <Button>Top Center</Button>
      </Tooltip>
      <Tooltip content="Top Right" arrow="topRight">
        <Button>Top Right</Button>
      </Tooltip>
      
      <Tooltip content="Left" arrow="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="No Arrow" arrow="none">
        <Button>No Arrow</Button>
      </Tooltip>
      <Tooltip content="Right" arrow="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip content="Bottom Left" arrow="bottomLeft">
        <Button>Bottom Left</Button>
      </Tooltip>
      <Tooltip content="Bottom Center" arrow="bottomCenter">
        <Button>Bottom Center</Button>
      </Tooltip>
      <Tooltip content="Bottom Right" arrow="bottomRight">
        <Button>Bottom Right</Button>
      </Tooltip>
    </div>
  ),
};

export const WithSlot: Story = {
  args: {
    content: "Information tooltip",
    slot: Info,
    children: <Button>With Icon</Button>,
  },
};

export const WithSlotDirections: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip 
        content="Left slot tooltip" 
        slot={HelpCircle} 
        slotDirection="left"
      >
        <Button>Left Icon</Button>
      </Tooltip>
      <Tooltip 
        content="Right slot tooltip" 
        slot={AlertCircle} 
        slotDirection="right"
      >
        <Button>Right Icon</Button>
      </Tooltip>
    </div>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Tooltip content="Tooltip on text">
      <span className="cursor-help underline">Hover over this text</span>
    </Tooltip>
  ),
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <h3 className="font-bold mb-1">Rich Content</h3>
        <p>Tooltips can contain rich HTML content</p>
        <ul className="list-disc pl-4 mt-1">
          <li>Including lists</li>
          <li>And other elements</li>
        </ul>
      </div>
    ),
    size: "lg",
    children: <Button>Rich Content</Button>,
  },
}; 