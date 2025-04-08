import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";
import { User, Settings, Lock } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["boxed", "floating", "underline"],
      description: "The visual style of the tabs",
      table: {
        defaultValue: { summary: "underline" },
      },
    },
    size: {
      control: "select",
      options: ["md", "lg"],
      description: "The size of the tabs",
      table: {
        defaultValue: { summary: "md" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" className="w-[400px]" {...args}>
      <TabsList variant={args.variant} size={args.size}>
        <TabsTrigger value="tab1" variant={args.variant} leftSlot={<User size={16} />}>Account</TabsTrigger>
        <TabsTrigger value="tab2" variant={args.variant} leftSlot={<Lock size={16} />}>Password</TabsTrigger>
        <TabsTrigger value="tab3" variant={args.variant} rightSlot={<Settings size={16} />}>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-md border border-gray-200 mt-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <p className="text-gray-600 mt-2">Manage your account preferences here.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-md border border-gray-200 mt-4">
          <h3 className="text-lg font-semibold">Password Settings</h3>
          <p className="text-gray-600 mt-2">Change your password and security settings.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-md border border-gray-200 mt-4">
          <h3 className="text-lg font-semibold">General Settings</h3>
          <p className="text-gray-600 mt-2">Configure your application preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    variant: "underline",
    size: "md",
  },
};

export const Boxed: Story = {
  ...Default,
  args: {
    variant: "boxed",
    size: "md",
  },
};

export const Floating: Story = {
  ...Default,
  args: {
    variant: "floating",
    size: "md",
  },
};

export const Large: Story = {
  ...Default,
  args: {
    variant: "underline",
    size: "lg",
  },
}; 