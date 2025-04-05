import * as React from 'react';
import { TagProps, SplitTagProps } from './types';
import { cn } from '../../utils';
import { getTagClassNames, getSplitTagClassNames } from './utils';

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ 
    variant = 'default',
    tagStyle = 'rounded',
    size = 'md',
    color = 'neutral',
    label,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    className,
    children,
    ...props 
  }, ref) => {
    const baseClassNames = getTagClassNames(variant, tagStyle, size, color);
    
    // Size-appropriate icon sizes
    const iconSizes = {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    };
    
    // Direct font size styles
    const fontSizeStyles = {
      xs: { fontSize: '10px', lineHeight: '14px' },
      sm: { fontSize: '12px', lineHeight: '16px' },
      md: { fontSize: '14px', lineHeight: '20px' },
      lg: { fontSize: '16px', lineHeight: '24px' }
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
        {LeadingIcon && (
          <LeadingIcon className={iconSizes[size]} />
        )}
        {(label || children) && (
          <span className="font-body" style={fontSizeStyles[size]}>
            {label || children}
          </span>
        )}
        {TrailingIcon && (
          <TrailingIcon className={iconSizes[size]} />
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
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className,
    ...props
  }, ref) => {
    // Size-appropriate icon sizes
    const iconSizes = {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    };
    
    // Direct font size styles
    const fontSizeStyles = {
      xs: { fontSize: '10px', lineHeight: '14px' },
      sm: { fontSize: '12px', lineHeight: '16px' },
      md: { fontSize: '14px', lineHeight: '20px' },
      lg: { fontSize: '16px', lineHeight: '24px' }
    };
    
    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        {...props}
      >
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {LeftIcon && <LeftIcon className={iconSizes[size]} />}
          {leftLabel && (
            <span className="font-body" style={fontSizeStyles[size]}>
              {leftLabel}
            </span>
          )}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && (
            <span className="font-body" style={fontSizeStyles[size]}>
              {rightLabel}
            </span>
          )}
          {RightIcon && <RightIcon className={iconSizes[size]} />}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;
