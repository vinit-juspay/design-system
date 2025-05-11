import { HTMLAttributes } from 'react';
import { AvatarProps } from '../Avatar/types';

export interface AvatarData extends Omit<AvatarProps, 'className' | 'id'> {
  id: string | number;
  alt?: string;
  fallback?: string;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarData[];
  maxCount?: number;
  size?: AvatarProps['size'];
  className?: string;
  selectedAvatarIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
}
