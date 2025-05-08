import React, { forwardRef, useContext } from 'react';
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
import { RadioGroupContext } from './RadioGroupContext';

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      checked,
      isDisabled = false,
      size = RadioSize.MEDIUM,
      children,
      subtext,
      rightSlot,
      className,
      name: propName,
      onChange: propOnChange,
    },
    ref
  ) => {
    // Get context from RadioGroup if available
    const radioGroup = useContext(RadioGroupContext);

    // Determine if controlled by RadioGroup or standalone
    const name = radioGroup?.name || propName;
    const isChecked = radioGroup?.value !== undefined ? radioGroup.value === value : checked;
    const isGroupDisabled = radioGroup?.isDisabled || false;
    const finalDisabled = isDisabled || isGroupDisabled;

    // Handle change events
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (finalDisabled) return;

      if (propOnChange) {
        propOnChange(e);
      }

      if (radioGroup?.onChange) {
        radioGroup.onChange({ name: name || '', value });
      }
    };

    return (
      <div className={cn(getRadioWrapperClassNames(), className)}>
        <div className={getRadioContentWrapperClassNames()}>
          <input
            ref={ref}
            type="radio"
            id={`radio-${value}`}
            name={name}
            value={value}
            checked={isChecked}
            disabled={finalDisabled}
            onChange={handleChange}
            className={getRadioInputClassNames(size, finalDisabled)}
          />

          <label
            htmlFor={`radio-${value}`}
            className={getRadioLabelClassNames(size, finalDisabled)}
          >
            {children}
          </label>

          {rightSlot && <span className={getRadioRightSlotClassNames()}>{rightSlot}</span>}
        </div>

        {/* Second row: subtext only */}
        {subtext && <div className={getRadioSubtextClassNames(size, finalDisabled)}>{subtext}</div>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
