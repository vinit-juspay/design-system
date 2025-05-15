import type { Meta, StoryObj } from '@storybook/react';
import {
  MenuDropdown,
  DropdownType,
  DropdownSubType,
  DropdownSize,
  DropdownState,
  DropdownSelectionType,
  MenuItemType,
} from '..';
import { User, Inbox, Settings } from 'lucide-react';

const meta: Meta<typeof MenuDropdown> = {
  title: 'Components/Menu and Dropdown/MenuDropdown',
  component: MenuDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: false,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dropdownType: {
      control: 'select',
      options: Object.values(DropdownType),
      description: 'Type of dropdown',
    },
    subType: {
      control: 'select',
      options: Object.values(DropdownSubType),
      description: 'Subtype of dropdown (container/no container)',
    },
    size: {
      control: 'select',
      options: Object.values(DropdownSize),
      description: 'Size of dropdown',
    },
    state: {
      control: 'select',
      options: Object.values(DropdownState),
      description: 'State of dropdown',
    },
    selectionType: {
      control: 'select',
      options: Object.values(DropdownSelectionType),
      description: 'Display style for multi-select dropdowns',
    },
    hasLabel: {
      control: 'boolean',
      description: 'Whether to show a label',
    },
    hasSubLabel: {
      control: 'boolean',
      description: 'Whether to show a sublabel',
    },
    mandatory: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    hasHint: {
      control: 'boolean',
      description: 'Whether to show hint text',
    },
    hasClearButton: {
      control: 'boolean',
      description: 'Whether to show a clear button',
    },
    hasLeftIcon: {
      control: 'boolean',
      description: 'Whether to show a left icon',
    },
    leftIcon: {
      control: undefined,
      description: 'Icon to display on the left',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    subLabel: {
      control: 'text',
      description: 'Sublabel text',
    },
    hint: {
      control: 'text',
      description: 'Hint text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    width: {
      control: 'text',
      description: 'Width of the dropdown',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuDropdown>;

// Sample menu items
const defaultMenuItems = [
  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
  { id: '3', text: 'Option 3', menuType: MenuItemType.DEFAULT },
];

const defaultMenuItemsWithIcons = [
  { id: '1', text: 'Profile', menuType: MenuItemType.DEFAULT, slotL: <User size={16} /> },
  { id: '2', text: 'Settings', menuType: MenuItemType.DEFAULT, slotL: <Settings size={16} /> },
  { id: '3', text: 'Help', menuType: MenuItemType.DEFAULT, slotL: <Inbox size={16} /> },
];

const multiSelectMenuItems = [
  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
  { id: '3', text: 'Option 3', menuType: MenuItemType.MULTI_SELECT },
  { id: '4', text: 'Option 4', menuType: MenuItemType.MULTI_SELECT },
];

// DROPDOWN TYPES

// Single Select Dropdown (Default)
export const SingleSelect: Story = {
  args: {
    dropdownType: DropdownType.SINGLE_SELECT,
    hasLabel: true,
    label: 'Single Select Dropdown',
    hasHint: true,
    hint: 'Select one option',
    placeholder: 'Select an option',
    menuItems: defaultMenuItems,
  },
};

// Icon Only Dropdown
export const IconOnly: Story = {
  args: {
    dropdownType: DropdownType.ICON_ONLY,
    hasLeftIcon: true,
    leftIcon: <User size={16} />,
    hasLabel: true,
    label: 'Icon Only Dropdown',
    hasHint: true,
    hint: 'Click the icon to select',
    menuItems: defaultMenuItemsWithIcons,
  },
};

// Multi-Select with Count Display
export const MultiSelectWithCount: Story = {
  args: {
    dropdownType: DropdownType.MULTI_SELECT,
    selectionType: DropdownSelectionType.COUNT,
    hasLabel: true,
    label: 'Multi Select Dropdown (Count)',
    hasHint: true,
    hint: 'Select multiple options',
    placeholder: 'Select options',
    menuItems: multiSelectMenuItems,
  },
};

// Multi-Select with Text Display
export const MultiSelectWithText: Story = {
  args: {
    dropdownType: DropdownType.MULTI_SELECT,
    selectionType: DropdownSelectionType.TEXT,
    hasLabel: true,
    label: 'Multi Select Dropdown (Text)',
    hasHint: true,
    hint: 'Select multiple options',
    placeholder: 'Select options',
    menuItems: multiSelectMenuItems,
  },
};

// DROPDOWN SUBTYPES

// HAS_CONTAINER Dropdown
export const WithContainer: Story = {
  args: {
    subType: DropdownSubType.HAS_CONTAINER,
    hasLabel: true,
    label: 'Dropdown with Container',
    hasSubLabel: true,
    subLabel: '(optional)',
    hasHint: true,
    hint: 'This dropdown has a container with label and hint',
    placeholder: 'Select an option',
    menuItems: defaultMenuItems,
  },
};

// NO_CONTAINER Dropdown
export const NoContainer: Story = {
  args: {
    subType: DropdownSubType.NO_CONTAINER,
    placeholder: 'No Container Dropdown',
    menuItems: defaultMenuItems,
  },
};

// DROPDOWN SIZES

// Small Dropdown
export const SmallSize: Story = {
  args: {
    size: DropdownSize.SMALL,
    hasLabel: true,
    label: 'Small Dropdown',
    placeholder: 'Small',
    menuItems: defaultMenuItems,
  },
};

// Medium Dropdown (Default)
export const MediumSize: Story = {
  args: {
    size: DropdownSize.MEDIUM,
    hasLabel: true,
    label: 'Medium Dropdown',
    placeholder: 'Medium',
    menuItems: defaultMenuItems,
  },
};

// Large Dropdown
export const LargeSize: Story = {
  args: {
    size: DropdownSize.LARGE,
    hasLabel: true,
    label: 'Large Dropdown',
    placeholder: 'Large',
    menuItems: defaultMenuItems,
  },
};

// SPECIAL CASES

// With Left Icon
export const WithLeftIcon: Story = {
  args: {
    hasLeftIcon: true,
    leftIcon: <Inbox size={16} />,
    hasLabel: true,
    label: 'Dropdown with Left Icon',
    placeholder: 'Search options',
    menuItems: defaultMenuItems,
  },
};

// With Clear Button
export const WithClearButton: Story = {
  args: {
    hasClearButton: true,
    hasLabel: true,
    label: 'Dropdown with Clear Button',
    placeholder: 'Select an option',
    selectedOption: '1', // Pre-selected option to show clear button
    menuItems: defaultMenuItems,
  },
};

// Disabled Dropdown
export const Disabled: Story = {
  args: {
    disabled: true,
    hasLabel: true,
    label: 'Disabled Dropdown',
    placeholder: 'Cannot select',
    menuItems: defaultMenuItems,
  },
};

// Required Field
export const RequiredField: Story = {
  args: {
    mandatory: true,
    hasLabel: true,
    label: 'Required Dropdown',
    placeholder: 'Must select an option',
    menuItems: defaultMenuItems,
  },
};
