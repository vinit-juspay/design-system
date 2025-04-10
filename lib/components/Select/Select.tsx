import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
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
} from './utils';
import Search, { filterItems } from '../common/search';
import Checkbox from '../common/Checkbox';
import { themeConfig } from '../../themeConfig';

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
  multiSelect = false,
  checkboxPosition = 'left',
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
    
    return filterItems(items, searchQuery);
  }, [items, searchQuery, search?.enabled]);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle multiple selection changes
  const handleMultiSelectChange = (itemValue: string) => {
    if (!value && !defaultValue) {
      // If no values selected yet, initialize array with this value
      if (onValueChange) onValueChange([itemValue]);
      return;
    }

    const currentValues = Array.isArray(value) ? [...value] : value ? [value] : 
                          Array.isArray(defaultValue) ? [...defaultValue] : defaultValue ? [defaultValue] : [];
    
    if (currentValues.includes(itemValue)) {
      // Remove the value if already selected
      const newValues = currentValues.filter(v => v !== itemValue);
      if (onValueChange) onValueChange(newValues.length ? newValues : []);
    } else {
      // Add the value if not already selected
      const newValues = [...currentValues, itemValue];
      if (onValueChange) onValueChange(newValues);
    }
  };

  // Find the selected item to display its icon in the trigger
  const selectedItems = React.useMemo(() => {
    if (!value && !defaultValue) return [];
    
    const values = Array.isArray(value) ? value : value ? [value] : 
                  Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
    
    const findItemsInArray = (items: Array<SelectItemProps | SelectGroupProps | SeparatorItem>): SelectItemProps[] => {
      const result: SelectItemProps[] = [];
      
      for (const item of items) {
        if ('isSeparator' in item && item.isSeparator) {
          continue;
        }
        
        if ('label' in item && 'items' in item) {
          // It's a group, search within it
          const foundInGroup = findItemsInArray(item.items);
          result.push(...foundInGroup);
        } else if ('value' in item && values.includes(item.value)) {
          // Found a selected item
          result.push(item as SelectItemProps);
        }
      }
      
      return result;
    };
    
    return findItemsInArray(items);
  }, [items, value, defaultValue]);

  // Selected item for single select
  const selectedItem = !multiSelect && selectedItems.length > 0 ? selectedItems[0] : undefined;

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
          {group.items.map((groupItem, groupItemIndex) => {
            const isSelected = multiSelect && Array.isArray(value) 
              ? value.includes(groupItem.value)
              : multiSelect && Array.isArray(defaultValue)
              ? defaultValue.includes(groupItem.value)
              : false;
              
            return multiSelect ? (
              <div
                key={`multi-item-${groupItem.value}-${groupItemIndex}`}
                className={getSelectItemClassNames(groupItem.disabled)}
                onClick={() => !groupItem.disabled && handleMultiSelectChange(groupItem.value)}
              >
                {checkboxPosition === 'left' ? (
                  <div className={themeConfig.euler.select.layout.container}>
                    <Checkbox 
                      checked={isSelected}
                      disabled={groupItem.disabled}
                      size="sm"
                      position="left"
                      onCheckedChange={() => {}}
                      className={themeConfig.euler.select.layout.checkboxLeft}
                    >
                      <div className={themeConfig.euler.select.layout.content}>
                        {groupItem.icon && <groupItem.icon className={getSelectItemIconClassNames()} />}
                        <span>{groupItem.text}</span>
                      </div>
                    </Checkbox>
                  </div>
                ) : (
                  <div className={themeConfig.euler.select.layout.container}>
                    <div className={themeConfig.euler.select.layout.content}>
                      {groupItem.icon && <groupItem.icon className={getSelectItemIconClassNames()} />}
                      <span>{groupItem.text}</span>
                    </div>
                    <Checkbox 
                      checked={isSelected}
                      disabled={groupItem.disabled}
                      size="sm"
                      onCheckedChange={() => {}}
                      className={themeConfig.euler.select.layout.checkboxRight}
                    />
                  </div>
                )}
              </div>
            ) : (
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
            );
          })}
        </SelectPrimitive.Group>
      );
    }

    // It's a regular item
    const standardItem = item as SelectItemProps;
    const isSelected = multiSelect && Array.isArray(value) 
      ? value.includes(standardItem.value)
      : multiSelect && Array.isArray(defaultValue)
      ? defaultValue.includes(standardItem.value)
      : false;
      
    return multiSelect ? (
      <div
        key={`multi-item-${standardItem.value}-${index}`}
        className={getSelectItemClassNames(standardItem.disabled)}
        onClick={() => !standardItem.disabled && handleMultiSelectChange(standardItem.value)}
      >
        {checkboxPosition === 'left' ? (
          <div className={themeConfig.euler.select.layout.container}>
            <Checkbox 
              checked={isSelected}
              disabled={standardItem.disabled}
              size="sm"
              position="left"
              onCheckedChange={() => {}}
              className={themeConfig.euler.select.layout.checkboxLeft}
            >
              <div className={themeConfig.euler.select.layout.content}>
                {standardItem.icon && <standardItem.icon className={getSelectItemIconClassNames()} />}
                <span>{standardItem.text}</span>
              </div>
            </Checkbox>
          </div>
        ) : (
          <div className={themeConfig.euler.select.layout.container}>
            <div className={themeConfig.euler.select.layout.content}>
              {standardItem.icon && <standardItem.icon className={getSelectItemIconClassNames()} />}
              <span>{standardItem.text}</span>
            </div>
            <Checkbox 
              checked={isSelected}
              disabled={standardItem.disabled}
              size="sm"
              onCheckedChange={() => {}}
              className={themeConfig.euler.select.layout.checkboxRight}
            />
          </div>
        )}
      </div>
    ) : (
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
      value={multiSelect ? undefined : value as string}
      defaultValue={multiSelect ? undefined : defaultValue as string}
      onValueChange={multiSelect ? undefined : onValueChange as (value: string) => void}
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
              {!multiSelect && selectedItem?.icon && (
                <selectedItem.icon className={getSelectItemIconClassNames()} />
              )}
              {multiSelect ? (
                <div className="flex-1 truncate">
                  {selectedItems.length > 0 ? (
                    <span className="text-gray-700">
                      {selectedItems.length} selected
                    </span>
                  ) : (
                    <span className="text-gray-400">{placeholder}</span>
                  )}
                </div>
              ) : (
                <SelectPrimitive.Value placeholder={placeholder} />
              )}
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
          
          <Search
            enabled={search?.enabled}
            placeholder={search?.placeholder}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          
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