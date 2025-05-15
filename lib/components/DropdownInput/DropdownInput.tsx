import { forwardRef, useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { TooltipV2 } from '../../main';
import { TooltipSize } from '../Tooltip/types';
import { useInputState } from '../../hooks';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';

import {
  DropdownInputProps,
  DropdownInputSize,
  DropdownInputState,
  DropdownOption,
  DropdownPosition,
} from './types';
import {
  getInputBaseClasses,
  getInputClasses,
  getLabelClasses,
  getSublabelClasses,
  getHintClasses,
  getSlotClasses,
  getDropdownClasses,
  getDropdownOptionContainerClasses,
  getDropdownOptionLabelClasses,
  getDropdownOptionIconClasses,
  getDropdownChevronClasses,
  getDropdownPlaceholderClasses,
  getInputWithLeftPaddingClasses,
  getDropdownMenuClasses,
  getDropdownMenuItemClasses,
  getDropdownMenuItemContentClasses,
  getDropdownMenuItemIconClasses,
  getDropdownMenuItemTextClasses,
  getDropdownMenuItemCheckIconClasses,
  SlotPosition,
} from './utils';
import { themeConfig } from '../../themeConfig';

const inputTheme = themeConfig.euler.input;

/**
 * DropdownInput component
 *
 * A combination of text input and dropdown menu, allowing both free-form text
 * entry and selection from a predefined list of options.
 */
const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps>(
  (
    {
      // Input props - shared with TextInput
      hintText,
      label,
      leftSlot,
      mandatory = false,
      placeholder = 'Enter text',
      rightSlot,
      size = DropdownInputSize.MEDIUM,
      state = DropdownInputState.DEFAULT,
      sublabel,
      value,
      infoTooltip,
      successMessage,
      errorMessage,

      // Dropdown-specific props
      inputValue = '',
      options = [],
      onOptionSelect,
      onChange,
      showSelectedOptionInInput = true,
      dropdownWidth = 'auto',
      dropdownPlaceholder = 'Select',
      dropdownPosition = DropdownPosition.LEFT,
      className,
      // Rest of props (passed to input element)
      ...props
    },
    ref
  ) => {
    // Input state management
    const inputState = useInputState({
      initialState: state as unknown as TextInputState,
      initialValue: inputValue,
    });

    // Dropdown state management
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
    const [inputTextValue, setInputTextValue] = useState(inputValue);

    // Initialize selected option from the value prop
    useEffect(() => {
      if (value) {
        const option = options.find(opt => opt.value === value) || null;
        setSelectedOption(option);
      }
    }, [value, options]);

    // Sync input value with prop changes
    useEffect(() => {
      setInputTextValue(inputValue);
    }, [inputValue]);

    // Event handlers
    const handleSelect = (option: DropdownOption) => {
      setSelectedOption(option);
      setInputTextValue(showSelectedOptionInInput ? option.label : inputTextValue);
      inputState.updateValue(option.value);
      onOptionSelect?.(option);
      setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputTextValue(newValue);
      inputState.updateValue(newValue);
      onChange?.(newValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      inputState.handleFocus();
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      inputState.handleBlur();
      props.onBlur?.(e);
    };

    // Dropdown chevron icon based on dropdown state
    const chevronIcon = isOpen ? (
      <ChevronUp className={getDropdownChevronClasses()} />
    ) : (
      <ChevronDown className={getDropdownChevronClasses()} />
    );

    // Dropdown component
    const renderDropdown = () => (
      <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuPrimitive.Trigger asChild>
          <div
            className={getDropdownClasses(dropdownPosition)}
            style={{ width: showSelectedOptionInInput ? dropdownWidth : 'auto' }}
            onClick={e => {
              e.stopPropagation();
              if (state !== DropdownInputState.DISABLED) {
                setIsOpen(!isOpen);
              }
            }}
            aria-label="Select option"
            role="combobox"
            aria-expanded={isOpen}
          >
            {selectedOption ? (
              <div className={getDropdownOptionContainerClasses()}>
                {selectedOption.icon && (
                  <span className={getDropdownOptionIconClasses()}>{selectedOption.icon}</span>
                )}
                <span className={getDropdownOptionLabelClasses()}>{selectedOption.label}</span>
              </div>
            ) : (
              <span className={getDropdownPlaceholderClasses()}>{dropdownPlaceholder}</span>
            )}
            <span className={getDropdownChevronClasses()}>{chevronIcon}</span>
          </div>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            className={getDropdownMenuClasses()}
            align="start"
            side="bottom"
            sideOffset={4}
            avoidCollisions={true}
            collisionPadding={8}
          >
            {options.map(option => (
              <DropdownMenuPrimitive.Item
                key={option.value}
                className={getDropdownMenuItemClasses(selectedOption?.value === option.value)}
                onSelect={() => handleSelect(option)}
              >
                <div className={getDropdownMenuItemContentClasses()}>
                  {option.icon && (
                    <span className={getDropdownMenuItemIconClasses()}>{option.icon}</span>
                  )}
                  <span className={getDropdownMenuItemTextClasses()}>{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className={getDropdownMenuItemCheckIconClasses()} />
                  )}
                </div>
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    );

    // Visual state for the input component
    const visualState = isOpen
      ? state === DropdownInputState.ERROR
        ? DropdownInputState.ERROR
        : DropdownInputState.FOCUSED
      : (inputState.visualState as unknown as DropdownInputState);

    return (
      <div className={inputTheme.container}>
        {/* Label - Same as TextInput */}
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

        {/* Input with Dropdown */}
        <div className={getInputBaseClasses(size, visualState, leftSlot, rightSlot)}>
          {/* Left Slot */}
          {leftSlot && <div className={getSlotClasses(SlotPosition.LEFT)}>{leftSlot}</div>}

          {/* Left Dropdown */}
          {dropdownPosition === DropdownPosition.LEFT && (
            <div className={cn('relative', leftSlot && 'ml-8')}>{renderDropdown()}</div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type="text"
            className={cn(
              getInputClasses(
                inputState.visualState as unknown as DropdownInputState,
                leftSlot,
                rightSlot
              ),
              dropdownPosition === DropdownPosition.LEFT &&
                showSelectedOptionInInput &&
                getInputWithLeftPaddingClasses(),
              className
            )}
            placeholder={placeholder}
            value={inputTextValue}
            disabled={state === DropdownInputState.DISABLED}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Right Dropdown */}
          {dropdownPosition === DropdownPosition.RIGHT && (
            <div className="relative">{renderDropdown()}</div>
          )}

          {/* Right Slot */}
          {rightSlot && <div className={getSlotClasses(SlotPosition.RIGHT)}>{rightSlot}</div>}
        </div>

        {/* Messages - Same as TextInput */}
        {state === DropdownInputState.ERROR && errorMessage && (
          <span className={getHintClasses(state)}>{errorMessage}</span>
        )}
        {state === DropdownInputState.SUCCESS && successMessage && (
          <span className={getHintClasses(state)}>{successMessage}</span>
        )}
        {state !== DropdownInputState.ERROR && state !== DropdownInputState.SUCCESS && hintText && (
          <span className={getHintClasses(state)}>{hintText}</span>
        )}
      </div>
    );
  }
);

DropdownInput.displayName = 'DropdownInput';

export default DropdownInput;
