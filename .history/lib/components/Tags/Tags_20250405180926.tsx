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
          <LeadingIcon className="h-3 w-3" />
        )}
        {(label || children) && (
          <span>{label || children}</span>
        )}
        {TrailingIcon && (
          <TrailingIcon className="h-3 w-3" />
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
    return (
      <div
        ref={ref}
        className={cn("inline-flex", className)}
        {...props}
      >
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {LeftIcon && <LeftIcon className="h-3 w-3" />}
          {leftLabel && <span>{leftLabel}</span>}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && <span>{rightLabel}</span>}
          {RightIcon && <RightIcon className="h-3 w-3" />}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default Tag;
