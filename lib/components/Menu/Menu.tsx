import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { 
  MenuProps, 
  MenuItemWithSeparatorProps, 
  MenuStandardProps, 
  MenuAlignment,
  MenuSide,
  CheckboxPosition
} from './types';
import { 
  getMenuClassNames, 
  getMenuItemClassNames, 
  getLabelClassNames, 
  getSeparatorClassNames, 
  getCheckClassNames, 
  getIconClassNames,
  getSubtextClassNames,
  getColorClassNames,
  getShortcutClassNames,
  getThreeColumnLayoutClassNames,
  getColumnContentClassNames,
  getFlexColumnClassNames,
  getLeftSlotClassNames,
  getRightSlotsContainerClassNames,
  getMenuItemRightContainerClassNames
} from './utils';
import { themeConfig } from '../../themeConfig';
import { Search, filterItems } from '../common/Search';
import Checkbox, { CheckboxSize } from '../common/Checkbox';
import { cn } from '../../utils';

/**
 * Menu component built on top of Radix UI's dropdown menu primitive
 * Provides contextual dropdown menus for navigation and actions
 **/
const Menu = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  MenuProps
>(({
  children,
  items,
  align = MenuAlignment.START,
  side = MenuSide.BOTTOM,
  search,
  multiSelect,
  checkboxPosition = CheckboxPosition.RIGHT,
  rootProps,
  contentProps,
}, ref) => {
  const menuClassNames = getMenuClassNames();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(multiSelect?.selectedValues || []);
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);
  const [dynamicAlign, setDynamicAlign] = React.useState(align);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  
  // Get checkbox size from theme config with fallback to "md"
  const checkboxSize = (themeConfig.euler.menu.checkboxMenuItem.useCheckboxSize) as 'sm' | 'md';
  
  // Reset search query when menu is closed
  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Update selectedValues if the prop changes
  React.useEffect(() => {
    if (multiSelect?.selectedValues) {
      setSelectedValues(multiSelect.selectedValues);
    }
  }, [multiSelect?.selectedValues]);

  // Measure the trigger width when menu opens and adjust alignment if needed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    if (open && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const width = triggerRect.width;
      setTriggerWidth(width);
      
      // Determine if the menu would go off-screen and adjust alignment
      const windowWidth = window.innerWidth;
      const spaceToRight = windowWidth - triggerRect.right;
      const spaceToLeft = triggerRect.left;
      
      // If there's not enough space on the right, align to end
      if (spaceToRight < 200 && spaceToLeft > spaceToRight) {
        setDynamicAlign(MenuAlignment.END);
      }
      // If there's not enough space on the left, align to start
      else if (spaceToLeft < 200 && spaceToRight > spaceToLeft) {
        setDynamicAlign(MenuAlignment.START);
      }
      // Otherwise use the provided alignment or default
      else {
        setDynamicAlign(align);
      }
    }
    
    if (rootProps?.onOpenChange) {
      rootProps.onOpenChange(open);
    }
  };

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    if (!search?.enabled || !searchQuery) {
      return items;
    }
    return filterItems(items, searchQuery);
  }, [items, searchQuery, search?.enabled]);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle multi-select checkbox changes
  const handleCheckboxListChange = (value: string, checked: boolean) => {
    const newValues = checked 
      ? [...selectedValues, value]
      : selectedValues.filter(v => v !== value);
    
    setSelectedValues(newValues);
    
    if (multiSelect?.onSelectionChange) {
      multiSelect.onSelectionChange(newValues);
    }
  };

  // Render a menu item based on its type
  const renderMenuItem = (item: MenuItemWithSeparatorProps, index: number) => {
    if ('isSeparator' in item && item.isSeparator) {
      return <DropdownMenu.Separator key={`separator-${index}`} className={getSeparatorClassNames()} />;
    }

    if ('isLabel' in item && item.isLabel) {
      return (
        <DropdownMenu.Label key={`label-${index}`} className={getLabelClassNames()}>
          {item.content}
        </DropdownMenu.Label>
      );
    }

    if ('isCheckbox' in item && item.isCheckbox) {
      if (item.isCheckboxListItem && item.value && multiSelect?.enabled) {
        const isChecked = selectedValues.includes(item.value);
        return (
          <DropdownMenu.CheckboxItem
            key={`checkbox-list-${index}`}
            checked={isChecked}
            onCheckedChange={(checked) => handleCheckboxListChange(item.value!, checked)}
            disabled={item.disabled}
            className={getCheckClassNames(item.disabled)}
            onSelect={(event) => event.preventDefault()}
          >
            <div className={getThreeColumnLayoutClassNames()}>
              {/* Left Slot */}
              {item.leftSlot && (
                <div className={getLeftSlotClassNames()}>
                  {item.leftSlot.content}
                </div>
              )}
              {/* Legacy icon support */}
              {!item.leftSlot && item.icon && (
                <div className={getLeftSlotClassNames()}>
                  <item.icon className={getIconClassNames()} />
                </div>
              )}
              
              {/* Middle Column: Content */}
              <div className={getColumnContentClassNames()}>
                {item.content}
              </div>
              
              {/* Right Column: Right Slots + Checkbox */}
              <div className={getMenuItemRightContainerClassNames()}>
                {/* Right Slots */}
                {item.rightSlots && item.rightSlots.length > 0 && (
                  <div className={getRightSlotsContainerClassNames()}>
                    {item.rightSlots.slice(0, 2).map((slot, slotIndex) => (
                      <div key={`right-slot-${slotIndex}`}>{slot.content}</div>
                    ))}
                  </div>
                )}
                
                {/* Checkbox */}
                {checkboxPosition === CheckboxPosition.RIGHT && (
                  <Checkbox 
                    checked={isChecked}
                    disabled={item.disabled}
                    size={checkboxSize as CheckboxSize}
                    onCheckedChange={() => {}}
                    className={themeConfig.euler.menu.layout.checkboxRight}
                  />
                )}
              </div>
            </div>
          </DropdownMenu.CheckboxItem>
        );
      }
      
      return (
        <DropdownMenu.CheckboxItem
          key={`checkbox-${index}`}
          checked={item.checked}
          onCheckedChange={item.onSelect as unknown as (checked: boolean) => void}
          disabled={item.disabled}
          className={getCheckClassNames(item.disabled)}
          onSelect={(event) => event.preventDefault()}
        >
          <div className={getThreeColumnLayoutClassNames()}>
            {/* Left Slot */}
            {item.leftSlot && (
              <div className={getLeftSlotClassNames()}>
                {item.leftSlot.content}
              </div>
            )}
            {/* Legacy icon support */}
            {!item.leftSlot && item.icon && (
              <div className={getLeftSlotClassNames()}>
                <item.icon className={getIconClassNames()} />
              </div>
            )}
            
            {/* Middle Column: Content */}
            <div className={getColumnContentClassNames()}>
              {item.content}
            </div>
            
            {/* Right Column: Right Slots + Checkbox */}
            <div className={getMenuItemRightContainerClassNames()}>
              {/* Right Slots */}
              {item.rightSlots && item.rightSlots.length > 0 && (
                <div className={getRightSlotsContainerClassNames()}>
                  {item.rightSlots.slice(0, 2).map((slot, slotIndex) => (
                    <div key={`right-slot-${slotIndex}`}>{slot.content}</div>
                  ))}
                </div>
              )}
              
              {/* Checkbox */}
              {checkboxPosition === CheckboxPosition.RIGHT && (
                <Checkbox 
                  checked={item.checked}
                  disabled={item.disabled}
                  size={checkboxSize as CheckboxSize}
                  onCheckedChange={() => {}}
                  className={themeConfig.euler.menu.layout.checkboxRight}
                />
              )}
            </div>
          </div>
        </DropdownMenu.CheckboxItem>
      );
    }

    if ('isRadio' in item && item.isRadio) {
      const isRadioWithValue = 'value' in item && typeof item.value === 'string';
      
      return (
        <DropdownMenu.RadioItem
          key={`radio-${index}`}
          value={isRadioWithValue ? item.value : `radio-value-${index}`}
          disabled={item.disabled}
          className={getMenuItemClassNames(item.disabled)}
        >
          <div className={getThreeColumnLayoutClassNames()}>
            {/* Left Slot */}
            {item.leftSlot && (
              <div className={getLeftSlotClassNames()}>
                {item.leftSlot.content}
              </div>
            )}
            {/* Legacy icon support */}
            {!item.leftSlot && item.icon && (
              <div className={getLeftSlotClassNames()}>
                <item.icon className={getIconClassNames()} />
              </div>
            )}
            
            {/* Middle Column: Content */}
            <div className={getColumnContentClassNames()}>
              {item.content}
            </div>
            
            {/* Right Column: Check Icon */}
            <div className={getMenuItemRightContainerClassNames()}>
              <DropdownMenu.ItemIndicator>
                <Check className={getIconClassNames()} />
              </DropdownMenu.ItemIndicator>
            </div>
          </div>
        </DropdownMenu.RadioItem>
      );
    }

    // Standard menu item (default)
    const standardItem = item as MenuStandardProps;
    
    // Handle standard menu items
    if (standardItem.hasSubmenu && standardItem.submenuItems) {
      return (
        <DropdownMenu.Sub key={`submenu-${index}`}>
          <DropdownMenu.SubTrigger 
            className={cn(
              getMenuItemClassNames(standardItem.disabled),
              getColorClassNames(standardItem.color)
            )}
            disabled={standardItem.disabled}
          >
            <div className={getThreeColumnLayoutClassNames()}>
              {/* Left Slot */}
              {standardItem.leftSlot && (
                <div className={getLeftSlotClassNames()}>
                  {standardItem.leftSlot.content}
                </div>
              )}
              {/* Legacy icon support */}
              {!standardItem.leftSlot && standardItem.icon && (
                <div className={getLeftSlotClassNames()}>
                  <standardItem.icon className={getIconClassNames()} />
                </div>
              )}
              
              {/* Middle Column with optional subtext */}
              <div className={getFlexColumnClassNames()}>
                <div className={getColumnContentClassNames()}>
                  {standardItem.content}
                </div>
                {standardItem.subtext && (
                  <div className={getSubtextClassNames()}>
                    {standardItem.subtext}
                  </div>
                )}
              </div>
              
              {/* Right Slots */}
              {standardItem.rightSlots && standardItem.rightSlots.length > 0 && (
                <div className={getRightSlotsContainerClassNames()}>
                  {standardItem.rightSlots.slice(0, 2).map((slot, slotIndex) => (
                    <div key={`right-slot-${slotIndex}`}>{slot.content}</div>
                  ))}
                </div>
              )}
              
              {/* Legacy shortcut support */}
              {!standardItem.rightSlots && standardItem.shortcut && (
                <div className={getShortcutClassNames()}>
                  {standardItem.shortcut}
                </div>
              )}
            </div>
          </DropdownMenu.SubTrigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent 
              className={menuClassNames}
              sideOffset={8}
              alignOffset={-4}
            >
              {standardItem.submenuItems.map(renderMenuItem)}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    } 
    else {
      return (
        <DropdownMenu.Item
          key={`item-${index}`}
          className={cn(
            getMenuItemClassNames(standardItem.disabled),
            getColorClassNames(standardItem.color),
          )}
          disabled={standardItem.disabled}
          onSelect={standardItem.onSelect}
        >
          <div className={getThreeColumnLayoutClassNames()}>
            {/* Left Slot */}
            {standardItem.leftSlot && (
              <div className={getLeftSlotClassNames()}>
                {standardItem.leftSlot.content}
              </div>
            )}
            {/* Legacy icon support */}
            {!standardItem.leftSlot && standardItem.icon && (
              <div className={getLeftSlotClassNames()}>
                <standardItem.icon className={getIconClassNames()} />
              </div>
            )}
            
            {/* Middle Column with optional subtext */}
            <div className={standardItem.subtext ? getFlexColumnClassNames() : getColumnContentClassNames()}>
              <div>
                {standardItem.content}
              </div>
              {standardItem.subtext && (
                <div className={getSubtextClassNames()}>
                  {standardItem.subtext}
                </div>
              )}
            </div>
            
            {/* Right Slots */}
            {standardItem.rightSlots && standardItem.rightSlots.length > 0 && (
              <div className={getRightSlotsContainerClassNames()}>
                {standardItem.rightSlots.slice(0, 2).map((slot, slotIndex) => (
                  <div key={`right-slot-${slotIndex}`}>{slot.content}</div>
                ))}
              </div>
            )}
            
            {/* Legacy shortcut support */}
            {!standardItem.rightSlots && standardItem.shortcut && (
              <div className={getShortcutClassNames()}>
                {standardItem.shortcut}
              </div>
            )}
          </div>
        </DropdownMenu.Item>
      );
    }
  };

  // Render the search component if search is enabled
  const renderSearch = () => {
    if (!search?.enabled) return null;
    
    return (
      <Search
        enabled={search.enabled}
        placeholder={search.placeholder}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
    );
  };

  return (
    <DropdownMenu.Root
      {...rootProps}
      onOpenChange={handleOpenChange}
    >
      <DropdownMenu.Trigger asChild ref={triggerRef as React.Ref<HTMLButtonElement>}>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={ref}
          align={dynamicAlign}
          side={side}
          className={menuClassNames}
          sideOffset={4}
          style={{
            width: triggerWidth ? Math.max(triggerWidth, 200) : undefined,
            maxHeight: "var(--radix-dropdown-menu-content-available-height)",
          }}
          {...contentProps}
        >
          {renderSearch()}
          
          {multiSelect?.enabled ? (
            <ul className="py-1 overflow-y-auto">
              {filteredItems.map(renderMenuItem)}
            </ul>
          ) : (
            filteredItems.map(renderMenuItem)
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
});

Menu.displayName = 'Menu';

export default Menu; 