import React, { forwardRef, useState } from 'react';
import { RadioGroupProps } from './types';
import { getRadioGroupClassNames, getRadioGroupLabelClassNames } from './utils';
import { cn } from '../../utils';
import Radio from './Radio';
import { RadioProps } from './types';

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      id,
      label,
      name,
      defaultValue,
      value: controlledValue,
      children,
      onChange,
      className,
      isDisabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const isRadioElement = (
      child: React.ReactElement
    ): child is React.ReactElement<RadioProps> => {
      return child.type === Radio;
    };

    const enhancedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      if (isRadioElement(child)) {
        const childValue = child.props.value;
        
        if (!childValue) return child;
        
        return React.cloneElement(child, {
          isChecked: value === childValue,
          onChange: (checked: boolean) => {
            if (checked) {
              // Update internal state if uncontrolled
              if (!isControlled) {
                setInternalValue(childValue);
              }

              if (child.props.onChange) {
                child.props.onChange(checked);
              }

              // Call group onChange if provided
              if (onChange) {
                onChange(childValue);
              }
            }
          },
          name,
          isDisabled: isDisabled || child.props.isDisabled,
        });
      }
      
      return child;
    });

    return (
      <div className={cn(getRadioGroupClassNames(className))} ref={ref} role="radiogroup" id={id}>
        {label && <div className={getRadioGroupLabelClassNames()}>{label}</div>}
        {enhancedChildren}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
