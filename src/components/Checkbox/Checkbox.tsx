import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxProps } from "./Checkbox.types";
import { getCheckboxStyles } from "./Checkbox.variants";

/**
 * Checkbox component
 * 
 * A checkbox allows users to select one or more items from a set,
 * or to mark one or more items as true/false.
 */
const Checkbox: React.FC<CheckboxProps> = ({
  size = "md",
  state = "unselected",
  enabled = true,
  labelText = "",
  hasLabel = true,
  hasSlot = false,
  hasSubtext = false,
  subtext = "",
  onChange,
  slotContent,
}) => {
  // Map the state to the checked prop
  const isChecked = state === "selected" ? true : state === "intermediate" ? "indeterminate" : false;
  
  // Get styles based on props
  const styles = getCheckboxStyles({ size, state, enabled });

  return (
    <div className={`flex ${hasSubtext ? 'items-start' : 'items-center'}`}>
      <div className={`flex ${hasSubtext ? 'mt-1' : ''}`}>
        <CheckboxPrimitive.Root
          checked={isChecked}
          disabled={!enabled}
          onCheckedChange={onChange}
          className={styles.root}
        >
          <CheckboxPrimitive.Indicator>
            {state === "selected" && (
              <svg
                className={styles.indicator}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {state === "intermediate" && (
              <svg
                className={styles.indicator}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      
      <div className={`ml-1.5 flex ${hasSubtext ? 'flex-col' : 'items-center'}`}>
        {hasLabel && labelText && (
          <div className="flex items-center">
            <label className={styles.label}>
              {labelText}
            </label>
            
            {hasSlot && (
              <div className="ml-1 flex items-center">
                {slotContent ? (
                  slotContent
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                )}
              </div>
            )}
          </div>
        )}
        
        {hasSubtext && subtext && (
          <p className={styles.subtext}>{subtext}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox; 