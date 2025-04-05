import { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Tag component variant options
 * - noFill: Outlined tag with colored border and text
 * - attentive: Solid background with white text for high emphasis
 * - subtle: Light colored background with matching text for low emphasis
 */
export type TagVariant = 'noFill' | 'attentive' | 'subtle';

/**
 * Tag shape style options
 * - squarical: Slightly rounded corners
 * - rounded: Fully rounded pill shape
 */
export type TagStyle = 'squarical' | 'rounded';

/**
 * Tag size options from extra small to large
 */
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Tag color theme options
 */
export type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'purple';

/**
 * Base properties shared between Tag and SplitTag components
 * Extends standard div element props
 */
interface BaseTagProps extends ComponentPropsWithoutRef<'div'> {
  /** Shape style of the tag (squarical or rounded) */
  tagStyle?: TagStyle;
  /** Size variant of the tag */
  size?: TagSize;
  /** Color theme of the tag */
  color?: TagColor;
}

/**
 * Properties for the standard Tag component
 */
export interface TagProps extends BaseTagProps {
  /** Visual style variant of the tag */
  variant?: TagVariant;
  /** Text content of the tag */
  label?: string;
  /** Optional icon or element to display before the label */
  leadingSlot?: ReactNode;
  /** Optional icon or element to display after the label */
  trailingSlot?: ReactNode;
}

/**
 * Properties for the SplitTag component which has distinct left and right sections
 */
export interface SplitTagProps extends BaseTagProps {
  /** Text content for the left section */
  leftLabel?: string;
  /** Text content for the right section */
  rightLabel?: string;
  /** Optional icon or element to display in the left section */
  leftSlot?: ReactNode;
  /** Optional icon or element to display in the right section */
  rightSlot?: ReactNode;
} 