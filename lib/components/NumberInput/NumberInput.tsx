import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import { HelpCircle, DollarSign } from 'lucide-react';
import { Tooltip } from "../../main";
import { ChevronIcon } from './ChevronIcon';

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
} from './utils';
import { themeConfig } from '../../themeConfig';

const { textInput: inputTheme } = themeConfig.euler;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  leftSlot = <DollarSign className="text-gray-400 w-4 h-4" />,
  mandatory = false,
  placeholder = "Add your number",
  rightSlot,
  size = 'md',
  state = 'default',
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
  const [inputValue, setInputValue] = useState<string>(value === undefined ? '' : String(value));
  
  // Sync with external value when it changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(String(value));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    
    if (newInputValue === '') {
      onChange?.(null as unknown as number);
    } else {
      const numValue = Number(newInputValue);
      if (!isNaN(numValue)) {
        onChange?.(numValue);
      }
    }
  };

  const handleStepperClick = useCallback((direction: 'up' | 'down') => {
    if (state === 'disabled') return;
    
    // Get the current value from the input field or fall back to value prop
    const currentValue = inputValue !== '' ? Number(inputValue) : (value ?? 0);
    const newValue = direction === 'up' ? currentValue + step : currentValue - step;
    
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    
    // Update both states
    setInputValue(String(newValue));
    onChange?.(newValue);
  }, [inputValue, value, step, min, max, onChange, state]);

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
      <div className={`${getInputBaseClasses(size, state, leftSlot, rightSlot)} overflow-hidden`}>
        {/* Left Slot */}
        {leftSlot && (
          <div className={getSlotClasses('left')}>
            {leftSlot}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="number"
          className={`${getInputClasses(state)} ${getNumberInputClasses()}`}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          value={inputValue}
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
          {...props}
        />

        {/* Right Slot with Stepper */}
        <div className="flex items-center">
          {rightSlot && (
            <div className={getSlotClasses('right')}>
              {rightSlot}
            </div>
          )}
          {showStepper && (
            <div className={getStepperClasses()}>
              <button
                type="button"
                className={getStepperButtonClasses()}
                onClick={() => handleStepperClick('up')}
                disabled={
                  state === 'disabled' || 
                  (max !== undefined && 
                   Number(inputValue || 0) >= max)
                }
              >
                <ChevronIcon direction="up" className={getStepperIconClasses()} />
              </button>
              <button
                type="button"
                className={getStepperButtonClasses(true)}
                onClick={() => handleStepperClick('down')}
                disabled={
                  state === 'disabled' || 
                  (min !== undefined && 
                   Number(inputValue || 0) <= min)
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