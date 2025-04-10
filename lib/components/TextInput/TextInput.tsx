import { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";

import { TextInputProps } from './types';
import {
  getInputBaseClasses,
  getInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
  getSlotClasses,
} from './utils';
import { themeConfig } from '../../themeConfig';

const inputTheme = themeConfig.euler.input;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  leftSlot,
  mandatory = false,
  placeholder = "Enter your email",
  rightSlot,
  size = 'md',
  state = 'default',
  sublabel = "(optional)",
  value,
  infoTooltip,
  successMessage,
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
      <div className={getInputBaseClasses(size, state)}>
        {/* Left Slot */}
        {leftSlot && (
          <div className={getSlotClasses('left')}>
            {leftSlot}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          className={getInputClasses(state, leftSlot, rightSlot)}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          defaultValue={value}
          {...props}
        />

        {/* Right Slot */}
        {rightSlot && (
          <div className={getSlotClasses('right')}>
            {rightSlot}
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

TextInput.displayName = 'TextInput';

export default TextInput; 