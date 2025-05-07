import React, { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { 
  DropdownProps, 
  DropdownType, 
  DropdownState, 
  DropdownSubType, 
  DropdownSize, 
  DropdownSelectionType,
  MenuType
} from "./types";
import { 
  getDropdownBaseClasses, 
  getLeftIconClassNames, 
  getChevronIconClassNames, 
  getLabelClassNames,
  getSubLabelClassNames,
  getHintTextClassNames
} from "./utils";
import { cn } from "../../utils";
import Menu from "./Menu";
import Button from "../Button/Button";
import { ButtonType, ButtonSize, ButtonSubType } from "../Button/types";
import Tag from "../Tag/Tag";
import { themeConfig } from "../../themeConfig";

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
const MenuDropdown = forwardRef<HTMLDivElement, DropdownProps>((
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
    placeholder = "Select an option",
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
    position = "bottom-start",
    offset = 4,
    "aria-label": ariaLabel,
    children,
  },
  ref
) => {
  // For uncontrolled component - dropdown open state
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // For uncontrolled component - selection state
  const [uncontrolledSelectedOption, setUncontrolledSelectedOption] = useState<string | string[] | undefined>(undefined);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isSelectionControlled = controlledSelectedOption !== undefined;
  
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  const selectedOption = isSelectionControlled ? controlledSelectedOption : uncontrolledSelectedOption;
  
  // Default hasClearButton to true for multi-select if not explicitly provided
  // Hide clear button for NO_CONTAINER multiselect dropdowns
  const showClearButton = 
    hasClearButton !== undefined 
      ? hasClearButton 
      : (type === DropdownType.MULTI_SELECT && subType !== DropdownSubType.NO_CONTAINER);
  
  // Determine current state based on isOpen and propState
  const currentState = isOpen 
    ? DropdownState.OPEN 
    : (disabled ? DropdownState.DEFAULT : propState);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        menuContainerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  // Handle keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === "Escape") {
          handleClose();
        }
      } else {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          if (document.activeElement === dropdownRef.current) {
            event.preventDefault();
            handleOpen();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  
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
    // Update internal state for uncontrolled components
    if (!isSelectionControlled) {
      if (type === DropdownType.MULTI_SELECT) {
        // Handle multi-select logic
        const currentSelected = Array.isArray(uncontrolledSelectedOption) ? uncontrolledSelectedOption : [];
        const itemId = item.id || '';
        
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
      onSelect(item);
    }
    
    // Close dropdown for single select
    if (type !== DropdownType.MULTI_SELECT) {
      handleClose();
    }
  };
  
  // Handle clear button click
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    // Clear internal state for uncontrolled components
    if (!isSelectionControlled) {
      if (type === DropdownType.MULTI_SELECT) {
        setUncontrolledSelectedOption([]);
      } else {
        setUncontrolledSelectedOption(undefined);
      }
    }
    
    // Call external handler if provided
    if (onClear) {
      onClear();
    }
  };
  
  // Determine the text to display in the dropdown
  const getDisplayText = () => {
    // Custom text takes highest priority
    if (selectedText) {
      return selectedText;
    }
    
    // If using multi-select type
    if (type === DropdownType.MULTI_SELECT) {
      const count = Array.isArray(selectedOption) 
        ? selectedOption.length 
        : (selectedCount || 0);
      
      if (count > 0) {
        // Count display mode
        if (selectionType === DropdownSelectionType.COUNT) {
          return (
            <>
              {placeholder} {" "}
              <Tag 
                variant="attentive"
                color="primary"
                tagStyle="squarical"
                size={size === DropdownSize.SMALL ? "xs" : size === DropdownSize.LARGE ? "md" : "sm"}
                label={count.toString()}
                className={cn(
                  "ml-1.5 flex items-center justify-center",
                  size === DropdownSize.SMALL 
                    ? "h-4 w-4 min-w-4" // 16x16px
                    : "h-[18px] w-[18px] min-w-[18px]" // 18x18px
                )}
              />
            </>
          );
        }
        // Text display mode
        else {
          // Get the text of the first selected item
          const firstItem = Array.isArray(selectedOption) && selectedOption.length > 0 
            ? menuItems.find(item => item.id === selectedOption[0])
            : null;
            
          // Single item selected
          if (Array.isArray(selectedOption) && selectedOption.length === 1) {
            return (
              <>
                {placeholder} <span className="text-gray-400 ml-1.5">{firstItem?.text}</span>
              </>
            );
          }
          
          // Multiple items selected
          return (
            <>
              {placeholder} <span className="text-gray-400 ml-1.5">{firstItem?.text}, +{count - 1} more</span>
            </>
          );
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
  const hasSelection = selectedOption !== undefined && 
    (Array.isArray(selectedOption) ? selectedOption.length > 0 : !!selectedOption);
  
  // Render dropdown element
  const dropdownClasses = getDropdownBaseClasses(
    type,
    subType,
    size,
    currentState,
    selectionType,
    disabled,
    className
  );
  
  // Dropdown widths based on size
  const widthClasses = width 
    ? typeof width === 'number' ? `w-[${width}px]` : `w-${width}`
    : "w-fit"; // Make all dropdowns fit content by default
  
  // Effect to update menu width and position based on available space
  useEffect(() => {
    if (isOpen && dropdownRef.current && menuContainerRef.current) {
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
        (menuItems.length * 40) + 16 + (type === DropdownType.MULTI_SELECT ? 56 : 0), 
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
    }
  }, [isOpen, type, menuItems.length]);
  
  return (
    <div className="relative">
      {/* Label, SubLabel, Mandatory indicator and Help icon - only render if subType is HAS_CONTAINER */}
      {subType === DropdownSubType.HAS_CONTAINER && hasLabel && label && (
        <div className="mb-2">
          <div className="flex items-center gap-1.5">
            <label htmlFor={id} className={getLabelClassNames(size)}>
              {label}
            </label>
            {hasSubLabel && subLabel && (
              <span className={getSubLabelClassNames(size)}>{subLabel}</span>
            )}
            {mandatory && <span className="text-red-600">*</span>}
            {hasHelp && (
              <span className="text-gray-400">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13.6668C3.31833 13.6668 0.333336 10.6818 0.333336 7.00016C0.333336 3.3185 3.31833 0.333496 7 0.333496C10.6817 0.333496 13.6667 3.3185 13.6667 7.00016C13.6667 10.6818 10.6817 13.6668 7 13.6668ZM7 12.3335C8.41448 12.3335 9.77108 11.7716 10.7713 10.7714C11.7714 9.77126 12.3333 8.41466 12.3333 7.00016C12.3333 5.58567 11.7714 4.22907 10.7713 3.22888C9.77108 2.22869 8.41448 1.66683 7 1.66683C5.58551 1.66683 4.22893 2.22869 3.22873 3.22888C2.22853 4.22907 1.66667 5.58567 1.66667 7.00016C1.66667 8.41466 2.22853 9.77126 3.22873 10.7714C4.22893 11.7716 5.58551 12.3335 7 12.3335ZM6.35 4.3335H7.65V5.66683H6.35V4.3335ZM6.35 7.00016H7.65V9.66683H6.35V7.00016Z" fill="currentColor"/>
                </svg>
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="relative flex items-center">
        {/* Dropdown trigger */}
        <div
          ref={(node) => {
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
            "focus:outline-none",
            hasSelection && showClearButton && type !== DropdownType.ICON_ONLY && 
              (subType === DropdownSubType.NO_CONTAINER 
                ? "rounded-r-none" 
                : "rounded-r-none border-r-0")
          )}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          aria-controls={isOpen ? `${id}-menu` : undefined}
          aria-label={ariaLabel || "Dropdown menu"}
        >
          {/* Left icon */}
          {hasLeftIcon && leftIcon && (
            <span className={cn(getLeftIconClassNames(size), "text-gray-400 flex items-center justify-center")}>
              {leftIcon}
            </span>
          )}
          
          {/* Display text - only shown for non-icon-only dropdowns */}
          {type !== DropdownType.ICON_ONLY && (
            <span className="flex-grow font-normal text-gray-700">
              {getDisplayText()}
            </span>
          )}
          
          {/* Dropdown icon */}
          <span className={cn(
            "text-gray-400 flex items-center justify-center",
            type !== DropdownType.ICON_ONLY && getChevronIconClassNames(size)
          )}>
            {isOpen ? 
              <ChevronUp className={
                size === DropdownSize.SMALL ? "w-3.5 h-3.5" : "w-4 h-4"
              } /> : 
              <ChevronDown className={
                size === DropdownSize.SMALL ? "w-3.5 h-3.5" : "w-4 h-4"
              } />
            }
          </span>
        </div>

        {/* Clear button - placed outside the dropdown */}
        {hasSelection && showClearButton && type !== DropdownType.ICON_ONLY && (
          <Button
            buttonType={ButtonType.SECONDARY}
            size={size === DropdownSize.SMALL ? ButtonSize.SMALL : 
                 size === DropdownSize.LARGE ? ButtonSize.LARGE : ButtonSize.MEDIUM}
            subType={ButtonSubType.ICON_ONLY}
            className={cn(
              "rounded-l-none", 
              subType === DropdownSubType.HAS_CONTAINER ? "border-[1px]" : "border-[1px] border-gray-200"
            )}
            onClick={handleClear}
            ariaLabel="Clear selection"
          >
            <X size={16} className="text-gray-600" />
          </Button>
        )}
        
        {/* Menu Container - positioned relative to dropdown trigger */}
        {isOpen && (
          <div 
            ref={menuContainerRef}
            id={id ? `${id}-menu` : 'dropdown-menu'}
            className="absolute z-50"
            style={{ width: 'auto' }}
          >
            <Menu
              items={menuItems}
              onItemClick={handleSelect}
              className={cn(
                "rounded-[10px] border border-gray-200 overflow-hidden whitespace-nowrap",
                themeConfig.euler.menuv2.shadows.xs
              )}
              type={type === DropdownType.MULTI_SELECT ? MenuType.MULTI_SELECT : MenuType.DEFAULT}
              hasSearch={type === DropdownType.MULTI_SELECT}
              selectedItems={
                Array.isArray(selectedOption) 
                  ? selectedOption 
                  : (selectedOption ? [selectedOption] : [])
              }
              onSelectionChange={(selected: string[]) => {
                if (onSelect) {
                  const selectedItems = menuItems.filter(item => selected.includes(item.id || ''));
                  onSelect(selectedItems);
                }
                
                // Update internal state for uncontrolled components
                if (!isSelectionControlled && type === DropdownType.MULTI_SELECT) {
                  setUncontrolledSelectedOption(selected);
                }
              }}
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
});

MenuDropdown.displayName = "MenuDropdown";

export default MenuDropdown; 