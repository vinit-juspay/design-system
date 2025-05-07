import { forwardRef, useState } from 'react';
import { cn } from '../../utils';
import { AvatarProps, AvatarSize, AvatarShape } from './types';
import {
  getAvatarContainerClassNames,
  getAvatarImageClassNames,
  getAvatarFallbackClassNames,
  getIndicatorClassNames,
} from './utils';

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = AvatarSize.REGULAR,
      shape = AvatarShape.CIRCULAR,
      online,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // Get initials from alt text for fallback
    const getInitials = () => {
      if (fallback) return fallback;
      if (!alt) return '';

      return alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    const showImage = src && !imageError;

    const containerClasses = getAvatarContainerClassNames(size, shape, !!showImage);
    const imageClasses = getAvatarImageClassNames(shape);
    const fallbackClasses = getAvatarFallbackClassNames();
    const indicatorClasses = getIndicatorClassNames(size);

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        {showImage ? (
          <img
            src={src || '/placeholder.svg'}
            alt={alt}
            className={imageClasses}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className={fallbackClasses} aria-hidden="true">
            {getInitials()}
          </span>
        )}

        {/* Visually hidden text for screen readers */}
        <span className="sr-only">{alt}</span>

        {online && <span className={indicatorClasses} aria-hidden="true" />}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
