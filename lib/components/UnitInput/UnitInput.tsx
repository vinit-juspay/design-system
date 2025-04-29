import React, { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";
import { TooltipSize } from '../Tooltip/types';
import { TextInputSize, TextInputState } from '../TextInput/types';
import { useInputState } from '../../hooks';

import { UnitInputProps, UnitPosition } from './types';
import {
  getInputBaseClasses,
  getInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
} from '../TextInput/utils';
import {
  getUnitClasses,
} from './utils';
import { themeConfig } from '../../themeConfig';

const { input: inputTheme } = themeConfig.euler;

const UnitInput = forwardRef<HTMLInputElement, UnitInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  mandatory = false,
  placeholder = "Enter amount",
  showUnit = true,
  size = TextInputSize.MEDIUM,
  state = TextInputState.DEFAULT,
  sublabel = "(optional)",
  unitPosition = UnitPosition.SUFFIX,
  unitText = "cm",
  value,
  infoTooltip,
  successMessage,
  ...props
}, ref) => {
  // Use the custom hook for state management
  const inputState = useInputState({
    initialState: state,
    initialValue: value || ''
  });

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <label className={getLabelClasses()}>
              {label} {mandatory && (
              <sup className={inputTheme.label.mandatory}>*</sup>
            )}
            </label>
            {sublabel && (
              <small className={getSublabelClasses()}>
                {sublabel}
              </small>
            )}
          </div>
          {infoTooltip && <Tooltip size={TooltipSize.LARGE} content={infoTooltip}>
            <button type="button" aria-label="More information" className="focus:outline-none">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </Tooltip>}
        </div>
      )}

      {/* Input Base */}
      <div className={`${getInputBaseClasses(size, inputState.visualState)} overflow-hidden`}>
        {/* Prefix Unit */}
        {showUnit && unitPosition === UnitPosition.PREFIX && (
          <div className={getUnitClasses(UnitPosition.PREFIX, state)}>
            {unitText}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={getInputClasses(
            inputState.visualState,
            showUnit && unitPosition === UnitPosition.PREFIX ? <div>unit</div> : undefined,
            showUnit && unitPosition === UnitPosition.SUFFIX ? <div>unit</div> : undefined
          )}
          placeholder={placeholder}
          disabled={state === TextInputState.DISABLED}
          defaultValue={value}
          onFocus={inputState.handleFocus}
          onBlur={inputState.handleBlur}
          onChange={(e) => inputState.updateValue(e.target.value)}
          {...props}
        />

        {/* Suffix Unit */}
        {showUnit && unitPosition === UnitPosition.SUFFIX && (
          <div className={getUnitClasses(UnitPosition.SUFFIX, state)}>
            {unitText}
          </div>
        )}
      </div>

      {/* Hint Text */}
      {successMessage && (
        <span className={getHintClasses(state)}>
          {successMessage}
        </span>
      )}
      {hintText && !successMessage && (
        <span className={getHintClasses(state)}>
          {hintText}
        </span>
      )}
    </div>
  );
});

UnitInput.displayName = 'UnitInput';

export default UnitInput; 