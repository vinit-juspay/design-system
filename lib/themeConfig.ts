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
      borderRadius: 'rounded-md'
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
    textInput: {
      label: {
        base: 'text-body-md font-medium tracking-normal',
        color: 'text-gray-700',
        mandatory: 'text-red-500 text-body-md font-normal -top-0.5',
      },
      sublabel: {
        base: 'text-body-md font-normal tracking-normal',
        color: 'text-gray-400',
      },
      hint: {
        base: 'text-body-md font-normal tracking-normal',
        color: 'text-gray-500',
        error: 'text-red-500',
        success: 'text-green-600',
      },
      inputBase: {
        base: 'w-full flex flex-row justify-between items-center relative border-[1px] transition-all',
        sizes: {
          md: 'h-9 rounded-xl',
          lg: 'h-10 rounded-2xl',
        },
        slots: {
          left: '',
          right: '',
        },
        states: {
          default: 'border-gray-300 bg-white',
          hover: 'hover:border-gray-400 hover:focus-within:border-primary-500',
          focused: 'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
          error: 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
          disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed',
        },
      },
      input: {
        base: 'w-full bg-transparent text-body-md font-medium placeholder:font-normal text-gray-800 outline-none pl-9 pr-9 disabled:cursor-not-allowed',
        states: {
          default: 'placeholder:text-gray-400',
          disabled: 'placeholder:text-gray-300',
        },
      },
      slot: {
        base: '',
        positions: {
          left: 'absolute left-3',
          right: 'absolute right-3',
        },
      },
    },
    numberInput: {
      stepper: {
        base: 'flex flex-col border-l border-gray-200',
        button: {
          base: 'flex items-center justify-center w-8 h-[18px] disabled:bg-gray-50 disabled:cursor-not-allowed',
          states: {
            default: 'text-gray-500',
            hover: 'hover:bg-gray-50',
            active: 'active:bg-gray-100',
          },
          divider: 'border-t border-gray-200',
          icon: 'w-2.5 h-2.5 fill-gray-800',
        },
      },
      input: {
        base: '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      },
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