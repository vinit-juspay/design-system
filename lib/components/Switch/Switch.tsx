import * as React from 'react';
import { SwitchProps, SwitchSize } from './types';
import {
  getSwitchRootClassNames,
  getSwitchThumbClassNames,
  getSwitchLabelClassNames,
  getSwitchContainerClassNames,
  getSwitchRightSlotClassNames,
  getSwitchSubtextClassNames,
  getSwitchContentWrapperClassNames,
} from './utils';
import { cn } from '../../utils';

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      id,
      isChecked,
      defaultChecked = false,
      onChange,
      isDisabled = false,
      size = SwitchSize.MEDIUM,
      label,
      subtext,
      rightSlot,
      className = '',
      name,
      value,
      accessibilityLabel,
    },
    ref
  ) => {
    // Use internal state for uncontrolled component
    const [checkedState, setCheckedState] = React.useState(defaultChecked);

    // Determine if component is controlled
    const isControlled = isChecked !== undefined;
    const checked = isControlled ? isChecked : checkedState;

    const handleToggle = () => {
      if (isDisabled) return;

      const newChecked = !checked;

      // Update internal state if uncontrolled
      if (!isControlled) {
        setCheckedState(newChecked);
      }

      // Call onChange callback
      if (onChange) {
        onChange(newChecked);
      }
    };

    const uniqueId = id || (value ? `switch-${value}` : `switch-${React.useId()}`);

    return (
      <div className={cn(getSwitchContainerClassNames(), className)}>
        <div className={getSwitchContentWrapperClassNames()}>
          <button
            ref={ref}
            type="button"
            role="switch"
            id={uniqueId}
            aria-checked={checked}
            aria-label={accessibilityLabel}
            aria-labelledby={label ? `${uniqueId}-label` : undefined}
            aria-describedby={subtext ? `${uniqueId}-description` : undefined}
            disabled={isDisabled}
            onClick={handleToggle}
            className={getSwitchRootClassNames(size, isDisabled, checked)}
            value={value}
            name={name}
          >
            <div className={getSwitchThumbClassNames(size, checked)} />
          </button>

          {label && (
            <label
              id={`${uniqueId}-label`}
              htmlFor={uniqueId}
              className={getSwitchLabelClassNames(size, isDisabled)}
            >
              {label}
            </label>
          )}

          {rightSlot && <span className={getSwitchRightSlotClassNames()}>{rightSlot}</span>}
        </div>

        {subtext && (
          <div
            id={`${uniqueId}-description`}
            className={getSwitchSubtextClassNames(size, isDisabled)}
          >
            {subtext}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
