import * as React from 'react';
import { TagProps, SplitTagProps, TagSize } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';

/**
 * Gets the appropriate icon size class based on tag size
 * 
 * @param size - The size variant of the tag
 * @returns CSS class string for icon sizing
 */
const getSlotSizes = (size: TagSize) => themeConfig.euler.tag.sizes[size].iconSize || '';

/**
 * Renders a slot (icon or custom element) with appropriate sizing
 * 
 * @param slot - The React node to render in the slot
 * @param size - The size variant of the tag
 * @returns Rendered slot or null if slot is undefined
 */
const renderSlot = (slot: React.ReactNode | undefined, size: TagSize) => {
  if (!slot) return null;
  const slotSize = getSlotSizes(size);
  return (
    <div className={cn("flex items-center justify-center", slotSize)}>
      {slot}
    </div>
  );
};

/**
 * Renders a slot with its wrapper for consistent spacing
 * 
 * @param slot - The React node to render in the slot
 * @param size - The size variant of the tag
 * @param gap - The gap class to apply
 * @returns Rendered slot with wrapper or null if slot is undefined
 */
const renderSlotWithWrapper = (slot: React.ReactNode | undefined, size: TagSize, gap: string) => {
  if (!slot) return null;
  return (
    <span className={cn("flex items-center", gap)}>
      {renderSlot(slot, size)}
    </span>
  );
};

/**
 * Tag Component
 * 
 * A versatile tag component that can be used to display labels, categories,
 * statuses, or other metadata. Supports various visual styles, sizes, and colors.
 * Can include optional leading and trailing icons or custom elements.
 */
const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ 
    variant = 'noFill',
    tagStyle = 'squarical',
    size = 'md',
    color = 'neutral',
    label,
    leadingSlot,
    trailingSlot,
    className,
    ...props
  }, ref) => {
    const containerClassName = getTagClassNames(variant, tagStyle, size, color);
    const fontSizeClass = themeConfig.euler.tag.sizes[size].fontSize;
    const slotGap = themeConfig.euler.tag.sizes[size].gap || 'gap-1';
    
    return (
      <div
        ref={ref}
        className={cn(containerClassName, className)}
        {...props}
      >
        {renderSlotWithWrapper(leadingSlot, size, slotGap)}
        {label && <span className={fontSizeClass}>{label}</span>}
        {renderSlotWithWrapper(trailingSlot, size, slotGap)}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

/**
 * SplitTag Component
 * 
 * A specialized tag with two distinct sections (left and right).
 * Commonly used for displaying key-value pairs, counts, or status indicators.
 * The left side typically uses a lighter style, while the right side is more prominent.
 */
export const SplitTag = React.forwardRef<HTMLDivElement, SplitTagProps>(
  ({
    tagStyle = 'rounded',
    size = 'md',
    color = 'neutral',
    leftLabel,
    rightLabel,
    leftSlot,
    rightSlot,
    className,
    ...props
  }, ref) => {
    const fontSizeClass = themeConfig.euler.tag.sizes[size].fontSize;
    const slotGap = themeConfig.euler.tag.sizes[size].gap || 'gap-1';
    
    return (
      <div
        ref={ref}
        className={cn("inline-flex w-fit", className)}
        {...props}
      >
        {/* Left section - typically uses noFill variant */}
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {renderSlotWithWrapper(leftSlot, size, slotGap)}
          {leftLabel && <span className={fontSizeClass}>{leftLabel}</span>}
        </div>
        {/* Right section - typically uses attentive variant */}
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && <span className={fontSizeClass}>{rightLabel}</span>}
          {renderSlotWithWrapper(rightSlot, size, slotGap)}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;
