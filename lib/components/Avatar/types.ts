import { HTMLAttributes } from "react";

export enum AvatarSize {
  SM = "sm",
  REGULAR = "regular",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum AvatarShape {
  CIRCULAR = "circular",
  ROUNDED = "rounded",
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  online?: boolean;
  className?: string;
} 