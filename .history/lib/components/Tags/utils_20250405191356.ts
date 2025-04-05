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
  
  // Base classes for all tags
  const baseClasses = `
    inline-flex items-center justify-center
    gap-2 transition-all duration-200
  `;

  // For splitTags, we'll handle this differently in the component
  if (variant === 'splitTags') {
    return cn(
      baseClasses,
      theme.sizes[size].height,
      theme.sizes[size].fontSize,
      theme.style[tagStyle]
    );
  }

  return cn(
    baseClasses,
    theme.sizes[size].height,
    theme.sizes[size].padding,
    theme.sizes[size].fontSize,
    theme.style[tagStyle],
    theme.variant[variant][color]
  );
};

export const getSplitTagClassNames = (
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor,
  isLeft: boolean
): string => {
  const theme = themeConfig.euler.tag;
  const side = isLeft ? 'left' : 'right';
  
  // Base classes for all tags
  const baseClasses = `
    inline-flex items-center justify-center
    gap-2 transition-all duration-200
  `;
  
  // Use noFill variant for left side and attentive variant for right side
  const variant = isLeft ? 'noFill' : 'attentive';
  
  // Apply border radius based on side
  const borderRadius = tagStyle === 'rounded' 
    ? (isLeft ? 'rounded-l-full' : 'rounded-r-full')
    : (isLeft ? 'rounded-l' : 'rounded-r');
  
  return cn(
    baseClasses,
    theme.sizes[size].height,
    theme.sizes[size].padding,
    theme.sizes[size].fontSize,
    borderRadius,
    theme.variant[variant][color]
  );
}; 