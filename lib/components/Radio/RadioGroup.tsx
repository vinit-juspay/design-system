import { forwardRef, useState, useEffect } from 'react';
import { RadioGroupProps } from './types';
import { RadioGroupContext } from './RadioGroupContext';
import { getRadioGroupClassNames, getRadioGroupLabelClassNames } from './utils';
import { cn } from '../../utils';

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
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
    
    useEffect(() => {
      if (!isControlled && defaultValue !== undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);
    
    const handleChange = (data: { name: string; value: string }) => {
      if (isDisabled) return;
      
      if (!isControlled) {
        setInternalValue(data.value);
      }
      
      if (onChange) {
        onChange(data);
      }
    };

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange: handleChange, isDisabled }}>
        <div className={cn(getRadioGroupClassNames(className))} ref={ref} role="radiogroup">
          {label && (
            <div className={getRadioGroupLabelClassNames()}>{label}</div>
          )}
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup; 