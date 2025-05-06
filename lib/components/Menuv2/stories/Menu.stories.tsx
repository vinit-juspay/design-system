import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Menu, 
  MenuItem, 
  MenuType, 
  MenuItemType, 
  MenuItemState, 
  MenuItemAction 
} from '../';
import { 
  Edit, 
  Copy, 
  Trash2, 
  Archive, 
  Check, 
  ChevronRight, 
  Search, 
  FileEdit,
  FileText,
  FileSpreadsheet,
  FileIcon,
  Download,
  Share,
  Mail,
  Save,
  Printer
} from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menuv2',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(MenuType),
      description: 'Type of menu'
    },
    hasSearch: {
      control: 'boolean',
      description: 'Whether the menu has search functionality'
    },
    items: {
      control: 'object',
      description: 'Menu items to display'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input'
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Default menu items
const defaultItems = [
  {
    id: 'item1',
    text: 'Edit',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Edit size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘E',
  },
  {
    id: 'item2',
    text: 'Duplicate',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <FileEdit size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘D',
  },
  {
    id: 'item3',
    text: 'Copy',
    type: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Copy size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘C',
  },
  {
    id: 'separator1',
    text: '',
    type: MenuItemType.SEPARATOR,
  },
  {
    id: 'item4',
    text: 'Archive',
    type: MenuItemType.ACTION,
    action: MenuItemAction.PRIMARY,
    hasSlotL: true,
    slotL: <Archive size={16} />,
    hasSlotR2: true,
    slotR2: <ChevronRight size={16} />,
  },
  {
    id: 'item5',
    text: 'Delete',
    type: MenuItemType.ACTION,
    action: MenuItemAction.DANGER,
    hasSlotL: true,
    slotL: <Trash2 size={16} />,
  }
];

// Default Menu Example
export const Default: Story = {
  args: {
    type: MenuType.DEFAULT,
    hasSearch: false,
    items: defaultItems
  },
};

// Menu with Search
export const WithSearch: Story = {
  args: {
    type: MenuType.DEFAULT,
    hasSearch: true,
    searchPlaceholder: 'Search...',
    items: defaultItems
  },
};

// Context Menu
export const ContextMenu: Story = {
  args: {
    type: MenuType.CONTEXT_MENU,
    hasSearch: false,
    items: defaultItems
  },
};

// Multi-Select Menu
const MultiSelectMenuExample = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const multiSelectItems = [
    {
      id: 'label1',
      text: 'Select Options',
      type: MenuItemType.LABEL,
    },
    {
      id: 'option1',
      text: 'Option 1',
      type: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option1'),
      slotR2: selectedItems.includes('option1') ? <Check size={16} /> : null,
    },
    {
      id: 'option2',
      text: 'Option 2',
      type: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option2'),
      slotR2: selectedItems.includes('option2') ? <Check size={16} /> : null,
    },
    {
      id: 'option3',
      text: 'Option 3',
      type: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option3'),
      slotR2: selectedItems.includes('option3') ? <Check size={16} /> : null,
    },
    {
      id: 'separator2',
      text: '',
      type: MenuItemType.SEPARATOR,
    },
    {
      id: 'option4',
      text: 'Apply Selection',
      type: MenuItemType.ACTION,
      action: MenuItemAction.PRIMARY,
    }
  ];

  return (
    <Menu
      type={MenuType.MULTI_SELECT}
      hasSearch={true}
      searchPlaceholder="Search options..."
      items={multiSelectItems}
      selectedItems={selectedItems}
      onSelectionChange={(items) => setSelectedItems(items)}
      onItemClick={(item) => {
        if (item.id && item.type === MenuItemType.MULTI_SELECT) {
          const newSelectedItems = selectedItems.includes(item.id)
            ? selectedItems.filter(id => id !== item.id)
            : [...selectedItems, item.id];
          setSelectedItems(newSelectedItems);
        }
      }}
    />
  );
};

