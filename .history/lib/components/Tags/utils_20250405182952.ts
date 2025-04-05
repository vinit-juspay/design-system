import { TagVariant, TagStyle, TagSize, TagColor } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

export const getTagClassNames = (
  variant: TagVariant,
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor
): string => {
  // Base classes for all tags
  const baseClasses = `
    inline-flex items-center justify-center
    gap-2 transition-all duration-200
  `;

  // Size-specific classes with correct font sizes from tailwind config
  const sizeClasses = {
    xs: 'h-5 text-body-xs',
    sm: 'h-[22px] text-body-sm',
    md: 'h-6 text-body-md',
    lg: 'h-7 text-body-md'
  };

  // Padding based on size
  const paddingClasses = {
    xs: 'px-1.5 py-0.5',
    sm: 'px-2 py-0.75',
    md: 'px-2.5 py-1',
    lg: 'px-3 py-1.5'
  };

  // Style-specific classes (border radius)
  const styleClasses = {
    squarical: 'rounded',
    rounded: 'rounded-full'
  };

  // Color and variant combinations
  const variantColorClasses = {
    default: {
      neutral: 'bg-gray-100 text-gray-700',
      primary: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
      warning: 'bg-amber-100 text-amber-700',
      purple: 'bg-purple-100 text-purple-700'
    },
    attentive: {
        neutral: 'bg-gray-950 text-gray-0',
        primary: 'bg-blue-600 text-gray-0',
        success: 'bg-green-600 text-gray-0',
        error: 'bg-red-600 text-gray-0',
        warning: 'bg-orange-500 text-gray-0',
        purple: 'bg-purple-500 text-gray-0'
      },
    subtle: {
      neutral: 'bg-gray-50 text-gray-600 border border-gray-200',
      primary: 'bg-blue-50 text-blue-600 border border-blue-200',
      success: 'bg-green-50 text-green-600 border border-green-200',
      error: 'bg-red-50 text-red-600 border border-red-200',
      warning: 'bg-amber-50 text-amber-600 border border-amber-200',
      purple: 'bg-purple-50 text-purple-600 border border-purple-200'
    },
    splitTags: {
      neutral: '', // Will be handled separately
      primary: '',
      success: '',
      error: '',
      warning: '',
      purple: ''
    }
  };

  // For splitTags, we'll handle this differently in the component
  if (variant === 'splitTags') {
    return cn(
      baseClasses,
      sizeClasses[size],
      styleClasses[tagStyle]
    );
  }

  return cn(
    baseClasses,
    sizeClasses[size],
    paddingClasses[size],
    styleClasses[tagStyle],
    variantColorClasses[variant][color]
  );
};

export const getSplitTagClassNames = (
  tagStyle: TagStyle,
  size: TagSize,
  color: TagColor,
  isLeft: boolean
): string => {
  // Style-specific classes (border radius)
  const styleClasses = {
    squarical: isLeft ? 'rounded-l' : 'rounded-r',
    rounded: isLeft ? 'rounded-l-full' : 'rounded-r-full'
  };

  // Size-specific classes with correct font sizes from tailwind config
  const sizeClasses = {
    xs: 'h-5 text-body-xs',
    sm: 'h-[22px] text-body-sm',
    md: 'h-6 text-body-md',
    lg: 'h-7 text-body-md'
  };

  // Padding based on size
  const paddingClasses = {
    xs: 'px-1.5 py-0.5',
    sm: 'px-2 py-0.75',
    md: 'px-2.5 py-1',
    lg: 'px-3 py-1.5'
  };

  // Color classes for split tags
  const colorClasses = {
    neutral: isLeft ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700',
    primary: isLeft ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-700',
    success: isLeft ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-700',
    error: isLeft ? 'bg-red-200 text-red-800' : 'bg-red-100 text-red-700',
    warning: isLeft ? 'bg-amber-200 text-amber-800' : 'bg-amber-100 text-amber-700',
    purple: isLeft ? 'bg-purple-200 text-purple-800' : 'bg-purple-100 text-purple-700'
  };

  return cn(
    'inline-flex items-center justify-center gap-2',
    sizeClasses[size],
    paddingClasses[size],
    styleClasses[tagStyle],
    colorClasses[color]
  );
}; 