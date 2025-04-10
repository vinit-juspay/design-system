import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { SelectProps, SelectItemProps, SelectGroupProps, SelectItemWithSeparatorProps, SeparatorItem } from './types';
import {
  getSelectTriggerClassNames,
  getSelectIconClassNames,
  getSelectContentClassNames,
  getSelectViewportClassNames,
  getSelectItemClassNames,
  getSelectItemIndicatorClassNames,
  getSelectItemIconClassNames,
  getSelectLabelClassNames,
  getSelectSeparatorClassNames,
  getSelectScrollButtonClassNames,
  getSelectChevronClassNames,
  getSelectSearchContainerClassNames,
  getSelectSearchInnerContainerClassNames,
  getSelectSearchIconClassNames,
  getSelectSearchInputClassNames
} from './utils';

/**
 * Select component built on top of Radix UI's select primitive
 * Allows users to select an option from a dropdown list
 * 
 * @component
 * @example
 * // Basic usage
 * <Select
 *   placeholder="Select an option"
 *   items={[
 *     { value: 'apple', text: 'Apple' },
 *     { value: 'banana', text: 'Banana' },
 *     { value: 'orange', text: 'Orange' }
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 */
const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectProps
>(({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  triggerContent,
  disabled = false,
  rootProps,
  contentProps,
  triggerProps,
  size = 'md',
  search,
}, ref) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Reset search query when dropdown is closed
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
    
    const filterItem = (item: SelectItemProps | SelectGroupProps | SeparatorItem): boolean => {
      if ('isSeparator' in item && item.isSeparator) {
        return false;
      }
      
      if ('label' in item && 'items' in item) {
        // It's a group, check if any item in the group matches
        const groupItems = item.items.filter(filterItem);
        return groupItems.length > 0;
      }
      
      // It's a regular item
      const standardItem = item as SelectItemProps;
      const searchText = String(standardItem.text || standardItem.value).toLowerCase();
      return searchText.includes(searchQuery.toLowerCase());
    };
    
    return items.filter(filterItem);
  }, [items, searchQuery, search?.enabled]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Prevent keyboard events from propagating up
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Prevent clicks from closing the menu
  const handleSearchInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Find the selected item to display its icon in the trigger
  const selectedItem = React.useMemo(() => {
    const findItemInArray = (items: Array<SelectItemProps | SelectGroupProps | SeparatorItem>): SelectItemProps | undefined => {
      for (const item of items) {
        if ('isSeparator' in item && item.isSeparator) {
          continue;
        }
        
        if ('label' in item && 'items' in item) {
          // It's a group, search within it
          const foundInGroup = findItemInArray(item.items);
          if (foundInGroup) return foundInGroup;
        } else if ('value' in item && (item.value === value || item.value === defaultValue)) {
          // Found the selected item
          return item as SelectItemProps;
        }
      }
      
      return undefined;
    };
    
    return findItemInArray(items);
  }, [items, value, defaultValue]);

  // Function to render items, groups, or separators
  const renderSelectItem = (item: SelectItemWithSeparatorProps, index: number) => {
    if ('isSeparator' in item && item.isSeparator) {
      return (
        <SelectPrimitive.Separator 
          key={`separator-${index}`} 
          className={getSelectSeparatorClassNames()} 
        />
      );
    }

    if ('label' in item && 'items' in item) {
      // It's a group
      const group = item as SelectGroupProps;
      return (
        <SelectPrimitive.Group key={`group-${index}`}>
          <SelectPrimitive.Label className={getSelectLabelClassNames()}>
            {group.label}
          </SelectPrimitive.Label>
          {group.items.map((groupItem, groupItemIndex) => (
            <SelectPrimitive.Item
              key={`item-${groupItem.value}-${groupItemIndex}`}
              value={groupItem.value}
              disabled={groupItem.disabled}
              textValue={groupItem.textValue}
              className={getSelectItemClassNames(groupItem.disabled)}
            >
              <div className="flex items-center">
                {groupItem.icon && <groupItem.icon className={getSelectItemIconClassNames()} />}
                <SelectPrimitive.ItemText>
                  {groupItem.text}
                </SelectPrimitive.ItemText>
              </div>
              <SelectPrimitive.ItemIndicator className={getSelectItemIndicatorClassNames()}>
                <Check className="h-4 w-4 text-primary-500" />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Group>
      );
    }

    // It's a regular item
    const standardItem = item as SelectItemProps;
    return (
      <SelectPrimitive.Item
        key={`item-${standardItem.value}-${index}`}
        value={standardItem.value}
        disabled={standardItem.disabled}
        textValue={standardItem.textValue}
        className={getSelectItemClassNames(standardItem.disabled)}
      >
        <div className="flex items-center">
          {standardItem.icon && <standardItem.icon className={getSelectItemIconClassNames()} />}
          <SelectPrimitive.ItemText>
            {standardItem.text}
          </SelectPrimitive.ItemText>
        </div>
        <SelectPrimitive.ItemIndicator className={getSelectItemIndicatorClassNames()}>
          <Check className="h-4 w-4 text-primary-500" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  };

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      onOpenChange={setIsOpen}
      {...rootProps}
    >
      <SelectPrimitive.Trigger 
        className={getSelectTriggerClassNames(size, disabled)}
        {...triggerProps}
      >
        {triggerContent ? (
          triggerContent
        ) : (
          <>
            <div className="flex items-center flex-1 truncate">
              {selectedItem?.icon && <selectedItem.icon className={getSelectItemIconClassNames()} />}
              <SelectPrimitive.Value placeholder={placeholder} />
            </div>
            <SelectPrimitive.Icon className={getSelectIconClassNames(size)}>
              <ChevronDown className={getSelectChevronClassNames()} strokeWidth={2} />
            </SelectPrimitive.Icon>
          </>
        )}
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={getSelectContentClassNames()}
          position="popper"
          sideOffset={5}
          {...contentProps}
        >
          <SelectPrimitive.ScrollUpButton className={getSelectScrollButtonClassNames()}>
            <ChevronUp className={getSelectChevronClassNames()} strokeWidth={2} />
          </SelectPrimitive.ScrollUpButton>
          
          {search?.enabled && (
            <div className={getSelectSearchContainerClassNames()}>
              <div className={getSelectSearchInnerContainerClassNames()}>
                <Search className={getSelectSearchIconClassNames()} />
                <input
                  type="text"
                  placeholder={search.placeholder || "Search..."}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={handleSearchInputClick}
                  onKeyDown={handleSearchKeyDown}
                  className={getSelectSearchInputClassNames()}
                />
              </div>
            </div>
          )}
          
          <SelectPrimitive.Viewport className={getSelectViewportClassNames()}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => renderSelectItem(item, index))
            ) : (
              <div className="py-2 px-2 text-sm text-gray-500">No results found</div>
            )}
          </SelectPrimitive.Viewport>
          
          <SelectPrimitive.ScrollDownButton className={getSelectScrollButtonClassNames()}>
            <ChevronDown className={getSelectChevronClassNames()} strokeWidth={2} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = 'Select';

export default Select; 