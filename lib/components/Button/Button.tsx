import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps, ButtonType, ButtonSize, ButtonSubType } from './types';
import { cn } from '../../utils';
import { getButtonClassNames, getIconClassNames, getTextClassNames } from './utils';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = ButtonType.PRIMARY,
      size = ButtonSize.MEDIUM,
      subType = ButtonSubType.DEFAULT,
      text,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      isLoading = false,
      isDisabled = false,
      className,
      children,
      ariaLabel,
      ariaExpanded,
      ariaControls,
      ariaPressed,
      ariaHasPopup,
      ...props
    },
    ref
  ) => {
    const baseClassNames = getButtonClassNames(buttonType, size, subType);
    const iconClassNames = getIconClassNames(size, isLoading);
    const textClassNames = getTextClassNames(size);

    const computedAriaLabel =
      subType === ButtonSubType.ICON_ONLY && !ariaLabel && !text && !children
        ? 'Button'
        : ariaLabel;

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={cn(baseClassNames, className)}
        aria-label={computedAriaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-pressed={ariaPressed}
        aria-haspopup={ariaHasPopup}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className={iconClassNames} aria-hidden="true" />}
        {!isLoading && LeadingIcon && <LeadingIcon className={iconClassNames} aria-hidden="true" />}
        {(text || children) && <span className={textClassNames}>{text || children}</span>}
        {!isLoading && TrailingIcon && (
          <TrailingIcon className={iconClassNames} aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
