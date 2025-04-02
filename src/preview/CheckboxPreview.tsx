import React, { useState } from 'react';
import Checkbox from '../components/Checkbox/Checkbox';
import { CheckboxState } from '../components/Checkbox/Checkbox.types';

/**
 * Preview component for Checkbox
 * Displays all variants and states of the Checkbox component
 */
const CheckboxPreview: React.FC = () => {
  // State for toggleable checkboxes
  const [basicState, setBasicState] = useState<CheckboxState>("unselected");
  const [intermediateState, setIntermediateState] = useState<CheckboxState>("unselected");
  const [smallCheckboxState, setSmallCheckboxState] = useState<CheckboxState>("unselected");
  const [mediumCheckboxState, setMediumCheckboxState] = useState<CheckboxState>("unselected");
  const [rememberMeState, setRememberMeState] = useState<CheckboxState>("unselected");
  const [slotCheckboxState, setSlotCheckboxState] = useState<CheckboxState>("unselected");
  
  // Toggle handlers
  const toggleCheckbox = (
    currentState: CheckboxState, 
    setState: React.Dispatch<React.SetStateAction<CheckboxState>>
  ) => {
    if (currentState === "selected") {
      setState("unselected");
    } else {
      setState("selected");
    }
  };
  
  // Handler for intermediate state toggle
  const toggleIntermediateCheckbox = (
    currentState: CheckboxState, 
    setState: React.Dispatch<React.SetStateAction<CheckboxState>>
  ) => {
    if (currentState === "unselected") {
      setState("intermediate");
    } else if (currentState === "intermediate") {
      setState("selected");
    } else {
      setState("unselected");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex gap-8 flex-wrap items-center">
          <Checkbox 
            state="unselected" 
            labelText="Static Unselected" 
          />
          <Checkbox 
            state="selected" 
            labelText="Static Selected" 
          />
          <Checkbox 
            state="intermediate" 
            labelText="Static Intermediate" 
          />
          <Checkbox 
            state={basicState}
            labelText="Toggleable Checkbox" 
            onChange={() => toggleCheckbox(basicState, setBasicState)}
          />
          <div className="flex items-center gap-2">
            <Checkbox 
              state={intermediateState}
              labelText="Three-State Checkbox" 
              onChange={() => toggleIntermediateCheckbox(intermediateState, setIntermediateState)}
            />
            <span className="text-sm text-gray-500">(cycles through all states)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            size="sm" 
            state={smallCheckboxState}
            labelText="Small checkbox" 
            onChange={() => toggleCheckbox(smallCheckboxState, setSmallCheckboxState)}
          />
          <Checkbox 
            size="md" 
            state={mediumCheckboxState}
            labelText="Medium checkbox" 
            onChange={() => toggleCheckbox(mediumCheckboxState, setMediumCheckboxState)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Subtext</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            state={rememberMeState}
            labelText="Remember Me" 
            hasSubtext={true}
            subtext="Save my login details for next time."
            onChange={() => toggleCheckbox(rememberMeState, setRememberMeState)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            enabled={false}
            labelText="Disabled checkbox" 
          />
          <Checkbox 
            enabled={false}
            state="selected"
            labelText="Disabled selected" 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Slot (Placeholder)</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            labelText="With slot placeholder" 
            hasSlot={true}
            state={slotCheckboxState}
            onChange={() => toggleCheckbox(slotCheckboxState, setSlotCheckboxState)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxPreview; 