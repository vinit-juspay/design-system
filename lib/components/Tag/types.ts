import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TagVariant = 'noFill' | 'attentive' | 'subtle';
export type TagStyle = 'squarical' | 'rounded';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';
export type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'purple';

interface BaseTagProps extends ComponentPropsWithoutRef<'div'> {
  tagStyle?: TagStyle;
  size?: TagSize;
  color?: TagColor;
}

export interface TagProps extends BaseTagProps {
  variant?: TagVariant;
  label?: string;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
}

export interface SplitTagProps extends BaseTagProps {
  leftLabel?: string;
  rightLabel?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}