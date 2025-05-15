import React from 'react';
import { MenuDropdown } from '../../../lib/components/Menu';
import {
  DropdownType,
  DropdownSize,
  DropdownSubType,
  DropdownSelectionType,
  MenuItemType,
} from '../../../lib/components/Menu';
import { User, Settings, HelpCircle } from 'lucide-react';

const DropdownDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Dropdown Examples</h2>

      {/* Dropdown Types */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Dropdown Types</h3>

        {/* Single Select */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">1. Single Select Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default (HAS_CONTAINER)</p>
              <MenuDropdown
                dropdownType={DropdownType.SINGLE_SELECT}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.DEFAULT },
                ]}
                hasLabel={true}
                label="Single Select"
                hasHint={true}
                hint="Select one option"
                placeholder="Select an option"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown
                dropdownType={DropdownType.SINGLE_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.DEFAULT },
                ]}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>

        {/* Icon Only */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">2. Icon Only Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default (HAS_CONTAINER)</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                menuItems={[
                  {
                    id: '1',
                    text: 'Profile',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <User size={16} />,
                  },
                  {
                    id: '2',
                    text: 'Settings',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <Settings size={16} />,
                  },
                  {
                    id: '3',
                    text: 'Help',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <HelpCircle size={16} />,
                  },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                hasLabel={true}
                label="Icon Only"
                hasHint={true}
                hint="Click icon to open"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  {
                    id: '1',
                    text: 'Profile',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <User size={16} />,
                  },
                  {
                    id: '2',
                    text: 'Settings',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <Settings size={16} />,
                  },
                  {
                    id: '3',
                    text: 'Help',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <HelpCircle size={16} />,
                  },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
              />
            </div>
          </div>
        </div>

        {/* Multi Select */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">3. Multi Select Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Count Display (HAS_CONTAINER)</p>
              <MenuDropdown
                dropdownType={DropdownType.MULTI_SELECT}
                selectionType={DropdownSelectionType.COUNT}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.MULTI_SELECT },
                ]}
                hasLabel={true}
                label="Multi Select (Count)"
                hasHint={true}
                hint="Select multiple options"
                placeholder="Select options"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Text Display (HAS_CONTAINER)</p>
              <MenuDropdown
                dropdownType={DropdownType.MULTI_SELECT}
                selectionType={DropdownSelectionType.TEXT}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.MULTI_SELECT },
                ]}
                hasLabel={true}
                label="Multi Select (Text)"
                hasHint={true}
                hint="Select multiple options"
                placeholder="Select options"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown
                dropdownType={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="Select options"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER with Text Display</p>
              <MenuDropdown
                dropdownType={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                selectionType={DropdownSelectionType.TEXT}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', menuType: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="Text display"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Subtypes */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Dropdown Subtypes</h3>

        {/* HAS_CONTAINER */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">1. HAS_CONTAINER Subtype</h4>
          <p className="text-gray-600 mb-4">Shows label, sublabel, and hint text</p>

          <div className="flex flex-col space-y-4">
            <MenuDropdown
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="Regular Label"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Basic label"
            />

            <MenuDropdown
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="With Sublabel"
              hasSubLabel={true}
              subLabel="(optional)"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Label and sublabel"
            />

            <MenuDropdown
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="With Hint"
              hasHint={true}
              hint="This is a helpful hint text"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Label and hint"
            />

            <MenuDropdown
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="Required Field"
              mandatory={true}
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="With required indicator"
            />
          </div>
        </div>

        {/* NO_CONTAINER */}
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-4">2. NO_CONTAINER Subtype</h4>
          <p className="text-gray-600 mb-4">
            Standalone dropdown with no labels, hints, or borders
          </p>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Single Select</p>
              <MenuDropdown
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                ]}
                placeholder="No container dropdown"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Multi Select</p>
              <MenuDropdown
                dropdownType={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="No container multiselect"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Icon Only</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  {
                    id: '1',
                    text: 'Option 1',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <User size={16} />,
                  },
                  {
                    id: '2',
                    text: 'Option 2',
                    menuType: MenuItemType.DEFAULT,
                    slotL: <Settings size={16} />,
                  },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Sizes */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Dropdown Sizes</h3>
        <div className="flex flex-wrap gap-6 items-end">
          <div>
            <p className="text-sm text-gray-600 mb-2">Small (sm)</p>
            <MenuDropdown
              size={DropdownSize.SMALL}
              hasLabel={true}
              label="Small Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Small"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Medium (md)</p>
            <MenuDropdown
              size={DropdownSize.MEDIUM}
              hasLabel={true}
              label="Medium Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Medium"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Large (lg)</p>
            <MenuDropdown
              size={DropdownSize.LARGE}
              hasLabel={true}
              label="Large Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
              ]}
              placeholder="Large"
            />
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Icon Size Comparison</h4>
          <div className="flex flex-wrap gap-6 items-end">
            <div>
              <p className="text-sm text-gray-600 mb-2">Small (sm)</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                size={DropdownSize.SMALL}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                ]}
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Medium (md)</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                size={DropdownSize.MEDIUM}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                ]}
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Large (lg)</p>
              <MenuDropdown
                dropdownType={DropdownType.ICON_ONLY}
                size={DropdownSize.LARGE}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', menuType: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', menuType: MenuItemType.DEFAULT },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownDemo;
