import { forwardRef, useState, useEffect } from 'react';
import { SwitchGroupProps } from './types';
import { SwitchGroupContext } from './SwitchGroupContext';
import { getSwitchGroupClassNames, getSwitchGroupLabelClassNames } from './utils';
import { cn } from '../../utils';

const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      label,
      name,
      defaultValue = [],
      value: controlledValue,
      children,
      onChange,
      className,
      isDisabled = false,
    },
    ref
  ) => {
    const [internalValues, setInternalValues] = useState<string[]>(() => defaultValue);

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : internalValues;

    useEffect(() => {
      if (
        !isControlled &&
        defaultValue !== undefined &&
        JSON.stringify(defaultValue) !== JSON.stringify(internalValues)
      ) {
        setInternalValues(defaultValue);
      }
    }, [defaultValue, isControlled, internalValues]);

    const handleChange = (data: { name: string; value: string; checked: boolean }) => {
      if (isDisabled) return;

      if (!isControlled) {
        if (data.checked) {
          setInternalValues(prev => [...prev, data.value]);
        } else {
          setInternalValues(prev => prev.filter(v => v !== data.value));
        }
      }

      if (onChange) {
        const newValues = data.checked
          ? [...values, data.value]
          : values.filter(v => v !== data.value);

        onChange({ name: data.name, values: newValues });
      }
    };

    return (
      <SwitchGroupContext.Provider value={{ name, values, onChange: handleChange, isDisabled }}>
        <div className={cn(getSwitchGroupClassNames(className))} ref={ref} role="group">
          {label && <div className={getSwitchGroupLabelClassNames()}>{label}</div>}
          {children}
        </div>
      </SwitchGroupContext.Provider>
    );
  }
);

SwitchGroup.displayName = 'SwitchGroup';

export default SwitchGroup;
