import React, { forwardRef } from 'react';
import { HelpCircle, Search } from 'lucide-react';
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

const textInputTheme = themeConfig.euler.textInput;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  leftSlot = <Search className="text-gray-400 w-4 h-4" />,
  mandatory = false,
  placeholder = "Search",
  rightSlot = <Search className="text-gray-400 w-4 h-4" />,
  showHint = true,
  showLabel = true,
  showLeftSlot = true,
  showRightSlot = true,
  showSublabel = false,
  size = 'md',
  state = 'default',
  sublabel = "(optional)",
  ...props
}, ref) => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      {showLabel && (
        <div className={textInputTheme.label.wrapper}>
          <div className={textInputTheme.label.group}>
            <label className={getLabelClasses(mandatory)}>
              {label}
            </label>
            {showSublabel && (
              <span className={getSublabelClasses()}>
                {sublabel}
              </span>
            )}
            {mandatory && (
              <span className="text-red-500">*</span>
            )}
          </div>
          <Tooltip size='lg' content="Additional information about this field">
            <button type="button" aria-label="More information" className="focus:outline-none">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Input Base */}
      <div className={getInputBaseClasses(size, state, showLeftSlot, showRightSlot)}>
        {/* Left Slot */}
        {showLeftSlot && leftSlot && (
          <div className={getSlotClasses('left')}>
            {leftSlot}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          className={getInputClasses()}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          {...props}
        />

        {/* Right Slot */}
        {showRightSlot && rightSlot && (
          <div className={getSlotClasses('right')}>
            {rightSlot}
          </div>
        )}
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

TextInput.displayName = 'TextInput';

export default TextInput; 