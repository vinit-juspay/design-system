import * as React from 'react';
import { TagProps } from './types';
import { cn } from '../../utils';
import { getTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';
import { renderSlot } from './utils';

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
        {leadingSlot && <span {...renderSlot(leadingSlot, size)} />}
        {label && <span className={fontSizeClass}>{label}</span>}
        {trailingSlot && <span {...renderSlot(trailingSlot, size)} />}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;