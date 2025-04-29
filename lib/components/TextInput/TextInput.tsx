import { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";
import { TooltipSize } from '../Tooltip/types';
import { useInputState } from '../../hooks';

import { TextInputProps, TextInputSize, TextInputState } from './types';
import {
  getInputBaseClasses,
  getInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
  getSlotClasses,
  SlotPosition
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
  size = TextInputSize.MEDIUM,
  state = TextInputState.DEFAULT,
  sublabel = "(optional)",
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
      <div className={getInputBaseClasses(size, inputState.visualState, leftSlot, rightSlot)}>
        {/* Left Slot */}
        {leftSlot && (
          <div className={getSlotClasses(SlotPosition.LEFT)}>
            {leftSlot}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          className={getInputClasses(inputState.visualState, leftSlot, rightSlot)}
          placeholder={placeholder}
          disabled={state === TextInputState.DISABLED}
          defaultValue={value}
          onFocus={inputState.handleFocus}
          onBlur={inputState.handleBlur}
          onChange={(e) => inputState.updateValue(e.target.value)}
          {...props}
        />

        {/* Right Slot */}
        {rightSlot && (
          <div className={getSlotClasses(SlotPosition.RIGHT)}>
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