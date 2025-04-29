import { forwardRef, useState, useRef, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Tooltip } from "../../main";
import { TooltipSize } from '../Tooltip/types';
import { useInputState } from '../../hooks';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';

import { 
  DropdownInputProps, 
  DropdownInputSize, 
  DropdownInputState, 
  DropdownOption,
  DropdownPosition 
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
  getDropdownWithLeftSlotClass,
  SlotPosition
} from './utils';
import { themeConfig } from '../../themeConfig';

const inputTheme = themeConfig.euler.input;
const dropdownInputTheme = themeConfig.euler.dropdownInput;

const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps>(({
  hintText = "This is a hint text to help user.",
  label = "Your Label",
  leftSlot,
  mandatory = false,
  placeholder = "Enter text",
  rightSlot,
  size = DropdownInputSize.MEDIUM,
  state = DropdownInputState.DEFAULT,
  sublabel = "(optional)",
  value,
  inputValue = "",
  infoTooltip,
  successMessage,
  options = [],
  onOptionSelect,
  onChange,
  showSelectedOptionInInput = true,
  dropdownWidth = "auto",
  dropdownPlaceholder = "Select",
  dropdownPosition = DropdownPosition.LEFT,
  ..._props
}, ref) => {
  // Use the custom hook for state management
  const inputState = useInputState({
    initialState: state as unknown as TextInputState,
    initialValue: inputValue
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    value ? options.find(option => option.value === value) || null : null
  );
  const [inputTextValue, setInputTextValue] = useState(inputValue);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Forward the ref
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  // Update input value if prop changes
  useEffect(() => {
    setInputTextValue(inputValue);
  }, [inputValue]);

  // Update selected option if value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const option = options.find(opt => opt.value === value) || null;
      setSelectedOption(option);
    }
  }, [value, options]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    inputState.updateValue(option.value);
    onOptionSelect?.(option);
    setIsOpen(false);
    
    // Focus the input after selection
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputTextValue(newValue);
    inputState.updateValue(newValue);
    onChange?.(newValue);
  };

  const handleInputFocus = () => {
    inputState.handleFocus();
  };

  const handleInputBlur = () => {
    inputState.handleBlur();
  };

  const defaultRightSlot = isOpen ? 
    <ChevronUp className={getDropdownChevronClasses()} /> : 
    <ChevronDown className={getDropdownChevronClasses()} />;

  const renderDropdown = () => (
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        <div 
          className={getDropdownClasses(dropdownPosition)}
          style={{ width: showSelectedOptionInInput ? dropdownWidth : 'auto' }}
          onClick={() => state !== DropdownInputState.DISABLED && setIsOpen(!isOpen)}
          aria-label="Select option"
          role="combobox"
          aria-expanded={isOpen}
        >
          {selectedOption ? (
            <div className={getDropdownOptionContainerClasses()}>
              {selectedOption.icon && <span className={getDropdownOptionIconClasses()}>{selectedOption.icon}</span>}
              <span className={getDropdownOptionLabelClasses()}>{selectedOption.label}</span>
            </div>
          ) : (
            <span className={getDropdownPlaceholderClasses()}>{dropdownPlaceholder}</span>
          )}
          <span className={getDropdownChevronClasses()}>{defaultRightSlot}</span>
        </div>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={getDropdownMenuClasses()}
          align="start"
          sideOffset={4}
        >
          {options.map((option) => (
            <DropdownMenuPrimitive.Item
              key={option.value}
              className={getDropdownMenuItemClasses(selectedOption?.value === option.value)}
              onSelect={() => handleSelect(option)}
            >
              <div className={getDropdownMenuItemContentClasses()}>
                {option.icon && <span className={getDropdownMenuItemIconClasses()}>{option.icon}</span>}
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

  return (
    <div className={dropdownInputTheme.container}>
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
          {infoTooltip && <Tooltip size={TooltipSize.LARGE} content={infoTooltip}>
            <button type="button" aria-label="More information" className="focus:outline-none">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </Tooltip>}
        </div>
      )}

      {/* Input with Dropdown */}
      <div 
        className={cn(
          getInputBaseClasses(size, isOpen ? DropdownInputState.FOCUSED : (inputState.visualState as unknown as DropdownInputState), leftSlot, rightSlot),
          'flex items-center relative'
        )}
      >
        {/* Left Slot */}
        {leftSlot && (
          <div className={getSlotClasses(SlotPosition.LEFT)}>
            {leftSlot}
          </div>
        )}

        {/* Left Dropdown - render with adjusted position when leftSlot exists */}
        {dropdownPosition === DropdownPosition.LEFT && (
          <div className={leftSlot ? getDropdownWithLeftSlotClass() : ""}>
            {renderDropdown()}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          className={cn(
            getInputClasses((inputState.visualState as unknown as DropdownInputState), leftSlot, rightSlot),
            dropdownPosition === DropdownPosition.LEFT && showSelectedOptionInInput && getInputWithLeftPaddingClasses()
          )}
          placeholder={placeholder}
          value={inputTextValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={state === DropdownInputState.DISABLED}
          aria-labelledby={label ? `${label.toLowerCase().replace(/\s+/g, '-')}-label` : undefined}
          {..._props}
        />

        {/* Right Dropdown and Right Slot */}
        {dropdownPosition === DropdownPosition.RIGHT && renderDropdown()}
        
        {rightSlot && (
          <div className={getSlotClasses(SlotPosition.RIGHT)}>
            {rightSlot}
          </div>
        )}
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

DropdownInput.displayName = 'DropdownInput';

export default DropdownInput; 