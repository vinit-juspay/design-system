export const themeConfig = {
  euler: {
    button: {
      buttonType: {
        primary: {
          backgroundColor: 'bg-gradient-to-b from-primary-600 to-primary-500',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-primary-500 hover:from-primary-500 hover:to-primary-500 hover:border-primary-500',
          activeBackgroundColor: 'active:bg-primary-600 active:from-primary-600 active:to-primary-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] active:border-primary-600',
          borderColor: 'border-[1.5px] border-primary-600',
          disabledBackgroundColor: 'disabled:bg-primary-300 disabled:from-primary-300 disabled:to-primary-300 disabled:border-primary-300 disabled:opacity-100',
          focusClasses: 'focus-visible:outline-primary-200 focus-visible:outline-2 focus:outline-primary-200 focus:outline-2'
        },
        secondary: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-600',
          hoverBackgroundColor: 'hover:bg-gray-50 hover:border-gray-150',
          activeBackgroundColor: 'active:bg-gray-25 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.1)] active:border-gray-200',
          borderColor: 'border-[1.5px] border-gray-200',
          disabledBackgroundColor: 'disabled:bg-gray-150 disabled:border-0 disabled:text-gray-400',
          focusClasses: 'focus-visible:outline-gray-100 focus-visible:outline-2 focus:outline-gray-100 focus:outline-2 focus:bg-white focus:border-gray-150'
        },
        danger: {
          backgroundColor: 'bg-gradient-to-b from-red-600 to-red-500',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-red-500 hover:from-red-500 hover:to-red-500 hover:border-red-500',
          activeBackgroundColor: 'active:bg-red-600 active:from-red-600 active:to-red-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-red-500',
          borderColor: 'border-[1.5px] border-red-600',
          disabledBackgroundColor: 'disabled:bg-red-300 disabled:from-red-300 disabled:to-red-300 disabled:border-red-300 disabled:opacity-100',
          focusClasses: 'focus-visible:outline-red-100 focus-visible:outline-2 focus:outline-red-100 focus:outline-2'
        },
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
      sizes: {
        sm: {
          height: 'h-8',
          padding: 'px-3',
          fontSize: 'text-body-sm',
          iconSize: 'w-4 h-4',
          gap: 'gap-1.5'
        },
        md: {
          height: 'h-9',
          padding: 'px-4',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        },
        lg: {
          height: 'h-10',
          padding: 'px-5',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        }
      },
      fontWeight: 'font-600',
      fontFamily: 'font-sans',
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
    menu: {
      /* Main container of the dropdown menu */
      baseStyles: "z-50 min-w-[calc(100vw/10)] py-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-0 shadow-md",
      
      /* Individual menu items */
      item: {
        baseStyles: "relative text-body-md font-500 flex cursor-default select-none items-center rounded-sm mx-1 px-2 py-1.5 text-gray-600 outline-none focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:before:absolute data-[highlighted]:before:inset-y-0 data-[highlighted]:before:left-1 data-[highlighted]:before:right-1 data-[highlighted]:before:bg-gray-100 data-[highlighted]:before:-z-10 data-[highlighted]:before:rounded-sm data-[highlighted]:text-gray-900 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed",
        icon: "h-4 w-4 mr-2",
        subtext: "text-body-sm font-500 text-gray-400 mt-0.5",
        shortcut: "ml-auto pl-4 text-body-sm text-gray-300 font-500 text-right",
        colors: {
          danger: "text-red-500 data-[highlighted]:text-red-600",
          success: "text-green-500 data-[highlighted]:text-green-600",
          warning: "text-amber-500 data-[highlighted]:text-amber-600"
        }
      },
      
      /* Label items (category headers) */
      label: {
        baseStyles: "text-body-xs font-600 text-gray-400 px-2 py-1.5 uppercase tracking-expanded"
      },
      
      /* Separator lines */
      separator: {
        baseStyles: "h-px my-1 bg-gray-200"
      },
      
      /* Search feature */
      search: {
        baseStyles: "px-2 py-0 border-b border-gray-200",
        container: "flex items-center bg-white",
        icon: "h-4 w-4 text-gray-400",
        input: "w-full px-2 py-1.5 text-body-md font-500 bg-transparent border-0 focus:outline-none focus:ring-0"
      },
      
      /* Checkbox items */
      checkbox: {
        baseStyles: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-body-md font-500 text-gray-600 outline-none focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[disabled]:text-gray-300 data-[disabled]:cursor-not-allowed",
        indicator: "absolute right-2 h-4 w-4 items-center justify-center",
        icon: "h-4 w-4 text-primary-500"
      },
      
      /* Layout helpers */
      layout: {
        container: "flex items-center w-full justify-between",
        content: "flex items-center",
        checkboxRight: "ml-4",
        checkboxLeft: "mr-2",
        /* 3-column layout for standard menu items */
        threeColumn: "flex items-start w-full",
        columnContent: "flex-1 min-w-0",
        flexColumn: "flex flex-col"
      }
    },
    checkbox: {
      baseStyles: "flex items-center justify-center rounded border border-primary-500 bg-white focus:ring-2 focus:ring-primary-200 focus:ring-offset-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1",
      indicator: {
        baseStyles: "flex items-center justify-center",
        icon: "text-white"
      },
      sizes: {
        sm: {
          root: "h-3.5 w-3.5 rounded",
          indicator: "h-3.5 w-3.5",
          checkIcon: "h-2.5 w-2.5",
          fontSize: "text-body-md",
        },
        md: {
          root: "h-4 w-4 rounded",
          indicator: "h-4 w-4",
          checkIcon: "h-3 w-3",
          fontSize: "text-body-md",
        }
      },
      states: {
        disabled: "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300",
        enabled: "cursor-pointer data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500 hover:border-primary-600 hover:data-[state=checked]:bg-primary-600 hover:data-[state=indeterminate]:bg-primary-600 transition-colors duration-150",
        labelDisabled: "text-gray-400 cursor-not-allowed",
        labelEnabled: "text-gray-600 font-500 cursor-pointer"
      },
      position: {
        wrapper: "flex items-center",
        left: "space-x-2",
        right: "space-x-reverse space-x-2 flex-row-reverse"
      }
    }
  }
}; 