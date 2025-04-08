/** Theme configuration object containing all UI component styles */
export const themeConfig = {
  /** Euler design system variant */
  euler: {
    /** 
     * Button component styling
     * Includes variants for different types, sizes, and states
     */
    button: {
      /** Button type variants (primary, secondary, danger, success) */
      buttonType: {
        /** Primary button - Used for main actions */
        primary: {
          backgroundColor: 'bg-gradient-to-b from-primary-600 to-primary-500',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-primary-500 hover:from-primary-500 hover:to-primary-500 hover:border-primary-500',
          activeBackgroundColor: 'active:bg-primary-600 active:from-primary-600 active:to-primary-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] active:border-primary-600',
          borderColor: 'border-[1.5px] border-primary-600',
          disabledBackgroundColor: 'disabled:bg-primary-300 disabled:from-primary-300 disabled:to-primary-300 disabled:border-primary-300 disabled:opacity-100',
          focusClasses: 'focus-visible:outline-primary-200 focus-visible:outline-2 focus:outline-primary-200 focus:outline-2'
        },
        /** Secondary button - Used for secondary actions */
        secondary: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-700',
          hoverBackgroundColor: 'hover:bg-gray-50 hover:border-gray-150',
          activeBackgroundColor: 'active:bg-gray-25 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.1)] active:border-gray-200',
          borderColor: 'border-[1.5px] border-gray-200',
          disabledBackgroundColor: 'disabled:bg-gray-150 disabled:border-0 disabled:text-gray-400',
          focusClasses: 'focus-visible:outline-gray-100 focus-visible:outline-2 focus:outline-gray-100 focus:outline-2 focus:bg-white focus:border-gray-150'
        },
        /** Danger button - Used for destructive actions */
        danger: {
          backgroundColor: 'bg-gradient-to-b from-red-600 to-red-500',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-red-500 hover:from-red-500 hover:to-red-500 hover:border-red-500',
          activeBackgroundColor: 'active:bg-red-600 active:from-red-600 active:to-red-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-red-500',
          borderColor: 'border-[1.5px] border-red-600',
          disabledBackgroundColor: 'disabled:bg-red-300 disabled:from-red-300 disabled:to-red-300 disabled:border-red-300 disabled:opacity-100',
          focusClasses: 'focus-visible:outline-red-100 focus-visible:outline-2 focus:outline-red-100 focus:outline-2'
        },
        /** Success button - Used for confirmation actions */
        success: {
          backgroundColor: 'bg-gradient-to-b from-green-600 to-green-500',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-green-500 hover:from-green-500 hover:to-green-500 hover:border-green-500',
          activeBackgroundColor: 'active:bg-green-600 active:from-green-600 active:to-green-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-green-600',
          borderColor: 'border-[1.5px] border-green-600',
          disabledBackgroundColor: 'disabled:bg-green-200 disabled:from-green-200 disabled:to-green-200 disabled:border-green-200 disabled:opacity-100',
          focusClasses: 'focus-visible:outline-green-200 focus-visible:outline-2 focus:outline-green-200 focus:outline-2'
        }
      },
      /** Button size variants */
      sizes: {
        /** Small button - 32px height */
        sm: {
          height: 'h-8',
          padding: 'px-3',
          fontSize: 'text-body-sm',
          iconSize: 'w-4 h-4',
          gap: 'gap-1.5'
        },
        /** Medium button - 36px height */
        md: {
          height: 'h-9',
          padding: 'px-4',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        },
        /** Large button - 40px height */
        lg: {
          height: 'h-10',
          padding: 'px-5',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        }
      },
      fontWeight: 'font-500',
      linkColors: {
        primary: {
          text: 'text-primary-600',
          hover: 'hover:text-primary-700',
          focus: 'focus:text-primary-700'
        },
        secondary: {
          text: 'text-gray-600',
          hover: 'hover:text-gray-700',
          focus: 'focus:text-gray-700'
        },
        danger: {
          text: 'text-red-600',
          hover: 'hover:text-red-700',
          focus: 'focus:text-red-700'
        },
        success: {
          text: 'text-green-600',
          hover: 'hover:text-green-700',
          focus: 'focus:text-green-700'
        }
      },
      borderRadius: 'rounded-xl'
    },
    /** 
     * Tooltip component styling
     * Configures the appearance of tooltips including sizes and animations
     */
    tooltip: {
      /** Base tooltip styles including animations and positioning */
      baseStyles: "flex z-50 items-center overflow-hidden bg-gray-900 text-gray-0 font-500 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      /** Tooltip size variants */
      sizes: {
        /** Small tooltip */
        sm: {
          padding: "px-1.5 py-0.5",
          fontSize: "text-body-xs",
          borderRadius: "rounded-md",
          maxWidth: "max-w-xs",
          slotSize: "h-3.5 w-3.5",
        },
        /** Large tooltip */
        lg: {
          padding: "px-2 py-1.5",
          fontSize: "text-body-sm",
          borderRadius: "rounded-lg",
          maxWidth: "max-w-sm",
          slotSize: "h-[18px] w-[18px]",
        },
      },
      arrow: {
        baseStyles: "fill-gray-900",
      },
      content: {
        baseStyles: "items-center text-gray-0",
      },
    },
    /** 
     * Menu component styling
     * Configures dropdown menus, including layout, items, and interactive states
     */
    menu: {
      /** Base container styles for the dropdown menu */
      baseStyles: "z-50 min-w-[200px] py-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md",
      
      /** Layout helper classes for menu structure */
      layout: {
        container: "flex items-start w-full justify-between",
        content: "flex items-start",
        checkboxRight: "ml-0",
        checkboxLeft: "mr-2",
        threeColumn: "flex items-start w-full",
        columnContent: "flex-1 min-w-0",
        flexColumn: "flex flex-col",
        leftSlot: "mr-2 flex-shrink-0",
        rightSlotsContainer: "flex items-center justify-end ml-2 space-x-2 flex-shrink-0",
        menuItemRightContainer: "flex items-center ml-auto space-x-2"
      },
      
      /** 
       * Menu item styling
       * Standard menu item appearance and states
       */
      menuItem: {
        /** Base menu item styles including interactive states */
        baseStyles: "relative text-body-md font-500 flex cursor-default select-none items-center rounded-sm mx-1 px-2 py-1.5 text-gray-600 outline-none focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:before:absolute data-[highlighted]:before:inset-y-0 data-[highlighted]:before:left-1 data-[highlighted]:before:right-1 data-[highlighted]:before:bg-gray-100 data-[highlighted]:before:-z-10 data-[highlighted]:before:rounded-sm data-[highlighted]:text-gray-900 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed",
        /** Icon styling within menu items */
        icon: "h-4 w-4 mr-2",
        /** Secondary text styling */
        subtext: "text-body-sm font-500 text-gray-400 mt-0.5",
        /** Keyboard shortcut text styling */
        shortcut: "ml-auto pl-4 text-body-sm text-gray-300 font-500 text-right",
        /** Color variants for menu items */
        colors: {
          primary: "text-primary-600 data-[highlighted]:text-primary-700",
          danger: "text-red-500 data-[highlighted]:text-red-600",
          success: "text-green-500 data-[highlighted]:text-green-600",
          warning: "text-amber-500 data-[highlighted]:text-amber-600"
        }
      },
      
      /** 
       * Checkbox menu item styling
       * Specific styles for checkbox items within menus
       */
      checkboxMenuItem: {
        /** Checkbox indicator container - uses md checkbox size */
        useCheckboxSize: "md",
        /** Position styling */
        indicator: "absolute right-2 items-center justify-center",
        /** Additional color styling */
        icon: "text-primary-500"
      },
      
      /** 
       * Label styling
       * Category headers within menus
       */
      label: {
        /** Base label styles */
        baseStyles: "text-body-xs font-600 text-gray-400 px-2 py-1.5 uppercase tracking-expanded"
      },
      
      /** 
       * Separator styling
       * Divider lines between menu sections
       */
      separator: {
        /** Base separator styles */
        baseStyles: "h-px my-1 bg-gray-200"
      },
      
      /** 
       * Search feature styling
       * Search input within menus
       */
      search: {
        /** Base search container styles */
        baseStyles: "px-2 py-0 border-b border-gray-200",
        /** Search input container */
        container: "flex items-center bg-white",
        /** Search icon styling */
        icon: "h-4 w-4 text-gray-400",
        /** Search input field styling */
        input: "w-full px-2 py-1.5 text-body-md font-500 bg-transparent border-0 focus:outline-none focus:ring-0"
      }
    },
    /** 
     * Checkbox component styling
     * Configures standalone checkbox inputs
     */
    checkbox: {
      /** Base checkbox styles */
      baseStyles: "flex items-center justify-center rounded border border-primary-500 bg-gray-0 focus:ring-2 focus:ring-primary-200 focus:ring-offset-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1",
      /** Checkbox indicator styling */
      indicator: {
        /** Base indicator container styles */
        baseStyles: "flex items-center justify-center",
        /** Indicator icon styling */
        icon: "text-gray-0"
      },
      /** Checkbox size variants */
      sizes: {
        /** Small checkbox - 14px */
        sm: {
          root: "h-3.5 w-3.5 rounded",
          indicator: "h-3.5 w-3.5",
          checkIcon: "h-2.5 w-2.5",
          fontSize: "text-body-md",
        },
        /** Medium checkbox - 16px */
        md: {
          root: "h-4 w-4 rounded",
          indicator: "h-4 w-4",
          checkIcon: "h-3 w-3",
          fontSize: "text-body-md",
        }
      },
      /** Checkbox states styling */
      states: {
        /** Disabled state styles */
        disabled: "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300",
        /** Enabled state styles */
        enabled: "cursor-pointer data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500 hover:border-primary-600 hover:data-[state=checked]:bg-primary-600 hover:data-[state=indeterminate]:bg-primary-600 transition-colors duration-150",
        /** Label disabled state */
        labelDisabled: "text-gray-400 cursor-not-allowed",
        /** Label enabled state */
        labelEnabled: "text-gray-600 font-500 cursor-pointer"
      },
      /** Checkbox position variants */
      position: {
        /** Position wrapper */
        wrapper: "flex items-center",
        /** Left-aligned checkbox */
        left: "space-x-2",
        /** Right-aligned checkbox */
        right: "space-x-reverse space-x-2 flex-row-reverse"
      }
    },
    tag: {
      variant: {
        noFill: {
          neutral: 'bg-gray-0 text-gray-950 border border-gray-950',
          primary: 'bg-gray-0 text-blue-800 border border-blue-600',
          success: 'bg-gray-0 text-green-600 border border-green-600',
          error: 'bg-gray-0 text-red-600 border border-red-600',
          warning: 'bg-gray-0 text-orange-500 border border-orange-500',
          purple: 'bg-gray-0 text-purple-500 border border-purple-500'
        },
        attentive: {
          neutral: 'bg-gray-950 text-gray-0',
          primary: 'bg-blue-600 text-gray-0',
          success: 'bg-green-600 text-gray-0',
          error: 'bg-red-600 text-gray-0',
          warning: 'bg-orange-500 text-gray-0',
          purple: 'bg-purple-500 text-gray-0'
        },
        subtle: {
          neutral: 'bg-gray-50 text-gray-950 border border-gray-200',
          primary: 'bg-blue-50 text-blue-600 border border-blue-100',
          success: 'bg-green-50 text-green-600 border border-green-100',
          error: 'bg-red-50 text-red-600 border border-red-100',
          warning: 'bg-orange-50 text-orange-600 border border-orange-100',
          purple: 'bg-purple-50 text-purple-600 border border-purple-100'
        }
      },
      sizes: {
        xs: {
          height: 'h-5',
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-body-sm font-body font-semibold',
          iconSize: 'h-2.5 w-2.5',
          gap: 'gap-1'
        },
        sm: {
          height: 'h-[22px]',
          padding: 'px-2 py-0.75',
          fontSize: 'text-body-sm font-body font-semibold',
          iconSize: 'h-3 w-3',
          gap: 'gap-1'
        },
        md: {
          height: 'h-6',
          padding: 'px-2.5 py-1',
          fontSize: 'text-body-md font-body font-semibold',
          iconSize: 'h-3.5 w-3.5',
          gap: 'gap-1.5'
        },
        lg: {
          height: 'h-7',
          padding: 'px-3 py-1.5',
          fontSize: 'text-body-md font-body font-semibold',
          iconSize: 'h-4 w-4',
          gap: 'gap-2'
        }
      },
      style: {
        squarical: 'rounded',
        rounded: 'rounded-full'
      },
      splitStyle: {
        rounded: {
          left: 'rounded-l-full rounded-r-none',
          right: 'rounded-r-full rounded-l-none'
        },
        squarical: {
          left: 'rounded-l rounded-r-none',
          right: 'rounded-r rounded-l-none'
        }
      },
      layout: {
        slot: 'flex items-center justify-center',
        container: 'inline-flex w-fit',
        base: 'inline-flex w-fit items-center justify-center gap-2 transition-all duration-200'
      }
    },
    tooltip: {
      baseStyles: "flex z-50 items-center overflow-hidden bg-gray-900 text-gray-0 font-500 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      sizes: {
        sm: {
          padding: "px-1.5 py-0.5",
          fontSize: "text-body-xs",
          borderRadius: "rounded-md",
          maxWidth: "max-w-xs",
          slotSize: "h-3.5 w-3.5",
        },
        lg: {
          padding: "px-2 py-1.5",
          fontSize: "text-body-sm",
          borderRadius: "rounded-lg",
          maxWidth: "max-w-sm",
          slotSize: "h-[18px] w-[18px]",
        },
      },
      arrow: {
        baseStyles: "fill-gray-900",
      },
      content: {
        baseStyles: "items-center text-gray-0",
      },
    },
  }
}; 