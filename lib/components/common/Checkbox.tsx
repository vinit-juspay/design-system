import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { themeConfig } from '../../themeConfig';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked or not
   */
  checked?: boolean;
  /**
   * Called when the checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Required attribute for the checkbox
   */
  required?: boolean;
  /**
   * Controlled value for the checkbox (for use in list selections)
   */
  value?: string;
  /**
   * Optional class name for the root container
   */
  className?: string;
  /**
   * Optional class name for the indicator container
   */
  indicatorClassName?: string;
  /**
   * Optional class name for the check icon
   */
  checkIconClassName?: string;
  /**
   * Size variant for the checkbox
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Children to render next to the checkbox (like a label)
   */
  children?: React.ReactNode;
}

/**
 * Checkbox component built on top of Radix UI's checkbox primitive
 * Can be used standalone or within lists
 * 
 * @component
 * @example
 * // Basic usage
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 * >
 *   Accept terms and conditions
 * </Checkbox>
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({
  checked,
  onCheckedChange,
  disabled = false,
  required = false,
  value,
  className = '',
  indicatorClassName = '',
  checkIconClassName = '',
  size = 'md',
  children,
}, ref) => {
  // Get styles from theme config
  const { baseStyles, indicator, sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];
  
  // Combine styles based on theme config and component props
  const rootClassName = `${baseStyles} ${sizeClasses.root} ${disabled ? states.disabled : states.enabled} ${className}`;
  const indicatorContainerClassName = `${indicator.baseStyles} ${sizeClasses.indicator} ${indicatorClassName}`;
  const checkClassName = `${indicator.icon} ${sizeClasses.checkIcon} ${checkIconClassName}`;
  const labelClassName = `${sizeClasses.fontSize} ${disabled ? states.labelDisabled : states.labelEnabled}`;

  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        value={value}
        className={rootClassName}
      >
        <CheckboxPrimitive.Indicator className={indicatorContainerClassName}>
          <Check className={checkClassName} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <label className={labelClassName}>
          {children}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 