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

  return cn(
    'inline-flex items-center justify-center gap-2',
    theme.sizes[size].height,
    theme.sizes[size].padding,
    theme.sizes[size].fontSize,
    theme.splitStyle[tagStyle][side],
    theme.splitTag[color][side]
  );
}; 