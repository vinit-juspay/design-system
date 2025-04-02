import { CheckboxSize, CheckboxState } from "./Checkbox.types";

/**
 * Style configuration for a checkbox size
 */
export interface CheckboxSizeConfig {
  box: string;
  icon: string;
  labelText: string;
}

/**
 * Style configuration for a checkbox state
 */
export interface CheckboxStateConfig {
  background: string;
  border: string;
  indicator: string;
}

/**
 * Style configuration for disabled state
 */
export interface CheckboxDisabledConfig {
  background: string;
  border: string;
  text: string;
}

/**
 * Complete configuration for Checkbox component
 */
export interface CheckboxConfig {
  sizes: Record<CheckboxSize, CheckboxSizeConfig>;
  states: Record<CheckboxState, CheckboxStateConfig>;
  disabled: CheckboxDisabledConfig;
  focus: string;
}

/**
 * Checkbox component tokens
 * These reference the foundation tokens from tailwind.config.js
 */
export const checkboxConfig: CheckboxConfig = {
  sizes: {
    sm: {
      box: "h-4 w-4",
      icon: "h-3 w-3",
      labelText: "text-body-sm",
    },
    md: {
      box: "h-5 w-5",
      icon: "h-4 w-4",
      labelText: "text-body-md",
    },
  },
  states: {
    selected: {
      background: "bg-primary-500",
      border: "border-primary-500",
      indicator: "text-white",
    },
    intermediate: {
      background: "bg-primary-200",
      border: "border-primary-400",
      indicator: "bg-primary-600",
    },
    unselected: {
      background: "bg-white",
      border: "border-gray-400",
      indicator: "text-transparent",
    },
  },
  disabled: {
    background: "bg-gray-100",
    border: "border-gray-300",
    text: "text-gray-500",
  },
  focus: "focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2",
}; 