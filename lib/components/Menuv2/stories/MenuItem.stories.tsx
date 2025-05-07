import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem, MenuItemType, MenuItemState, MenuItemAction } from '../';
import { 
  Edit, 
  Copy, 
  Trash2, 
  Archive, 
  Check, 
  ChevronRight, 
  Search, 
  FileEdit,
  Bell,
  Settings
} from 'lucide-react';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/Menu and Dropdown/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display in the menu item'
    },
    type: {
      control: 'select',
      options: Object.values(MenuItemType),
      description: 'Type of menu item'
    },
    action: {
      control: 'select',
      options: Object.values(MenuItemAction),
      description: 'Action type for action menu items'
    },
    state: {
      control: 'select',
      options: Object.values(MenuItemState),
      description: 'State of the menu item'
    },
    hasSlotL: {
      control: 'boolean',
      description: 'Whether the menu item has a left slot'
    },
    slotL: {
      control: undefined,
      description: 'Content for the left slot'
    },
    hasSlotR1: {
      control: 'boolean',
      description: 'Whether the menu item has a right slot 1'
    },
    slotR1: {
      control: undefined,
      description: 'Content for the right slot 1'
    },
    hasSlotR2: {
      control: 'boolean',
      description: 'Whether the menu item has a right slot 2'
    },
    slotR2: {
      control: undefined,
      description: 'Content for the right slot 2'
    },
    hasShortcut: {
      control: 'boolean',
      description: 'Whether the menu item has a shortcut'
    },
    shortcutValue: {
      control: 'text',
      description: 'Text for the shortcut'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the menu item is disabled'
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the menu item is clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

// Default MenuItem
export const Default: Story = {
  args: {
    text: 'Default Menu Item',
    type: MenuItemType.DEFAULT,
  },
};

// With Icon (Left Slot)
export const WithLeftIcon: Story = {
  args: {
    text: 'Item with Icon',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Edit size={16} />,
  },
};

// With Shortcut
export const WithShortcut: Story = {
  args: {
    text: 'Item with Shortcut',
    type: MenuItemType.DEFAULT,
    hasShortcut: true,
    shortcutValue: '⌘S',
  },
};

// With Icon and Shortcut
export const WithIconAndShortcut: Story = {
  args: {
    text: 'Item with Icon and Shortcut',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Edit size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘E',
  },
};

// Primary Action
export const PrimaryAction: Story = {
  args: {
    text: 'Primary Action',
    type: MenuItemType.ACTION,
    action: MenuItemAction.PRIMARY,
    hasSlotL: true,
    slotL: <Archive size={16} />,
  },
};

// Danger Action
export const DangerAction: Story = {
  args: {
    text: 'Delete Item',
    type: MenuItemType.ACTION,
    action: MenuItemAction.DANGER,
    hasSlotL: true,
    slotL: <Trash2 size={16} />,
  },
};

// Label Item
export const Label: Story = {
  args: {
    text: 'Category Label',
    type: MenuItemType.LABEL,
  },
};

// Separator
export const Separator: Story = {
  args: {
    text: '',
    type: MenuItemType.SEPARATOR,
  },
};

// Multi-select Item (Not Selected)
export const MultiSelectNotSelected: Story = {
  args: {
    text: 'Multi-select Item (Not Selected)',
    type: MenuItemType.MULTI_SELECT,
  },
};

// Multi-select Item (Selected)
export const MultiSelectSelected: Story = {
  args: {
    text: 'Multi-select Item (Selected)',
    type: MenuItemType.MULTI_SELECT,
    hasSlotR2: true,
    slotR2: <Check size={16} />,
  },
};

// Submenu Item
export const SubmenuItem: Story = {
  args: {
    text: 'Submenu Item',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Settings size={16} />,
    hasSlotR2: true,
    slotR2: <ChevronRight size={16} />,
  },
};

// Disabled Item
export const DisabledItem: Story = {
  args: {
    text: 'Disabled Item',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Bell size={16} />,
    disabled: true,
  },
};

// Interactive States Demo
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default State</h3>
        <MenuItem
          text="Default State"
          type={MenuItemType.DEFAULT}
          state={MenuItemState.DEFAULT}
          hasSlotL={true}
          slotL={<Settings size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Hover State</h3>
        <MenuItem
          text="Hover State"
          type={MenuItemType.DEFAULT}
          state={MenuItemState.HOVER}
          hasSlotL={true}
          slotL={<Settings size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Selected State</h3>
        <MenuItem
          text="Selected State"
          type={MenuItemType.DEFAULT}
          state={MenuItemState.SELECTED}
          hasSlotL={true}
          slotL={<Settings size={16} />}
        />
      </div>
    </div>
  ),
}; 