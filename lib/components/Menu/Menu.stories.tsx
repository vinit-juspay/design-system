import  { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import Button from '../Button/Button';
import Search from '../common/Search';
import { Users, Settings, LogOut, Copy, Trash, Edit, FilePlus, Share, Download, FileText, ChevronRight, AlertTriangle } from 'lucide-react';

// Create mapping of possible trigger components
const triggerComponents = {
  'Button': <Button buttonType="secondary">Actions</Button>,
  'Search': <Search enabled={true} placeholder="Search..." searchQuery="" onSearchChange={() => {}} />,
};

// Component metadata configuration
const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
  argTypes: {
    // Trigger element configuration
    children: {
      description: 'The trigger element that opens the menu (typically a button)',
      options: Object.keys(triggerComponents),
      control: { type: 'select' },
      mapping: triggerComponents,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Button' }
      }
    },
    // Menu items configuration
    items: {
      description: 'Array of menu items with properties like content, leftSlot, rightSlots, color, and optional separators',
      control: 'object',
      table: {
        type: { summary: 'MenuItemWithSeparatorProps[]' }
      }
    },
    // Positioning options
    align: {
      description: 'Controls the horizontal alignment of the menu relative to the trigger element',
      control: { 
        type: 'select',
        options: ['start', 'center', 'end']
      },
      table: {
        defaultValue: { summary: 'start' }
      }
    },
    side: {
      description: 'Determines which side the menu appears on relative to the trigger',
      control: { 
        type: 'select',
        options: ['top', 'right', 'bottom', 'left']
      },
      table: {
        defaultValue: { summary: 'bottom' }
      }
    },
    // Feature configurations
    search: {
      description: 'Configuration for enabling search functionality within the menu, includes options like placeholder text',
      control: 'object',
      table: {
        type: { summary: 'MenuSearchProps' }
      }
    },
    multiSelect: {
      description: 'Configuration for multi-select functionality, allows selecting multiple menu items with checkboxes',
      control: 'object',
      table: {
        type: { summary: 'MenuMultiSelectProps' }
      }
    },
    checkboxPosition: {
      description: 'Controls the position of checkboxes within menu items',
      control: { 
        type: 'select',
        options: ['left', 'right']
      }
    },
    // Advanced props
    rootProps: {
      description: 'Additional props to pass to the root element of the menu component',
      control: 'object',
      table: {
        type: { summary: 'Omit<DropdownMenuProps, "children">' }
      }
    },
    contentProps: {
      description: 'Additional props to pass to the content container of the menu component',
      control: 'object',
      table: {
        type: { summary: 'Omit<ContentProps, "children">' }
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ==================== STORY EXAMPLES ====================

// Basic Menu with configurable trigger
export const Basic: Story = {
  args: {
    children: 'Button',
    items: [
      { content: 'Edit', leftSlot: { content: <Edit size={16} /> }, onSelect: () => console.log('Edit') },
      { content: 'Duplicate', leftSlot: { content: <Copy size={16} /> }, onSelect: () => console.log('Duplicate') },
      { content: 'Share', leftSlot: { content: <Share size={16} /> }, onSelect: () => console.log('Share') },
      { isSeparator: true },
      { content: 'Delete', leftSlot: { content: <Trash size={16} /> }, color: 'danger', onSelect: () => console.log('Delete') },
    ],
  },
};

// Menu with search functionality
export const WithSearch: Story = {
  args: {
    children: 'Button',
    items: [
      { content: 'Profile', leftSlot: { content: <Users size={16} /> }, onSelect: () => console.log('Profile') },
      { content: 'Settings', leftSlot: { content: <Settings size={16} /> }, onSelect: () => console.log('Settings') },
      { content: 'New File', leftSlot: { content: <FilePlus size={16} /> }, onSelect: () => console.log('New File') },
      { content: 'Documents', leftSlot: { content: <FileText size={16} /> }, onSelect: () => console.log('Documents') },
      { content: 'Download', leftSlot: { content: <Download size={16} /> }, onSelect: () => console.log('Download') },
      { isSeparator: true },
      { content: 'Log out', leftSlot: { content: <LogOut size={16} /> }, color: 'danger', onSelect: () => console.log('Log out') },
    ],
    search: { enabled: true, placeholder: 'Search...' },
  },
};

// Menu with checkboxes
export const WithCheckboxes: Story = {
  render: (args) => {
    const [checkedStates, setCheckedStates] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    const handleCheckboxChange = (option: string, checked: boolean) => {
      setCheckedStates(prev => ({ ...prev, [option]: checked }));
    };

    return (
      <Menu
        {...args}
        items={[
          { isLabel: true, content: 'Preferences' },
          { 
            content: 'Show notifications', 
            isCheckbox: true, 
            checked: checkedStates.option1, 
            onSelect: (checked) => handleCheckboxChange('option1', checked)
          },
          { 
            content: 'Dark mode', 
            isCheckbox: true, 
            checked: checkedStates.option2, 
            onSelect: (checked) => handleCheckboxChange('option2', checked)
          },
          { 
            content: 'Auto-save', 
            isCheckbox: true, 
            checked: checkedStates.option3, 
            onSelect: (checked) => handleCheckboxChange('option3', checked)
          },
        ]}
      />
    );
  },
  args: {
    children: 'Button',
  },
};

// Menu with multi-select
export const WithMultiSelect: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option2']);

    return (
      <Menu
        {...args}
        items={[
          { isLabel: true, content: 'Select options' },
          { 
            content: 'Option 1', 
            isCheckbox: true, 
            isCheckboxListItem: true,
            value: 'option1'
          },
          { 
            content: 'Option 2', 
            isCheckbox: true, 
            isCheckboxListItem: true,
            value: 'option2'
          },
          { 
            content: 'Option 3', 
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
  args: {
    children: 'Button',
  },
};

// Menu with submenu
export const WithSubmenu: Story = {
  args: {
    children: 'Button',
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

// Menu with right slots
export const WithRightSlots: Story = {
  args: {
    children: 'Button',
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

// Menu with subtext
export const WithSubtext: Story = {
  args: {
    children: 'Button',
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