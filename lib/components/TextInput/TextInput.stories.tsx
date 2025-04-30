import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";
import { Mail, ArrowRight } from "lucide-react";
import { TextInputState, TextInputSize } from "./types";

const meta: Meta<typeof TextInput> = {
  title: "Components/Input/TextInput",
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
      options: ["default", "error", "disabled", "success"],
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
      description: "Hint text displayed below the input when in default state",
    },
    mandatory: {
      control: "boolean",
      description: "Whether the input is required",
    },
    value: {
      control: "text",
      description: "The value of the input",
    },
    infoTooltip: {
      control: "text",
      description: "Tooltip text for the input",
    },
    leftSlot: {
      control: "object",
      description: "Left slot for the input",
    },
    rightSlot: {
      control: "object",
      description: "Right slot for the input",
    },
    successMessage: {
      control: "text",
      description: "Success message shown when state is success; only rendered when state is success",
    },
    errorMessage: {
      control: "text",
      description: "Error message shown when state is error; only rendered when state is error",
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
    value: "test@test.com",
    infoTooltip: "Additional information about this field", 
    state: TextInputState.DEFAULT,
    size: TextInputSize.MEDIUM,
    rightSlot: <ArrowRight className="text-gray-400 w-4 h-4" />,
    mandatory: false,
    successMessage: "Success message",
    errorMessage: "Please enter a valid value"
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: TextInputState.DISABLED,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: TextInputState.ERROR,
    errorMessage: "Please enter a valid value",
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    state: TextInputState.SUCCESS,
    successMessage: "Value successfully validated",
  },
};

export const Mandatory: Story = {
  args: {
    ...Default.args,
    mandatory: true,
    sublabel: undefined,
  },
};

export const OnlyLeftSlot: Story = {
  args: {
    ...Default.args,
    leftSlot: <Mail className="w-4 h-4 text-gray-400" />,
    rightSlot: null,
  },
};

export const OnlyRightSlot: Story = {
  args: {
    ...Default.args,
    leftSlot: null,
    rightSlot: <ArrowRight className="text-gray-400 w-4 h-4" />,
  },
};

export const NoLabel: Story = {
  args: {
    ...Default.args,
    label: undefined,
  },
};

export const NoLabelNoHint: Story = {
  args: {
    ...NoLabel.args,
    hintText: undefined,
    label: undefined,
    state: TextInputState.DEFAULT,
    value: undefined,
  },
};

export const NoLabelNoHintNoSlot: Story = {
  args: {
    ...NoLabelNoHint.args,
    leftSlot: null,
    rightSlot: null,
  },
};




