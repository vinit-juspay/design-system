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
  
  // Get disabled styles based on state
  const getDisabledStyles = () => {
    if (state === "selected") {
      return checkboxConfig.disabled.selected;
    } else if (state === "intermediate") {
      return checkboxConfig.disabled.intermediate;
    }
    return checkboxConfig.disabled.unselected;
  };

  return {
    // Root styles for the checkbox
    root: cn(
      "peer relative flex items-center justify-center border",
      "transition-all duration-200 ease-in-out",
      size === "md" ? "rounded-md" : "rounded-sm",
      sizeConfig.box,
      enabled 
        ? cn(
            stateConfig.background, 
            stateConfig.border, 
            "hover:border-primary-500",
            "cursor-pointer"
          )
        : cn(
            getDisabledStyles().background,
            getDisabledStyles().border,
            "cursor-not-allowed"
          ),
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
    label: `${checkboxConfig.label.fontFamily} ${checkboxConfig.label.fontSize[size]} ${cn(
      checkboxConfig.label.styles[size],
      sizeConfig.labelText,
      enabled ? "" : checkboxConfig.disabled.text,
      enabled ? "cursor-pointer" : "cursor-not-allowed"
    )}`,
    
    // Subtext styles
    subtext: checkboxConfig.subtext
  };
}; 