import { TagVariant, TagStyle, TagSize, TagColor } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Returns the base classes shared by all tag variants
 * These classes handle the basic layout and transitions
 */
const getBaseClasses = () => "inline-flex w-fit items-center justify-center gap-2 transition-all duration-200";

/**
 * Returns common theme-based classes based on size
 * Used by both standard tags and split tags
 * 
 * @param size - The size variant of the tag
 * @returns Array of CSS class strings
 */
const getThemeClasses = (size: TagSize) => {
  const theme = themeConfig.euler.tag;
  return [
    getBaseClasses(),
    theme.sizes[size].height,
    theme.sizes[size].padding,
  ];
};

/**
 * Generates the complete className string for a standard Tag component
 * 
 * @param variant - The visual style variant of the tag
 * @param tagStyle - The shape style of the tag
 * @param size - The size variant of the tag
 * @param color - The color theme of the tag
 * @returns Combined className string
 */
export const getTagClassNames = (
  variant: TagVariant,
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor
): string => {
  const theme = themeConfig.euler.tag;
  return cn(
    ...getThemeClasses(size),
    theme.style[tagStyle], // Add the global style for standard tags
    theme.variant[variant]?.[color] || ''
  );
};

/**
 * Generates the complete className string for one side of a SplitTag component
 * 
 * @param tagStyle - The shape style of the tag
 * @param size - The size variant of the tag
 * @param color - The color theme of the tag
 * @param isLeft - Whether this is the left side (true) or right side (false)
 * @returns Combined className string
 */
export const getSplitTagClassNames = (
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor,
  isLeft: boolean
): string => {
  const theme = themeConfig.euler.tag;
  
  // Left side uses noFill variant, right side uses attentive variant
  const variant = isLeft ? 'noFill' : 'attentive';
  
  // Apply border radius only to the outer corners of each section
  // For left section: round the left corners only
  // For right section: round the right corners only
  const borderRadius = tagStyle === 'rounded' 
    ? (isLeft 
        ? 'rounded-l-full rounded-r-none' // Left section: round left corners only
        : 'rounded-r-full rounded-l-none' // Right section: round right corners only
      )
    : (isLeft 
        ? 'rounded-l rounded-r-none' // Left section: slight round on left corners only
        : 'rounded-r rounded-l-none' // Right section: slight round on right corners only
      );
  
  return cn(
    ...getThemeClasses(size),
    borderRadius,
    theme.variant[variant][color]
  );
}; 