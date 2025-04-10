import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, Search } from 'lucide-react';
import { MenuProps, MenuItemWithSeparatorProps, MenuStandardProps } from './types';
import { 
  getMenuClassNames, 
  getMenuItemClassNames, 
  getLabelClassNames, 
  getSeparatorClassNames, 
  getCheckClassNames, 
  getIconClassNames,
  getSearchContainerClassNames,
  getSearchInputClassNames,
  filterMenuItems
} from './utils';
import { themeConfig } from '../../themeConfig';

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
  rootProps,
  contentProps,
}, ref) => {
  const menuClassNames = getMenuClassNames();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Reset search query when menu is closed
  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    if (!search?.enabled || !searchQuery) {
      return items;
    }
    return filterMenuItems(items, searchQuery);
  }, [items, searchQuery, search?.enabled]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
      return (
        <DropdownMenu.CheckboxItem
          key={`checkbox-${index}`}
          checked={item.checked}
          onCheckedChange={item.onSelect as unknown as (checked: boolean) => void}
          disabled={item.disabled}
          className={getCheckClassNames()}
        >
          <DropdownMenu.ItemIndicator className={themeConfig.euler.menu.checkbox.indicator}>
            <Check className={themeConfig.euler.menu.checkbox.icon} />
          </DropdownMenu.ItemIndicator>
          {item.icon && <item.icon className={getIconClassNames()} />}
          {item.content}
        </DropdownMenu.CheckboxItem>
      );
    }

    if ('isRadio' in item && item.isRadio && item.value) {
      return (
        <DropdownMenu.RadioItem
          key={`radio-${index}`}
          value={item.value}
          disabled={item.disabled}
          className={getCheckClassNames()}
        >
          <DropdownMenu.ItemIndicator className={themeConfig.euler.menu.checkbox.indicator}>
            <Check className={themeConfig.euler.menu.checkbox.icon} />
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
        className={getMenuItemClassNames(standardItem.disabled)}
      >
        {standardItem.icon && <standardItem.icon className={getIconClassNames()} />}
        {standardItem.content}
      </DropdownMenu.Item>
    );
  };

  // Prevent keyboard events from propagating up
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Prevent clicks from closing the menu
  const handleSearchInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu.Root 
      {...rootProps} 
      onOpenChange={setIsOpen}
    >
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={ref}
          align={align}
          side={side}
          sideOffset={5}
          className={menuClassNames}
          {...contentProps}
        >
          {search?.enabled && (
            <div className={getSearchContainerClassNames()}>
              <div className={themeConfig.euler.menu.search.container}>
                <Search className={themeConfig.euler.menu.search.icon} />
                <input
                  type="text"
                  placeholder={search.placeholder || "Search..."}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={handleSearchInputClick}
                  onKeyDown={handleSearchKeyDown}
                  className={getSearchInputClassNames()}
                />
              </div>
            </div>
          )}
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => 
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