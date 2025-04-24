import  { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import Button from '../Button/Button';
import { Search } from '../Search';
import { Settings, Copy, Trash, Edit, Share, FileText, ChevronRight, AlertTriangle } from 'lucide-react';
import { ButtonType } from '../Button/types';
import { MenuSide, MenuAlignment, CheckboxPosition } from './types';

// Create mapping of possible trigger components
const triggerComponents = {
  'Button': <Button buttonType={ButtonType.SECONDARY}>Actions</Button>,
  'Search': (
    <div className="cursor-pointer">
      <Search enabled={true} placeholder="Search..." searchQuery="" onSearchChange={() => {}} />
    </div>
  ),
};

/**
 * The Menu component provides a dropdown menu that can be triggered from various elements.
 * It supports items with icons, separators, submenus, and various interactive elements like checkboxes.
 * 
 * Features:
 * - Customizable trigger element
 * - Multiple item types (standard, checkbox, radio, labels, separators)
 * - Search functionality
 * - Multi-select capability
 * - Support for submenus
 * - Flexible positioning
 */
const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown menu component with rich functionality including search, multi-select, submenu support and various item types.'
      }
    }
  },
  args: {
    // Set default values for the component
    children: 'Button',
    align: MenuAlignment.START,
    side: MenuSide.BOTTOM,
    items: [
      { content: 'Edit', leftSlot: { content: <Edit size={16} /> }, onSelect: () => console.log('Edit') },
      { content: 'Duplicate', leftSlot: { content: <Copy size={16} /> }, onSelect: () => console.log('Duplicate') },
      { content: 'Share', leftSlot: { content: <Share size={16} /> }, onSelect: () => console.log('Share') },
      { isSeparator: true },
      { content: 'Delete', leftSlot: { content: <Trash size={16} /> }, color: 'danger', onSelect: () => console.log('Delete') },
    ]
  },
  argTypes: {
    // Trigger element configuration
    children: {
      description: 'The trigger element that opens the menu',
      options: Object.keys(triggerComponents),
      control: { type: 'select' },
      mapping: triggerComponents,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Button' },
        category: 'Core'
      }
    },
    
    // Positioning options in their own category
    align: {
      description: 'Horizontal alignment relative to the trigger',
      control: 'select',
      options: Object.values(MenuAlignment),
      table: {
        defaultValue: { summary: 'start' },
        category: 'Positioning'
      }
    },
    side: {
      description: 'Which side the menu appears on',
      control: 'select',
      options: Object.values(MenuSide),
      table: {
        defaultValue: { summary: 'bottom' },
        category: 'Positioning'
      }
    },
    
    // Items configuration
    items: {
      description: 'Array of menu items with properties like content, leftSlot, rightSlots, etc.',
      control: 'object',
      table: {
        type: { summary: 'MenuItemWithSeparatorProps[]' },
        category: 'Core'
      }
    },
    
    // Search functionality
    search: {
      description: 'Search configuration object',
      control: 'object',
      table: {
        type: { summary: '{ enabled: boolean, placeholder?: string }' },
        category: 'Features'
      }
    },
    
    // Multi-select functionality
    multiSelect: {
      description: 'Multi-select configuration object',
      control: 'object',
      table: {
        type: { summary: '{ enabled: boolean, selectedValues?: string[], onSelectionChange?: (values: string[]) => void }' },
        category: 'Features'
      }
    },
    
    // Checkbox position
    checkboxPosition: {
      description: 'Controls the position of checkboxes',
      control: 'select',
      options: Object.values(CheckboxPosition),
      table: {
        category: 'Features'
      }
    },
    
    // Advanced props
    rootProps: {
      description: 'Additional props for the root element',
      control: 'object',
      table: {
        type: { summary: 'DropdownMenuProps' },
        category: 'Advanced'
      }
    },
    contentProps: {
      description: 'Additional props for the content container',
      control: 'object',
      table: {
        type: { summary: 'ContentProps' },
        category: 'Advanced'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

/**
 * Default Menu example with standard items.
 */
export const Default: Story = {};

/**
 * Menu with search functionality enabled.
 */
export const WithSearch: Story = {
  args: {
    search: { enabled: true, placeholder: 'Search...' },
  },
};

/**
 * Menu with checkboxes for toggling options.
 */
export const WithCheckboxes: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option2']);

    return (
      <Menu
        {...args}
        items={[
          { isLabel: true, content: 'Preferences' },
          { 
            content: 'Show notifications', 
            isCheckbox: true, 
            isCheckboxListItem: true,
            value: 'option1'
          },
          { 
            content: 'Dark mode', 
            isCheckbox: true, 
            isCheckboxListItem: true,
            value: 'option2'
          },
          { 
            content: 'Auto-save', 
            isCheckbox: true, 
            isCheckboxListItem: true,
            value: 'option3'
          },
        ]}
        multiSelect={{
          enabled: true,
          selectedValues,
          onSelectionChange: (values) => setSelectedValues(values),
        }}
      />
    );
  },
};

/**
 * Menu with nested submenu options.
 */
export const WithSubmenu: Story = {
  args: {
    items: [
      { content: 'View', onSelect: () => console.log('View') },
      { 
        content: 'Export',
        hasSubmenu: true,
        submenuItems: [
          { content: 'PDF', leftSlot: { content: <FileText size={16} /> }, onSelect: () => console.log('PDF') },
          { content: 'Excel', leftSlot: { content: <FileText size={16} /> }, onSelect: () => console.log('Excel') },
          { content: 'CSV', leftSlot: { content: <FileText size={16} /> }, onSelect: () => console.log('CSV') },
        ],
      },
      { isSeparator: true },
      { content: 'Delete', leftSlot: { content: <Trash size={16} /> }, color: 'danger', onSelect: () => console.log('Delete') },
    ],
  },
};

/**
 * Menu with keyboard shortcuts and other right-aligned content.
 */
export const WithRightSlots: Story = {
  args: {
    items: [
      { 
        content: 'Cut', 
        leftSlot: { content: <Edit size={16} /> }, 
        rightSlots: [{ content: 'Ctrl+X' }],
        onSelect: () => console.log('Cut') 
      },
      { 
        content: 'Copy', 
        leftSlot: { content: <Copy size={16} /> }, 
        rightSlots: [{ content: 'Ctrl+C' }],
        onSelect: () => console.log('Copy') 
      },
      { 
        content: 'Paste', 
        rightSlots: [{ content: 'Ctrl+V' }],
        onSelect: () => console.log('Paste') 
      },
      { isSeparator: true },
      { 
        content: 'Important action', 
        rightSlots: [{ content: <AlertTriangle className="text-orange-500" size={16} /> }],
        onSelect: () => console.log('Important') 
      },
      { 
        content: 'View details', 
        rightSlots: [{ content: <ChevronRight size={16} /> }],
        onSelect: () => console.log('View') 
      },
    ],
  },
};

/**
 * Menu with descriptive subtext for each option.
 */
export const WithSubtext: Story = {
  args: {
    items: [
      { 
        content: 'Option 1', 
        subtext: 'This is a description for option 1',
        onSelect: () => console.log('Option 1') 
      },
      { 
        content: 'Option 2',
        subtext: 'This is a description for option 2',
        onSelect: () => console.log('Option 2') 
      },
      { isSeparator: true },
      { 
        content: 'Advanced Option', 
        leftSlot: { content: <Settings size={16} /> },
        subtext: 'This requires administrator privileges',
        onSelect: () => console.log('Advanced') 
      },
    ],
  },
}; 