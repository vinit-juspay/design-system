import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps, ButtonType, ButtonSize, ButtonSubType } from './types';
import { cn } from '../../utils';
import { getButtonClassNames, getIconClassNames, getTextClassNames } from './utils';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = 'primary',
      size = 'md',
      subType = 'default',
      text,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      isLoading = false,
      isDisabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClassNames = getButtonClassNames(
      buttonType as ButtonType,
      size as ButtonSize,
      subType as ButtonSubType
    );
    const iconClassNames = getIconClassNames(size as ButtonSize, isLoading);
    const textClassNames = getTextClassNames(size as ButtonSize);

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={cn(baseClassNames, className)}
        {...props}
      >
        {isLoading && <Loader2 className={iconClassNames} />}
        {!isLoading && LeadingIcon && <LeadingIcon className={iconClassNames} />}
        {(text || children) && <span className={textClassNames}>{text || children}</span>}
        {!isLoading && TrailingIcon && <TrailingIcon className={iconClassNames} />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
