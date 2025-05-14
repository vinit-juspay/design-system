import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, X, HelpCircle } from 'lucide-react';
import {
  DropdownProps,
  DropdownType,
  DropdownState,
  DropdownSubType,
  DropdownSize,
  DropdownSelectionType,
  MenuType,
  MenuItemProps,
} from './types';
import {
  getDropdownBaseClasses,
  getLeftIconClassNames,
  getChevronIconClassNames,
  getLabelClassNames,
  getSubLabelClassNames,
  getHintTextClassNames,
  getSizeKey,
  areArraysEqual,
} from './utils';
import { cn } from '../../utils';
import Menu from './Menu';
import Button from '../Button/Button';
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types';
import Tag from '../Tag/Tag';
import { themeConfig } from '../../themeConfig';

/**
 * MenuDropdown component - a dropdown trigger that opens a Menu component
 *
 * Features:
 * - Single select, multi-select, and icon-only variants
 * - Container and no-container subtypes
 * - Multiple sizes (small, medium, large)
 * - Support for labels, sublabels, and hint text
 * - Customizable with icons and clear button
 * - Accessible keyboard navigation
 *
 * For multi-select dropdowns, two display modes are available:
 * - Count: Shows the selection count in a badge
 * - Text: Shows the first selected item followed by "+X more"
 */
const MenuDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      id,
      className,
      type = DropdownType.SINGLE_SELECT,
      subType = DropdownSubType.HAS_CONTAINER,
      size = DropdownSize.MEDIUM,
      state: propState = DropdownState.DEFAULT,
      selectionType = DropdownSelectionType.COUNT,
      hasLabel = false,
      hasSubLabel = false,
      mandatory = false,
      hasHelp = false,
      hasHint = false,
      hasClearButton,
      hasLeftIcon = false,
      leftIcon,
      label,
      subLabel,
      hint,
      placeholder = 'Select an option',
      selectedOption: controlledSelectedOption,
      selectedCount,
      selectedText,
      menuItems,
      onSelect,
      onClear,
      onOpen,
      onClose,
      isOpen: controlledIsOpen,
      disabled = false,
      width,
      'aria-label': ariaLabel,
      searchTerm: controlledSearchTerm,
      onSearchTermChange,
      onSelectedItemsChange,
      closeOnSelect,
    },
    ref
  ) => {
    console.log('MenuDropDownProps-->>', {
      id,
      className,
      type,
      subType,
      size,
      propState,
      selectionType,
      hasLabel,
      hasSubLabel,
      mandatory,
      hasHelp,
      hasHint,
      hasClearButton,
      hasLeftIcon,
      leftIcon,
      label,
      subLabel,
      hint,
      placeholder,
      selectedOption: controlledSelectedOption,
      selectedCount,
      selectedText,
      menuItems,
      onSelect,
      onClear,
      onOpen,
      onClose,
      isOpen: controlledIsOpen,
      disabled,
      width,
      'aria-label': ariaLabel,
      searchTerm: controlledSearchTerm,
      onSearchTermChange,
      onSelectedItemsChange,
      closeOnSelect,
    });

    // State management
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const [uncontrolledSelectedOption, setUncontrolledSelectedOption] = useState<
      string | string[] | undefined
    >(undefined);
    const [uncontrolledSearchTerm, setUncontrolledSearchTerm] = useState<string>('');
    const [lastSelectedItems, setLastSelectedItems] = useState<string[]>([]);

    // Determine if component is controlled or uncontrolled
    const isControlled = controlledIsOpen !== undefined;
    const isSelectionControlled = controlledSelectedOption !== undefined;
    const isSearchTermControlled = controlledSearchTerm !== undefined;

    // Derived state values
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
    const selectedOption = isSelectionControlled
      ? controlledSelectedOption
      : uncontrolledSelectedOption;
    const searchTerm = isSearchTermControlled ? controlledSearchTerm : uncontrolledSearchTerm;

    // Determine closeOnSelect behavior based on type
    // Default: close on select for single-select, stay open for multi-select
    const shouldCloseOnSelect =
      closeOnSelect !== undefined ? closeOnSelect : type !== DropdownType.MULTI_SELECT;

    // Default hasClearButton to true for multi-select if not explicitly provided
    // Hide clear button for NO_CONTAINER multiselect dropdowns
    const showClearButton =
      hasClearButton !== undefined
        ? hasClearButton
        : type === DropdownType.MULTI_SELECT && subType !== DropdownSubType.NO_CONTAINER;

    // Determine current state based on isOpen and propState
    const currentState = isOpen ? DropdownState.OPEN : disabled ? DropdownState.DEFAULT : propState;

    // References
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!isOpen) return; // Don't add listener if not open

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          menuContainerRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !menuContainerRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle keyboard navigation and accessibility
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isOpen) {
          if (event.key === 'Escape') {
            handleClose();
          }
        } else if (!disabled) {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            if (document.activeElement === dropdownRef.current) {
              event.preventDefault();
              handleOpen();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, disabled]);

    // Toggle dropdown
    const handleToggle = () => {
      if (disabled) return;

      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    };

    // Open dropdown
    const handleOpen = () => {
      if (disabled) return;

      if (!isControlled) {
        setUncontrolledIsOpen(true);
      }

      if (onOpen) {
        onOpen();
      }
    };

    // Close dropdown
    const handleClose = () => {
      if (!isControlled) {
        setUncontrolledIsOpen(false);
      }

      if (onClose) {
        onClose();
      }
    };

    // Handle item selection
    const handleSelect = (item: any) => {
      // Get the item ID
      const itemId = item.id || '';

      // Update internal state for uncontrolled components
      if (!isSelectionControlled) {
        if (type === DropdownType.MULTI_SELECT) {
          // Handle multi-select logic
          const currentSelected = Array.isArray(uncontrolledSelectedOption)
            ? uncontrolledSelectedOption
            : [];

          if (currentSelected.includes(itemId)) {
            // Remove if already selected
            setUncontrolledSelectedOption(currentSelected.filter(id => id !== itemId));
          } else {
            // Add if not selected
            setUncontrolledSelectedOption([...currentSelected, itemId]);
          }
        } else {
          // Single select - just set the ID
          setUncontrolledSelectedOption(item.id);
        }
      }

      // Call external handler if provided
      if (onSelect) {
        // For multi-select, pass the updated selection array
        if (type === DropdownType.MULTI_SELECT) {
          const currentItems = Array.isArray(selectedOption) ? selectedOption : [];
          const updatedItems = currentItems.includes(itemId)
            ? currentItems.filter(id => id !== itemId)
            : [...currentItems, itemId];

          // Find the selected menu items by ID
          const selectedMenuItems = updatedItems
            .map(id => menuItems.find(item => item.id === id))
            .filter(Boolean) as MenuItemProps[];

          onSelect(selectedMenuItems);
        } else {
          // For single select, just pass the item
          onSelect(item);
        }
      }

      // Close dropdown based on type and closeOnSelect prop
      if (shouldCloseOnSelect) {
        handleClose();
      }
    };

    // Handle clear button click
    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      // Clear internal state for uncontrolled components
      if (!isSelectionControlled) {
        setUncontrolledSelectedOption(type === DropdownType.MULTI_SELECT ? [] : undefined);
      }

      // Call external handler if provided
      if (onClear) {
        onClear();
      }
    };

    // Handle selection changes from Menu component
    const handleSelectionChange = useCallback(
      (selectedItems: string[]) => {
        // Skip if there's no actual change to prevent loops
        if (areArraysEqual(lastSelectedItems, selectedItems)) {
          return;
        }

        // Update last selected items
        setLastSelectedItems(selectedItems);

        // Update internal state for uncontrolled components
        if (!isSelectionControlled && type === DropdownType.MULTI_SELECT) {
          setUncontrolledSelectedOption(selectedItems);
        }

        // Update controlled components through callback
        if (onSelectedItemsChange) {
          onSelectedItemsChange(selectedItems);
        }

        // Also call onSelect with the full menu items if available
        if (onSelect && type === DropdownType.MULTI_SELECT) {
          const selectedMenuItems = selectedItems
            .map(id => menuItems.find(item => item.id === id))
            .filter(Boolean) as MenuItemProps[];

          if (selectedMenuItems.length > 0) {
            onSelect(selectedMenuItems);
          }
        }
      },
      [lastSelectedItems, onSelectedItemsChange, isSelectionControlled, type, onSelect, menuItems]
    );

    // Handle context changes from the Menu component
    const handleContextChange = useCallback(
      (context: any) => {
        // Update selected items if provided
        if (context.selectedItems) {
          // Only call handleSelectionChange if the selected items have actually changed
          if (!areArraysEqual(lastSelectedItems, context.selectedItems)) {
            handleSelectionChange(context.selectedItems);
          }
        }

        // Update search term if provided
        if (context.searchTerm !== undefined) {
          if (!isSearchTermControlled) {
            setUncontrolledSearchTerm(context.searchTerm);
          }

          if (onSearchTermChange) {
            onSearchTermChange(context.searchTerm);
          }
        }
      },
      [handleSelectionChange, lastSelectedItems, isSearchTermControlled, onSearchTermChange]
    );

    // Determine the text to display in the dropdown
    const getDisplayText = () => {
      // Custom text takes highest priority
      if (selectedText) {
        return selectedText;
      }

      // If using multi-select type
      if (type === DropdownType.MULTI_SELECT) {
        // Get the actual selected items array
        const selectedArray = Array.isArray(selectedOption) ? selectedOption : [];

        const count = selectedArray.length || selectedCount || 0;

        if (count > 0) {
          // Count display mode
          if (selectionType === DropdownSelectionType.COUNT) {
            return (
              <>
                {placeholder}{' '}
                <Tag
                  variant="attentive"
                  color="primary"
                  tagStyle="squarical"
                  size={
                    size === DropdownSize.SMALL ? 'xs' : size === DropdownSize.LARGE ? 'md' : 'sm'
                  }
                  label={count.toString()}
                  className={cn(
                    themeConfig.euler.menuv2.dropdown.multiSelectTag.base,
                    size === DropdownSize.SMALL
                      ? themeConfig.euler.menuv2.dropdown.multiSelectTag.sizeSm
                      : themeConfig.euler.menuv2.dropdown.multiSelectTag.sizeDefault
                  )}
                />
              </>
            );
          }
          // Text display mode
          else {
            // Get the text of the first selected item
            const firstSelectedId = selectedArray[0];
            const firstItem = firstSelectedId
              ? menuItems.find(item => item.id === firstSelectedId)
              : null;

            // Single item selected
            if (count === 1 && firstItem) {
              return (
                <>
                  {placeholder}{' '}
                  <span className={themeConfig.euler.menuv2.dropdown.selectedText}>
                    {firstItem.text}
                  </span>
                </>
              );
            }

            // Multiple items selected
            if (firstItem) {
              return (
                <>
                  {placeholder}{' '}
                  <span className={themeConfig.euler.menuv2.dropdown.selectedText}>
                    {firstItem.text}, +{count - 1} more
                  </span>
                </>
              );
            }
          }
        }
      }
      // For single select dropdowns
      else if (typeof selectedOption === 'string') {
        const item = menuItems.find(item => item.id === selectedOption);
        return item?.text || placeholder;
      }

      // Default to placeholder
      return placeholder;
    };

    // Check if there's something selected
    const hasSelection =
      selectedOption !== undefined &&
      (Array.isArray(selectedOption) ? selectedOption.length > 0 : !!selectedOption);

    // Generate dropdown classes
    const dropdownClasses = getDropdownBaseClasses(
      type,
      subType,
      size,
      currentState,
      disabled,
      className
    );

    // Helper function to format width consistently
    const getWidthClass = (width?: string | number) => {
      if (!width) return themeConfig.euler.menuv2.dropdown.trigger.widthFit;
      return typeof width === 'number' ? `w-[${width}px]` : `w-${width}`;
    };

    // Dropdown widths based on size
    const widthClasses = getWidthClass(width);

    // Effect to update menu width and position based on available space
    useEffect(() => {
      if (!isOpen || !dropdownRef.current || !menuContainerRef.current) return;

      const dropdownWidth = dropdownRef.current.offsetWidth;
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      // Set minimum width based on dropdown width but not more than 320px
      const minWidth = Math.min(Math.max(dropdownWidth, 180), 320);
      menuContainerRef.current.style.minWidth = `${minWidth}px`;

      // For icon-only type, always use sensible width rather than tiny icon width
      if (type === DropdownType.ICON_ONLY) {
        menuContainerRef.current.style.minWidth = '220px';
      }

      // Calculate available space below and above the dropdown
      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      // Estimate menu height (this will be approximate until rendered)
      // Using 56 as approx height per item + padding
      const estimatedMenuHeight = Math.min(
        menuItems.length * 40 + 16 + (type === DropdownType.MULTI_SELECT ? 56 : 0),
        320
      );

      // Determine if menu should open upward
      const shouldOpenUpward = spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

      // Position the menu accordingly
      if (shouldOpenUpward) {
        menuContainerRef.current.style.bottom = '100%';
        menuContainerRef.current.style.top = 'auto';
        menuContainerRef.current.style.marginTop = '0';
        menuContainerRef.current.style.marginBottom = '4px';
      } else {
        menuContainerRef.current.style.top = '100%';
        menuContainerRef.current.style.bottom = 'auto';
        menuContainerRef.current.style.marginTop = '4px';
        menuContainerRef.current.style.marginBottom = '0';
      }
    }, [isOpen, type, menuItems.length]);

    // ARIA attributes for the dropdown trigger
    const ariaProps = {
      role: 'combobox',
      'aria-expanded': isOpen,
      'aria-haspopup': 'listbox' as const,
      'aria-disabled': disabled,
      'aria-controls': isOpen ? `${id}-menu` : undefined,
      'aria-label': ariaLabel || 'Dropdown menu',
      tabIndex: disabled ? -1 : 0,
    };

    // Common classes for the clear button
    const clearButtonClasses = cn(
      themeConfig.euler.menuv2.dropdown.clearButton.base,
      subType === DropdownSubType.HAS_CONTAINER
        ? themeConfig.euler.menuv2.dropdown.clearButton.withContainer
        : themeConfig.euler.menuv2.dropdown.clearButton.noContainer
    );

    // Prepare selected items in the correct format for the Menu
    const selectedItems = Array.isArray(selectedOption)
      ? selectedOption
      : selectedOption
        ? [selectedOption]
        : [];

    return (
      <div className={themeConfig.euler.menuv2.dropdown.container.base}>
        {/* Label, SubLabel, Mandatory indicator and Help icon - only render if subType is HAS_CONTAINER */}
        {subType === DropdownSubType.HAS_CONTAINER && hasLabel && label && (
          <div className={themeConfig.euler.menuv2.dropdown.container.withLabel}>
            <div className={themeConfig.euler.menuv2.dropdown.label.container}>
              <label htmlFor={id} className={getLabelClassNames(size)}>
                {label}
              </label>
              {hasSubLabel && subLabel && (
                <span className={getSubLabelClassNames(size)}>{subLabel}</span>
              )}
              {mandatory && (
                <span className={themeConfig.euler.menuv2.dropdown.label.mandatory}>*</span>
              )}
              {hasHelp && (
                <span className={themeConfig.euler.menuv2.dropdown.label.helpIcon}>
                  <HelpCircle size={14} />
                </span>
              )}
            </div>
          </div>
        )}

        <div className={themeConfig.euler.menuv2.dropdown.container.wrapper}>
          {/* Dropdown trigger */}
          <div
            ref={node => {
              // Merge refs
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              if (dropdownRef.current !== node) {
                dropdownRef.current = node;
              }
            }}
            id={id}
            className={cn(
              dropdownClasses,
              widthClasses,
              themeConfig.euler.menuv2.dropdown.trigger.base,
              hasSelection &&
                showClearButton &&
                type !== DropdownType.ICON_ONLY &&
                (subType === DropdownSubType.NO_CONTAINER
                  ? themeConfig.euler.menuv2.dropdown.trigger.noBorderClearButtonRight
                  : themeConfig.euler.menuv2.dropdown.trigger.withBorderClearButtonRight)
            )}
            onClick={handleToggle}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            {...ariaProps}
          >
            {/* Left icon */}
            {hasLeftIcon && leftIcon && (
              <span
                className={cn(
                  getLeftIconClassNames(size),
                  themeConfig.euler.menuv2.dropdown.leftIcon.wrapper
                )}
              >
                {leftIcon}
              </span>
            )}

            {/* Display text - only shown for non-icon-only dropdowns */}
            {type !== DropdownType.ICON_ONLY && (
              <span className={themeConfig.euler.menuv2.dropdown.displayText}>
                {getDisplayText()}
              </span>
            )}

            {/* Dropdown icon */}
            <span
              className={cn(
                themeConfig.euler.menuv2.dropdown.chevron.wrapper,
                type !== DropdownType.ICON_ONLY && getChevronIconClassNames(size)
              )}
            >
              {isOpen ? (
                <ChevronUp
                  className={themeConfig.euler.menuv2.dropdown.chevron.sizes[getSizeKey(size)]}
                />
              ) : (
                <ChevronDown
                  className={themeConfig.euler.menuv2.dropdown.chevron.sizes[getSizeKey(size)]}
                />
              )}
            </span>
          </div>

          {/* Clear button - placed outside the dropdown */}
          {hasSelection && showClearButton && type !== DropdownType.ICON_ONLY && (
            <Button
              buttonType={ButtonType.SECONDARY}
              size={
                size === DropdownSize.SMALL
                  ? ButtonSize.SMALL
                  : size === DropdownSize.LARGE
                    ? ButtonSize.LARGE
                    : ButtonSize.MEDIUM
              }
              subType={ButtonSubType.ICON_ONLY}
              className={clearButtonClasses}
              onClick={handleClear}
              ariaLabel="Clear selection"
            >
              <X size={16} className={themeConfig.euler.menuv2.dropdown.clearButton.icon} />
            </Button>
          )}

          {/* Menu Container - positioned relative to dropdown trigger */}
          {isOpen && (
            <div
              ref={menuContainerRef}
              id={id ? `${id}-menu` : 'dropdown-menu'}
              className={themeConfig.euler.menuv2.dropdown.menu.container}
              style={{ width: 'auto' }}
            >
              <Menu
                items={menuItems}
                onItemClick={handleSelect}
                className={cn(
                  themeConfig.euler.menuv2.dropdown.menu.base,
                  themeConfig.euler.menuv2.shadows.xs
                )}
                type={type === DropdownType.MULTI_SELECT ? MenuType.MULTI_SELECT : MenuType.DEFAULT}
                hasSearch={type === DropdownType.MULTI_SELECT}
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                searchTerm={searchTerm}
                onSearchTermChange={(term: string) => {
                  if (!isSearchTermControlled) {
                    setUncontrolledSearchTerm(term);
                  }
                  if (onSearchTermChange) {
                    onSearchTermChange(term);
                  }
                }}
                onContextChange={handleContextChange}
              />
            </div>
          )}
        </div>
        {/* Hint text - only render if subType is HAS_CONTAINER */}
        {subType === DropdownSubType.HAS_CONTAINER && hasHint && hint && (
          <div className={getHintTextClassNames(size)}>{hint}</div>
        )}
      </div>
    );
  }
);

MenuDropdown.displayName = 'MenuDropdown';

export default MenuDropdown;
