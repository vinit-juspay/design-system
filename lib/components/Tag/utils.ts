import { TagVariant, TagStyle, TagSize, TagColor } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

export const getTagClassNames = (
  variant: TagVariant,
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor
): string => {
  const theme = themeConfig.euler.tag;
  return cn(
    theme.layout.base,
    theme.sizes[size].height,
    theme.sizes[size].padding,
    theme.style[tagStyle],
    theme.variant[variant]?.[color] || ''
  );
};

export const getSplitTagClassNames = (
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor,
  isLeft: boolean
): string => {
  const theme = themeConfig.euler.tag;

  // Left side uses noFill variant, right side uses attentive variant
  const variant = isLeft ? 'noFill' : 'attentive';

  // Get border radius from theme config
  const borderRadius = theme.splitStyle[tagStyle][isLeft ? 'left' : 'right'];

  return cn(
    theme.layout.base,
    theme.sizes[size].height,
    theme.sizes[size].padding,
    borderRadius,
    theme.variant[variant][color]
  );
};

/**
 * Renders a slot (icon or custom element) with appropriate styling
 */
export const renderSlot = (slot: React.ReactNode | undefined, size: TagSize) => {
  if (!slot) return null;

  const tagTheme = themeConfig.euler.tag;
  const slotSize: string = tagTheme.sizes[size].iconSize;
  const slotGap: string = tagTheme.sizes[size].gap;
  const slotClasses: string = tagTheme.layout.slot;

  // Use the variables directly to ensure TypeScript recognizes their usage
  const className = cn(slotClasses, slotSize, slotGap);

  // Return the props object instead of JSX
  return { className, children: slot };
};
