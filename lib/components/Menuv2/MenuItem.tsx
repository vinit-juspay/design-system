import React, { forwardRef, useState, useEffect, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils";
import { 
  MenuItemProps, 
  MenuItemType, 
  MenuItemState, 
  MenuItemAction,
  MenuType
} from "./types";
import { 
  getMenuItemClassNames, 
  getSlotLClassNames, 
  getSlotR1ClassNames, 
  getSlotR2ClassNames,
  getShortcutClassNames,
  getMenuClassNames
} from "./utils";
import { LucideIcon, ChevronRight } from "lucide-react";
import Checkbox from "../Checkbox";
import { CheckboxSize } from "../Checkbox/types";

type IconElementProps = { className?: string };

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(({
  id,
  text,
  className,
  disabled = false,
  type = MenuItemType.DEFAULT,
  state = MenuItemState.DEFAULT,
  action = MenuItemAction.NA,
  hasSlotL = false,
  hasSlotR1 = false,
  hasSlotR2 = false,
  hasShortcut = false,
  slotL,
  slotR1,
  slotR2,
  shortcutValue,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isMultiSelect = false,
  isSelected = false,
  hasSubmenu = false,
  submenuItems = [],
  ...props
}, ref) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const menuItemRef = useRef<HTMLDivElement>(null);
  
  // Style for scaleIn animation
  useEffect(() => {
    // Add keyframes to document once
    const styleId = 'menu-keyframes-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // No cleanup needed, we keep the style in the document
    };
  }, []);
  
  // Function to calculate submenu position (Radix-like)
  const calculateSubmenuPosition = () => {
    if (menuItemRef.current && hasSubmenu) {
      const rect = menuItemRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Radix style positioning
      // Default is to show the submenu at the right side with a slight offset
      let left = rect.right;
      let top = rect.top;
      
      // For horizontal position, add sideOffset (consistent with Radix)
      const sideOffset = 8;
      left += sideOffset;
      
      // For vertical position, adjust with alignOffset (consistent with Radix)
      const alignOffset = -4;
      top += alignOffset;
      
      // Check if submenu would go off right edge of window
      const submenuWidth = 220; // Typical submenu width
      if (left + submenuWidth > windowWidth) {
        // Position to the left of the parent with offset
        left = rect.left - submenuWidth - sideOffset;
      }
      
      // Check for bottom overflow
      const submenuHeight = Math.min(submenuItems.length * 36, 300);
      if (top + submenuHeight > windowHeight) {
        // Adjust top to prevent going off bottom
        top = Math.max(5, windowHeight - submenuHeight - 5);
      }
      
      setSubmenuPosition({ top, left });
    }
  };
  
  // If type is separator, render a simple divider
  if (type === MenuItemType.SEPARATOR) {
    return <div className="h-px my-1 bg-gray-200" role="separator" />;
  }

  // Labels should not have hover effects
  const isLabel = type === MenuItemType.LABEL;

  // Handle hover states
  const handleMouseEnter = () => {
    if (!disabled && state !== MenuItemState.NA && !isLabel) {
      setIsHovering(true);
      // Show submenu if it exists
      if (hasSubmenu) {
        calculateSubmenuPosition();
        setShowSubmenu(true);
      }
      onMouseEnter?.();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!disabled && state !== MenuItemState.NA && !isLabel) {
      // Check if the mouse is moving to a submenu
      // This helps prevent flickering when moving from parent to submenu
      if (hasSubmenu && showSubmenu) {
        // Get the coordinates of the mouse
        const { clientX, clientY } = e;
        
        // Get submenu dimensions (approximate)
        const submenuWidth = 220;
        const submenuRight = submenuPosition.left + submenuWidth;
        const direction = submenuPosition.left > window.innerWidth / 2 ? 'left' : 'right';
        
        // If mouse is moving toward submenu, don't hide it immediately
        if ((direction === 'right' && clientX > menuItemRef.current?.getBoundingClientRect().right!) ||
            (direction === 'left' && clientX < menuItemRef.current?.getBoundingClientRect().left!)) {
          // Let the submenu handle its own events
          return;
        }
      }
      
      setIsHovering(false);
      // Hide submenu with a small delay to allow moving to submenu
      if (hasSubmenu) {
        setTimeout(() => {
          setShowSubmenu(false);
        }, 100);
      }
      onMouseLeave?.();
    }
  };

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && state !== MenuItemState.NA && !isLabel) {
      // Don't trigger onClick if the item has a submenu
      if (!hasSubmenu) {
        onClick?.();
      } else {
        // Prevent the menu from closing when clicking on a submenu item
        e.stopPropagation();
      }
    }
  };

  // Calculate current state (hover takes precedence)
  const currentState = isHovering ? MenuItemState.HOVER : state;

  // Get class names
  const itemClassName = getMenuItemClassNames({
    type: hasSubmenu ? MenuItemType.SUBMENU : type,
    // Labels always use default state, regardless of hover
    state: isLabel ? MenuItemState.DEFAULT : currentState,
    action,
    disabled,
  });

  // ARIA attributes based on type
  const ariaProps: Record<string, string> = {};
  
  if (isLabel) {
    ariaProps["role"] = "presentation";
  } else {
    ariaProps["role"] = "menuitem";
    if (disabled) {
      ariaProps["aria-disabled"] = "true";
    }
    if (isMultiSelect) {
      ariaProps["aria-checked"] = isSelected ? "true" : "false";
    }
    if (hasSubmenu) {
      ariaProps["aria-haspopup"] = "true";
      ariaProps["aria-expanded"] = showSubmenu ? "true" : "false";
    }
  }

  // Custom hover class based on action type
  let hoverClass = "";
  if (!disabled && state !== MenuItemState.NA && !isLabel) {
    if (action === MenuItemAction.PRIMARY) {
      hoverClass = "hover:bg-blue-50";
    } else if (action === MenuItemAction.DANGER) {
      hoverClass = "hover:bg-red-50";
    } else {
      hoverClass = "hover:bg-[#F3F4F6]";
    }
  }

  // Helper function to render icons consistently
  const renderIcon = (icon: React.ReactNode) => {
    // If it's a valid React element with className prop
    if (React.isValidElement(icon)) {
      const elementWithClassName = icon as ReactElement<IconElementProps>;
      return React.cloneElement(elementWithClassName, { 
        className: cn("w-4 h-4", elementWithClassName.props.className) 
      });
    }
    
    // If it's a Lucide icon component
    if (typeof icon === 'function') {
      const Icon = icon as React.ComponentType<IconElementProps>;
      return <Icon className="w-4 h-4" />;
    }
    
    return icon;
  };

  return (
    <div
      ref={(node) => {
        // Handle both the forwarded ref and our local ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        menuItemRef.current = node;
      }}
      id={id}
      className={cn(itemClassName, hoverClass, "rounded-md", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      tabIndex={isLabel || disabled ? -1 : 0}
      {...ariaProps}
      {...props}
    >
      {/* Left slot */}
      {hasSlotL && slotL && (
        <div className={getSlotLClassNames()}>
          {renderIcon(slotL)}
        </div>
      )}
      
      {/* Text content */}
      <span className="flex-grow truncate" style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}>{text}</span>
      
      {/* Shortcut */}
      {hasShortcut && shortcutValue && (
        <div className={getShortcutClassNames()}>
          {shortcutValue}
        </div>
      )}
      
      {/* Right slot 1 - Checkbox takes precedence in multi-select mode */}
      {isMultiSelect ? (
        <div className={cn(getSlotR1ClassNames())}>
          <Checkbox 
            checked={isSelected}
            disabled={disabled}
            className="pointer-events-none !m-0 !p-0"
            size={CheckboxSize.SMALL}
          />
        </div>
      ) : (
        hasSlotR1 && slotR1 && (
          <div className={getSlotR1ClassNames()}>
            {renderIcon(slotR1)}
          </div>
        )
      )}
      
      {/* Right slot 2 */}
      {hasSlotR2 && slotR2 && (
        <div className={getSlotR2ClassNames()}>
          {renderIcon(slotR2)}
        </div>
      )}

      {/* Show chevron if item has submenu */}
      {hasSubmenu && (
        <div className={getSlotR2ClassNames()}>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
      
      {/* Render submenu if item has one and is being hovered */}
      {hasSubmenu && showSubmenu && submenuItems.length > 0 && createPortal(
        <div 
          className={cn(getMenuClassNames(MenuType.DEFAULT))} 
          style={{ 
            position: 'fixed', /* Radix uses fixed positioning from Portal root */
            top: submenuPosition.top, 
            left: submenuPosition.left,
            zIndex: 1100,
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
            margin: 0,
            padding: '4px 0', /* Same padding as Radix */
            minWidth: '8rem',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            transformOrigin: 'top left',
            animationName: 'scaleIn',
            animationDuration: '150ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity'
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={(e) => {
            // Prevent parent's leave handler from hiding this submenu
            e.stopPropagation();
          }}
        >
          {submenuItems.map((item, index) => (
            <MenuItem
              key={`${item.id || index}-submenu`}
              {...item}
            />
          ))}
        </div>,
        document.body
      )}
    </div>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem; 