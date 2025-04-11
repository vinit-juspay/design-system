import  { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import Button from '../Button/Button';
import { Users, Settings, LogOut, Copy, Trash, Edit, FilePlus, Share, Download, FileText, ChevronRight, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Basic Menu with standard items
export const Basic: Story = {
  render: () => (
    <Menu
      items={[
        { content: 'Edit', leftSlot: { content: <Edit size={16} /> }, onSelect: () => console.log('Edit') },
        { content: 'Duplicate', leftSlot: { content: <Copy size={16} /> }, onSelect: () => console.log('Duplicate') },
        { content: 'Share', leftSlot: { content: <Share size={16} /> }, onSelect: () => console.log('Share') },
        { isSeparator: true },
        { content: 'Delete', leftSlot: { content: <Trash size={16} /> }, color: 'danger', onSelect: () => console.log('Delete') },
      ]}
    >
      <Button buttonType="secondary">Actions</Button>
    </Menu>
  ),
};

// Menu with search functionality
export const WithSearch: Story = {
  render: () => (
    <Menu
      items={[
        { content: 'Profile', leftSlot: { content: <Users size={16} /> }, onSelect: () => console.log('Profile') },
        { content: 'Settings', leftSlot: { content: <Settings size={16} /> }, onSelect: () => console.log('Settings') },
        { content: 'New File', leftSlot: { content: <FilePlus size={16} /> }, onSelect: () => console.log('New File') },
        { content: 'Documents', leftSlot: { content: <FileText size={16} /> }, onSelect: () => console.log('Documents') },
        { content: 'Download', leftSlot: { content: <Download size={16} /> }, onSelect: () => console.log('Download') },
        { isSeparator: true },
        { content: 'Log out', leftSlot: { content: <LogOut size={16} /> }, color: 'danger', onSelect: () => console.log('Log out') },
      ]}
      search={{ enabled: true, placeholder: 'Search...' }}
    >
      <Button buttonType="secondary">Menu with Search</Button>
    </Menu>
  ),
};

// Menu with checkboxes
export const WithCheckboxes: Story = {
  render: () => {
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
      >
        <Button buttonType="secondary">Settings</Button>
      </Menu>
    );
  },
};

// Menu with multi-select
export const WithMultiSelect: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option2']);

    return (
      <Menu
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
      >
        <Button buttonType="secondary">Multi-select ({selectedValues.length})</Button>
      </Menu>
    );
  },
};

// Menu with submenu
export const WithSubmenu: Story = {
  render: () => (
    <Menu
      items={[
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
      ]}
    >
      <Button buttonType="secondary">File Options</Button>
    </Menu>
  ),
};

// Menu with right slots
export const WithRightSlots: Story = {
  render: () => (
    <Menu
      items={[
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
      ]}
    >
      <Button buttonType="secondary">Edit Menu</Button>
    </Menu>
  ),
};

// Menu with subtext
export const WithSubtext: Story = {
  render: () => (
    <Menu
      items={[
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
      ]}
    >
      <Button buttonType="secondary">Options with Description</Button>
    </Menu>
  ),
}; 