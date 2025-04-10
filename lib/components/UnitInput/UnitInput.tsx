import { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";

import { UnitInputProps } from './types';
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
  placeholder = "Enter value",
  size = 'md',
  state = 'default',
  sublabel = "(optional)",
  value,
  infoTooltip,
  successMessage,
  unitText = "kg",
  unitPosition = "suffix",
  showUnit = true,
  ...props
}, ref) => {
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
          {infoTooltip && <Tooltip size='lg' content={infoTooltip}>
            <button type="button" aria-label="More information" className="focus:outline-none">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </Tooltip>}
        </div>
      )}

      {/* Input Base */}
      <div className={`${getInputBaseClasses(size, state)} overflow-hidden`}>
        {/* Prefix Unit */}
        {showUnit && unitPosition === 'prefix' && (
          <div className={getUnitClasses('prefix', state)}>
            {unitText}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={getInputClasses(
            state,
            showUnit && unitPosition === 'prefix' ? <div>unit</div> : undefined,
            showUnit && unitPosition === 'suffix' ? <div>unit</div> : undefined
          )}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          defaultValue={value}
          {...props}
        />

        {/* Suffix Unit */}
        {showUnit && unitPosition === 'suffix' && (
          <div className={getUnitClasses('suffix', state)}>
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