import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { MenuProps, MenuItemWithSeparatorProps, MenuStandardProps } from './types';
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
  getFlexColumnClassNames
} from './utils';
import { themeConfig } from '../../themeConfig';
import Search, { filterItems } from '../common/Search';
import Checkbox from '../common/Checkbox';
import { cn } from '../../utils';

/**
 * Menu component built on top of Radix UI's dropdown menu primitive
 * Provides contextual dropdown menus for navigation and actions
 * 
 * @component
 * @example
 * // Basic usage
 * <Menu 
 *   items={[
 *     { content: 'Edit', icon: PencilIcon, onSelect: () => console.log('Edit') },
 *     { content: 'Duplicate', icon: CopyIcon, onSelect: () => console.log('Duplicate') }
 *   ]}
 * >
 *   <Button>Actions</Button>
 * </Menu>
 */
const Menu = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  MenuProps
>(({
  children,
  items,
  align = 'center',
  side = 'bottom',
  search,
  multiSelect,
  checkboxPosition = 'left',
  rootProps,
  contentProps,
}, ref) => {
  const menuClassNames = getMenuClassNames();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(multiSelect?.selectedValues || []);
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  
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

  // Measure the trigger width when menu opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    if (open && triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
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
            {checkboxPosition === 'left' ? (
              <div className={themeConfig.euler.menu.layout.container}>
                <Checkbox 
                  checked={isChecked}
                  disabled={item.disabled}
                  size="md"
                  position="left"
                  onCheckedChange={() => {}}
                >
                  <div className={themeConfig.euler.menu.layout.content}>
                    {item.icon && <item.icon className={getIconClassNames()} />}
                    {item.content}
                  </div>
                </Checkbox>
              </div>
            ) : (
              <div className={themeConfig.euler.menu.layout.container}>
                <div className={themeConfig.euler.menu.layout.content}>
                  {item.icon && <item.icon className={getIconClassNames()} />}
                  {item.content}
                </div>
                <Checkbox 
                  checked={isChecked}
                  disabled={item.disabled}
                  size="md"
                  onCheckedChange={() => {}}
                  className={themeConfig.euler.menu.layout.checkboxRight}
                />
              </div>
            )}
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
          {checkboxPosition === 'left' ? (
            <div className={themeConfig.euler.menu.layout.container}>
              <Checkbox 
                checked={item.checked}
                disabled={item.disabled}
                size="md"
                position="left"
                onCheckedChange={() => {}}
              >
                <div className={themeConfig.euler.menu.layout.content}>
                  {item.icon && <item.icon className={getIconClassNames()} />}
                  {item.content}
                </div>
              </Checkbox>
            </div>
          ) : (
            <div className={themeConfig.euler.menu.layout.container}>
              <div className={themeConfig.euler.menu.layout.content}>
                {item.icon && <item.icon className={getIconClassNames()} />}
                {item.content}
              </div>
              <Checkbox 
                checked={item.checked}
                disabled={item.disabled}
                size="md"
                onCheckedChange={() => {}}
                className={themeConfig.euler.menu.layout.checkboxRight}
              />
            </div>
          )}
        </DropdownMenu.CheckboxItem>
      );
    }

    if ('isRadio' in item && item.isRadio && item.value) {
      return (
        <DropdownMenu.RadioItem
          key={`radio-${index}`}
          value={item.value}
          disabled={item.disabled}
          className={getCheckClassNames(item.disabled)}
        >
          <DropdownMenu.ItemIndicator className={themeConfig.euler.menu.checkboxMenuItem.indicator}>
            <Check className={themeConfig.euler.menu.checkboxMenuItem.icon} />
          </DropdownMenu.ItemIndicator>
          {item.icon && <item.icon className={getIconClassNames()} />}
          {item.content}
        </DropdownMenu.RadioItem>
      );
    }

    if ('hasSubmenu' in item && item.hasSubmenu && item.submenuItems) {
      return (
        <DropdownMenu.Sub key={`sub-${index}`}>
          <DropdownMenu.SubTrigger className={getMenuItemClassNames(item.disabled)}>
            {item.icon && <item.icon className={getIconClassNames()} />}
            {item.content}
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent className={menuClassNames}>
              {item.submenuItems.map((subItem, subIndex) => 
                renderMenuItem(subItem as MenuItemWithSeparatorProps, subIndex)
              )}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    // For standard menu items
    const standardItem = item as MenuStandardProps;
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
          {/* Column 1: Icon */}
          {standardItem.icon && <standardItem.icon className={getIconClassNames()} />}
          
          {/* Column 2: Content (main text + subtext) */}
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
          
          {/* Column 3: Shortcut */}
          {standardItem.shortcut && (
            <div className={getShortcutClassNames()}>{standardItem.shortcut}</div>
          )}
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
          align={align}
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