import React, { forwardRef, useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { Tooltip } from "../../main";

import { TextAreaProps } from "./types";
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
      state = "default",
      sublabel = "(optional)",
      value = "",
      onChange,
      infoTooltip,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [textValue, setTextValue] = useState(value);

    // Sync with external value if provided
    useEffect(() => {
      setTextValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setTextValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    };

    // Determine the current visual state
    const visualState = isFocused
      ? "focused"
      : state === "default" && textValue
      ? "filled"
      : state;

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
                size="lg"
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

        <textarea
          ref={ref}
          className={getTextAreaClasses(visualState)}
          placeholder={placeholder}
          disabled={state === "disabled"}
          defaultValue={textValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          maxLength={maxLength}
          {...props}
        />

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
