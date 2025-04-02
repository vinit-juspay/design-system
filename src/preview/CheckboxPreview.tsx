import React from 'react';
import Checkbox from '../components/Checkbox/Checkbox';

/**
 * Preview component for Checkbox
 * Displays all variants and states of the Checkbox component
 */
const CheckboxPreview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            state="unselected" 
            labelText="Unselected" 
          />
          <Checkbox 
            state="selected" 
            labelText="Selected" 
          />
          <Checkbox 
            state="intermediate" 
            labelText="Intermediate" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            size="sm" 
            labelText="Small checkbox" 
          />
          <Checkbox 
            size="md" 
            labelText="Medium checkbox" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Subtext</h3>
        <div className="flex gap-8 flex-wrap">
          <Checkbox 
            labelText="Remember Me" 
            hasSubtext={true}
            subtext="Save my login details for next time."
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
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxPreview; 