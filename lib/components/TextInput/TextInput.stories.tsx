import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";
import { Mail, ArrowRight } from "lucide-react";



const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
      description: "The size of the input field",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: "select",
      options: ["default", "hover", "focused", "filled", "error", "disabled", "success"],
      description: "The state of the input field",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: "text",
      description: "The label text for the input",
    },
    sublabel: {
      control: "text",
      description: "Additional helper text below the label",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    hintText: {
      control: "text",
      description: "Hint text displayed below the input",
    },
    mandatory: {
      control: "boolean",
      description: "Whether the input is required",
    }
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Your Label",
    sublabel: "(optional)",
    placeholder: "Your placeholder",
    hintText: "This is a hint text to help user.",
    leftSlot: <Mail className="w-4 h-4 text-gray-400" />,
    size: "md",
    state: "default",
    rightSlot: <ArrowRight className="text-gray-400 w-4 h-4" />,
  },
};

export const Mandatory: Story = {
  args: {
    ...Default.args,
    mandatory: true,
    sublabel: "",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: "error",
    hintText: "Please enter a valid value",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: "disabled",
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: "filled",
    value: "test@test.com",
  },
};