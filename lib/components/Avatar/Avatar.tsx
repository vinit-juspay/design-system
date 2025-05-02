import { useState } from "react"
import { cn } from "../../utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "regular" | "md" | "lg" | "xl"
  shape?: "circular" | "rounded"
  online?: boolean
  className?: string
}

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "regular",
  shape = "circular",
  online,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  // Size mappings
  const sizeClasses = {
    sm: "h-6 w-6 text-body-xs text-500 text-gray-900",
    regular: "h-8 w-8 text-body-sm text-500 text-gray-900",
    md: "h-10 w-10 text-body-md text-500 text-gray-900",
    lg: "h-12 w-12 text-body-lg text-500 text-gray-900",
    xl: "h-16 w-16 text-sm text-600 text-gray-900",
  }

  // Indicator styles based on avatar size
  const indicatorStyles = {
    sm: "h-1.5 w-1.5 ring-1 ring-white -top-0.5 -right-0.5",
    regular: "h-2 w-2 ring-1 ring-white -top-0.5 -right-0.5",
    md: "h-2.5 w-2.5 ring-1 ring-white -top-0.5 -right-0.5",
    lg: "h-3 w-3 ring-2 ring-white -top-0.5 -right-0.5",
    xl: "h-4 w-4 ring-2 ring-white -top-0.5 -right-0.5",
  }

  // Get initials from alt text for fallback
  const getInitials = () => {
    if (fallback) return fallback
    if (!alt) return ""

    return alt
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center bg-gray-100 border",
        sizeClasses[size],
        shape === "circular" ? "rounded-full" : "rounded-md",
        src && !imageError ? "border-white" : "border-gray-200",
        className,
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn(
            "h-full w-full object-cover",
            shape === "circular" ? "rounded-full" : "rounded-md"
          )}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium text-muted-foreground" aria-hidden="true">
          {getInitials()}
        </span>
      )}

      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{alt}</span>

      {online && (
        <span
          className={cn(
            "absolute block rounded-full bg-green-500",
            indicatorStyles[size], // Apply dynamic styles
          )}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
