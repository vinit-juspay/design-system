// Component tokens

/**
 * Main theme configuration record that holds all theme tokens and values
 * @typedef {Object} ThemeRecord
 */
type ThemeRecord = {
  [key: string]: {
    button: {
      transition: string;
      borderRadius: string;
      transform: string;
      sizes: {
        sm: ButtonSize;
        md: ButtonSize;
        lg: ButtonSize;
      };
      buttonType: {
        primary: ButtonType;
        secondary: ButtonType;
        danger: ButtonType;
        success: ButtonType;
      };
      linkColors: {
        primary: LinkColor;
        secondary: LinkColor;
        danger: LinkColor;
        success: LinkColor;
      };
    };
  };
};

/**
 * Configuration for button sizing options
 * @typedef {Object} ButtonSize
 */
type ButtonSize = {
  /** CSS height class */
  height: string;
  /** CSS padding class */
  padding: string;
  /** CSS font size class */
  fontSize: string;
  /** CSS icon size class */
  iconSize: string;
  /** CSS gap between elements class */
  gap: string;
};

/**
 * Configuration for button type styling
 * @typedef {Object} ButtonType
 */
type ButtonType = {
  /** CSS background color class */
  backgroundColor: string;
  /** CSS text color class */
  textColor: string;
  /** CSS hover background color class */
  hoverBackgroundColor: string;
  /** CSS hover text color class */
  hoverTextColor: string;
  /** CSS disabled background color class */
  disabledBackgroundColor: string;
  /** CSS disabled text color class */
  disabledTextColor: string;
  /** CSS border color class */
  borderColor: string;
  /** CSS focus outline class */
  focusOutline: string;
  /** CSS hover gradient class */
  hoverGradient: string;
  /** Active state styling */
  activeState: {
    /** CSS gradient for active state */
    gradient: string;
    /** CSS shadow for active state */
    shadow: string;
  };
  /** CSS border width class */
  borderWidth: string;
  /** CSS border style class */
  borderStyle: string;
};

/**
 * Configuration for link button styling
 * @typedef {Object} LinkColor
 */
type LinkColor = {
  /** CSS text color class */
  text: string;
  /** CSS hover color class */
  hover: string;
  /** CSS focus color class */
  focus: string;
};

/**
 * Global theme configuration for the design system
 * Contains all the design tokens and styling information
 */
export const themeConfig: ThemeRecord = {
  euler: {
    button: {
      transition: "transition-all duration-200 ease-in-out",
      borderRadius: "rounded-lg",
      transform: "transform active:scale-95",
      sizes: {
        sm: {
          height: "h-8",
          padding: "px-3",
          fontSize: "text-sm",
          iconSize: "w-4 h-4",
          gap: "gap-2",
        },
        md: {
          height: "h-10",
          padding: "px-4",
          fontSize: "text-base",
          iconSize: "w-5 h-5",
          gap: "gap-3",
        },
        lg: {
          height: "h-12",
          padding: "px-6",
          fontSize: "text-lg",
          iconSize: "w-6 h-6",
          gap: "gap-4",
        },
      },
      buttonType: {
        primary: {
          backgroundColor: "bg-gradient-to-r from-primary-500 to-primary-700",
          textColor: "text-white",
          hoverBackgroundColor: "hover:bg-primary-600",
          hoverTextColor: "hover:text-white",
          disabledBackgroundColor: "bg-primary-300",
          disabledTextColor: "text-primary-100",
          borderColor: "border-primary-600",
          focusOutline: "focus:outline-primary-200",
          hoverGradient: "hover:from-primary-600 hover:to-primary-600",
          activeState: {
            gradient: "from-primary-700 to-primary-800",
            shadow: "shadow-inner",
          },
          borderWidth: "border",
          borderStyle: "border-solid",
        },
        secondary: {
          backgroundColor: "bg-gradient-to-r from-gray-500 to-gray-700",
          textColor: "text-white",
          hoverBackgroundColor: "hover:bg-gray-600",
          hoverTextColor: "hover:text-white",
          disabledBackgroundColor: "bg-gray-300",
          disabledTextColor: "text-gray-100",
          borderColor: "border-gray-600",
          focusOutline: "focus:outline-gray-200",
          hoverGradient: "hover:from-gray-600 hover:to-gray-600",
          activeState: {
            gradient: "from-gray-700 to-gray-800",
            shadow: "shadow-inner",
          },
          borderWidth: "border",
          borderStyle: "border-solid",
        },
        danger: {
          backgroundColor: "bg-gradient-to-r from-red-500 to-red-700",
          textColor: "text-white",
          hoverBackgroundColor: "hover:bg-red-600",
          hoverTextColor: "hover:text-white",
          disabledBackgroundColor: "bg-red-300",
          disabledTextColor: "text-red-100",
          borderColor: "border-red-600",
          focusOutline: "focus:outline-red-200",
          hoverGradient: "hover:from-red-600 hover:to-red-600",
          activeState: {
            gradient: "from-red-700 to-red-800",
            shadow: "shadow-inner",
          },
          borderWidth: "border",
          borderStyle: "border-solid",
        },
        success: {
          backgroundColor: "bg-gradient-to-r from-green-500 to-green-700",
          textColor: "text-white",
          hoverBackgroundColor: "hover:bg-green-600",
          hoverTextColor: "hover:text-white",
          disabledBackgroundColor: "bg-green-300",
          disabledTextColor: "text-green-100",
          borderColor: "border-green-600",
          focusOutline: "focus:outline-green-200",
          hoverGradient: "hover:from-green-600 hover:to-green-600",
          activeState: {
            gradient: "from-green-700 to-green-800",
            shadow: "shadow-inner",
          },
          borderWidth: "border",
          borderStyle: "border-solid",
        },
      },
      linkColors: {
        primary: {
          text: "text-primary-500",
          hover: "hover:text-primary-600",
          focus: "focus-visible:outline-primary-500",
        },
        secondary: {
          text: "text-gray-500",
          hover: "hover:text-gray-600",
          focus: "focus-visible:outline-gray-500",
        },
        danger: {
          text: "text-red-500",
          hover: "hover:text-red-600",
          focus: "focus-visible:outline-red-500",
        },
        success: {
          text: "text-green-500",
          hover: "hover:text-green-600",
          focus: "focus-visible:outline-green-500",
        },
      },
    },
  },
}; 