export const MultiSelect: Story = {
  render: () => <MultiSelectMenuExample />,
};

// Menu Item Examples
export const MenuItems: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Item</h3>
        <MenuItem
          text="Default Menu Item"
          type={MenuItemType.DEFAULT}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">With Left Slot</h3>
        <MenuItem
          text="Item with Left Slot"
          type={MenuItemType.DEFAULT}
          hasSlotL={true}
          slotL={<Search size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">With Shortcut</h3>
        <MenuItem
          text="Item with Shortcut"
          type={MenuItemType.DEFAULT}
          hasShortcut={true}
          shortcutValue="⌘S"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Action Item (Primary)</h3>
        <MenuItem
          text="Primary Action"
          type={MenuItemType.ACTION}
          action={MenuItemAction.PRIMARY}
          hasSlotL={true}
          slotL={<Archive size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Action Item (Danger)</h3>
        <MenuItem
          text="Danger Action"
          type={MenuItemType.ACTION}
          action={MenuItemAction.DANGER}
          hasSlotL={true}
          slotL={<Trash2 size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Label</h3>
        <MenuItem
          text="Category Label"
          type={MenuItemType.LABEL}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Separator</h3>
        <MenuItem
          text=""
          type={MenuItemType.SEPARATOR}
        />
      </div>
    </div>
  ),
};

// Add a story for showcasing submenus
export const WithSubmenu: Story = {
  render: () => (
    <div className="p-4">
      <p className="mb-6 text-gray-700">
        Hover over "Export" or "Share" to see submenus. The "More Options" item in the Share submenu
        demonstrates nested submenus. Submenus are positioned intelligently to avoid scrollbars and stay within window bounds.
      </p>
      <div className="h-96 flex items-start justify-center pt-10">
        <Menu
          type={MenuType.DEFAULT}
          isOpen={true}
          items={[
            {
              id: 'edit',
              text: 'Edit',
              type: MenuItemType.DEFAULT,
              hasSlotL: true,
              slotL: <Edit size={16} />,
            },
            {
              id: 'separator1',
              text: '',
              type: MenuItemType.SEPARATOR,
            },
            {
              id: 'export',
              text: 'Export',
              hasSubmenu: true,
              submenuItems: [
                {
                  id: 'pdf',
                  text: 'PDF',
                  hasSlotL: true,
                  slotL: <FileText size={16} />
                },
                {
                  id: 'excel',
                  text: 'Excel',
                  hasSlotL: true,
                  slotL: <FileSpreadsheet size={16} />
                },
                {
                  id: 'csv',
                  text: 'CSV',
                  hasSlotL: true,
                  slotL: <FileIcon size={16} />
                }
              ]
            },
            {
              id: 'share',
              text: 'Share',
              hasSubmenu: true,
              submenuItems: [
                {
                  id: 'email',
                  text: 'Email',
                  hasSlotL: true,
                  slotL: <Mail size={16} />
                },
                {
                  id: 'link',
                  text: 'Copy Link',
                  hasSlotL: true,
                  slotL: <Share size={16} />
                },
                {
                  id: 'separator-share',
                  text: '',
                  type: MenuItemType.SEPARATOR,
                },
                {
                  id: 'more',
                  text: 'More Options',
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: 'save',
                      text: 'Save',
                      hasSlotL: true,
                      slotL: <Save size={16} />
                    },
                    {
                      id: 'print',
                      text: 'Print',
                      hasSlotL: true,
                      slotL: <Printer size={16} />
                    }
                  ]
                }
              ]
            },
            {
              id: 'separator2',
              text: '',
              type: MenuItemType.SEPARATOR,
            },
            {
              id: 'delete',
              text: 'Delete',
              type: MenuItemType.ACTION,
              action: MenuItemAction.DANGER,
              hasSlotL: true,
              slotL: <Trash2 size={16} />,
            }
          ]}
        />
      </div>
    </div>
  )
}; 