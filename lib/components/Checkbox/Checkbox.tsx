import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { CheckboxProps, CheckboxSize, CheckboxPosition } from './types';
import {
  getCheckboxClassNames,
  getIndicatorClassNames,
  getCheckIconClassNames,
  getLabelClassNames,
  getContainerClassNames,
} from './utils';

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
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      checked,
      onCheckedChange,
      disabled = false,
      required = false,
      value,
      className = '',
      indicatorClassName = '',
      checkIconClassName = '',
      size = CheckboxSize.MEDIUM,
      children,
      position = CheckboxPosition.LEFT,
    },
    ref
  ) => {
    // Determine the appropriate indicator based on checked state
    const renderIndicator = () => {
      if (!checked) return null;

      if (checked === 'indeterminate') {
        return <Minus className={getCheckIconClassNames(size, checkIconClassName)} />;
      }

      return <Check className={getCheckIconClassNames(size, checkIconClassName)} />;
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
        className={getCheckboxClassNames(size, disabled, className)}
        data-state={
          checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'
        }
      >
        <CheckboxPrimitive.Indicator
          className={getIndicatorClassNames(size, indicatorClassName)}
          forceMount={checked === 'indeterminate' ? true : undefined}
        >
          {renderIndicator()}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    // Label element if children exist
    const labelElement = children && (
      <label className={getLabelClassNames(size, disabled)}>{children}</label>
    );

    // Render based on position
    return (
      <div className={getContainerClassNames(position)}>
        {position === CheckboxPosition.LEFT ? (
          <>
            {checkboxElement}
            {labelElement}
          </>
        ) : (
          <>
            {labelElement}
            {checkboxElement}
          </>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
