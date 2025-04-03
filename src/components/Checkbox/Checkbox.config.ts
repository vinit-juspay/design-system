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
  unselected: {
    background: string;
    border: string;
  };
  selected: {
    background: string;
    border: string;
  };
  intermediate: {
    background: string;
    border: string;
  };
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
  label: {
    fontFamily: string;
    fontSize: Record<CheckboxSize, string>;
    styles: Record<CheckboxSize, string>;
  };
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
      labelText: "[font-feature-settings:'liga'_off,'clig'_off]",
    },
    md: {
      box: "h-5 w-5",
      icon: "h-4 w-4",
      labelText: "[font-feature-settings:'liga'_off,'clig'_off]",
    },
  },
  states: {
    selected: {
      background: "bg-gradient-to-b from-primary-600 to-primary-500",
      border: "border-[0.5px] border-primary-700",
      indicator: "text-white",
    },
    intermediate: {
      background: "bg-primary-500",
      border: "border-primary-500",
      indicator: "text-white",
    },
    unselected: {
      background: "bg-white",
      border: "border-gray-400",
      indicator: "text-transparent",
    },
  },
  disabled: {
    unselected: {
      background: "bg-gray-50",
      border: "border-[0.5px] border-gray-200",
    },
    selected: {
      background: "bg-gradient-to-b from-primary-300 to-primary-200",
      border: "border-[0.5px] border-primary-300",
    },
    intermediate: {
      background: "bg-gradient-to-b from-primary-300 to-primary-200",
      border: "border-[0.5px] border-primary-300",
    },
    text: "text-gray-500",
  },
  focus: "focus:outline-none",
  label: {
    fontFamily: "font-body",
    fontSize: {
      sm: "text-body-sm",
      md: "text-body-md"
    },
    styles: {
      sm: "leading-18 font-500 text-gray-700",
      md: "leading-20 font-500 text-gray-700"
    }
  }
}; 