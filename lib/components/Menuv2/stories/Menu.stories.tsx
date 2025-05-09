import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { 
  Menu, 
  MenuType, 
  MenuItemType, 
  MenuItemAction 
} from '../';
import { 
  Edit, 
  Copy, 
  Trash2, 
  Archive, 
  Check, 
  ChevronRight, 
  FileEdit,
  FileText,
  FileSpreadsheet,
  FileIcon,
  Mail,
  Share,
  Save,
  Printer
} from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu and Dropdown/Menu',
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
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn()
  },
};

// Menu with Search
export const WithSearch: Story = {
  args: {
    type: MenuType.DEFAULT,
    hasSearch: true,
    searchPlaceholder: 'Search...',
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn()
  },
};

// Context Menu
export const ContextMenu: Story = {
  args: {
    type: MenuType.CONTEXT_MENU,
    hasSearch: false,
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn()
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
      onSearch={fn()}
      onSearchTermChange={fn()}
      onOpenChange={fn()}
      onContextChange={fn()}
    />
  );
};

export const MultiSelect: Story = {
  render: () => <MultiSelectMenuExample />,
};

// Menu with Submenus
export const WithSubmenu: Story = {
  render: () => {
    // Example items with submenus
    const itemsWithSubmenu = [
      {
        id: 'edit',
        text: 'Edit',
        type: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <Edit size={16} />,
        hasShortcut: true,
        shortcutValue: '⌘E',
      },
      {
        id: 'export',
        text: 'Export',
        type: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <FileText size={16} />,
        hasSubmenu: true,
        submenuItems: [
          {
            id: 'export-pdf',
            text: 'Export as PDF',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileText size={16} />,
          },
          {
            id: 'export-excel',
            text: 'Export as Excel',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileSpreadsheet size={16} />,
          },
          {
            id: 'export-csv',
            text: 'Export as CSV',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileIcon size={16} />,
          }
        ]
      },
      {
        id: 'separator1',
        text: '',
        type: MenuItemType.SEPARATOR,
      },
      {
        id: 'share',
        text: 'Share',
        type: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <Share size={16} />,
        hasSubmenu: true,
        submenuItems: [
          {
            id: 'share-email',
            text: 'Email',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Mail size={16} />,
          },
          {
            id: 'share-link',
            text: 'Copy Link',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Copy size={16} />,
          },
          {
            id: 'more-options',
            text: 'More Options',
            type: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Share size={16} />,
            hasSubmenu: true,
            submenuItems: [
              {
                id: 'print',
                text: 'Print',
                type: MenuItemType.DEFAULT,
                hasSlotL: true,
                slotL: <Printer size={16} />,
              },
              {
                id: 'save',
                text: 'Save',
                type: MenuItemType.DEFAULT,
                hasSlotL: true,
                slotL: <Save size={16} />,
              }
            ]
          }
        ]
      },
      {
        id: 'delete',
        text: 'Delete',
        type: MenuItemType.ACTION,
        action: MenuItemAction.DANGER,
        hasSlotL: true,
        slotL: <Trash2 size={16} />,
      },
    ];

    return (
      <div>
        <Menu
          type={MenuType.DEFAULT}
          hasSearch={false}
          items={itemsWithSubmenu}
          onItemClick={fn()}
          onSearch={fn()}
          onSearchTermChange={fn()}
          onSelectionChange={fn()}
          onOpenChange={fn()}
          onContextChange={fn()}
        />
      </div>
    );
  }
}; 