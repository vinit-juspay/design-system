import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from './Button.types';
import { cn } from '../../lib/utils';
import { getButtonClassNames } from './Button.utils';

/**
 * Button component that supports multiple variants, sizes, and states
 * 
 * @component
 * @example
 * // Basic usage
 * <Button buttonType="primary" size="md">Click me</Button>
 * 
 * // With loading state
 * <Button isLoading>Processing</Button>
 * 
 * // With icon
 * <Button leadingIcon={Icon}>With icon</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
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
  }, ref) => {
    const baseClassNames = getButtonClassNames(buttonType, size, subType);
    
    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={cn(baseClassNames, className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {!isLoading && LeadingIcon && (
          <LeadingIcon className="h-4 w-4" />
        )}
        {(text || children) && (
          <span>{text || children}</span>
        )}
        {!isLoading && TrailingIcon && (
          <TrailingIcon className="h-4 w-4" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 