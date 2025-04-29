import React, { forwardRef, useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";
import { TooltipSize } from '../Tooltip/types';
import { TextInputState } from '../TextInput/types';
import { useInputState } from '../../hooks';

import { OTPInputProps, OTPDigits, OTPKeyboardKey } from './types';
import {
  getOTPContainerClasses,
  getInputsContainerClasses,
  getDigitInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses
} from './utils';
import { themeConfig } from '../../themeConfig';

const { input: inputTheme } = themeConfig.euler;

const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(({
  digits = OTPDigits.SIX,
  hintText = "Enter the verification code sent to your device",
  label = "Verification Code",
  mandatory = false,
  showHint = true,
  showInfo = false,
  showLabel = true,
  showSublabel = true,
  state = TextInputState.DEFAULT,
  sublabel = "(required)",
  value = '',
  onChange,
  infoTooltip,
  ...props
}, ref) => {
  const [otp, setOtp] = useState<string[]>(Array(parseInt(digits)).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Use a single input state manager for the composite component
  const inputState = useInputState({
    initialState: state,
    initialValue: value
  });

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = Array(parseInt(digits)).fill(null);
  }, [digits]);

  // Sync with external value if provided
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, parseInt(digits));
      setOtp(valueArray.concat(Array(parseInt(digits) - valueArray.length).fill('')));
      inputState.updateValue(value);
    }
  }, [value, digits]);

  // Notify parent of changes
  useEffect(() => {
    const otpValue = otp.join('');
    if (onChange) {
      onChange(otpValue);
      inputState.updateValue(otpValue);
    }
  }, [otp, onChange]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
      setFocusedIndex(index);
      inputState.handleFocus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only take the last character if multiple characters are entered
    const digit = value.slice(-1);

    // Validate input is a digit
    if (digit && !/^\d$/.test(digit)) {
      return; // Ignore non-numeric input
    }
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    
    // Move focus to next input if a digit was entered
    if (digit && index < parseInt(digits) - 1) {
      // Use setTimeout to ensure state is updated before moving focus
      setTimeout(() => {
        focusInput(index + 1);
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === OTPKeyboardKey.BACKSPACE) {
      if (otp[index] === '') {
        // If current field is empty, move to previous field
        if (index > 0) {
          focusInput(index - 1);
          
          // Clear the previous field
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
    
    // Handle left arrow
    if (e.key === OTPKeyboardKey.LEFT && index > 0) {
      focusInput(index - 1);
    }
    
    // Handle right arrow
    if (e.key === OTPKeyboardKey.RIGHT && index < parseInt(digits) - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only process if we have data and it's numeric
    if (pastedData && /^[0-9]+$/.test(pastedData)) {
      // Convert to array and limit to our digit count
      const pastedArray = pastedData.split('').slice(0, parseInt(digits));
      
      // Fill the OTP array with the pasted digits
      const newOtp = [...Array(parseInt(digits)).fill('')];
      pastedArray.forEach((digit, idx) => {
        newOtp[idx] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = pastedArray.length < parseInt(digits) ? pastedArray.length : parseInt(digits) - 1;
      focusInput(nextEmptyIndex);
    }
  };

  return (
    <div ref={ref} className={getOTPContainerClasses()} {...props}>
      {/* Label */}
      {showLabel && label && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <label className={getLabelClasses()}>
              {label} {mandatory && (
              <sup className={inputTheme.label.mandatory}>*</sup>
            )}
            </label>
            {showSublabel && sublabel && (
              <small className={getSublabelClasses()}>
                {sublabel}
              </small>
            )}
          </div>
          {showInfo && infoTooltip && <Tooltip size={TooltipSize.LARGE} content={infoTooltip}>
            <button type="button" aria-label="More information" className="focus:outline-none">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </Tooltip>}
        </div>
      )}

      {/* OTP Input Fields */}
      <div className={getInputsContainerClasses(digits)}>
        {[...Array(parseInt(digits))].map((_, index) => {
          // Determine the appropriate state for this input
          let digitState = state;
          if (index === focusedIndex) {
            digitState = TextInputState.FOCUSED;
          } else if (otp[index]) {
            digitState = TextInputState.FILLED;
          }
          
          return (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              className={getDigitInputClasses(digitState)}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => { 
                setFocusedIndex(index);
                inputState.handleFocus();
              }}
              onBlur={() => { 
                if (focusedIndex === index) {
                  setFocusedIndex(-1);
                  inputState.handleBlur();
                }
              }}
              disabled={state === TextInputState.DISABLED}
              aria-label={`Digit ${index + 1}`}
            />
          );
        })}
      </div>

      {/* Hint Text */}
      {showHint && hintText && (
        <span className={getHintClasses(state)}>
          {hintText}
        </span>
      )}
    </div>
  );
});

OTPInput.displayName = 'OTPInput';

export default OTPInput; 