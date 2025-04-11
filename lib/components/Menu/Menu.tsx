import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, LucideIcon } from 'lucide-react';
import { MenuProps, MenuItemWithSeparatorProps, MenuStandardProps, MenuRadioProps } from './types';
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
import Search, { filterItems } from '../common/Search';
import Checkbox from '../common/Checkbox';
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
  align = 'start',
  side = 'bottom',
  search,
  multiSelect,
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
        setDynamicAlign('end');
      }
      // If there's not enough space on the left, align to start
      else if (spaceToLeft < 200 && spaceToRight > spaceToLeft) {
        setDynamicAlign('start');
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
                <Checkbox 
                  checked={isChecked}
                  disabled={item.disabled}
                  size={checkboxSize}
                  onCheckedChange={() => {}}
                  className={themeConfig.euler.menu.layout.checkboxRight}
                />
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
              <Checkbox 
                checked={item.checked}
                disabled={item.disabled}
                size={checkboxSize}
                onCheckedChange={() => {}}
                className={themeConfig.euler.menu.layout.checkboxRight}
              />
            </div>
          </div>
        </DropdownMenu.CheckboxItem>
      );
    }

    if ('isRadio' in item && item.isRadio && item.value) {
      const radioItem = item as MenuRadioProps;
      return (
        <DropdownMenu.RadioItem
          key={`radio-${index}`}
          value={radioItem.value}
          disabled={radioItem.disabled}
          className={getCheckClassNames(radioItem.disabled)}
        >
          <div className={getThreeColumnLayoutClassNames()}>
            {/* Left Slot */}
            {radioItem.leftSlot && (
              <div className={getLeftSlotClassNames()}>
                {radioItem.leftSlot.content}
              </div>
            )}
            {/* Legacy icon support */}
            {!radioItem.leftSlot && radioItem.icon && (
              <div className={getLeftSlotClassNames()}>
                <radioItem.icon className={getIconClassNames()} />
              </div>
            )}
            
            {/* Middle Column: Content */}
            <div className={getColumnContentClassNames()}>
              {radioItem.content}
            </div>
            
            {/* Right Column: Radio Indicator */}
            <div className={getMenuItemRightContainerClassNames()}>
              <DropdownMenu.ItemIndicator className={themeConfig.euler.menu.checkboxMenuItem.indicator}>
                <Check className={themeConfig.euler.menu.checkboxMenuItem.icon} />
              </DropdownMenu.ItemIndicator>
            </div>
          </div>
        </DropdownMenu.RadioItem>
      );
    }

    if ('hasSubmenu' in item && item.hasSubmenu && item.submenuItems) {
      const submenuItem = item as MenuStandardProps & { 
        submenuItems: MenuItemWithSeparatorProps[];
        icon?: LucideIcon; // Allow access to deprecated icon property 
      };
      return (
        <DropdownMenu.Sub key={`sub-${index}`}>
          <DropdownMenu.SubTrigger className={getMenuItemClassNames(submenuItem.disabled)}>
            <div className={getThreeColumnLayoutClassNames()}>
              {/* Left Slot */}
              {submenuItem.leftSlot && (
                <div className={getLeftSlotClassNames()}>
                  {submenuItem.leftSlot.content}
                </div>
              )}
              {/* Legacy icon support */}
              {!submenuItem.leftSlot && submenuItem.icon && (
                <div className={getLeftSlotClassNames()}>
                  <submenuItem.icon className={getIconClassNames()} />
                </div>
              )}
              
              {/* Middle Column: Content */}
              <div className={getColumnContentClassNames()}>
                {submenuItem.content}
              </div>
            </div>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent className={menuClassNames}>
              {submenuItem.submenuItems.map((subItem, subIndex) => 
                renderMenuItem(subItem as MenuItemWithSeparatorProps, subIndex)
              )}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    // For standard menu items
    const standardItem = item as MenuStandardProps & { icon?: LucideIcon }; // Allow access to deprecated icon property
    return (
      <DropdownMenu.Item
        key={`item-${index}`}
        onSelect={standardItem.onSelect}
        disabled={standardItem.disabled}
        className={cn(
          getMenuItemClassNames(standardItem.disabled), 
          getColorClassNames(standardItem.color)
        )}
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
          
          {/* Middle Column: Content (main text + subtext) */}
          <div className={getColumnContentClassNames()}>
            {standardItem.subtext ? (
              <div className={getFlexColumnClassNames()}>
                <div>{standardItem.content}</div>
                <div className={getSubtextClassNames()}>{standardItem.subtext}</div>
              </div>
            ) : (
              standardItem.content
            )}
          </div>
          
          {/* Right Column: Right Slots */}
          <div className={getMenuItemRightContainerClassNames()}>
            {standardItem.rightSlots && standardItem.rightSlots.length > 0 ? (
              <div className={getRightSlotsContainerClassNames()}>
                {standardItem.rightSlots.slice(0, 3).map((slot, slotIndex) => (
                  <div key={`right-slot-${slotIndex}`}>{slot.content}</div>
                ))}
              </div>
            ) : (
              /* Legacy shortcut support */
              standardItem.shortcut && (
                <div className={getShortcutClassNames()}>{standardItem.shortcut}</div>
              )
            )}
          </div>
        </div>
      </DropdownMenu.Item>
    );
  };

  return (
    <DropdownMenu.Root 
      {...rootProps}
      onOpenChange={handleOpenChange}
    >
      <DropdownMenu.Trigger asChild>
        <span ref={triggerRef as React.RefObject<HTMLSpanElement>}>
          {children}
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={ref}
          align={dynamicAlign}
          side={side}
          sideOffset={5}
          className={menuClassNames}
          style={triggerWidth ? { width: `${triggerWidth}px` } : undefined}
          {...contentProps}
        >
          <Search
            enabled={search?.enabled}
            placeholder={search?.placeholder}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item: any, index: number) => 
              renderMenuItem(item as MenuItemWithSeparatorProps, index)
            )
          ) : (
            <DropdownMenu.Item disabled className={getMenuItemClassNames(true)}>
              No results found
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
});

Menu.displayName = 'Menu';

export default Menu; 