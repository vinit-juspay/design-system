import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type TagVariant = 'noFill' | 'attentive' | 'subtle' | 'splitTags';
export type TagStyle = 'squarical' | 'rounded';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';
export type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'purple';

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
  variant?: TagVariant;
  tagStyle?: TagStyle;
  size?: TagSize;
  color?: TagColor;
  label?: string;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
}

export interface SplitTagProps extends ComponentPropsWithoutRef<'div'> {
  tagStyle?: TagStyle;
  size?: TagSize;
  color?: TagColor;
  leftLabel?: string;
  rightLabel?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
} 