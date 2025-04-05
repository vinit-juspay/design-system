import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type TagVariant = 'default' | 'attentive' | 'subtle' | 'splitTags';
export type TagStyle = 'squarical' | 'rounded';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';
export type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'purple';

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
  variant?: TagVariant;
  tagStyle?: TagStyle;
  size?: TagSize;
  color?: TagColor;
  label?: string;
  leadingIcon?: ElementType;
  trailingIcon?: ElementType;
  children?: ReactNode;
}

export interface SplitTagProps extends Omit<TagProps, 'variant'> {
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
} 