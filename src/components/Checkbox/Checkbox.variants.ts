import { checkboxConfig } from "./Checkbox.config";
import { CheckboxProps, CheckboxState } from "./Checkbox.types";
import { cn } from "../../utils/utils";

/**
 * Get checkbox style variations based on props
 */
export const getCheckboxStyles = (props: Pick<CheckboxProps, 'size' | 'state' | 'enabled'>) => {
  const { size = "md", state = "unselected", enabled = true } = props;
  
  const sizeConfig = checkboxConfig.sizes[size];
  const stateConfig = checkboxConfig.states[state as CheckboxState];
  
  return {
    // Root styles for the checkbox
    root: cn(
      "peer relative flex items-center justify-center rounded border",
      "transition-all duration-200 ease-in-out",
      sizeConfig.box,
      enabled 
        ? cn(stateConfig.background, stateConfig.border, "hover:border-primary-500") 
        : cn(checkboxConfig.disabled.background, checkboxConfig.disabled.border),
      checkboxConfig.focus
    ),
    
    // Indicator styles for the checkmark or indeterminate state
    indicator: cn(
      stateConfig.indicator,
      size === "sm" ? "h-3 w-3" : "h-4 w-4"
    ),
    
    // Indeterminate indicator styles
    indeterminateIndicator: cn(
      stateConfig.indicator,
      "h-2 w-2 rounded-sm"
    ),
    
    // Label styles
    label: cn(
      sizeConfig.labelText,
      "font-body",
      enabled ? "text-gray-700" : checkboxConfig.disabled.text
    ),
    
    // Subtext styles
    subtext: "text-body-sm text-gray-500 mt-1"
  };
}; 