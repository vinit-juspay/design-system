import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Menu, MenuType, MenuItemType, MenuItemAction } from '..';
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
  Printer,
} from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu and Dropdown/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuType: {
      control: 'select',
      options: Object.values(MenuType),
      description: 'Type of menu',
    },
    hasSearch: {
      control: 'boolean',
      description: 'Whether the menu has search functionality',
    },
    items: {
      control: 'object',
      description: 'Menu items to display',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
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
    menuType: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Edit size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘E',
  },
  {
    id: 'item2',
    text: 'Duplicate',
    menuType: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <FileEdit size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘D',
  },
  {
    id: 'item3',
    text: 'Copy',
    menuType: MenuItemType.DEFAULT,
    hasSlotL: true,
    slotL: <Copy size={16} />,
    hasShortcut: true,
    shortcutValue: '⌘C',
  },
  {
    id: 'separator1',
    text: '',
    menuType: MenuItemType.SEPARATOR,
  },
  {
    id: 'item4',
    text: 'Archive',
    menuType: MenuItemType.ACTION,
    action: MenuItemAction.PRIMARY,
    hasSlotL: true,
    slotL: <Archive size={16} />,
    hasSlotR2: true,
    slotR2: <ChevronRight size={16} />,
  },
  {
    id: 'item5',
    text: 'Delete',
    menuType: MenuItemType.ACTION,
    action: MenuItemAction.DANGER,
    hasSlotL: true,
    slotL: <Trash2 size={16} />,
  },
];

// Default Menu Example
export const Default: Story = {
  args: {
    menuType: MenuType.DEFAULT,
    hasSearch: false,
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn(),
  },
};

// Menu with Search
export const WithSearch: Story = {
  args: {
    menuType: MenuType.DEFAULT,
    hasSearch: true,
    searchPlaceholder: 'Search...',
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn(),
  },
};

// Context Menu
export const ContextMenu: Story = {
  args: {
    menuType: MenuType.CONTEXT_MENU,
    hasSearch: false,
    items: defaultItems,
    onItemClick: fn(),
    onSearch: fn(),
    onSearchTermChange: fn(),
    onSelectionChange: fn(),
    onOpenChange: fn(),
    onContextChange: fn(),
  },
};

// Multi-Select Menu
const MultiSelectMenuExample = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const multiSelectItems = [
    {
      id: 'label1',
      text: 'Select Options',
      menuType: MenuItemType.LABEL,
    },
    {
      id: 'option1',
      text: 'Option 1',
      menuType: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option1'),
      slotR2: selectedItems.includes('option1') ? <Check size={16} /> : null,
    },
    {
      id: 'option2',
      text: 'Option 2',
      menuType: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option2'),
      slotR2: selectedItems.includes('option2') ? <Check size={16} /> : null,
    },
    {
      id: 'option3',
      text: 'Option 3',
      menuType: MenuItemType.MULTI_SELECT,
      hasSlotR2: selectedItems.includes('option3'),
      slotR2: selectedItems.includes('option3') ? <Check size={16} /> : null,
    },
    {
      id: 'separator2',
      text: '',
      menuType: MenuItemType.SEPARATOR,
    },
    {
      id: 'option4',
      text: 'Apply Selection',
      menuType: MenuItemType.ACTION,
      action: MenuItemAction.PRIMARY,
    },
  ];

  return (
    <Menu
      menuType={MenuType.MULTI_SELECT}
      hasSearch={true}
      searchPlaceholder="Search options..."
      items={multiSelectItems}
      selectedItems={selectedItems}
      onSelectionChange={items => setSelectedItems(items)}
      onItemClick={item => {
        if (item.id && item.menuType === MenuItemType.MULTI_SELECT) {
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
        menuType: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <Edit size={16} />,
        hasShortcut: true,
        shortcutValue: '⌘E',
      },
      {
        id: 'export',
        text: 'Export',
        menuType: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <FileText size={16} />,
        hasSubmenu: true,
        submenuItems: [
          {
            id: 'export-pdf',
            text: 'Export as PDF',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileText size={16} />,
          },
          {
            id: 'export-excel',
            text: 'Export as Excel',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileSpreadsheet size={16} />,
          },
          {
            id: 'export-csv',
            text: 'Export as CSV',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <FileIcon size={16} />,
          },
        ],
      },
      {
        id: 'separator1',
        text: '',
        menuType: MenuItemType.SEPARATOR,
      },
      {
        id: 'share',
        text: 'Share',
        menuType: MenuItemType.DEFAULT,
        hasSlotL: true,
        slotL: <Share size={16} />,
        hasSubmenu: true,
        submenuItems: [
          {
            id: 'share-email',
            text: 'Email',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Mail size={16} />,
          },
          {
            id: 'share-link',
            text: 'Copy Link',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Copy size={16} />,
          },
          {
            id: 'more-options',
            text: 'More Options',
            menuType: MenuItemType.DEFAULT,
            hasSlotL: true,
            slotL: <Share size={16} />,
            hasSubmenu: true,
            submenuItems: [
              {
                id: 'print',
                text: 'Print',
                menuType: MenuItemType.DEFAULT,
                hasSlotL: true,
                slotL: <Printer size={16} />,
              },
              {
                id: 'save',
                text: 'Save',
                menuType: MenuItemType.DEFAULT,
                hasSlotL: true,
                slotL: <Save size={16} />,
              },
            ],
          },
        ],
      },
      {
        id: 'delete',
        text: 'Delete',
        menuType: MenuItemType.ACTION,
        action: MenuItemAction.DANGER,
        hasSlotL: true,
        slotL: <Trash2 size={16} />,
      },
    ];

    return (
      <div>
        <Menu
          menuType={MenuType.DEFAULT}
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
  },
};
