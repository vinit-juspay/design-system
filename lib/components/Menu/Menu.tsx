import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { MenuProps, MenuItemProps, MenuItemWithSeparatorProps } from './types';
import { getMenuClassNames, getMenuItemClassNames, getLabelClassNames, getSeparatorClassNames, getCheckClassNames, getIconClassNames } from './utils';
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
  rootProps,
  contentProps,
}, ref) => {
  const menuClassNames = getMenuClassNames();

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

    // For standard menu items (guaranteed to have content property by type)
    const standardItem = item as Omit<MenuItemProps, 'isSeparator'>;
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

  return (
    <DropdownMenu.Root {...rootProps}>
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
          {items.map((item, index) => 
            renderMenuItem(item as MenuItemWithSeparatorProps, index)
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
});

Menu.displayName = 'Menu';

export default Menu; 