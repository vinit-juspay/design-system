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
import { SwitchGroupContext } from './SwitchGroupContext';
import { cn } from '../../utils';

/**
 * Switch component for toggling settings or options
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      value,
      checked = false,
      onCheckedChange,
      disabled = false,
      size = SwitchSize.MEDIUM,
      label,
      subtext,
      rightSlot,
      className = '',
      name: propName,
      onChange,
    },
    ref
  ) => {
    const switchGroup = React.useContext(SwitchGroupContext);
    
    const name = switchGroup?.name || propName;
    const isChecked = switchGroup?.values && value ? switchGroup.values.includes(value) : checked;
    const isGroupDisabled = switchGroup?.isDisabled || false;
    const finalDisabled = disabled || isGroupDisabled;

    const handleToggle = () => {
      if (finalDisabled) return;

      const newChecked = !isChecked;

      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }

      if (switchGroup?.onChange && value) {
        switchGroup.onChange({ name: name || '', value, checked: newChecked });
      }

      if (onChange) {
        const event = {
          target: {
            name,
            value,
            checked: newChecked,
          },
          preventDefault: () => {},
          stopPropagation: () => {},
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

    const uniqueId = value ? `switch-${value}` : `switch-${React.useId()}`;

    return (
      <div className={cn(getSwitchContainerClassNames(), className)}>
        <div className={getSwitchContentWrapperClassNames()}>
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-labelledby={label ? `${uniqueId}-label` : undefined}
            disabled={finalDisabled}
            id={uniqueId}
            onClick={handleToggle}
            className={getSwitchRootClassNames(size, finalDisabled, isChecked)}
          >
            <div className={getSwitchThumbClassNames(size, isChecked)} />
          </button>

          {label && (
            <label
              id={`${uniqueId}-label`}
              htmlFor={uniqueId}
              className={getSwitchLabelClassNames(size, finalDisabled)}
            >
              {label}
            </label>
          )}

          {rightSlot && (
            <span className={getSwitchRightSlotClassNames()}>
              {rightSlot}
            </span>
          )}
        </div>

        {/* Second row: subtext only - matching Radio's pattern */}
        {subtext && (
          <div className={getSwitchSubtextClassNames(size, finalDisabled)}>{subtext}</div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
