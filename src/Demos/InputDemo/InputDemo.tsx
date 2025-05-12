import { useState } from 'react';
import { 
  DropdownInput, 
  NumberInput, 
  OTPInput, 
  TextArea, 
  TextInput, 
  UnitInput,
} from '../../../lib/main';
import { TextInputState, TextInputSize } from '../../../lib/components/TextInput/types';
import { OTPDigits } from '../../../lib/components/OTPInput/types';
import { DropdownInputSize, DropdownInputState, DropdownPosition } from '../../../lib/components/DropdownInput/types';
import { UnitPosition } from '../../../lib/components/UnitInput/types';

const InputDemo = () => {
  // General input state management
  const [inputState, setInputState] = useState<TextInputState>(TextInputState.DEFAULT);
  const [inputSize, setInputSize] = useState<TextInputSize>(TextInputSize.MEDIUM);
  
  // TextArea specific state
  const [textAreaValue, setTextAreaValue] = useState('');
  
  // DropdownInput specific state
  const [dropdownValue, setDropdownValue] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>(DropdownPosition.RIGHT);
  
  // NumberInput specific state
  const [numberValue, setNumberValue] = useState<number | undefined>(undefined);
  
  // OTPInput specific state
  const [otpValue, setOtpValue] = useState<string>('');
  const [otpDigits, setOtpDigits] = useState<OTPDigits>(OTPDigits.SIX);
  
  // UnitInput specific state
  const [unitValue, setUnitValue] = useState<string>('');
  const [unitPosition, setUnitPosition] = useState<UnitPosition>(UnitPosition.SUFFIX);
  const [unitText, setUnitText] = useState<string>('kg');

  // Shared state for inputs
  const [showHintText, setShowHintText] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [showSubLabel, setShowSubLabel] = useState(true);
  const [showMandatory, setShowMandatory] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  // Map TextInputState to DropdownInputState
  const mapTextInputStateToDropdownState = (state: TextInputState): DropdownInputState => {
    switch (state) {
      case TextInputState.DEFAULT: return DropdownInputState.DEFAULT;
      case TextInputState.FOCUSED: return DropdownInputState.FOCUSED;
      case TextInputState.ERROR: return DropdownInputState.ERROR;
      case TextInputState.SUCCESS: return DropdownInputState.SUCCESS;
      case TextInputState.DISABLED: return DropdownInputState.DISABLED;
      default: return DropdownInputState.DEFAULT;
    }
  };

  const renderControls = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-4 border border-gray-200 rounded-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Input State</label>
        <select
          value={inputState}
          onChange={(e) => setInputState(e.target.value as TextInputState)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {Object.values(TextInputState).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Input Size</label>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              checked={inputSize === TextInputSize.MEDIUM}
              onChange={() => setInputSize(TextInputSize.LARGE)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Small</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              checked={inputSize === TextInputSize.MEDIUM}
              onChange={() => setInputSize(TextInputSize.MEDIUM)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Medium</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              checked={inputSize === TextInputSize.LARGE}
              onChange={() => setInputSize(TextInputSize.LARGE)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Large</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabel}
              onChange={(e) => setShowLabel(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Label</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showSubLabel}
              onChange={(e) => setShowSubLabel(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Sublabel</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showHintText}
              onChange={(e) => setShowHintText(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Hint Text</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showMandatory}
              onChange={(e) => setShowMandatory(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mandatory</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showInfoTooltip}
              onChange={(e) => setShowInfoTooltip(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Info Tooltip</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">OTP Digits</label>
        <select
          value={otpDigits}
          onChange={(e) => setOtpDigits(e.target.value as OTPDigits)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {Object.values(OTPDigits).map((digits) => (
            <option key={digits} value={digits}>
              {digits}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Unit Position</label>
        <select
          value={unitPosition}
          onChange={(e) => setUnitPosition(e.target.value as UnitPosition)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {Object.values(UnitPosition).map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Unit Text</label>
        <input
          type="text"
          value={unitText}
          onChange={(e) => setUnitText(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Dropdown Position</label>
        <select
          value={dropdownPosition}
          onChange={(e) => setDropdownPosition(e.target.value as DropdownPosition)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {Object.values(DropdownPosition).map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Input Components</h2>
      {renderControls()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TextArea Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">TextArea</h3>
          <TextArea
            label={showLabel ? "TextArea Label" : undefined}
            sublabel={showSubLabel ? "Additional information about this text area" : undefined}
            hintText={showHintText ? "This is a hint text for the text area" : undefined}
            placeholder="Enter your text here"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            state={inputState}
            mandatory={showMandatory}
            infoTooltip="This is an information tooltip"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">TextInput</h3>
          <TextInput
            label={showLabel ? "TextInput Label" : undefined}
            sublabel={showSubLabel ? "Enter your text here" : undefined}
            hintText={showHintText ? "This is a hint text for the text input" : undefined}
            placeholder="Enter text"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            state={inputState}
            size={inputSize}
            mandatory={showMandatory}
            infoTooltip="This is an information tooltip"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>

        {/* NumberInput Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">NumberInput</h3>
          <NumberInput
            label={showLabel ? "NumberInput Label" : undefined}
            sublabel={showSubLabel ? "Enter a numeric value" : undefined}
            hintText={showHintText ? "This is a hint text for the number input" : undefined}
            placeholder="Enter a number"
            value={numberValue}
            onChange={(value) => setNumberValue(value)}
            state={inputState}
            size={inputSize}
            mandatory={showMandatory}
            min={0}
            max={100}
            step={1}
            infoTooltip="Input must be between 0 and 100"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>

        {/* DropdownInput Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">DropdownInput</h3>
          <DropdownInput
            label={showLabel ? "DropdownInput Label" : undefined}
            sublabel={showSubLabel ? "Select an option from the dropdown" : undefined}
            hintText={showHintText ? "This is a hint text for the dropdown input" : undefined}
            placeholder="Select or type an option"
            value={dropdownValue}
            onChange={(value) => setDropdownValue(value)}
            state={mapTextInputStateToDropdownState(inputState)}
            size={inputSize as unknown as DropdownInputSize}
            mandatory={showMandatory}
            options={[
              "Option 1", 
              "Option 2", 
              "Option 3", 
              "Option 4", 
              "Option 5"
            ].map(opt => ({ 
              label: opt, 
              value: opt 
            }))}
            dropdownPosition={dropdownPosition}
            infoTooltip="Select from dropdown or type custom value"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>

        {/* UnitInput Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">UnitInput</h3>
          <UnitInput
            label={showLabel ? "UnitInput Label" : undefined}
            sublabel={showSubLabel ? "Enter a value with units" : undefined}
            hintText={showHintText ? "This is a hint text for the unit input" : undefined}
            placeholder="Enter value"
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
            state={inputState}
            size={inputSize}
            mandatory={showMandatory}
            unitPosition={unitPosition}
            infoTooltip="Input with custom unit indicator"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>

        {/* OTPInput Section */}
        <div className="space-y-4 col-span-1 lg:col-span-2">
          <h3 className="text-xl font-semibold">OTPInput</h3>
          <OTPInput
            label={showLabel ? "OTPInput Label" : undefined}
            sublabel={showSubLabel ? "Enter the verification code" : undefined}
            hintText={showHintText ? "This is a hint text for the OTP input" : undefined}
            state={inputState}
            mandatory={showMandatory}
            digits={otpDigits}
            value={otpValue}
            onChange={setOtpValue}
            infoTooltip="One-time password verification field"
            errorMessage={inputState === TextInputState.ERROR ? 'This is an error message' : undefined}
            successMessage={inputState === TextInputState.SUCCESS ? 'This is a success message' : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDemo; 