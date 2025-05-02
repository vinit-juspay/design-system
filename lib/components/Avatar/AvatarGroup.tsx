import type React from "react"
import { Avatar, AvatarProps } from "./Avatar"
import { cn } from "../../utils"

export interface AvatarData extends Omit<AvatarProps, "className" | "id"> {
  id: string | number
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarData[]
  maxCount?: number
  size?: AvatarProps["size"]
  className?: string
}

export function AvatarGroup({
  avatars,
  maxCount = 5,
  size = "md",
  className,
  ...props
}: AvatarGroupProps) {
  // Ensure maxCount is at least 1
  const safeMaxCount = Math.max(1, maxCount)

  // Determine visible avatars and overflow count
  const visibleAvatars = avatars.slice(0, safeMaxCount)
  const overflowCount = Math.max(0, avatars.length - safeMaxCount)

  // Size mappings for the overflow counter
  const overflowSizeClasses = {
    sm: "h-8 w-8 text-body-sm",
    regular: "h-10 w-10 text-body-md",
    md: "h-10 w-10 text-body-md",
    lg: "h-12 w-12 text-body-lg",
    xl: "h-16 w-16 text-body-lg",
  }

  return (
    <div
      className={cn("flex flex-row items-center -space-x-2", className)}
      role="group"
      aria-label={`Group of ${avatars.length} avatars`}
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={avatar.id}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          style={{ zIndex: visibleAvatars.length - index }}
        />
      ))}

      {overflowCount > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full bg-gray-900 text-gray-0 font-500",
            overflowSizeClasses[size],
          )}
          aria-hidden="true"
          style={{ zIndex: 0 }}
        >
          +{overflowCount}
        </div>
      )}

      {/* Hidden text for screen readers to announce the overflow */}
      {overflowCount > 0 && (
        <span className="sr-only">
          And {overflowCount} more {overflowCount === 1 ? "avatar" : "avatars"}
        </span>
      )}
    </div>
  )
}
