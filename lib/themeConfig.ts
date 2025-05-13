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
    buttonGroup: {
      base: {
        container: 'inline-flex items-center',
      },
      spacing: {
        stacked: '',
        nonStacked: {
          sm: 'gap-3',
          md: 'gap-4',
          lg: 'gap-4',
        },
      },
      buttonStyles: {
        stacked: {
          first: 'rounded-r-none border-r-0',
          middle: 'rounded-none border-r-0',
          last: 'rounded-l-none',
        },
        nonStacked: '',
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
    input: {
      container: 'flex flex-col space-y-2',
      label: {
        container: 'flex items-center gap-2',
        labelwSublabel: 'flex items-center gap-1',
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
        base: 'w-full overflow-hidden flex flex-row justify-between items-center relative border transition-all rounded-xl',
        sizes: {
          md: 'h-9',
          lg: 'h-10',
        },
        states: {
          default: 'border-gray-300 bg-white',
          hover: 'hover:border-gray-400 hover:focus-within:border-primary-500',
          focused:
            'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
          error:
            'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
          disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed',
        },
      },
      input: {
        base: 'w-full h-full text-body-md font-medium outline-none disabled:cursor-not-allowed placeholder:text-gray-400',
        padding: {
          default: 'px-3',
          withLeftSlot: 'pl-2 pr-3',
          withRightSlot: 'pr-2 pl-3',
          withBothSlots: 'px-2',
        },
        states: {
          default: ' text-gray-800 placeholder:text-gray-400',
          disabled: 'text-gray-400 placeholder:text-gray-300',
        },
      },
      slot: {
        base: '',
        positions: {
          left: 'pl-3',
          right: 'pr-3',
        },
      },
    },
    dropdownInput: {
      container: 'flex flex-col space-y-2',
      dropdown: {
        base: 'flex items-center cursor-pointer gap-1',
        positions: {
          left: 'pl-3',
          right: 'pr-3',
        },
        withLeftSlot: 'ml-8',
        option: {
          container: 'flex items-center gap-1.5 truncate',
          label: 'text-gray-800 font-medium truncate',
          placeholder: 'text-gray-400',
          icon: 'flex-shrink-0',
          chevron: ' flex-shrink-0 text-gray-400',
        },
      },
      input: {
        base: 'flex-1 border-none focus:outline-none focus:ring-0',
        withLeftPadding: 'pl-2',
      },
      menu: {
        base: 'rounded-xl bg-white p-1 shadow-md border border-gray-200 min-w-[8rem] z-50',
        item: {
          base: 'relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-body-md text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 focus:bg-gray-50',
          active: 'bg-gray-50 font-medium',
          content: 'flex items-center gap-2 w-full',
          icon: 'flex-shrink-0',
          text: 'flex-1',
          checkIcon: 'h-4 w-4 text-primary-500 flex-shrink-0',
        },
      },
    },
    textInput: {
      // TextInput specific styles (if any)
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
          sizes: {
            md: 'h-[18px]',
            lg: 'h-[20px]',
          },
          divider: 'border-t border-gray-200',
          icon: 'w-2.5 h-2.5 fill-gray-800',
        },
      },
      input: {
        base: '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      },
    },
    unitInput: {
      container: 'flex items-center h-full',
      unit: {
        base: 'flex items-center justify-center text-body-md font-medium text-gray-500 h-full bg-gray-100',
        positions: {
          prefix: 'border-r border-gray-300 px-3',
          suffix: 'border-l border-gray-300 px-3',
        },
        states: {
          disabled: 'text-gray-300',
        },
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
        list: 'flex w-full items-center gap-3',
        trigger:
          'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-body-md ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      },
      expanded: 'justify-between [&>*]:flex-1 [&>*]:text-center',
      variant: {
        boxed: {
          list: 'bg-gray-50 p-1 rounded-lg',
          trigger:
            'rounded-lg text-gray-500 data-[state=active]:bg-gray-0 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm hover:bg-gray-0 data-[state=active]:font-600 hover:text-gray-600 font-500',
        },
        floating: {
          list: 'gap-2',
          trigger:
            'rounded-lg text-gray-500 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 font-500 hover:text-gray-700 data-[state=active]:font-600',
        },
        underline: {
          list: 'border-b border-gray-200',
          trigger:
            'border-b-2 border-transparent text-gray-500 relative data-[state=active]:border-gray-700 data-[state=active]:text-gray-700 font-500 hover:text-gray-600  data-[state=active]:z-10 data-[state=active]:font-600',
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
    otpInput: {
      container: {
        base: 'flex flex-col space-y-2',
      },
      inputsContainer: {
        base: 'flex justify-between',
        digits: {
          '4': 'w-[204px]',
          '6': 'w-[312px]',
        },
      },
      digit: {
        base: 'w-10 h-12 text-center text-body-lg font-medium rounded-xl border-[1px] transition-all focus:outline-none',
        states: {
          default: 'border-gray-300 bg-white',
          hover: 'hover:border-gray-400',
          focused: 'border-primary-500 ring-2 ring-primary-100',
          filled: 'border-gray-300 bg-white',
          error: 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100',
          disabled: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
        },
      },
    },
    textArea: {
      container: 'flex flex-col space-y-2',
      textarea: {
        base: 'w-full overflow-hidden text-body-md font-medium placeholder:font-normal outline-none resize-none px-3 py-2 rounded-xl border transition-all placeholder:text-gray-400',
        states: {
          default: 'border-gray-300 bg-white',
          hover: 'hover:border-gray-400 hover:focus-within:border-primary-500',
          focused:
            'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
          error:
            'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
          disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed',
        },
      },
    },
    snackbar: {
      base: {
        container:
          'fixed z-50 flex flex-col p-4 rounded-xl shadow-lg max-w-md transition-all duration-200',
        content: 'flex flex-col gap-1',
        icon: 'flex-shrink-0',
        closeButton: 'ml-4 flex-shrink-0 hover:opacity-80 text-gray-25',
      },
      layout: {
        headerContainer: 'flex w-full items-center justify-between',
        headerContent: 'flex items-center gap-2',
        messageContainer: 'mt-1.5 pl-7 flex flex-col gap-4',
        heading: 'text-body-lg font-500 text-gray-25',
        message: 'text-body-md font-400 break-words text-gray-300',
        actionMessage:
          'text-body-md font-600 text-gray-100 hover:text-gray-0 justify-start active:text-gray-0 focus:text-gray-0',
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
    chart: {
      base: {
        chartContainer: 'w-full h-full outline outline-1 outline-gray-300 rounded-lg bg-white',
        chartContentContainer: {
          top: 'py-5 px-4 flex flex-col gap-6',
          right: 'py-5 px-4 flex flex-row-reverse gap-6',
        },
        chartHeader: {
          container:
            'flex items-center justify-between gap-2 py-4 px-[18px] bg-[#FCFCFD] border-b border-[#ECEFF3]',
          metrics: 'flex items-center gap-2',
          selectedMetric: 'text-base font-semibold text-gray-600',
          slotContainer: 'flex items-center gap-2',
        },
        chartLegend: {
          container: 'flex items-center gap-8 justify-between',
          legendItemsContainer:
            'flex h-7 items-center overflow-x-hidden overflow-visible whitespace-nowrap flex-1',
          legendItem: 'h-4 flex items-center gap-2 cursor-pointer pr-4 transition-all duration-300',
          legendMarker: 'w-3 h-3 rounded-sm',
          resetButton:
            'text-sm flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm h-4 w-4 shrink-0',
          stackedLegendContainer: 'h-full w-full flex flex-col justify-center gap-2',
        },
        tooltip: {
          container:
            'bg-gray-0 font-sans shadow-lg flex flex-col gap-3 rounded-lg p-3 pl-2.5 border border-gray-150 min-w-[220px] !max-w-[200px]',
        },
      },
    },

    menuv2: {
      baseStyles: 'rounded-md shadow-md overflow-hidden bg-white border border-gray-200 py-1',
      animation: `
        .submenu-portal > div {
          @apply animate-fade-in animate-zoom-in;
          transform-origin: top left;
        }
      `,
      shadows: {
        xs: 'shadow-xs',
      },
      types: {
        DEFAULT: 'w-52',
        MULTI_SELECT: 'w-52',
        CONTEXT_MENU: 'w-52',
      },
      dimensions: {
        minWidth: 'min-w-[180px]',
        maxWidth: 'max-w-[320px]',
        width: 'w-auto',
      },
      search: {
        container: 'p-0 border-b border-gray-100',
        input:
          'w-full text-[14px] text-gray-600 bg-transparent border-none outline-none focus:ring-0 pl-[22px]',
        icon: 'absolute left-2 flex items-center justify-center text-gray-400',
        noResults: 'p-3 text-sm text-gray-500 text-center',
        wrapper: 'relative p-2 flex items-center',
      },
      menuItemContainer: {
        base: 'max-h-60 overflow-auto px-1',
        withSearch: 'mt-1',
      },
      dropdown: {
        container: {
          base: 'relative',
          withLabel: 'mb-2',
          wrapper: 'relative flex items-center',
        },
        menu: {
          container: 'absolute z-50',
          base: 'rounded-[10px] border border-gray-200 overflow-hidden whitespace-nowrap',
        },
        trigger: {
          base: 'focus:outline-none',
          clearButtonRight: 'rounded-r-none',
          noBorderClearButtonRight: 'rounded-r-none',
          withBorderClearButtonRight: 'rounded-r-none border-r-0',
          widthFit: 'w-fit',
        },
        label: {
          container: 'flex items-center gap-1.5',
          mandatory: 'text-red-600',
          helpIcon: 'text-gray-400',
          base: 'font-medium text-gray-700',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        sublabel: {
          base: 'font-normal text-gray-500',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        hint: {
          base: 'font-normal text-gray-500 mt-2',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        leftIcon: {
          wrapper: 'text-gray-400 flex items-center justify-center',
          base: 'mr-2',
          sizes: {
            SMALL: 'w-3 h-3',
            MEDIUM: 'w-3.5 h-3.5',
            LARGE: 'w-3.5 h-3.5',
          },
        },
        chevron: {
          wrapper: 'text-gray-400 flex items-center justify-center',
          base: 'ml-2',
          sizes: {
            SMALL: 'w-3.5 h-3.5',
            MEDIUM: 'w-4 h-4',
            LARGE: 'w-4 h-4',
          },
        },
        displayText: 'flex-grow font-normal text-gray-700',
        clearButton: {
          base: 'rounded-l-none',
          withContainer: 'border-[1px]',
          noContainer: 'border-[1px] border-gray-200',
          icon: 'text-gray-600',
        },
        multiSelectTag: {
          base: 'ml-1.5 flex items-center justify-center',
          sizeSm: 'h-4 w-4 min-w-4',
          sizeDefault: 'h-[18px] w-[18px] min-w-[18px]',
        },
        selectedText: 'text-gray-400 ml-1.5',
        baseClasses: 'relative flex items-center transition-colors',
        typeClasses: {
          ICON_ONLY: 'justify-center',
          SINGLE_SELECT: '',
          MULTI_SELECT: '',
        },
        states: {
          noBorder: {
            DEFAULT: 'bg-white text-gray-700',
            HOVER: 'bg-gray-50 text-gray-700',
            OPEN: 'bg-gray-25 text-gray-700',
            SELECTED: 'bg-white text-gray-700',
          },
          withBorder: {
            DEFAULT: 'bg-white text-gray-700 border border-gray-200',
            HOVER: 'bg-gray-50 text-gray-700 border border-gray-200',
            OPEN: 'bg-gray-25 text-gray-700 border border-gray-200',
            SELECTED: 'bg-white text-gray-700 border border-gray-200',
          },
        },
        sizes: {
          SMALL: 'h-8 px-3.5 py-1.5 text-[14px]',
          MEDIUM: 'h-9 px-3.5 py-2 text-[14px]',
          LARGE: 'h-10 px-3.5 py-2.5 text-[14px]',
        },
        subtypes: {
          HAS_CONTAINER: 'rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]',
          NO_CONTAINER: 'rounded-[10px]',
        },
        disabled: {
          true: 'opacity-50 cursor-not-allowed bg-gray-100',
          false: 'cursor-pointer hover:bg-gray-50',
        },
        positioning: {
          offset: 4,
          rightPadding: 10,
          menuWidth: 200,
          menuHeight: 200,
          maxHeightOffset: 20,
        },
      },
      separator: 'h-px my-1 bg-gray-200',
      iconSize: 'w-4 h-4',
      chevronColor: 'text-gray-400',
      textContent: 'flex-grow truncate font-feature-settings-normal',
      menuItem: {
        baseStyles: 'flex items-center px-3 py-1.5 text-gray-600 text-body-md font-medium ',
        types: {
          DEFAULT: 'cursor-pointer font-medium text-gray-600',
          MULTI_SELECT: 'cursor-pointer',
          ACTION: 'cursor-pointer font-medium',
          LABEL: 'font-semibold text-xs text-gray-500 uppercase tracking-wider py-1',
          SEPARATOR: 'py-0 my-1 border-b border-gray-200',
          SUBMENU: 'cursor-pointer font-[500] text-gray-600 relative',
        },
        states: {
          DEFAULT: 'bg-[#FFFFFF]',
          HOVER: '!bg-[#F3F4F6]',
          SELECTED: 'bg-blue-50 text-blue-700',
          NA: 'pointer-events-none',
        },
        actions: {
          NA: '',
          DANGER: 'text-red-600',
          PRIMARY: 'text-blue-600',
        },
        actionHover: {
          NA: '!bg-[#F3F4F6]',
          PRIMARY: '!bg-blue-50',
          DANGER: '!bg-red-50',
        },
        hover: {
          PRIMARY: 'hover:bg-blue-50',
          DANGER: 'hover:bg-red-50',
          DEFAULT: 'hover:bg-[#F3F4F6]',
        },
        disabled: 'opacity-50 pointer-events-none',
        shortcut: 'ml-auto text-xs text-gray-300',
        slots: {
          slotL: 'mr-2 flex-shrink-0',
          slotR1: 'ml-auto flex-shrink-0',
          slotR2: 'ml-2 flex-shrink-0',
        },
        submenu: {
          container:
            'bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[10rem] origin-top-left',
          animation: 'animation: menuAnimation 150ms ease-out',
          animationClass:
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          portal: {
            base: 'submenu-portal absolute z-[9999]',
            container: 'relative',
            collisionZone: {
              base: 'absolute top-0 h-full w-6',
              left: 'left-0 -translate-x-full',
              right: 'right-0 translate-x-full',
            },
          },
        },
        checkbox: {
          wrapper: 'pointer-events-none !m-0 !p-0',
        },
        rounded: 'rounded-md',
      },
    },
    checkbox: {
      baseStyles:
        'flex items-center justify-center rounded border bg-gray-0 focus:ring-2 focus:ring-primary-200 focus:ring-offset-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1 mr-2',
      indicator: {
        baseStyles: 'flex items-center justify-center',
        icon: 'text-gray-0',
      },
      wrapper: 'flex items-center',
      rightSlot: 'ml-1.5',
      subtext: 'text-gray-400 font-normal',
      disabledSubtext: 'text-gray-200',
      sizes: {
        sm: {
          root: 'h-3.5 w-3.5 rounded',
          indicator: 'h-3.5 w-3.5',
          checkIcon: 'h-2.5 w-2.5',
          fontSize: 'text-body-md',
          subtext: 'text-body-sm ml-5 mt-1',
        },
        md: {
          root: 'h-4 w-4 rounded',
          indicator: 'h-4 w-4',
          checkIcon: 'h-3 w-3',
          fontSize: 'text-body-md',
          subtext: 'text-body-md ml-6 mt-1',
        },
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-300',
        enabled:
          'cursor-pointer data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500 hover:border-primary-600 hover:data-[state=checked]:bg-primary-600 hover:data-[state=indeterminate]:bg-primary-600 transition-colors duration-150',
        labelDisabled: 'text-gray-400 cursor-not-allowed',
        labelEnabled: 'text-gray-600 font-500 cursor-pointer',
      },
      position: {
        wrapper: 'flex flex-col',
        right: 'flex-row-reverse',
      },
    },
    breadcrumb: {
      base: {
        container: 'flex items-center flex-wrap gap-2',
        divider: 'text-gray-400',
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
        container:
          'absolute top-full left-0 z-50 py-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-48 translate-y-1',
        item: 'px-4 py-2 hover:bg-gray-50',
      },
      iconSlot: {
        left: 'inline-flex items-center justify-center w-4.5 h-4.5',
        right: 'inline-flex items-center justify-center w-4.5 h-4.5',
      },
    },
    dateRangePicker: {
      base: {
        container: 'relative inline-flex w-full',
        input:
          'flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer',
      },
      input: {
        primary: 'border-gray-300',
        secondary: 'border-gray-200 bg-gray-50',
        sizes: {
          sm: 'text-xs py-1',
          md: 'text-sm py-2',
          lg: 'text-base py-2.5',
        },
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        disabledDay: 'opacity-40 cursor-not-allowed pointer-events-none',
      },
      calendar: {
        container:
          'absolute z-10 mt-1 w-auto min-w-96 bg-white border border-gray-200 rounded-lg shadow-lg',
        gridContainer: 'max-h-[400px] overflow-y-auto p-4',
        monthContainer: 'mb-6',
        monthHeader: 'text-lg font-semibold text-gray-700 my-1',
        dayNamesContainer: 'grid grid-cols-7 text-center text-gray-500',
        dayName: 'p-2 border-b border-gray-100',
        weekRow: 'grid grid-cols-7 py-1',
        emptyCell: 'p-2',
        dayCell: 'cursor-pointer text-center p-2 relative font-medium box-border',
        startDate: 'bg-primary-500 rounded-l-lg',
        endDate: 'bg-primary-500 rounded-r-lg',
        singleDate: 'bg-primary-500 rounded-lg',
        rangeDay: 'bg-primary-50',
        todayDay: 'font-medium',
        todayIndicator:
          'absolute w-1 h-1 bg-primary-500 rounded-full bottom-1 left-1/2 transform -translate-x-1/2',
        hoverState: 'hover:ring-1 hover:ring-inset hover:ring-primary-500 hover:rounded-lg',
      },
      presets: {
        button:
          'px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        activeButton: 'bg-primary-50 border-primary-500 text-primary-700',
      },
      timePicker: {
        container: 'p-4 border-t border-gray-200',
        input:
          'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-700',
      },
      text: {
        label: 'text-gray-400',
        value: 'text-gray-600 font-medium text-body-md',
        dayName: 'text-gray-400',
        dayNumber: 'text-gray-600',
        selectedDay: 'text-gray-0',
        rangeDay: 'text-gray-600',
        todayDay: 'text-primary-500',
      },
    },
    switch: {
      baseStyles:
        'relative rounded-full transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed',
      container: 'relative flex flex-col',
      thumb: {
        baseStyles:
          'absolute rounded-full bg-gray-25 border border-gray-300 transition-transform duration-300 border-[0.5px]',
      },
      label: {
        baseStyles: 'ml-2 font-medium text-gray-700',
        disabled: 'text-gray-300',
      },
      subtext: 'text-gray-400 font-normal',
      rightSlot: 'ml-2',
      wrapper: 'flex items-center',
      states: {
        enabled: 'bg-primary-500',
        disabled: 'bg-primary-300',
        inactive: 'bg-gray-150',
      },
      groupLabel: 'text-sm font-medium text-gray-700 mb-2',
      sizes: {
        sm: {
          root: 'w-6 h-3',
          thumb: 'w-2.5 h-2.5 top-[1px]',
          thumbOn: 'translate-x-3',
          thumbOff: 'translate-x-0.5',
          label: 'text-body-sm',
          subtext: 'text-body-sm ml-8 mt-1',
        },
        md: {
          root: 'w-7 h-3.5',
          thumb: 'w-3 h-3 top-[1px]',
          thumbOn: 'translate-x-3.5',
          thumbOff: 'translate-x-0.5',
          label: 'text-body-md',
          subtext: 'text-body-md ml-9 mt-1',
        },
      },
      disabledSubtext: 'text-gray-200',
    },
    radio: {
      baseStyles: 'relative flex flex-col',
      container: 'flex flex-col space-y-4',
      groupLabel: 'text-sm font-medium text-gray-700',
      input: {
        base: 'text-primary-600 border-gray-300 hover:cursor-pointer ',
        disabled: 'text-primary-300 cursor-not-allowed',
      },
      label: {
        base: 'ml-2 font-medium text-gray-700',
        disabled: 'text-gray-300',
      },
      subtext: 'text-gray-400 font-normal',
      rightSlot: 'ml-1.5',
      wrapper: 'flex items-center',
      sizes: {
        sm: {
          input: 'h-3.5 w-3.5',
          label: 'text-body-sm',
          subtext: 'text-body-sm ml-5 mt-1',
        },
        md: {
          input: 'h-4 w-4',
          label: 'text-body-md',
          subtext: 'text-body-md ml-6 mt-1',
        },
      },
      disabledSubtext: 'text-gray-200',
    },
    avatar: {
      base: {
        container: 'relative inline-flex items-center justify-center bg-gray-100 border',
        image: 'h-full w-full object-cover',
        fallbackText: 'font-medium text-muted-foreground',
      },
      sizes: {
        sm: 'h-6 w-6 text-body-xs text-500 text-gray-900',
        regular: 'h-8 w-8 text-body-sm text-500 text-gray-900',
        md: 'h-10 w-10 text-body-md text-500 text-gray-900',
        lg: 'h-12 w-12 text-body-lg text-500 text-gray-900',
        xl: 'h-16 w-16 text-sm text-600 text-gray-900',
      },
      shapes: {
        circular: 'rounded-full',
        rounded: 'rounded-md',
      },
      indicator: {
        base: 'absolute block rounded-full bg-green-500 ring-white',
        sizes: {
          sm: 'h-1.5 w-1.5 ring-1 -top-0.5 -right-0.5',
          regular: 'h-2 w-2 ring-1 -top-0.5 -right-0.5',
          md: 'h-2.5 w-2.5 ring-1 -top-0.5 -right-0.5',
          lg: 'h-3 w-3 ring-2 -top-0.5 -right-0.5',
          xl: 'h-4 w-4 ring-2 -top-0.5 -right-0.5',
        },
      },
      border: {
        withImage: 'border-white',
        withoutImage: 'border-gray-200',
      },
    },
    avatarGroup: {
      base: {
        container: 'flex flex-row items-center -space-x-2',
        avatarWrapper: 'relative cursor-pointer inline-flex items-center justify-center',
        overflowCounter:
          'relative inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-gray-900 text-gray-50 font-medium transition-colors',
      },
      selected: 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400',
      sizes: {
        sm: 'h-6 w-6 text-body-xs',
        regular: 'h-8 w-8 text-body-sm',
        md: 'h-10 w-10 text-body-md',
        lg: 'h-12 w-12 text-body-lg',
        xl: 'h-16 w-16 text-sm',
      },
    },
    accordion: {
      base: {
        container: 'w-full',
        item: 'border-b border-gray-200',
        trigger:
          'flex w-full py-4 px-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed hover:bg-gray-50',
        content:
          'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        title: 'text-body-lg font-medium',
        titleEnabled: 'text-gray-800',
        titleDisabled: 'text-gray-500',
        subtext: 'text-body-md mt-1',
        subtextEnabled: 'text-gray-600',
        subtextDisabled: 'text-gray-300',
        contentWrapper: 'py-5 px-3',
      },
      variant: {
        bordered: {
          container: '',
          item: '',
          trigger: 'hover:bg-gray-50',
          content: 'px-0',
          contentWrapper: 'border-t border-gray-200',
        },
        filled: {
          container: '',
          item: 'bg-gray-50 overflow-hidden',
          trigger: 'px-4 hover:bg-gray-100',
          content: 'px-4',
          contentWrapper: '',
        },
      },
      type: {
        border: {
          container: 'space-y-6',
          item: 'border border-gray-200 rounded-lg overflow-hidden',
          trigger: 'px-4 data-[state=open]:bg-gray-50',
          content: 'px-4',
          contentWrapper: '',
        },
        noborder: {
          container: 'space-y-5',
          item: 'border-b border-gray-200 last:border-b-0',
          trigger: '',
          content: 'px-0',
          contentWrapper: 'border-t border-gray-200',
        },
      },
      layout: {
        leftSlot: 'mr-2 flex-shrink-0',
        rightSlot: 'ml-2 flex-shrink-0',
        headerRow: 'flex items-center',
        chevronRight: 'absolute right-0 top-0 flex items-center justify-center',
        chevronLeft: 'flex items-center justify-center mr-1.5 flex-shrink-0',
        chevronIcon: {
          default:
            'h-4 w-4 transition-transform duration-300 ease-in-out data-[state=open]:rotate-180 h-6 w-6',
          enabled: 'text-gray-500',
          disabled: 'text-gray-300',
        },
      },
      states: {
        disabled: 'bg-gray-50',
      },
    },
    modal: {
      base: {
        container:
          'flex flex-col bg-gray-0 relative rounded-2xl shadow-xl max-w-[calc(100vw-2rem)] pointer-events-auto max-h-[calc(100vh-2rem)]',
        header:
          'p-4 flex gap-4 justify-between items-start flex-shrink-0 overflow-y-auto max-h-[20vh] border-b border-gray-200',
        content: 'p-4 overflow-y-auto flex-grow',
        footer:
          'px-6 py-4 rounded-b-lg flex justify-end space-x-3 flex-shrink-0 border-t border-gray-200',
        backdrop: 'flex items-center justify-center fixed inset-0 bg-gray-1100 pointer-events-auto',
        wrapper: 'fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto',
      },
    },
    popover: {
      base: {
        container:
          'flex flex-col gap-3 bg-gray-0 rounded-2xl p-4 pt-3 z-50 fixed shadow-md outline-none duration-150 max-w-[480px] min-w-[280px]',
        trigger: 'inline-block',
        content: 'word-break',
        header: 'flex flex-col gap-2',
        headerRow: 'flex items-center justify-between gap-3',
        heading: 'text-base font-semibold text-gray-900 word-break',
        description: 'text-body-md font-medium text-gray-500 word-break',
        closeButton: 'h-5 w-5 text-gray-500 cursor-pointer flex-shrink-0',
        footer: 'flex justify-start gap-3',
      },
      animation: {
        open: 'data-[state=open]:animate-fade-in',
        closed: 'data-[state=closed]:animate-fade-out',
      },
      placement: {
        top: 'data-[side=top]',
        bottom: 'data-[side=bottom]',
        left: 'data-[side=left]',
        right: 'data-[side=right]',
      },
    },
  },
};
