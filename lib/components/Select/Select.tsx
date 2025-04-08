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
  getSelectScrollButtonClassNames
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
  className
}, ref) => {
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
              <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2 flex-1 truncate">
              {selectedItem?.icon && <selectedItem.icon className={getSelectItemIconClassNames()} />}
              <SelectPrimitive.Value placeholder={placeholder} />
            </div>
            <SelectPrimitive.Icon className={getSelectIconClassNames(size)}>
              <ChevronDown />
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
            <ChevronUp className={getSelectIconClassNames(size)} />
          </SelectPrimitive.ScrollUpButton>
          
          <SelectPrimitive.Viewport className={getSelectViewportClassNames()}>
            {items.map((item, index) => renderSelectItem(item, index))}
          </SelectPrimitive.Viewport>
          
          <SelectPrimitive.ScrollDownButton className={getSelectScrollButtonClassNames()}>
            <ChevronDown className={getSelectIconClassNames(size)} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = 'Select';

export default Select; 