import React, { useState, useEffect } from "react"
import { Avatar, AvatarProps } from "./Avatar"
import { cn } from "../../utils"
import Menu from "../Menu/Menu"
import type { MenuItemWithSeparatorProps, MenuStandardProps } from "../Menu/types"

export interface AvatarData extends Omit<AvatarProps, "className" | "id"> {
  id: string | number
  alt?: string
  fallback?: string
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarData[]
  maxCount?: number
  size?: AvatarProps["size"]
  className?: string
  selectedAvatarIds?: (string | number)[]
  onSelectionChange?: (selectedIds: (string | number)[]) => void
}

export function AvatarGroup({
  avatars,
  maxCount = 5,
  size = "regular",
  className,
  selectedAvatarIds,
  onSelectionChange,
  ...props
}: AvatarGroupProps) {
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

  // Define outline classes for selected state (adjust as needed)
  const selectedClasses = "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400" // Example selection highlight

  // Size mappings for the overflow counter
  const overflowSizeClasses = {
    sm: "h-6 w-6 text-body-xs",
    regular: "h-8 w-8 text-body-sm",
    md: "h-10 w-10 text-body-md",
    lg: "h-12 w-12 text-body-lg",
    xl: "h-16 w-16 text-sm", // Adjusted text size for xl
  }

  // Handle avatar selection (toggle) from menu or direct click
  const handleSelect = (id: string | number) => {
    const newSelectedIds = internalSelectedIds.includes(id)
      ? internalSelectedIds.filter((selectedId) => selectedId !== id) // Remove id
      : [...internalSelectedIds, id] // Add id

    setInternalSelectedIds(newSelectedIds)
    onSelectionChange?.(newSelectedIds) // Call updated callback
    // Don't close menu automatically on multi-select toggle
    // setIsMenuOpen(false)
  }

  // Generate menu items from the full avatars list
  const generateMenuItems = (): MenuItemWithSeparatorProps[] => {
    return avatars.map(
      (avatar): MenuStandardProps => ({
        // Use MenuStandardProps type
        content: avatar.alt || avatar.fallback || `Avatar ${avatar.id}`,
        leftSlot: {
          content: (
            <Avatar
              size="sm" // Use small avatar in menu
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
        // We prevent closing via contentProps->onCloseAutoFocus below
      })
    )
  }

  return (
    <div
      className={cn("flex flex-row items-center -space-x-2", className)}
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
          // Add inline-flex and item centering to the wrapper
          className={cn(
            "relative cursor-pointer inline-flex items-center justify-center",
          )}
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
          // Optional: Adjust align/side if needed
          // align={MenuAlignment.START}
          // side={MenuSide.BOTTOM}
        >
          {/* Trigger for the menu */}
          <div
            className={cn(
              // Base styles: dark background, light text, centered, rounded, cursor
              "relative inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent",
              "bg-gray-900 text-gray-50 font-medium", // Dark background, light text
              "transition-colors", // Keep color transition
              // Size classes
              overflowSizeClasses[size],
              // Highlight when menu is open using the same style as selected avatars
              isMenuOpen && selectedClasses // Use selectedClasses for consistency
            )}
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
}
