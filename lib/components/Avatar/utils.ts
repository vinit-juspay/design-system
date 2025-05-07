import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { AvatarSize, AvatarShape } from './types';

export const getAvatarContainerClassNames = (
  size: AvatarSize,
  shape: AvatarShape,
  hasImage: boolean
): string => {
  const avatarTheme = themeConfig.euler.avatar;
  const sizeClass = avatarTheme.sizes[size];
  const shapeClass = avatarTheme.shapes[shape];
  const borderClass = hasImage ? avatarTheme.border.withImage : avatarTheme.border.withoutImage;

  return cn(avatarTheme.base.container, sizeClass, shapeClass, borderClass);
};

export const getAvatarImageClassNames = (shape: AvatarShape): string => {
  const avatarTheme = themeConfig.euler.avatar;
  const shapeClass = avatarTheme.shapes[shape];
  return cn(avatarTheme.base.image, shapeClass);
};

export const getAvatarFallbackClassNames = (): string => {
  const avatarTheme = themeConfig.euler.avatar;
  return cn(avatarTheme.base.fallbackText);
};

export const getIndicatorClassNames = (size: AvatarSize): string => {
  const avatarTheme = themeConfig.euler.avatar;
  const indicatorSizeClass = avatarTheme.indicator.sizes[size];

  return cn(avatarTheme.indicator.base, indicatorSizeClass);
};
