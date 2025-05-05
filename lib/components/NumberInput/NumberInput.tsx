import React, { forwardRef, useCallback, useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../main';
import { ChevronIcon } from './ChevronIcon';
import { TooltipSize } from '../Tooltip/types';
import { TextInputSize, TextInputState } from '../TextInput/types';
import { SlotPosition } from '../TextInput/utils';
import { useInputState } from '../../hooks';

import { NumberInputProps, StepperDirection } from './types';
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

const { input: inputTheme } = themeConfig.euler;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      hintText,
      label,
      leftSlot,
      mandatory = false,
      placeholder = 'Placeholder Text',
      rightSlot,
      size = TextInputSize.MEDIUM,
      state = TextInputState.DEFAULT,
      sublabel,
      value,
      infoTooltip,
      successMessage,
      errorMessage,
      min,
      max,
      step = 1,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Use the custom hook for state management
    const inputState = useInputState({
      initialState: state,
      initialValue: value !== undefined ? String(value) : '',
    });

    const showStepper = step !== undefined && step > 0;

    // Connect the forwarded ref with our local ref
    const setInputRef = useCallback((el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    }, [ref]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
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

    // Composite handlers
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      inputState.handleFocus();
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      inputState.handleBlur();
      onBlur?.(e);
    };

    const handleStepperClick = useCallback(
      (direction: StepperDirection) => {
        if (state === TextInputState.DISABLED) return;

        // Focus the input when using stepper
        if (inputRef.current) {
          inputRef.current.focus();
        }

        // Get the current value from the input field or fall back to value prop
        const currentValue =
          inputRef.current?.value !== '' ? Number(inputRef.current?.value) : (value ?? 0);

        const newValue =
          direction === StepperDirection.UP ? currentValue + step : currentValue - step;

        if (min !== undefined && newValue < min) return;
        if (max !== undefined && newValue > max) return;

        // Update input value
        if (inputRef.current) {
          inputRef.current.value = String(newValue);
          inputState.updateValue(String(newValue));
        }

        onChange?.(newValue);
      },
      [inputState, min, max, onChange, step, state, value]
    );

    return (
      <div className={inputTheme.container}>
        {/* Label */}
        {label && (
          <div className={inputTheme.label.container}>
            <div className={inputTheme.label.labelwSublabel}>
              <label className={getLabelClasses()}>
                {label} {mandatory && <sup className={inputTheme.label.mandatory}>*</sup>}
              </label>
              {sublabel && <small className={getSublabelClasses()}>{sublabel}</small>}
            </div>
            {infoTooltip && (
              <Tooltip size={TooltipSize.LARGE} content={infoTooltip}>
                <button type="button" aria-label="More information" className="focus:outline-none">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </Tooltip>
            )}
          </div>
        )}

        {/* Input Base */}
        <div className={getInputBaseClasses(size, inputState.visualState)}>
          {/* Left Slot */}
          {leftSlot && <div className={getSlotClasses(SlotPosition.LEFT)}>{leftSlot}</div>}

          {/* Input */}
          <input
            ref={setInputRef}
            type="number"
            className={`${getInputClasses(inputState.visualState, leftSlot, showStepper || rightSlot ? <div /> : undefined)} ${getNumberInputClasses()}`}
            placeholder={placeholder}
            disabled={state === TextInputState.DISABLED}
            defaultValue={value}
            min={min}
            max={max}
            step={step}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputMode="numeric"
            {...props}
          />

          {rightSlot && <div className={getSlotClasses(SlotPosition.RIGHT)}>{rightSlot}</div>}
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
                  (max !== undefined && Number(inputRef.current?.value || 0) >= max)
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
                  (min !== undefined && Number(inputRef.current?.value || 0) <= min)
                }
              >
                <ChevronIcon direction="down" className={getStepperIconClasses()} />
              </button>
            </div>
          )}
        </div>

        {/* Message based on state */}
        {state === TextInputState.ERROR && errorMessage && (
          <span className={getHintClasses(state)}>{errorMessage}</span>
        )}
        {state === TextInputState.SUCCESS && successMessage && (
          <span className={getHintClasses(state)}>{successMessage}</span>
        )}
        {state !== TextInputState.ERROR && state !== TextInputState.SUCCESS && hintText && (
          <span className={getHintClasses(state)}>{hintText}</span>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
