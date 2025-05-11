import React, { forwardRef, useState } from 'react';
import { SwitchGroupProps } from './types';
import { getSwitchGroupClassNames, getSwitchGroupLabelClassNames } from './utils';
import { cn } from '../../utils';
import Switch from './Switch';
import { SwitchProps } from './types';

const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      id,
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
    const [internalValues, setInternalValues] = useState<string[]>(defaultValue);

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : internalValues;

    const isSwitchElement = (
      child: React.ReactElement
    ): child is React.ReactElement<SwitchProps> => {
      return child.type === Switch;
    };

    const enhancedChildren = React.Children.map(children, child => {
      // Make sure the child is a valid element
      if (!React.isValidElement(child)) return child;

      // Only modify Switch components
      if (isSwitchElement(child)) {
        const childValue = child.props.value;

        if (!childValue) return child;

        return React.cloneElement(child, {
          isChecked: values.includes(childValue),
          onChange: (checked: boolean) => {
            let newValues: string[];

            if (checked) {
              newValues = [...values, childValue];
            } else {
              newValues = values.filter(v => v !== childValue);
            }

            // Update internal state if uncontrolled
            if (!isControlled) {
              setInternalValues(newValues);
            }

            if (child.props.onChange) {
              child.props.onChange(checked);
            }

            // Call group onChange if provided
            if (onChange) {
              onChange(newValues);
            }
          },
          name: name,
          isDisabled: isDisabled || child.props.isDisabled,
        });
      }

      return child;
    });

    return (
      <div className={cn(getSwitchGroupClassNames(className))} ref={ref} role="group" id={id}>
        {label && <div className={getSwitchGroupLabelClassNames()}>{label}</div>}
        {enhancedChildren}
      </div>
    );
  }
);

SwitchGroup.displayName = 'SwitchGroup';

export default SwitchGroup;
