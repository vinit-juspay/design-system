import * as React from 'react';
import { TagProps, SplitTagProps, TagSize } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';

/**
 * Renders a slot (icon or custom element) with appropriate styling
 */
const renderSlot = (slot: React.ReactNode | undefined, size: TagSize) => {
  if (!slot) return null;
  
  const tagTheme = themeConfig.euler.tag;
  const slotSize = tagTheme.sizes[size].iconSize;
  const slotGap = tagTheme.sizes[size].gap;
  const slotClasses = tagTheme.layout.slot;
  
  return (
    <span className={cn(slotClasses, slotSize, slotGap)}>
      {slot}
    </span>
  );
};

/**
 * Tag Component - Displays labels, categories, statuses, or other metadata
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
    
    return (
      <div
        ref={ref}
        className={cn(containerClassName, className)}
        {...props}
      >
        {renderSlot(leadingSlot, size)}
        {label && <span className={fontSizeClass}>{label}</span>}
        {renderSlot(trailingSlot, size)}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

/**
 * SplitTag Component - Tag with two distinct sections (left and right)
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
    const containerClasses = themeConfig.euler.tag.layout.container;
    
    return (
      <div
        ref={ref}
        className={cn(containerClasses, className)}
        {...props}
      >
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {renderSlot(leftSlot, size)}
          {leftLabel && <span className={fontSizeClass}>{leftLabel}</span>}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && <span className={fontSizeClass}>{rightLabel}</span>}
          {renderSlot(rightSlot, size)}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;