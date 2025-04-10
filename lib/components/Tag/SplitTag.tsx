import * as React from 'react';
import { SplitTagProps } from './types';
import { cn } from '../../utils';
import { getSplitTagClassNames } from './utils';
import { themeConfig } from '../../themeConfig';
import { renderSlot } from './utils';

/**
 * SplitTag Component - Tag with two distinct sections (left and right)
 */
const SplitTag = React.forwardRef<HTMLDivElement, SplitTagProps>(
  (
    {
      tagStyle = 'rounded',
      size = 'md',
      color = 'neutral',
      leftLabel,
      rightLabel,
      leftSlot,
      rightSlot,
      className,
      ...props
    },
    ref
  ) => {
    const fontSizeClass = themeConfig.euler.tag.sizes[size].fontSize;
    const containerClasses = themeConfig.euler.tag.layout.container;

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        <div className={getSplitTagClassNames(tagStyle, size, color, true)}>
          {leftSlot && <span {...renderSlot(leftSlot, size)} />}
          {leftLabel && <span className={fontSizeClass}>{leftLabel}</span>}
        </div>
        <div className={getSplitTagClassNames(tagStyle, size, color, false)}>
          {rightLabel && <span className={fontSizeClass}>{rightLabel}</span>}
          {rightSlot && <span {...renderSlot(rightSlot, size)} />}
        </div>
      </div>
    );
  }
);

SplitTag.displayName = 'SplitTag';

export default SplitTag;
