import React, { forwardRef, useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { Tooltip } from "../../main";
import { TooltipSize } from '../Tooltip/types';
import { useInputState } from '../../hooks';

import { TextAreaProps } from "./types";
import { TextInputState } from '../TextInput/types';
import {
  getTextAreaContainerClasses,
  getTextAreaClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
} from "./utils";
import { themeConfig } from "../../themeConfig";

const { input: inputTheme } = themeConfig.euler;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      hintText = "This is a hint text to help user",
      label = "Your Label",
      mandatory = false,
      placeholder = "Enter your text here",
      rows = 4,
      showHint = true,
      showInfo = false,
      showLabel = true,
      showSublabel = true,
      state = TextInputState.DEFAULT,
      sublabel = "(optional)",
      value = "",
      onChange,
      infoTooltip,
      maxLength,
      ...props
    },
    ref
  ) => {
    // Maintain internal state for character count
    const [textValue, setTextValue] = useState(value);

    // Use the custom hook for visual state management
    const inputState = useInputState({
      initialState: state,
      initialValue: value
    });

    // Sync with external value if provided
    useEffect(() => {
      setTextValue(value);
      inputState.updateValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setTextValue(newValue);
      inputState.updateValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div className={getTextAreaContainerClasses()}>
        {/* Label */}
        {showLabel && label && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <label className={getLabelClasses()}>
                {label}{" "}
                {mandatory && (
                  <sup className={inputTheme.label.mandatory}>*</sup>
                )}
              </label>
              {showSublabel && sublabel && (
                <small className={getSublabelClasses()}>{sublabel}</small>
              )}
            </div>
            {showInfo && infoTooltip && (
              <Tooltip
                size={TooltipSize.LARGE}
                content={infoTooltip}>
                <button
                  type="button"
                  aria-label="More information"
                  className="focus:outline-none">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </Tooltip>
            )}
          </div>
        )}

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={ref}
            className={getTextAreaClasses(inputState.visualState)}
            placeholder={placeholder}
            disabled={state === TextInputState.DISABLED}
            defaultValue={textValue}
            onChange={handleChange}
            onFocus={inputState.handleFocus}
            onBlur={inputState.handleBlur}
            rows={rows}
            maxLength={maxLength}
            {...props}
          />
          
          {/* Character count if maxLength is specified */}
          {maxLength && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {textValue.length}/{maxLength}
            </div>
          )}
        </div>

        {/* Hint Text */}
        {showHint && hintText && (
          <span className={getHintClasses(state)}>{hintText}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
