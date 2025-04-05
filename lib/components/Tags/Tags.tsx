import * as React from 'react';
import { TagProps, SplitTagProps } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';
// Import default icons
import { CheckCircle, XCircle, AlertCircle, InfoIcon } from 'lucide-react';

// Common utility functions shared between Tag and SplitTag
const getSlotSizes = (size: 'xs' | 'sm' | 'md' | 'lg') => ({
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4"
}[size]);

const getDefaultIcon = (color: string) => {
  switch (color) {
    case 'success': return <CheckCircle />;
    case 'error': return <XCircle />;
    case 'warning': return <AlertCircle />;
    default: return <InfoIcon />;
  }
};

const renderSlot = (slot: React.ReactNode | undefined, size: 'xs' | 'sm' | 'md' | 'lg', color: string) => {
  const slotSize = getSlotSizes(size);
  return (
    <div className={cn("flex items-center justify-center", slotSize)}>
      {slot !== undefined ? slot : getDefaultIcon(color)}
    </div>
  );
};

const getFontSizeClass = (size: 'xs' | 'sm' | 'md' | 'lg') => {
  return cn("font-body", themeConfig.euler.tag.sizes[size].fontSize.split(' ')[0]);
};

// Main Tag component
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
    // Early return for splitTags variant
    if (variant === 'splitTags') {
      return null; // SplitTag component should be used instead
    }
    
    const baseClassNames = getTagClassNames(variant, tagStyle, size, color);
    
    return (
      <div
        ref={ref}
        className={cn(baseClassNames, className)}
        {...props}
      >
        {renderSlot(leadingSlot, size, color)}
        {(label || children) && (
          <span className={getFontSizeClass(size)}>
            {label || children}
          </span>
        )}
        {renderSlot(trailingSlot, size, color)}
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
    return (
      <div
        ref={ref}
        className={cn("inline-flex w-fit", className)}
        {...props}
      >
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {renderSlot(leftSlot, size, color)}
          {leftLabel && (
            <span className={getFontSizeClass(size)}>
              {leftLabel}
            </span>
          )}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && (
            <span className={getFontSizeClass(size)}>
              {rightLabel}
            </span>
          )}
          {renderSlot(rightSlot, size, color)}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;
