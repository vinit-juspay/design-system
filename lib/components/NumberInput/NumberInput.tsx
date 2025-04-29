import React, { forwardRef, useCallback, useState, useEffect, useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";
import { ChevronIcon } from './ChevronIcon';
import { TooltipSize } from '../Tooltip/types';
import { TextInputSize, TextInputState } from '../TextInput/types';
import { SlotPosition } from '../TextInput/utils';
import { useInputState } from '../../hooks';

import { NumberInputProps } from './types';
import {
  getInputBaseClasses,
  getInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
  getSlotClasses,
} from '../TextInput/utils';
import {
  getStepperClasses,
  getStepperButtonClasses,
  getStepperIconClasses,
  getNumberInputClasses,
  getRightSlotWithStepperClasses,
} from './utils';
import { themeConfig } from '../../themeConfig';

const { input: inputTheme } = themeConfig.euler;

// Create an enum for stepper directions to follow cursor rules
export enum StepperDirection {
  UP = 'up',
  DOWN = 'down',
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  leftSlot,
  mandatory = false,
  placeholder = "Add your number",
  rightSlot,
  size = TextInputSize.MEDIUM,
  state = TextInputState.DEFAULT,
  sublabel = "(optional)",
  value,
  infoTooltip,
  successMessage,
  showStepper = true,
  min,
  max,
  step = 1,
  onChange,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localInputValue, setLocalInputValue] = useState<string>(value === undefined ? '' : String(value));
  
  // Use the custom hook for state management
  const inputState = useInputState({
    initialState: state, 
    initialValue: localInputValue
  });

  // Sync with external value when it changes
  useEffect(() => {
    if (value !== undefined) {
      setLocalInputValue(String(value));
      inputState.updateValue(String(value));
    }
  }, [value]);

  // Connect the forwarded ref with our local ref
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalInputValue(newValue);
    inputState.updateValue(newValue);
    
    if (newValue === '') {
      onChange?.(undefined);
    } else {
      const numValue = Number(newValue);
      if (!isNaN(numValue)) {
        onChange?.(numValue);
      }
    }
  };

  const handleStepperClick = useCallback((direction: StepperDirection) => {
    if (state === TextInputState.DISABLED) return;
    
    // Focus the input when using stepper
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Get the current value from the input field or fall back to value prop
    const currentValue = localInputValue !== '' ? Number(localInputValue) : (value ?? 0);
    const newValue = direction === StepperDirection.UP ? currentValue + step : currentValue - step;
    
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    
    // Update both states
    setLocalInputValue(String(newValue));
    inputState.updateValue(String(newValue));
    onChange?.(newValue);
  }, [localInputValue, value, step, min, max, onChange, state]);

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
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
          </Tooltip>}
        </div>
      )}

      {/* Input Base */}
      <div className={`${getInputBaseClasses(size, inputState.visualState, leftSlot, rightSlot)} overflow-hidden`}>
        {/* Left Slot */}
        {leftSlot && (
          <div className={getSlotClasses(SlotPosition.LEFT)}>
            {leftSlot}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type="number"
          className={`${getInputClasses(inputState.visualState, leftSlot, showStepper || rightSlot ? <div /> : undefined)} ${getNumberInputClasses()}`}
          placeholder={placeholder}
          disabled={state === TextInputState.DISABLED}
          value={localInputValue}
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
          onFocus={inputState.handleFocus}
          onBlur={inputState.handleBlur}
          {...props}
        />

        {/* Right Slot with Stepper */}
        <div className="flex items-center">
          {rightSlot && (
            <div className={showStepper ? getRightSlotWithStepperClasses() : getSlotClasses(SlotPosition.RIGHT)}>
              {rightSlot}
            </div>
          )}
          {showStepper && (
            <div className={getStepperClasses()}>
              <button
                type="button"
                className={getStepperButtonClasses(false, size)}
                onClick={() => handleStepperClick(StepperDirection.UP)}
                onMouseDown={inputState.startInteraction}
                onMouseUp={inputState.endInteraction}
                onMouseLeave={inputState.endInteraction}
                disabled={
                  state === TextInputState.DISABLED || 
                  (max !== undefined && 
                   Number(localInputValue || 0) >= max)
                }
              >
                <ChevronIcon direction="up" className={getStepperIconClasses()} />
              </button>
              <button
                type="button"
                className={getStepperButtonClasses(true)}
                onClick={() => handleStepperClick(StepperDirection.DOWN)}
                onMouseDown={inputState.startInteraction}
                onMouseUp={inputState.endInteraction}
                onMouseLeave={inputState.endInteraction}
                disabled={
                  state === TextInputState.DISABLED || 
                  (min !== undefined && 
                   Number(localInputValue || 0) <= min)
                }
              >
                <ChevronIcon direction="down" className={getStepperIconClasses()} />
              </button>
            </div>
          )}
        </div>
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

NumberInput.displayName = 'NumberInput';

export default NumberInput; 