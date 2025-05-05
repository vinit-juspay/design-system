import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { AvatarSize } from '../Avatar/types';

export const getAvatarGroupContainerClassNames = (className?: string): string => {
  const avatarGroupTheme = themeConfig.euler.avatarGroup;
  
  return cn(
    avatarGroupTheme.base.container,
    className
  );
};

export const getAvatarWrapperClassNames = (_index: number, _total: number): string => {
  const avatarGroupTheme = themeConfig.euler.avatarGroup;
  
  return cn(
    avatarGroupTheme.base.avatarWrapper
  );
};

export const getSelectedAvatarClassNames = (): string => {
  const avatarGroupTheme = themeConfig.euler.avatarGroup;
  
  return avatarGroupTheme.selected;
};

export const getOverflowCounterClassNames = (size: AvatarSize, isMenuOpen: boolean): string => {
  const avatarGroupTheme = themeConfig.euler.avatarGroup;
  const sizeClasses = avatarGroupTheme.sizes[size];
  
  return cn(
    avatarGroupTheme.base.overflowCounter,
    sizeClasses,
    isMenuOpen && avatarGroupTheme.selected
  );
}; 