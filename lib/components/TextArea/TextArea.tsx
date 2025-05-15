import { forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { TooltipV2 } from '../../main';
import { TooltipSize } from '../Tooltip/types';
import { useInputState } from '../../hooks';

import { TextAreaProps } from './types';
import { TextInputState } from '../TextInput/types';
import {
  getTextAreaContainerClasses,
  getTextAreaClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
} from './utils';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

const { input: inputTheme } = themeConfig.euler;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      hintText,
      label,
      mandatory = false,
      placeholder = 'Enter your text here',
      rows = 4,
      state = TextInputState.DEFAULT,
      sublabel,
      value,
      onChange,
      onBlur,
      onFocus,
      infoTooltip,
      successMessage,
      errorMessage,
      className,
      ...props
    },
    ref
  ) => {
    // Use the custom hook for visual state management
    const inputState = useInputState({
      initialState: state,
    });

    // Composite handlers
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      inputState.handleFocus();
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      inputState.handleBlur();
      onBlur?.(e);
    };

    return (
      <div className={getTextAreaContainerClasses()}>
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
              <TooltipV2 size={TooltipSize.LARGE} content={infoTooltip}>
                <button type="button" aria-label="More information" className="focus:outline-none">
                  <HelpCircle className="w-3.5 h-3.5 text-jp-gray-400" />
                </button>
              </TooltipV2>
            )}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          placeholder={placeholder}
          disabled={state === TextInputState.DISABLED}
          defaultValue={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          className={cn(getTextAreaClasses(inputState.visualState), className)}
          {...props}
        />

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

TextArea.displayName = 'TextArea';

export default TextArea;
