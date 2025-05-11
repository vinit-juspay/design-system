import { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { TooltipV2 } from '../../main';
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
  getSlotClasses,
  SlotPosition,
} from '../TextInput/utils';
import { getUnitClasses } from './utils';
import { themeConfig } from '../../themeConfig';

const { input: inputTheme } = themeConfig.euler;
const { unitInput: unitInputTheme } = themeConfig.euler;

const UnitInput = forwardRef<HTMLInputElement, UnitInputProps>(
  (
    {
      hintText,
      label,
      leftSlot,
      rightSlot,
      mandatory = false,
      placeholder = 'Placeholder Text',
      size = TextInputSize.MEDIUM,
      state = TextInputState.DEFAULT,
      sublabel,
      unitPosition = UnitPosition.SUFFIX,
      unitText,
      value,
      infoTooltip,
      successMessage,
      errorMessage,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    // Use the custom hook for state management
    const inputState = useInputState({
      initialState: state,
    });

      // Composite handlers
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    inputState.handleFocus();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    inputState.handleBlur();
    onBlur?.(e);
  };

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
              <TooltipV2   size={TooltipSize.LARGE} content={infoTooltip}>
                <button type="button" aria-label="More information" className="focus:outline-none">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </TooltipV2>
            )}
          </div>
        )}

        {/* Input Base */}
        <div className={`${getInputBaseClasses(size, inputState.visualState)}`}>
          {/* Prefix Unit */}
          {unitText && unitPosition === UnitPosition.PREFIX && (
            <div className={getUnitClasses(UnitPosition.PREFIX, inputState.visualState)}>
              {unitText}
            </div>
          )}

          <div className={unitInputTheme.container}>
            {leftSlot && <div className={getSlotClasses(SlotPosition.LEFT)}>{leftSlot}</div>}

            {/* Input */}
            <input
              ref={ref}
              type='text'
              className={getInputClasses(
                inputState.visualState,
                leftSlot,
                rightSlot
              )}
              placeholder={placeholder}
              disabled={state === TextInputState.DISABLED}
              defaultValue={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={onChange}
              {...props}
            />

            {rightSlot && <div className={getSlotClasses(SlotPosition.RIGHT)}>{rightSlot}</div>}
          </div>

          {/* Suffix Unit */}
          {unitText && unitPosition === UnitPosition.SUFFIX && (
            <div className={getUnitClasses(UnitPosition.SUFFIX, inputState.visualState)}>
              {unitText}
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

UnitInput.displayName = 'UnitInput';

export default UnitInput;
