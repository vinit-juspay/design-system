export const themeConfig = {
  euler: {
    button: {
      base: {
        container:
          'inline-flex items-center justify-center transition-all duration-200 disabled:pointer-events-none font-600 font-sans',
        focus: 'focus-visible:outline-2 focus:outline-2',
        icon: 'flex-shrink-0',
        text: 'truncate',
        loading: 'animate-spin',
      },
      buttonType: {
        primary: {
          backgroundColor: 'bg-gradient-to-b from-primary-600 to-primary-500',
          textColor: 'text-white',
          hoverBackgroundColor:
            'hover:bg-primary-500 hover:from-primary-500 hover:to-primary-500 hover:border-primary-500',
          activeBackgroundColor:
            'active:bg-primary-600 active:from-primary-600 active:to-primary-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] active:border-primary-600',
          borderColor: 'border-[1.5px] border-primary-600',
          disabledBackgroundColor:
            'disabled:bg-primary-300 disabled:from-primary-300 disabled:to-primary-300 disabled:border-primary-300 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-primary-200 focus-visible:outline-2 focus:outline-primary-200 focus:outline-2',
        },
        secondary: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-600',
          hoverBackgroundColor: 'hover:bg-gray-50 hover:border-gray-150',
          activeBackgroundColor:
            'active:bg-gray-25 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.1)] active:border-gray-200',
          borderColor: 'border-[1.5px] border-gray-200',
          disabledBackgroundColor: 'disabled:bg-gray-150 disabled:border-0 disabled:text-gray-400',
          focusClasses:
            'focus-visible:outline-gray-100 focus-visible:outline-2 focus:outline-gray-100 focus:outline-2 focus:bg-white focus:border-gray-150',
        },
        danger: {
          backgroundColor: 'bg-gradient-to-b from-red-600 to-red-500',
          textColor: 'text-white',
          hoverBackgroundColor:
            'hover:bg-red-500 hover:from-red-500 hover:to-red-500 hover:border-red-500',
          activeBackgroundColor:
            'active:bg-red-600 active:from-red-600 active:to-red-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-red-500',
          borderColor: 'border-[1.5px] border-red-600',
          disabledBackgroundColor:
            'disabled:bg-red-300 disabled:from-red-300 disabled:to-red-300 disabled:border-red-300 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-red-100 focus-visible:outline-2 focus:outline-red-100 focus:outline-2',
        },
        success: {
          backgroundColor: 'bg-gradient-to-b from-green-600 to-green-500',
          textColor: 'text-white',
          hoverBackgroundColor:
            'hover:bg-green-500 hover:from-green-500 hover:to-green-500 hover:border-green-500',
          activeBackgroundColor:
            'active:bg-green-600 active:from-green-600 active:to-green-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-green-600',
          borderColor: 'border-[1.5px] border-green-600',
          disabledBackgroundColor:
            'disabled:bg-green-200 disabled:from-green-200 disabled:to-green-200 disabled:border-green-200 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-green-200 focus-visible:outline-2 focus:outline-green-200 focus:outline-2',
        },
      },
      sizes: {
        sm: {
          height: 'h-8',
          padding: 'px-3',
          fontSize: 'text-body-sm',
          iconSize: 'w-4 h-4',
          gap: 'gap-1.5',
        },
        md: {
          height: 'h-9',
          padding: 'px-4',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2',
        },
        lg: {
          height: 'h-10',
          padding: 'px-5',
          fontSize: 'text-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2',
        },
      },
      borderRadius: 'rounded-lg',
      fontWeight: 'font-600',
      fontFamily: 'font-sans',
      linkColors: {
        primary: {
          text: 'text-primary-600',
          hover: 'hover:text-primary-700 hover:underline',
          focus: 'focus:text-primary-700',
          disabled: 'disabled:text-primary-300',
        },
        secondary: {
          text: 'text-gray-600',
          hover: 'hover:text-gray-700 hover:underline',
          focus: 'focus:text-gray-700',
          disabled: 'disabled:text-gray-400',
        },
        danger: {
          text: 'text-red-600',
          hover: 'hover:text-red-700 hover:underline',
          focus: 'focus:text-red-700',
          disabled: 'disabled:text-red-300',
        },
        success: {
          text: 'text-green-600',
          hover: 'hover:text-green-700 hover:underline',
          focus: 'focus:text-green-700',
          disabled: 'disabled:text-green-300',
        },
      },
    },
    tag: {
      variant: {
        noFill: {
          neutral: 'bg-gray-0 text-gray-950 border-[1.5px] border-gray-950',
          primary: 'bg-gray-0 text-blue-800 border-[1.5px] border-blue-600',
          success: 'bg-gray-0 text-green-600 border-[1.5px] border-green-600',
          error: 'bg-gray-0 text-red-600 border-[1.5px] border-red-600',
          warning: 'bg-gray-0 text-orange-500 border-[1.5px] border-orange-500',
          purple: 'bg-gray-0 text-purple-500 border-[1.5px] border-purple-500',
        },
        attentive: {
          neutral: 'bg-gray-950 text-gray-0',
          primary: 'bg-blue-600 text-gray-0',
          success: 'bg-green-600 text-gray-0',
          error: 'bg-red-600 text-gray-0',
          warning: 'bg-orange-500 text-gray-0',
          purple: 'bg-purple-500 text-gray-0',
        },
        subtle: {
          neutral: 'bg-gray-50 text-gray-950 border-[1.5px] border-gray-200',
          primary: 'bg-blue-50 text-blue-600 border-[1.5px] border-blue-100',
          success: 'bg-green-50 text-green-600 border-[1.5px] border-green-100',
          error: 'bg-red-50 text-red-600 border-[1.5px] border-red-100',
          warning: 'bg-orange-50 text-orange-600 border-[1.5px] border-orange-100',
          purple: 'bg-purple-50 text-purple-600 border-[1.5px] border-purple-100',
        },
      },
      sizes: {
        xs: {
          height: 'h-5',
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-body-sm font-body font-semibold',
          iconSize: 'h-2.5 w-2.5',
          gap: 'gap-1',
        },
        sm: {
          height: 'h-[22px]',
          padding: 'px-2 py-0.75',
          fontSize: 'text-body-sm font-body font-semibold',
          iconSize: 'h-3 w-3',
          gap: 'gap-1',
        },
        md: {
          height: 'h-6',
          padding: 'px-2.5 py-1',
          fontSize: 'text-body-md font-body font-semibold',
          iconSize: 'h-3.5 w-3.5',
          gap: 'gap-1.5',
        },
        lg: {
          height: 'h-7',
          padding: 'px-3 py-1.5',
          fontSize: 'text-body-md font-body font-semibold',
          iconSize: 'h-4 w-4',
          gap: 'gap-2',
        },
      },
      style: {
        squarical: 'rounded',
        rounded: 'rounded-full',
      },
      splitStyle: {
        rounded: {
          left: 'rounded-l-full rounded-r-none',
          right: 'rounded-r-full rounded-l-none',
        },
        squarical: {
          left: 'rounded-l rounded-r-none',
          right: 'rounded-r rounded-l-none',
        },
      },
      layout: {
        slot: 'flex items-center justify-center',
        container: 'inline-flex w-fit',
        base: 'inline-flex w-fit items-center justify-center gap-2 transition-all duration-200',
      },
    },
    tooltip: {
      baseStyles:
        'flex z-50 items-center overflow-hidden bg-gray-900 text-gray-0 font-500 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sizes: {
        sm: {
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-body-xs',
          borderRadius: 'rounded-md',
          maxWidth: 'max-w-xs',
          slotSize: 'h-3.5 w-3.5',
        },
        lg: {
          padding: 'px-2 py-1.5',
          fontSize: 'text-body-sm',
          borderRadius: 'rounded-lg',
          maxWidth: 'max-w-sm',
          slotSize: 'h-[18px] w-[18px]',
        },
      },
      arrow: {
        baseStyles: 'fill-gray-900',
      },
      content: {
        baseStyles: 'items-center text-gray-0',
      },
    },
    tabs: {
      base: {
        root: 'w-full',
        list: 'flex w-full items-center',
        trigger:
          'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-body-md font-600 ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      },
      expanded: 'justify-between [&>*]:flex-1 [&>*]:text-center',
      variant: {
        boxed: {
          list: 'bg-gray-50 p-1 rounded-lg',
          trigger:
            'rounded-lg text-gray-500 data-[state=active]:bg-gray-0 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm',
        },
        floating: {
          list: 'gap-2',
          trigger:
            'rounded-lg text-gray-500 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700',
        },
        underline: {
          list: 'border-b border-gray-200',
          trigger:
            'border-b-2 border-transparent text-gray-500 relative data-[state=active]:border-gray-700 data-[state=active]:text-gray-700 data-[state=active]:z-10',
        },
      },
      sizes: {
        md: {
          height: 'h-11',
          underlineOffset: '-mb-2',
        },
        lg: {
          height: 'h-12',
          underlineOffset: '-mb-3',
        },
      },
      content:
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0',
    },
    snackbar: {
      base: {
        container:
          'fixed z-50 flex flex-col p-4 rounded-xl shadow-lg max-w-md transition-all duration-200',
        content: 'flex flex-col gap-1',
        icon: 'flex-shrink-0',
        closeButton: 'ml-4 flex-shrink-0 hover:opacity-80',
      },
      layout: {
        headerContainer: 'flex w-full items-center justify-between',
        headerContent: 'flex items-center gap-2',
        messageContainer: 'mt-1 pl-7 flex flex-col gap-1',
        heading: 'text-body-lg font-600',
        message: 'text-body-md font-500 break-words',
        alertMessage: 'text-body-md font-600',
      },
      type: {
        info: {
          backgroundColor: 'bg-gray-800',
          textColor: 'text-gray-300',
          iconColor: 'text-blue-400',
        },
        warning: {
          backgroundColor: 'bg-gray-800',
          textColor: 'text-gray-300',
          iconColor: 'text-yellow-400',
        },
        error: {
          backgroundColor: 'bg-gray-800',
          textColor: 'text-gray-300',
          iconColor: 'text-red-400',
        },
        success: {
          backgroundColor: 'bg-gray-800',
          textColor: 'text-gray-300',
          iconColor: 'text-green-400',
        },
      },
      position: {
        topRight: 'top-4 right-4',
        topLeft: 'top-4 left-4',
        bottomRight: 'bottom-4 right-4',
        bottomLeft: 'bottom-4 left-4',
      },
    },
    alert: {
      base: {
        alertContainer: 'rounded-lg p-4 relative space-y-2',
        header: 'flex items-center gap-2 text-blue-800 font-600 text-body-md',
        closeButton: 'text-gray-400 hover:text-gray-600 h-5 w-5 flex items-center justify-center',
        headerContainer: 'flex items-center justify-between gap-2',
        divider: 'relative w-[1px] h-5 bg-gray-300',
      },
      alertActionPlacement: {
        default: 'flex items-start flex-col pl-6 gap-2',
        actionsRight: 'flex items-start gap-7 pl-6',
      },
      typography: {
        title: 'font-600 text-body-md text-gray-700 tracking-normal',
        description: 'font-400 text-body-md text-gray-600 tracking-normal',
      },
      icon: {
        size: 'w-4 h-4',
        container: 'flex items-center gap-2',
      },
      actionButton: {
        container: 'flex items-center gap-5',
        base: 'flex items-center justify-center whitespace-nowrap transition-all duration-200 disabled:pointer-events-none font-600 text-body-md',
        colors: {
          primary: 'text-primary-700 hover:text-primary-800',
          success: 'text-green-700 hover:text-green-800',
          warning: 'text-yellow-700 hover:text-yellow-800',
          error: 'text-red-700 hover:text-red-800',
          purple: 'text-purple-700 hover:text-purple-800',
          neutral: 'text-gray-700 hover:text-gray-800',
          orange: 'text-orange-700 hover:text-orange-800',
        },
      },
      styles: {
        fill: {
          primary: {
            background: 'bg-blue-50/50',
            border: 'border-[1px] border-blue-100',
            iconColor: 'text-blue-600',
          },
          success: {
            background: 'bg-green-50',
            border: 'border-[1px] border-green-100',
            iconColor: 'text-green-600',
          },
          purple: {
            background: 'bg-purple-50',
            border: 'border-[1px] border-purple-100',
            iconColor: 'text-purple-600',
          },
          warning: {
            background: 'bg-yellow-50',
            border: 'border-[1px] border-yellow-100',
            iconColor: 'text-yellow-600',
          },
          neutral: {
            background: 'bg-gray-50',
            border: 'border-[1px] border-gray-100',
            iconColor: 'text-gray-600',
          },
          error: {
            background: 'bg-red-50',
            border: 'border-[1px] border-red-100',
            iconColor: 'text-red-600',
          },
          orange: {
            background: 'bg-orange-50',
            border: 'border-[1px] border-orange-100',
            iconColor: 'text-orange-600',
          },
        },
        subtle: {
          primary: {
            background: 'bg-blue-50',
            border: 'border-[1px] border-blue-500',
            iconColor: 'text-blue-600',
          },
          success: {
            background: 'bg-green-50',
            border: 'border-[1px] border-green-500',
            iconColor: 'text-green-600',
          },
          purple: {
            background: 'bg-purple-50',
            border: 'border-[1px] border-purple-500',
            iconColor: 'text-purple-600',
          },
          warning: {
            background: 'bg-yellow-50',
            border: 'border-[1px] border-yellow-500',
            iconColor: 'text-yellow-600',
          },
          neutral: {
            background: 'bg-gray-50',
            border: 'border-[1px] border-gray-500',
            iconColor: 'text-gray-600',
          },
          error: {
            background: 'bg-red-50',
            border: 'border-[1px] border-red-500',
            iconColor: 'text-red-600',
          },
          orange: {
            background: 'bg-orange-50',
            border: 'border-[1px] border-orange-500',
            iconColor: 'text-orange-600',
          },
        },
        noFill: {
          primary: {
            background: 'bg-transparent',
            border: 'border-[1px] border-blue-500',
            iconColor: 'text-blue-600',
          },
          success: {
            background: 'bg-transparent',
            border: 'border-[1px] border-green-500',
            iconColor: 'text-green-600',
          },
          purple: {
            background: 'bg-transparent',
            border: 'border-[1px] border-purple-500',
            iconColor: 'text-purple-600',
          },
          warning: {
            background: 'bg-transparent',
            border: 'border-[1px] border-yellow-500',
            iconColor: 'text-yellow-600',
          },
          neutral: {
            background: 'bg-transparent',
            border: 'border-[1px] border-gray-500',
            iconColor: 'text-gray-600',
          },
          error: {
            background: 'bg-transparent',
            border: 'border-[1px] border-red-500',
            iconColor: 'text-red-600',
          },
          orange: {
            background: 'bg-transparent',
            border: 'border-[1px] border-orange-500',
            iconColor: 'text-orange-600',
          },
        },
      },
      border: {
        default: 'border-[2px]',
      },
    },
    breadcrumb: {
      base: {
        container: 'flex items-center flex-wrap',
        divider: 'mx-2 text-gray-400',
      },
      item: {
        default: 'inline-flex items-center text-gray-400 font-medium cursor-pointer',
        hover: 'hover:text-gray-1000',
        active: 'text-gray-700 font-semibold cursor-default',
      },
      sizes: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      moreButton: {
        base: 'inline-flex items-center justify-center text-gray-400 font-medium p-2 gap-1.5 rounded-lg w-8 h-8 transition-all duration-200',
        default: 'border border-transparent',
        hover: 'hover:text-gray-1000 hover:border-gray-150',
        active: 'border border-gray-150 bg-gray-50 text-gray-1000',
      },
      dropdown: {
        container: 'absolute top-full left-0 mt-1 z-50 py-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-48',
        item: 'px-4 py-2 hover:bg-gray-50',
      },
      iconSlot: {
        left: 'inline-flex items-center justify-center w-4.5 h-4.5 mr-1.5',
        right: 'inline-flex items-center justify-center w-4.5 h-4.5 ml-1.5'
      }
    }
  },
};
