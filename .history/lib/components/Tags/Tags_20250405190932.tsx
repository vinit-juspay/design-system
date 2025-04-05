import * as React from 'react';
import { TagProps, SplitTagProps } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ 
    variant = 'noFill',
    tagStyle = 'rounded',
    size = 'md',
    color = 'neutral',
    label,
    leadingSlot,
    trailingSlot,
    className,
    children,
    ...props 
  }, ref) => {
    const baseClassNames = getTagClassNames(variant, tagStyle, size, color);
    
    // Size-appropriate icon sizes
    const slotSizes = {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    };
    
    if (variant === 'splitTags') {
      return null; // SplitTag component should be used instead
    }
    
    return (
      <div
        ref={ref}
        className={cn(baseClassNames, className)}
        {...props}
      >
        {leadingSlot && (
          <div className={cn("flex items-center justify-center", slotSizes[size])}>
            {leadingSlot}
          </div>
        )}
        {(label || children) && (
          <span className={cn("font-body", themeConfig.euler.tag.sizes[size].fontSize.split(' ')[0])}>
            {label || children}
          </span>
        )}
        {trailingSlot && (
          <div className={cn("flex items-center justify-center", slotSizes[size])}>
            {trailingSlot}
          </div>
        )}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

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
    // Size-appropriate slot sizes
    const slotSizes = {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    };
    
    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        {...props}
      >
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {leftSlot && (
            <div className={cn("flex items-center justify-center", slotSizes[size])}>
              {leftSlot}
            </div>
          )}
          {leftLabel && (
            <span className={cn("font-body", themeConfig.euler.tag.sizes[size].fontSize.split(' ')[0])}>
              {leftLabel}
            </span>
          )}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && (
            <span className={cn("font-body", themeConfig.euler.tag.sizes[size].fontSize.split(' ')[0])}>
              {rightLabel}
            </span>
          )}
          {rightSlot && (
            <div className={cn("flex items-center justify-center", slotSizes[size])}>
              {rightSlot}
            </div>
          )}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;
