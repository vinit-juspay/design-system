import React, { forwardRef, useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from "../../main";

import { OTPInputProps } from './types';
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
  digits = '6',
  hintText = "Enter the verification code sent to your device",
  label = "Verification Code",
  mandatory = false,
  showHint = true,
  showInfo = false,
  showLabel = true,
  showSublabel = true,
  state = 'default',
  sublabel = "(required)",
  value = '',
  onChange,
  infoTooltip,
  ...props
}, ref) => {
  const [otp, setOtp] = useState<string[]>(Array(parseInt(digits)).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = Array(parseInt(digits)).fill(null);
  }, [digits]);

  // Sync with external value if provided
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, parseInt(digits));
      setOtp(valueArray.concat(Array(parseInt(digits) - valueArray.length).fill('')));
    }
  }, [value, digits]);

  // Notify parent of changes
  useEffect(() => {
    const otpValue = otp.join('');
    if (onChange) {
      onChange(otpValue);
    }
  }, [otp, onChange]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
      setFocusedIndex(index);
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
    if (e.key === 'Backspace') {
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
    if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    }
    
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < parseInt(digits) - 1) {
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
          <div className="flex items-center gap-1">
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
          {showInfo && infoTooltip && <Tooltip size='lg' content={infoTooltip}>
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
          let inputState = state;
          if (index === focusedIndex) {
            inputState = 'focused';
          } else if (otp[index]) {
            inputState = 'filled';
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
              className={getDigitInputClasses(inputState)}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => { setFocusedIndex(index); }}
              onBlur={() => { 
                if (focusedIndex === index) {
                  setFocusedIndex(-1);
                }
              }}
              disabled={state === 'disabled'}
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