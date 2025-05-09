import { forwardRef, useState, useEffect, useRef, useLayoutEffect } from "react"
import Avatar from "../Avatar/Avatar"
import { AvatarSize } from "../Avatar/types"
import { cn } from "../../utils"
import Menu from "../Menuv2/Menu"
import { MenuItemProps } from "../Menuv2/types"
import { AvatarGroupProps } from "./types"
import {
  getAvatarGroupContainerClassNames,
  getAvatarWrapperClassNames,
  getSelectedAvatarClassNames,
  getOverflowCounterClassNames,
} from './utils';

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      maxCount = 5,
      size = AvatarSize.REGULAR,
      className,
      selectedAvatarIds,
      onSelectionChange,
      ...props
    },
    ref
  ) => {
    // Ensure maxCount is at least 1
    const safeMaxCount = Math.max(1, maxCount);

  // State for menu open/closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // State for internal selection (array), synced with prop
  const [internalSelectedIds, setInternalSelectedIds] = useState<(string | number)[]>(selectedAvatarIds || [])
  // State for search term in the menu
  const [searchTerm, setSearchTerm] = useState("")
  // Reference to the overflow counter element for menu positioning
  const overflowCounterRef = useRef<HTMLButtonElement>(null)
  // Reference to menu container for positioning
  const menuRef = useRef<HTMLDivElement>(null)
  // Container ref
  const containerRef = useRef<HTMLDivElement>(null)

  // Use layout effect to position menu before paint
  useLayoutEffect(() => {
    positionMenu();
  }, [isMenuOpen]);

  // Position the menu when it opens
  useEffect(() => {
    if (!isMenuOpen) return;
    
    // Add scroll and resize listeners
    window.addEventListener('scroll', positionMenu);
    window.addEventListener('resize', positionMenu);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', positionMenu);
      window.removeEventListener('resize', positionMenu);
    };
  }, [isMenuOpen]);

  // Position menu function for reuse
  const positionMenu = () => {
    if (!isMenuOpen || !overflowCounterRef.current || !menuRef.current) return;
    
    const counterRect = overflowCounterRef.current.getBoundingClientRect();
    const menuElement = menuRef.current;
    
    menuElement.style.position = 'fixed';
    menuElement.style.top = `${counterRect.bottom + 4}px`;
    menuElement.style.left = `${counterRect.left + counterRect.width/2 - 160}px`;
    menuElement.style.zIndex = '50';
    
    // Make sure menu doesn't go off the right edge of the screen
    const rightEdge = parseFloat(menuElement.style.left) + menuElement.offsetWidth;
    const windowRight = window.innerWidth;
    if (rightEdge > windowRight - 4) {
      menuElement.style.left = `${windowRight - menuElement.offsetWidth - 4}px`;
    }
    
    // Make sure menu doesn't go off the left edge
    if (parseFloat(menuElement.style.left) < 4) {
      menuElement.style.left = '4px';
    }
  };

  // Handle click outside and Escape key to close the menu
  useEffect(() => {
    // Only add event listeners when the menu is open
    if (!isMenuOpen) return;
    
    // Handler for clicks outside the menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overflowCounterRef.current && 
        menuRef.current && 
        !overflowCounterRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    
    // Handler for Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listeners when the component unmounts or the menu closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Sync internal state if prop changes
  useEffect(() => {
    setInternalSelectedIds(selectedAvatarIds || [])
  }, [selectedAvatarIds]);

    // Determine visible avatars and overflow count
    const visibleAvatars = avatars.slice(0, safeMaxCount);
    const overflowCount = Math.max(0, avatars.length - safeMaxCount);

    // Get theme classes
    const containerClasses = getAvatarGroupContainerClassNames(className);
    const selectedClasses = getSelectedAvatarClassNames();

    // Handle avatar selection (toggle) from menu or direct click
    const handleSelect = (id: string | number) => {
      const newSelectedIds = internalSelectedIds.includes(id)
        ? internalSelectedIds.filter(selectedId => selectedId !== id) // Remove id
        : [...internalSelectedIds, id]; // Add id

    setInternalSelectedIds(newSelectedIds)
    onSelectionChange?.(newSelectedIds) // Call updated callback
  }

  // Toggle menu safely without affecting scroll
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Generate menu items from the full avatars list
  const generateMenuItems = (): MenuItemProps[] => {
    return avatars.map(
      (avatar): MenuItemProps => ({
        id: avatar.id.toString(),
        text: avatar.alt || avatar.fallback || `Avatar ${avatar.id}`,
        hasSlotL: true,
        slotL: (
          <Avatar
            size={AvatarSize.SM} // Use small avatar in menu
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            className={cn(
              // Apply selected classes if this avatar is selected in the menu
              internalSelectedIds.includes(avatar.id) && selectedClasses
            )}
          />
        ),
        // Use onClick instead of onSelect
        onClick: () => handleSelect(avatar.id),
      })
    )
  }

  // Handle search change in menu
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  }

  return (
    <div
      ref={(node) => {
        // Merge refs
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        containerRef.current = node;
      }}
      className={containerClasses}
      role="group"
      aria-label={`Group of ${avatars.length} avatars, ${internalSelectedIds.length} selected`}
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <div // Wrapper for click handling and alignment
          key={avatar.id}
          role="button"
          tabIndex={0}
          aria-pressed={internalSelectedIds.includes(avatar.id)}
          aria-label={`Select avatar ${avatar.alt || avatar.fallback || avatar.id}`}
          onClick={() => handleSelect(avatar.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelect(avatar.id);
            }
          }}
          className={getAvatarWrapperClassNames(index, visibleAvatars.length)}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            className={cn(
              internalSelectedIds.includes(avatar.id) && selectedClasses
            )}
          />
        </div>
      ))}

      {overflowCount > 0 && (
        <button
          ref={overflowCounterRef}
          type="button"
          className={getOverflowCounterClassNames(size, isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          aria-controls={isMenuOpen ? "avatar-group-overflow-menu" : undefined}
          aria-label={`+${overflowCount} more avatars, click to view and select`}
          style={{ 
            zIndex: 0,
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={toggleMenu}
          onMouseDown={(e) => e.preventDefault()}
        >
          +{overflowCount}
        </button>
      )}

      {/* Menu displayed when overflow counter is clicked */}
      {overflowCount > 0 && isMenuOpen && (
        <div 
          ref={menuRef}
          id="avatar-group-overflow-menu"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50
          }}
        >
          <Menu
            items={generateMenuItems()}
            hasSearch={true}
            searchPlaceholder="Search avatars..."
            isOpen={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchChange}
            onItemClick={(item) => {
              if (item.id) {
                handleSelect(item.id);
              }
            }}
          />
        </div>
      )}

        {/* Hidden text for screen readers to announce the overflow */}
        {overflowCount > 0 &&
          !isMenuOpen && ( // Hide if menu is open as trigger handles label
            <span className="sr-only">
              And {overflowCount} more {overflowCount === 1 ? 'avatar' : 'avatars'}
            </span>
          )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
