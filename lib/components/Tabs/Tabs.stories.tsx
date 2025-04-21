import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';
import { User, Settings, Lock } from 'lucide-react';

interface TabsStoryControls {
  expanded?: boolean;
  showLeftSlot?: boolean;
  showRightSlot?: boolean;
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['boxed', 'floating', 'underline'],
      description: 'The visual style of the tabs',
      table: {
        defaultValue: { summary: 'underline' },
      },
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'The size of the tabs',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    expanded: {
      control: 'boolean',
      description: 'Whether tabs should expand to fill the container width',
      table: {
        defaultValue: { summary: false },
      },
    },
    showLeftSlot: {
      control: 'boolean',
      description: 'Show left slot icon',
      table: { category: 'Icons' },
    },
    showRightSlot: {
      control: 'boolean',
      description: 'Show right slot icon',
      table: { category: 'Icons' },
    },
    leftSlot: { control: false, table: { disable: true } },
    rightSlot: { control: false, table: { disable: true } },
  },
} as Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs & TabsStoryControls>;

export const Default: Story = {
  render: args => {
    const { expanded, showLeftSlot, showRightSlot, ...tabsProps } = args as TabsStoryControls &
      typeof args;

    return (
      <Tabs defaultValue="tab1" className="w-[400px]" {...tabsProps}>
        <TabsList variant={args.variant} size={args.size} expanded={expanded}>
          <TabsTrigger
            value="tab1"
            variant={args.variant}
            leftSlot={showLeftSlot ? <User size={16} /> : undefined}
            rightSlot={showRightSlot ? <Settings size={16} /> : undefined}
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            variant={args.variant}
            leftSlot={showLeftSlot ? <Lock size={16} /> : undefined}
            rightSlot={showRightSlot ? <Settings size={16} /> : undefined}
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="tab3"
            variant={args.variant}
            leftSlot={showLeftSlot ? <Settings size={16} /> : undefined}
            rightSlot={showRightSlot ? <Settings size={16} /> : undefined}
          >
            Settings
          </TabsTrigger>
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
    );
  },
  args: {
    variant: 'underline',
    size: 'md',
    expanded: false,
    showLeftSlot: true,
    showRightSlot: true,
  } as any,
};

export const Expanded: Story = {
  ...Default,
  args: {
    ...Default.args,
    expanded: true,
    variant: 'boxed',
  } as any,
};

export const Boxed: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'boxed',
  },
};

export const Floating: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'floating',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'underline',
    size: 'lg',
  },
};
