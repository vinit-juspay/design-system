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
}) => {
  // Map the state to the checked prop
  const isChecked = state === "selected" ? true : state === "intermediate" ? "indeterminate" : false;
  
  // Get styles based on props
  const styles = getCheckboxStyles({ size, state, enabled });

  return (
    <div className="flex items-center">
      <div className="flex items-center h-5">
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
      
      {(hasLabel || hasSubtext) && (
        <div className="ml-3 text-sm">
          {hasLabel && labelText && (
            <label className={styles.label}>
              {labelText}
            </label>
          )}
          
          {hasSubtext && subtext && (
            <p className={styles.subtext}>{subtext}</p>
          )}
        </div>
      )}
      
      {hasSlot && (
        <div className="ml-auto">
          {/* Slot content would go here */}
        </div>
      )}
    </div>
  );
};

export default Checkbox; 