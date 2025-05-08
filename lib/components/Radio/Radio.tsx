import * as React from 'react';
import { RadioProps, RadioSize } from './types';
import {
  getRadioWrapperClassNames,
  getRadioInputClassNames,
  getRadioLabelClassNames,
  getRadioSubtextClassNames,
  getRadioRightSlotClassNames,
  getRadioContentWrapperClassNames,
} from './utils';
import { cn } from '../../utils';

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      value,
      isChecked,
      defaultChecked = false,
      onChange,
      isDisabled = false,
      size = RadioSize.MEDIUM,
      children,
      subtext,
      rightSlot,
      className = '',
      name,
      accessibilityLabel,
    },
    ref
  ) => {
    // Use internal state for uncontrolled component
    const [checkedState, setCheckedState] = React.useState(defaultChecked);
    
    // Determine if component is controlled
    const isControlled = isChecked !== undefined;
    const checked = isControlled ? isChecked : checkedState;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;

      const newChecked = e.target.checked;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setCheckedState(newChecked);
      }

      // Call onChange callback
      if (onChange) {
        onChange(newChecked);
      }
    };

    const uniqueId = id || (value ? `radio-${value}` : `radio-${React.useId()}`);

    return (
      <div className={cn(getRadioWrapperClassNames(), className)}>
        <div className={getRadioContentWrapperClassNames()}>
          <input
            ref={ref}
            type="radio"
            id={uniqueId}
            name={name}
            value={value}
            checked={checked}
            disabled={isDisabled}
            onChange={handleChange}
            aria-label={accessibilityLabel}
            aria-labelledby={children ? `${uniqueId}-label` : undefined}
            aria-describedby={subtext ? `${uniqueId}-description` : undefined}
            className={getRadioInputClassNames(size, isDisabled)}
          />

          {children && (
            <label
              id={`${uniqueId}-label`}
              htmlFor={uniqueId}
              className={getRadioLabelClassNames(size, isDisabled)}
            >
              {children}
            </label>
          )}

          {rightSlot && <span className={getRadioRightSlotClassNames()}>{rightSlot}</span>}
        </div>

        {subtext && (
          <div
            id={`${uniqueId}-description`}
            className={getRadioSubtextClassNames(size, isDisabled)}
          >
            {subtext}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
