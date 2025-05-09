import React, { forwardRef, useState, useEffect, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils";
import { themeConfig } from "../../themeConfig";
import { 
  MenuItemProps, 
  MenuItemType, 
  MenuItemState, 
  MenuItemAction
} from "./types";
import { 
  getMenuItemClassNames, 
  getSlotLClassNames, 
  getSlotR1ClassNames, 
  getSlotR2ClassNames,
  getShortcutClassNames,
  getSubmenuClassNames
} from "./utils";
import { ChevronRight } from "lucide-react";
import Checkbox from "../Checkbox/Checkbox";
import { CheckboxSize } from "../Checkbox/types";

type IconElementProps = { className?: string };

// Create a global submenu manager to track active submenus
// This helps ensure proper nesting of submenus
export const submenuManager = {
  activeSubmenuIds: new Set<string>(),
  setActiveSubmenu(id: string | null, parentId: string | null = null) {
    if (id === null) {
      // Clear all submenus
      this.activeSubmenuIds.clear();
    } else {
      // Add this submenu to active set
      this.activeSubmenuIds.add(id);
      
      // If this is a child submenu, keep the parent active too
      if (parentId) {
        this.activeSubmenuIds.add(parentId);
      }
    }
    
    // Trigger a custom event to notify other menu items
    window.dispatchEvent(new CustomEvent('submenu-changed', { 
      detail: { 
        id,
        parentId,
        activeIds: Array.from(this.activeSubmenuIds)
      } 
    }));
  },
  isSubmenuActive(id: string): boolean {
    return this.activeSubmenuIds.has(id);
  },
  removeSubmenu(id: string) {
    this.activeSubmenuIds.delete(id);
    window.dispatchEvent(new CustomEvent('submenu-changed', { 
      detail: { 
        id: null,
        removedId: id,
        activeIds: Array.from(this.activeSubmenuIds)
      } 
    }));
  }
};

// Helper to safely clear timeout
const clearTimeoutRef = (ref: React.MutableRefObject<number | null>) => {
  if (ref.current) {
    window.clearTimeout(ref.current);
    ref.current = null;
  }
};

// Helper function to render icons consistently
const renderIcon = (icon: React.ReactNode): React.ReactNode => {
  // If it's a valid React element with className prop
  if (React.isValidElement(icon)) {
    const elementWithClassName = icon as ReactElement<IconElementProps>;
    return React.cloneElement(elementWithClassName, { 
      className: cn(themeConfig.euler.menuv2.iconSize, elementWithClassName.props.className) 
    });
  }
  
  // If it's a Lucide icon component
  if (typeof icon === 'function') {
    const Icon = icon as React.ComponentType<IconElementProps>;
    return <Icon className={themeConfig.euler.menuv2.iconSize} />;
  }
  
  return icon;
};

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
  parentId,
  ...props
}, ref) => {
  // Labels should not have hover effects
  const isLabel = type === MenuItemType.LABEL;
  // Define a flag for interactive items to avoid repeating the condition
  const isInteractive = !disabled && state !== MenuItemState.NA && !isLabel;
  
  const [isHovering, setIsHovering] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const menuItemRef = useRef<HTMLDivElement>(null);
  const submenuTimerRef = useRef<number | null>(null);
  
  // Create a unique ID for this menu item if not provided
  const uniqueId = useRef<string>(id || `menu-item-${Math.random().toString(36).substring(2, 9)}`);
  
  // Listen for submenu-changed events to close this submenu when another opens
  useEffect(() => {
    const handleSubmenuChanged = (_: Event) => {
      // If this menu isn't in the active path, close it
      if (hasSubmenu && showSubmenu) {
        // Keep this submenu open if it's in the active path or it's the parent of the active submenu
        if (!submenuManager.isSubmenuActive(uniqueId.current)) {
          setShowSubmenu(false);
        }
      }
    };
    
    window.addEventListener('submenu-changed', handleSubmenuChanged);
    return () => {
      window.removeEventListener('submenu-changed', handleSubmenuChanged);
      
      // Clear any timers when this effect is cleaned up
      clearTimeoutRef(submenuTimerRef);
    };
  }, [showSubmenu, hasSubmenu]);

  // Add effect to clean up when unmounting
  useEffect(() => {
    return () => {
      // If this component unmounts and it was the active submenu, clear the global state
      if (hasSubmenu && submenuManager.isSubmenuActive(uniqueId.current)) {
        submenuManager.removeSubmenu(uniqueId.current);
      }
      
      // Clear any pending timers
      clearTimeoutRef(submenuTimerRef);
    };
  }, [hasSubmenu]);

  // Handle hover states with delay for better UX
  const handleMouseEnter = (_: React.MouseEvent) => {
    // Clear any pending close timers immediately
    clearTimeoutRef(submenuTimerRef);
    
    if (isInteractive) {
      setIsHovering(true);
      if (hasSubmenu) {
        // Tell the submenu manager that this submenu is now active
        // Pass the parent ID if available
        submenuManager.setActiveSubmenu(uniqueId.current, parentId);
        // Show submenu immediately on hover
        setShowSubmenu(true);
      } else if (submenuManager.isSubmenuActive(uniqueId.current)) {
        // If hovering a regular menu item, close any open submenus
        submenuManager.removeSubmenu(uniqueId.current);
      }
      onMouseEnter?.();
    }
  };

  const handleMouseLeave = (_: React.MouseEvent) => {
    if (isInteractive) {
      setIsHovering(false);
      
      // Only handle submenu closing with a delay for menu items that have a submenu
      if (hasSubmenu && showSubmenu) {
        // Use a short delay to allow movement to the submenu
        // Radix uses a similar approach
        submenuTimerRef.current = window.setTimeout(() => {
          setShowSubmenu(false);
          submenuManager.removeSubmenu(uniqueId.current);
        }, 100);
      }
      
      onMouseLeave?.();
    }
  };

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    if (isInteractive) {
      if (hasSubmenu) {
        // Toggle submenu on click
        const newState = !showSubmenu;
        setShowSubmenu(newState);
        
        // Update the global submenu state
        if (newState) {
          submenuManager.setActiveSubmenu(uniqueId.current, parentId);
        } else {
          submenuManager.removeSubmenu(uniqueId.current);
        }
        
        // Prevent menu from closing when clicking on parent of submenu
        e.stopPropagation();
      } else {
        // If this is a regular menu item, close any open submenus
        submenuManager.removeSubmenu(uniqueId.current);
        onClick?.();
      }
    }
  };

  // Calculate current state (hover takes precedence)
  const currentState = isHovering ? MenuItemState.HOVER : state;

  // Get class names
  const itemClassName = getMenuItemClassNames({
    type,
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
  if (isInteractive) {
    if (action === MenuItemAction.PRIMARY) {
      hoverClass = themeConfig.euler.menuv2.menuItem.hover.PRIMARY;
    } else if (action === MenuItemAction.DANGER) {
      hoverClass = themeConfig.euler.menuv2.menuItem.hover.DANGER;
    } else {
      hoverClass = themeConfig.euler.menuv2.menuItem.hover.DEFAULT;
    }
  }

  // Render submenu content - using portal for proper positioning
  const renderSubmenu = () => {
    // Early return if conditions aren't met
    if (!hasSubmenu || !showSubmenu || submenuItems.length === 0 || !menuItemRef.current) {
      return null;
    }

    // Get the position of the parent menu item
    const rect = menuItemRef.current.getBoundingClientRect();
    
    // Account for scroll position
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    // Determine if we need to flip direction (when near window edge)
    const rightSpace = window.innerWidth - rect.right;
    const shouldFlipHorizontal = rightSpace < 200; // Flip if less than 200px available
    
    // Calculate positions
    const top = rect.top + scrollY;
    const left = shouldFlipHorizontal 
      ? rect.left + scrollX - 12  // Flip to left side with overlap
      : rect.right + scrollX - 12; // Right side with overlap
    
    // Create submenu portal content with proper collision area
    const submenuPortalContent = (
      <div 
        className={cn(themeConfig.euler.menuv2.menuItem.submenu.portal.base)}
        style={{
          top: top, 
          left: left,
        }}
        onMouseEnter={() => {
          // Clear any close timers when mouse enters the submenu
          clearTimeoutRef(submenuTimerRef);
        }}
      >
        {/* Safe area to prevent unwanted closing */}
        <div className={themeConfig.euler.menuv2.menuItem.submenu.portal.container}>
          {/* Collision zone that extends toward the parent menu item */}
          <div 
            className={cn(
              themeConfig.euler.menuv2.menuItem.submenu.portal.collisionZone.base, 
              shouldFlipHorizontal 
                ? themeConfig.euler.menuv2.menuItem.submenu.portal.collisionZone.right 
                : themeConfig.euler.menuv2.menuItem.submenu.portal.collisionZone.left
            )}
          />
          
          <div className={cn(getSubmenuClassNames())} onClick={e => e.stopPropagation()}>
            {/* Use animation from theme config */}
            <style>{themeConfig.euler.menuv2.animation}</style>
            
            {submenuItems.map((item: MenuItemProps, index: number) => (
              <MenuItem
                key={`${item.id || index}-submenu`}
                {...item}
                // Pass our ID as the parent ID to create proper nesting
                parentId={uniqueId.current}
              />
            ))}
          </div>
        </div>
      </div>
    );
    
    // Use createPortal to render at body level to avoid z-index issues
    return createPortal(submenuPortalContent, document.body);
  };

  // If type is separator, render a simple divider
  if (type === MenuItemType.SEPARATOR) {
    return <div className={themeConfig.euler.menuv2.separator} role="separator" />;
  }

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
      className={cn(itemClassName, hoverClass, themeConfig.euler.menuv2.menuItem.rounded, className)}
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
      <span className={themeConfig.euler.menuv2.textContent}>{text}</span>
      
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
            className={themeConfig.euler.menuv2.menuItem.checkbox.wrapper}
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
          <ChevronRight className={cn(themeConfig.euler.menuv2.iconSize, themeConfig.euler.menuv2.chevronColor)} />
        </div>
      )}
      
      {/* Render submenu using portal */}
      {renderSubmenu()}
    </div>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem; 