import * as React from 'react';
import { TagProps, SplitTagProps, TagSize } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';

// Simplified slot size function
const getSlotSizes = (size: TagSize) => themeConfig.euler.tag.sizes[size].iconSize || '';

// Simplified slot rendering
const renderSlot = (slot: React.ReactNode | undefined, size: TagSize) => {
  if (!slot) return null;
  const slotSize = getSlotSizes(size);
  return (
    <div className={cn("flex items-center justify-center", slotSize)}>
      {slot}
    </div>
  );
};

// Reusable function to render a slot with its wrapper
const renderSlotWithWrapper = (slot: React.ReactNode | undefined, size: TagSize, gap: string) => {
  if (!slot) return null;
  return (
    <span className={cn("flex items-center", gap)}>
      {renderSlot(slot, size)}
    </span>
  );
};

// Main Tag component
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

// Split Tag component
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
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {renderSlotWithWrapper(leftSlot, size, slotGap)}
          {leftLabel && <span className={fontSizeClass}>{leftLabel}</span>}
        </div>
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
