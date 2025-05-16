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
  getCheckboxContentWrapperClassNames,
  getCheckboxRightSlotClassNames,
  getCheckboxSubtextClassNames,
} from './utils';

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      id,
      value,
      isChecked,
      defaultChecked = false,
      onCheckedChange,
      isDisabled = false,
      required = false,
      className = '',
      indicatorClassName = '',
      checkIconClassName = '',
      size = CheckboxSize.MEDIUM,
      children,
      position = CheckboxPosition.LEFT,
      subtext,
      rightSlot,
    },
    ref
  ) => {
    // Use internal state for uncontrolled component
    const [checkedState, setCheckedState] = React.useState<boolean | 'indeterminate'>(
      defaultChecked
    );

    // Determine if component is controlled
    const isControlled = isChecked !== undefined;
    const checked = isControlled ? isChecked : checkedState;

    // Handle change events
    const handleChange = (newChecked: boolean | 'indeterminate') => {
      if (isDisabled) return;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setCheckedState(newChecked);
      }

      // Call onChange callback
      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
    };

    // Determine the appropriate indicator based on checked state
    const renderIndicator = () => {
      if (!checked) return null;

      if (checked === 'indeterminate') {
        return <Minus className={getCheckIconClassNames(size, checkIconClassName)} />;
      }

      return <Check className={getCheckIconClassNames(size, checkIconClassName)} />;
    };

    const uniqueId = id || (value ? `checkbox-${value}` : `checkbox-${React.useId()}`);

    // Checkbox element
    const checkboxElement = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={uniqueId}
        checked={checked === 'indeterminate' ? false : checked}
        onCheckedChange={handleChange}
        disabled={isDisabled}
        required={required}
        value={value}
        className={getCheckboxClassNames(size, isDisabled, checked, className)}
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
      <label
        htmlFor={uniqueId}
        className={getLabelClassNames(size, isDisabled)}
        id={`${uniqueId}-label`}
      >
        {children}
      </label>
    );

    return (
      <div className={getContainerClassNames()}>
        <div className={getCheckboxContentWrapperClassNames()}>
          {position === CheckboxPosition.LEFT ? (
            <>
              {checkboxElement}
              <div className="flex items-center flex-1">
                {labelElement}
                {rightSlot && <span className={getCheckboxRightSlotClassNames()}>{rightSlot}</span>}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center flex-1">
                {labelElement}
                {rightSlot && <span className={getCheckboxRightSlotClassNames()}>{rightSlot}</span>}
              </div>
              {checkboxElement}
            </>
          )}
        </div>

        {subtext && (
          <div
            id={`${uniqueId}-description`}
            className={getCheckboxSubtextClassNames(size, isDisabled)}
          >
            {subtext}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
