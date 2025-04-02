import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { themeConfig } from "../themeConfig";
import { cn } from "../utils";

type CheckboxState = "selected" | "intermediate" | "unselected";

type CheckboxProps = {
  size?: "sm" | "md";
  state?: CheckboxState;
  enabled?: boolean;
  labelText?: string;
  hasLabel?: boolean;
  hasSlot?: boolean;
  hasSubtext?: boolean;
  subtext?: string;
  onChange?: (checked: boolean) => void;
};

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
  
  // Get checkbox theme configuration
  const checkboxTheme = themeConfig.euler.checkbox;
  const sizeConfig = checkboxTheme.sizes[size];
  const stateConfig = checkboxTheme.states[state];

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <CheckboxPrimitive.Root
          checked={isChecked}
          disabled={!enabled}
          onCheckedChange={onChange}
          className={cn(
            "peer relative flex items-center justify-center rounded border",
            "transition-all duration-200 ease-in-out",
            sizeConfig.box,
            enabled 
              ? cn(stateConfig.background, stateConfig.border, "hover:border-primary-500") 
              : cn(checkboxTheme.disabled.background, checkboxTheme.disabled.border),
            checkboxTheme.focus
          )}
        >
          <CheckboxPrimitive.Indicator>
            {state === "selected" && (
              <svg
                className={cn(stateConfig.indicator, sizeConfig.icon)}
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
              <div className={cn(stateConfig.indicator, "h-2 w-2 rounded-sm")} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      
      {(hasLabel || hasSubtext) && (
        <div className="ml-3 text-sm">
          {hasLabel && labelText && (
            <label
              className={cn(
                sizeConfig.labelText,
                "font-body",
                enabled ? "text-gray-700" : checkboxTheme.disabled.text
              )}
            >
              {labelText}
            </label>
          )}
          
          {hasSubtext && subtext && (
            <p className="text-body-sm text-gray-500 mt-1">{subtext}</p>
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