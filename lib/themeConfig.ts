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
      baseStyles: "z-50 min-w-[8rem] py-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md",
      item: {
        baseStyles: "relative text-body-sm font-500 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-gray-600 outline-none focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed",
        icon: "h-4 w-4 mr-2"
      },
      label: {
        baseStyles: "text-body-xs font-600 text-gray-400 px-2 py-1.5 uppercase tracking-expanded"
      },
      separator: {
        baseStyles: "h-px my-1 bg-gray-200"
      },
      checkbox: {
        baseStyles: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-gray-700 outline-none focus:bg-gray-100 focus:text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 data-[disabled]:text-gray-300 data-[disabled]:cursor-not-allowed",
        indicator: "absolute right-2 inline-flex h-4 w-4 items-center justify-center",
        icon: "h-4 w-4 text-primary-500"
      }
    },
    select: {
      baseStyles: "relative flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-body-md text-gray-600 shadow-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      icon: {
        baseStyles: "h-4 w-4 opacity-50",
      },
      content: {
        baseStyles: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-600 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      },
      viewport: {
        baseStyles: "p-1",
      },
      sizes: {
        sm: {
          height: "h-8",
          fontSize: "text-body-sm",
          padding: "px-2.5",
          iconSize: "h-4 w-4",
        },
        md: {
          height: "h-9",
          fontSize: "text-body-md",
          padding: "px-3",
          iconSize: "h-4 w-4",
        },
        lg: {
          height: "h-10",
          fontSize: "text-body-md",
          padding: "px-3.5",
          iconSize: "h-5 w-5",
        }
      },
      scrollButton: {
        baseStyles: "flex cursor-default items-center justify-center py-1"
      }
    }
  }
}; 