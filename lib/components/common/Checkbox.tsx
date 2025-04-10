import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { themeConfig } from '../../themeConfig';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked, unchecked, or indeterminate
   */
  checked?: boolean | 'indeterminate';
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
  size?: 'sm' | 'md';
  /**
   * Children to render next to the checkbox (like a label)
   */
  children?: React.ReactNode;
  /**
   * Position of the checkbox relative to children/label
   */
  position?: 'left' | 'right';
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
  position = 'left',
}, ref) => {
  // Get styles from theme config
  const { baseStyles, indicator, sizes, states } = themeConfig.euler.checkbox;
  const sizeClasses = sizes[size];
  
  // Combine styles based on theme config and component props
  const rootClassName = `${baseStyles} ${sizeClasses.root} ${disabled ? states.disabled : states.enabled} ${className}`;
  const indicatorContainerClassName = `${indicator.baseStyles} ${sizeClasses.indicator} ${indicatorClassName}`;
  const checkClassName = `${indicator.icon} ${sizeClasses.checkIcon} ${checkIconClassName}`;
  const labelClassName = `${sizeClasses.fontSize} ${disabled ? states.labelDisabled : states.labelEnabled}`;

  // Determine the appropriate indicator based on checked state
  const renderIndicator = () => {
    if (!checked) return null;
    
    if (checked === 'indeterminate') {
      return <Minus className={checkClassName} />;
    }
    
    return <Check className={checkClassName} />;
  };

  // Checkbox element
  const checkboxElement = (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked === 'indeterminate' ? false : checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      value={value}
      className={rootClassName}
      data-state={checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
    >
      <CheckboxPrimitive.Indicator 
        className={indicatorContainerClassName}
        forceMount={checked === 'indeterminate' ? true : undefined}
      >
        {renderIndicator()}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  // Label element if children exist
  const labelElement = children && (
    <label className={labelClassName}>
      {children}
    </label>
  );

  // Render based on position
  return (
    <div className={`flex items-center ${position === 'left' ? 'space-x-2' : 'space-x-reverse space-x-2 flex-row-reverse'}`}>
      {checkboxElement}
      {labelElement}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 