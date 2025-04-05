import { TagVariant, TagStyle, TagSize, TagColor } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

// Common base classes for both tag types
const getBaseClasses = () => "inline-flex w-fit items-center justify-center gap-2 transition-all duration-200";

// Common function to get theme-based classes
const getThemeClasses = (size: TagSize, tagStyle: TagStyle) => {
  const theme = themeConfig.euler.tag;
  return [
    getBaseClasses(),
    theme.sizes[size].height,
    theme.sizes[size].padding,
    theme.style[tagStyle]
  ];
};

export const getTagClassNames = (
  variant: TagVariant,
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor
): string => {
  const theme = themeConfig.euler.tag;
  return cn(
    ...getThemeClasses(size, tagStyle),
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
  
  // Use noFill variant for left side and attentive variant for right side
  const variant = isLeft ? 'noFill' : 'attentive';
  
  // Apply border radius based on side
  const borderRadius = tagStyle === 'rounded' 
    ? (isLeft ? 'rounded-l-full' : 'rounded-r-full')
    : (isLeft ? 'rounded-l' : 'rounded-r');
  
  return cn(
    ...getThemeClasses(size, tagStyle),
    borderRadius,
    theme.variant[variant][color]
  );
}; 