import { forwardRef, useState, useEffect } from "react"
import Avatar from "../Avatar/Avatar"
import { AvatarSize } from "../Avatar/types"
import { cn } from "../../utils"
import Menu from "../Menu/Menu"
import type { MenuStandardProps } from "../Menu/types"
import { AvatarGroupProps } from "./types"
import {
  getAvatarGroupContainerClassNames,
  getAvatarWrapperClassNames,
  getSelectedAvatarClassNames,
  getOverflowCounterClassNames
} from "./utils"

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
  avatars,
  maxCount = 5,
  size = AvatarSize.REGULAR,
  className,
  selectedAvatarIds,
  onSelectionChange,
  ...props
}, ref) => {
  // Ensure maxCount is at least 1
  const safeMaxCount = Math.max(1, maxCount)

  // State for menu open/closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // State for internal selection (array), synced with prop
  const [internalSelectedIds, setInternalSelectedIds] = useState<(string | number)[]>(selectedAvatarIds || [])

  // Sync internal state if prop changes
  useEffect(() => {
    setInternalSelectedIds(selectedAvatarIds || [])
  }, [selectedAvatarIds])

  // Determine visible avatars and overflow count
  const visibleAvatars = avatars.slice(0, safeMaxCount)
  const overflowCount = Math.max(0, avatars.length - safeMaxCount)

  // Get theme classes
  const containerClasses = getAvatarGroupContainerClassNames(className)
  const selectedClasses = getSelectedAvatarClassNames()

  // Handle avatar selection (toggle) from menu or direct click
  const handleSelect = (id: string | number) => {
    const newSelectedIds = internalSelectedIds.includes(id)
      ? internalSelectedIds.filter((selectedId) => selectedId !== id) // Remove id
      : [...internalSelectedIds, id] // Add id

    setInternalSelectedIds(newSelectedIds)
    onSelectionChange?.(newSelectedIds) // Call updated callback
    // Don't close menu automatically on multi-select toggle
  }

  // Generate menu items from the full avatars list
  const generateMenuItems = (): MenuStandardProps[] => {
    return avatars.map(
      (avatar): MenuStandardProps => ({
        content: avatar.alt || avatar.fallback || `Avatar ${avatar.id}`,
        leftSlot: {
          content: (
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
        },
        // Adapt onSelect to fit type and handle event internally
        onSelect: () => handleSelect(avatar.id),
      })
    )
  }

  return (
    <div
      ref={ref}
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
        <Menu
          items={generateMenuItems()}
          search={{ enabled: true, placeholder: "Search avatars..." }}
          rootProps={{ open: isMenuOpen, onOpenChange: setIsMenuOpen }}
          contentProps={{
            // Prevent menu from closing automatically when an item is clicked
            onCloseAutoFocus: (event) => event.preventDefault(),
          }}
        >
          {/* Trigger for the menu */}
          <div
            className={getOverflowCounterClassNames(size, isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-label={`+${overflowCount} more avatars, click to view and select`} // Update label
            style={{ zIndex: 0 }}
            role="button" // Make it clear it's interactive
            tabIndex={0} // Make it focusable
            // Prevent default button behavior if needed, handle click via Menu trigger
            onClick={(e) => e.preventDefault()} // Let Menu handle the open toggle
            onKeyDown={(e) => {
              // Allow opening with Enter/Space
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }
            }}
          >
            +{overflowCount}
          </div>
        </Menu>
      )}

      {/* Hidden text for screen readers to announce the overflow */}
      {overflowCount > 0 && !isMenuOpen && ( // Hide if menu is open as trigger handles label
        <span className="sr-only">
          And {overflowCount} more {overflowCount === 1 ? "avatar" : "avatars"}
        </span>
      )}
    </div>
  )
})

AvatarGroup.displayName = "AvatarGroup"

export default AvatarGroup
