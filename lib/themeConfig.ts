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
          backgroundColor: 'bg-gradient-to-b from-jp-primary-600 to-jp-primary-500',
          textColor: 'text-jp-gray-0',
          hoverBackgroundColor:
            'hover:bg-jp-primary-500 hover:from-jp-primary-500 hover:to-jp-primary-500 hover:border-jp-primary-500',
          activeBackgroundColor:
            'active:bg-jp-primary-600 active:from-jp-primary-600 active:to-jp-primary-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] active:border-jp-primary-600',
          borderColor: 'border-[1.5px] border-jp-primary-600',
          disabledBackgroundColor:
            'disabled:bg-jp-primary-300 disabled:from-jp-primary-300 disabled:to-jp-primary-300 disabled:border-jp-primary-300 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-jp-primary-200 focus-visible:outline-2 focus:outline-jp-primary-200 focus:outline-2',
        },
        secondary: {
          backgroundColor: 'bg-jp-gray-0',
          textColor: 'text-jp-gray-600',
          hoverBackgroundColor: 'hover:bg-jp-gray-50 hover:border-jp-gray-150',
          activeBackgroundColor:
            'active:bg-jp-gray-25 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.1)] active:border-jp-gray-200',
          borderColor: 'border-[1.5px] border-jp-gray-200',
          disabledBackgroundColor: 'disabled:bg-jp-gray-150 disabled:border-0 disabled:text-jp-gray-400',
          focusClasses:
            'focus-visible:outline-jp-gray-100 focus-visible:outline-2 focus:outline-jp-gray-100 focus:outline-2 focus:bg-jp-gray-0 focus:border-jp-gray-150',
        },
        danger: {
          backgroundColor: 'bg-gradient-to-b from-jp-red-600 to-jp-red-500',
          textColor: 'text-jp-gray-0',
          hoverBackgroundColor:
            'hover:bg-jp-red-500 hover:from-jp-red-500 hover:to-jp-red-500 hover:border-jp-red-500',
          activeBackgroundColor:
            'active:bg-jp-red-600 active:from-jp-red-600 active:to-jp-red-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-jp-red-500',
          borderColor: 'border-[1.5px] border-jp-red-600',
          disabledBackgroundColor:
            'disabled:bg-jp-red-300 disabled:from-jp-red-300 disabled:to-jp-red-300 disabled:border-jp-red-300 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-jp-red-100 focus-visible:outline-2 focus:outline-jp-red-100 focus:outline-2',
        },
        success: {
          backgroundColor: 'bg-gradient-to-b from-jp-green-600 to-jp-green-500',
          textColor: 'text-jp-gray-0',
          hoverBackgroundColor:
            'hover:bg-jp-green-500 hover:from-jp-green-500 hover:to-jp-green-500 hover:border-jp-green-500',
          activeBackgroundColor:
            'active:bg-jp-green-600 active:from-jp-green-600 active:to-jp-green-600 active:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.12)] active:border-jp-green-600',
          borderColor: 'border-[1.5px] border-jp-green-600',
          disabledBackgroundColor:
            'disabled:bg-jp-green-200 disabled:from-jp-green-200 disabled:to-jp-green-200 disabled:border-jp-green-200 disabled:opacity-100',
          focusClasses:
            'focus-visible:outline-jp-green-200 focus-visible:outline-2 focus:outline-jp-green-200 focus:outline-2',
        },
      },
      sizes: {
        sm: {
          height: 'h-8',
          padding: 'px-3',
          fontSize: 'text-jp-body-sm',
          iconSize: 'w-4 h-4',
          gap: 'gap-1.5',
        },
        md: {
          height: 'h-9',
          padding: 'px-4',
          fontSize: 'text-jp-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2',
        },
        lg: {
          height: 'h-10',
          padding: 'px-5',
          fontSize: 'text-jp-body-md',
          iconSize: 'w-5 h-5',
          gap: 'gap-2',
        },
      },
      borderRadius: 'rounded-jp-lg',
      fontWeight: 'font-600',
      fontFamily: 'font-sans',
      linkColors: {
        primary: {
          text: 'text-jp-primary-600',
          hover: 'hover:text-jp-primary-700 hover:underline',
          focus: 'focus:text-jp-primary-700',
          disabled: 'disabled:text-jp-primary-300',
        },
        secondary: {
          text: 'text-jp-gray-600',
          hover: 'hover:text-jp-gray-700 hover:underline',
          focus: 'focus:text-jp-gray-700',
          disabled: 'disabled:text-jp-gray-400',
        },
        danger: {
          text: 'text-jp-red-600',
          hover: 'hover:text-jp-red-700 hover:underline',
          focus: 'focus:text-jp-red-700',
          disabled: 'disabled:text-jp-red-300',
        },
        success: {
          text: 'text-jp-green-600',
          hover: 'hover:text-jp-green-700 hover:underline',
          focus: 'focus:text-jp-green-700',
          disabled: 'disabled:text-jp-green-300',
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
          middle: 'rounded-jp-none border-r-0',
          last: 'rounded-l-none',
        },
        nonStacked: '',
      },
    },
    tag: {
      variant: {
        noFill: {
          neutral: 'bg-jp-gray-0 text-jp-gray-950 border-[1.5px] border-jp-gray-950',
          primary: 'bg-jp-gray-0 text-jp-primary-800 border-[1.5px] border-jp-primary-600',
          success: 'bg-jp-gray-0 text-jp-green-600 border-[1.5px] border-jp-green-600',
          error: 'bg-jp-gray-0 text-jp-red-600 border-[1.5px] border-jp-red-600',
          warning: 'bg-jp-gray-0 text-jp-orange-500 border-[1.5px] border-jp-orange-500',
          purple: 'bg-jp-gray-0 text-jp-purple-500 border-[1.5px] border-jp-purple-500',
        },
        attentive: {
          neutral: 'bg-jp-gray-950 text-jp-gray-0',
          primary: 'bg-jp-primary-600 text-jp-gray-0',
          success: 'bg-jp-green-600 text-jp-gray-0',
          error: 'bg-jp-red-600 text-jp-gray-0',
          warning: 'bg-jp-orange-500 text-jp-gray-0',
          purple: 'bg-jp-purple-500 text-jp-gray-0',
        },
        subtle: {
          neutral: 'bg-jp-gray-50 text-jp-gray-950 border-[1.5px] border-jp-gray-200',
          primary: 'bg-jp-primary-50 text-jp-primary-600 border-[1.5px] border-jp-primary-100',
          success: 'bg-jp-green-50 text-jp-green-600 border-[1.5px] border-jp-green-100',
          error: 'bg-jp-red-50 text-jp-red-600 border-[1.5px] border-jp-red-100',
          warning: 'bg-jp-orange-50 text-jp-orange-600 border-[1.5px] border-jp-orange-100',
          purple: 'bg-jp-purple-50 text-jp-purple-600 border-[1.5px] border-jp-purple-100',
        },
      },
      sizes: {
        xs: {
          height: 'h-5',
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-jp-body-sm font-body font-semibold',
          iconSize: 'h-2.5 w-2.5',
          gap: 'gap-1',
        },
        sm: {
          height: 'h-[22px]',
          padding: 'px-2 py-0.75',
          fontSize: 'text-jp-body-sm font-body font-semibold',
          iconSize: 'h-3 w-3',
          gap: 'gap-1',
        },
        md: {
          height: 'h-6',
          padding: 'px-2.5 py-1',
          fontSize: 'text-jp-body-md font-body font-semibold',
          iconSize: 'h-3.5 w-3.5',
          gap: 'gap-1.5',
        },
        lg: {
          height: 'h-7',
          padding: 'px-3 py-1.5',
          fontSize: 'text-jp-body-md font-body font-semibold',
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
        base: 'text-jp-body-md font-500 tracking-normal',
        color: 'text-gray-700',
        mandatory: 'text-jp-red-500 text-jp-body-md font-normal -top-0.5',
      },
      sublabel: {
        base: 'text-jp-body-md font-normal tracking-normal',
        color: 'text-jp-gray-400',
      },
      hint: {
        base: 'text-jp-body-md font-normal tracking-normal',
        color: 'text-jp-gray-500',
        error: 'text-jp-red-500',
        success: 'text-jp-green-600',
      },
      inputBase: {
        base: 'w-full overflow-hidden flex flex-row justify-between items-center relative border transition-all rounded-jp-xl',
        sizes: {
          md: 'h-9',
          lg: 'h-10',
        },
        states: {
          default: 'border-gray-300 bg-jp-gray-0',
          hover: 'hover:border-jp-gray-400 hover:focus-within:border-primary-500',
          focused:
            'focus-within:border-jp-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
          error:
            'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
          disabled: 'border-gray-200 bg-jp-gray-100 cursor-not-allowed',
        },
      },
      input: {
        base: 'w-full h-full text-jp-body-md font-500 outline-none disabled:cursor-not-allowed placeholder:text-jp-gray-400',
        padding: {
          default: 'px-3',
          withLeftSlot: 'pl-2 pr-3',
          withRightSlot: 'pr-2 pl-3',
          withBothSlots: 'px-2',
        },
        states: {
          default: ' text-gray-800 placeholder:text-jp-gray-400',
          disabled: 'text-jp-gray-400 placeholder:text-gray-300',
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
          label: 'text-gray-800 font-500 truncate',
          placeholder: 'text-jp-gray-400',
          icon: 'flex-shrink-0',
          chevron: ' flex-shrink-0 text-jp-gray-400',
        },
      },
      input: {
        base: 'flex-1 border-none focus:outline-none focus:ring-0',
        withLeftPadding: 'pl-2',
      },
      menu: {
        base: 'rounded-jp-xl bg-jp-gray-0 p-1 shadow-md border border-gray-200 min-w-[8rem] z-50',
        item: {
          base: 'relative flex cursor-pointer select-none items-center rounded-jp-lg px-2 py-1.5 text-jp-body-md text-gray-800 outline-none transition-colors data-[highlighted]:bg-jp-gray-50 focus:bg-jp-gray-50',
          active: 'bg-jp-gray-50 font-500',
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
          base: 'flex items-center justify-center w-8 h-[18px] disabled:bg-jp-gray-50 disabled:cursor-not-allowed',
          states: {
            default: 'text-jp-gray-500',
            hover: 'hover:bg-jp-gray-50',
            active: 'active:bg-jp-gray-100',
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
      container: 'flex w-full items-center h-full',
      unit: {
        base: 'flex items-center justify-center text-jp-body-md font-500 text-jp-gray-500 h-full bg-jp-gray-100',
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
        'flex z-50 items-center overflow-hidden bg-jp-gray-900 text-jp-gray-0 font-500 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      sizes: {
        sm: {
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-body-xs',
          borderRadius: 'rounded-jp-md',
          maxWidth: 'max-w-xs',
          slotSize: 'h-3.5 w-3.5',
        },
        lg: {
          padding: 'px-2 py-1.5',
          fontSize: 'text-jp-body-sm',
          borderRadius: 'rounded-jp-lg',
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
          'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-jp-body-md ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      },
      expanded: 'justify-between [&>*]:flex-1 [&>*]:text-center',
      variant: {
        boxed: {
          list: 'bg-jp-gray-50 p-1 rounded-jp-lg',
          trigger:
            'rounded-jp-lg text-jp-gray-500 data-[state=active]:bg-jp-gray-0 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm hover:bg-jp-gray-0 data-[state=active]:font-600 hover:text-gray-600 font-500',
        },
        floating: {
          list: 'gap-2',
          trigger:
            'rounded-jp-lg text-jp-gray-500 data-[state=active]:bg-jp-gray-100 data-[state=active]:text-gray-700 font-500 hover:text-gray-700 data-[state=active]:font-600',
        },
        underline: {
          list: 'border-b border-gray-200',
          trigger:
            'border-b-2 border-transparent text-jp-gray-500 relative data-[state=active]:border-gray-700 data-[state=active]:text-gray-700 font-500 hover:text-gray-600  data-[state=active]:z-10 data-[state=active]:font-600',
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
        base: 'w-10 h-12 text-center text-jp-body-lg font-500 rounded-jp-xl border-[1px] transition-all focus:outline-none',
        states: {
          default: 'border-gray-300 bg-jp-gray-0',
          hover: 'hover:border-jp-gray-400',
          focused: 'border-primary-500 ring-2 ring-primary-100',
          filled: 'border-gray-300 bg-jp-gray-0',
          error: 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100',
          disabled: 'border-gray-200 bg-jp-gray-100 text-jp-gray-400 cursor-not-allowed',
        },
      },
    },
    textArea: {
      container: 'flex flex-col space-y-2',
      textarea: {
        base: 'w-full overflow-hidden text-jp-body-md font-500 placeholder:font-normal outline-none resize-none px-3 py-2 rounded-jp-xl border transition-all placeholder:text-jp-gray-400',
        states: {
          default: 'border-gray-300 bg-jp-gray-0',
          hover: 'hover:border-jp-gray-400 hover:focus-within:border-primary-500',
          focused:
            'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
          error:
            'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
          disabled: 'border-gray-200 bg-jp-gray-100 cursor-not-allowed',
        },
      },
    },
    snackbar: {
      base: {
        container:
          'fixed z-50 flex flex-col p-4 rounded-jp-xl shadow-lg max-w-md transition-all duration-200',
        content: 'flex flex-col gap-1',
        icon: 'flex-shrink-0',
        closeButton: 'ml-4 flex-shrink-0 hover:opacity-80 text-jp-gray-25',
      },
      layout: {
        headerContainer: 'flex w-full items-center justify-between',
        headerContent: 'flex items-center gap-2',
        messageContainer: 'mt-1.5 pl-7 flex flex-col gap-4',
        heading: 'text-jp-body-lg font-500 text-jp-gray-25',
        message: 'text-jp-body-md font-400 break-words text-gray-300',
        actionMessage:
          'text-jp-body-md font-jp-600 text-jp-gray-100 hover:text-jp-gray-0 justify-start active:text-jp-gray-0 focus:text-jp-gray-0',
      },
      type: {
        info: {
          backgroundColor: 'bg-jp-gray-800',
          textColor: 'text-jp-gray-100',
          iconColor: 'text-jp-primary-400',
        },
        warning: {
          backgroundColor: 'bg-jp-gray-800',
          textColor: 'text-jp-gray-100',
          iconColor: 'text-jp-yellow-400',
        },
        error: {
          backgroundColor: 'bg-jp-gray-800',
          textColor: 'text-jp-gray-100',
          iconColor: 'text-jp-red-400',
        },
        success: {
          backgroundColor: 'bg-jp-gray-800',
          textColor: 'text-jp-gray-100',
          iconColor: 'text-jp-green-400',
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
        alertContainer: 'rounded-jp-lg p-4 relative space-y-2',
        header: 'flex items-center gap-2 text-jp-primary-800 font-jp-600 text-jp-body-md',
        closeButton: 'text-jp-gray-400 hover:text-jp-gray-600 h-5 w-5 flex items-center justify-center',
        headerContainer: 'flex items-center justify-between gap-2',
        divider: 'relative w-[1px] h-5 bg-jp-gray-300',
      },
      alertActionPlacement: {
        default: 'flex items-start flex-col pl-6 gap-4',
        actionsRight: 'flex items-start gap-7 pl-6',
      },
      typography: {
        title: 'font-jp-600 text-jp-body-md text-jp-gray-700 tracking-normal',
        description: 'font-jp-400 text-jp-body-md text-jp-gray-600 tracking-normal',
      },
      icon: {
        size: 'w-4 h-4',
        container: 'flex items-center gap-2',
      },
      actionButton: {
        container: 'flex items-center gap-5',
        base: 'flex items-center justify-center whitespace-nowrap transition-all duration-200 disabled:pointer-events-none font-jp-600 text-jp-body-md',
        colors: {
          primary: 'text-jp-primary-700 hover:text-jp-primary-800',
          success: 'text-jp-green-700 hover:text-jp-green-800',
          warning: 'text-jp-yellow-700 hover:text-jp-yellow-800',
          error: 'text-jp-red-700 hover:text-jp-red-800',
          purple: 'text-jp-purple-700 hover:text-jp-purple-800',
          neutral: 'text-jp-gray-700 hover:text-jp-gray-800',
          orange: 'text-jp-orange-700 hover:text-jp-orange-800',
        },
      },
      styles: {
        fill: {
          primary: {
            background: 'bg-jp-primary-50/50',
            border: 'border-[1px] border-jp-primary-100',
            iconColor: 'text-jp-primary-600',
          },
          success: {
            background: 'bg-jp-green-50',
            border: 'border-[1px] border-jp-green-100',
            iconColor: 'text-jp-green-600',
          },
          purple: {
            background: 'bg-jp-purple-50',
            border: 'border-[1px] border-jp-purple-100',
            iconColor: 'text-jp-purple-600',
          },
          warning: {
            background: 'bg-jp-yellow-50',
            border: 'border-[1px] border-jp-yellow-100',
            iconColor: 'text-jp-yellow-600',
          },
          neutral: {
            background: 'bg-jp-gray-50',
            border: 'border-[1px] border-jp-gray-100',
            iconColor: 'text-jp-gray-600',
          },
          error: {
            background: 'bg-jp-red-50',
            border: 'border-[1px] border-jp-red-100',
            iconColor: 'text-jp-red-600',
          },
          orange: {
            background: 'bg-jp-orange-50',
            border: 'border-[1px] border-jp-orange-100',
            iconColor: 'text-jp-orange-600',
          },
        },
        subtle: {
          primary: {
            background: 'bg-jp-primary-50',
            border: 'border-[1px] border-jp-primary-500',
            iconColor: 'text-jp-primary-600',
          },
          success: {
            background: 'bg-jp-green-50',
            border: 'border-[1px] border-jp-green-500',
            iconColor: 'text-jp-green-600',
          },
          purple: {
            background: 'bg-jp-purple-50',
            border: 'border-[1px] border-jp-purple-500',
            iconColor: 'text-jp-purple-600',
          },
          warning: {
            background: 'bg-jp-yellow-50',
            border: 'border-[1px] border-jp-yellow-500',
            iconColor: 'text-jp-yellow-600',
          },
          neutral: {
            background: 'bg-jp-gray-50',
            border: 'border-[1px] border-jp-gray-500',
            iconColor: 'text-jp-gray-600',
          },
          error: {
            background: 'bg-jp-red-50',
            border: 'border-[1px] border-jp-red-500',
            iconColor: 'text-jp-red-600',
          },
          orange: {
            background: 'bg-jp-orange-50',
            border: 'border-[1px] border-jp-orange-500',
            iconColor: 'text-jp-orange-600',
          },
        },
        noFill: {
          primary: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-primary-500',
            iconColor: 'text-jp-primary-600',
          },
          success: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-green-500',
            iconColor: 'text-jp-green-600',
          },
          purple: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-purple-500',
            iconColor: 'text-jp-purple-600',
          },
          warning: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-yellow-500',
            iconColor: 'text-jp-yellow-600',
          },
          neutral: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-gray-500',
            iconColor: 'text-jp-gray-600',
          },
          error: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-red-500',
            iconColor: 'text-jp-red-600',
          },
          orange: {
            background: 'bg-jp-gray-0',
            border: 'border-[1px] border-jp-orange-500',
            iconColor: 'text-jp-orange-600',
          },
        },
      },
      border: {
        default: 'border-[2px]',
      },
    },
    chart: {
      config: {
        tickFill: '#99A0AE',
        tickFontSize: 14,
        tickFontWeight: 500,
        axisLine: false,
        tickLine: false,
        labelFill: '#99A0AE',
        labelFontSize: 14,
        labelFontWeight: 500,
        gridStroke: '#ECEFF3',
      },
      base: {
        chartContainer: 'w-full h-full outline outline-1 outline-jp-gray-300 rounded-jp-lg bg-jp-gray-0',
        chartContentContainer: {
          top: 'py-5 px-4 flex flex-col gap-6',
          right: 'py-5 px-4 flex gap-6',
        },
        chartHeader: {
          container:
            'flex items-center justify-between gap-2 py-4 px-[18px] bg-jp-gray-25 border-b border-jp-gray-200',
          metrics: 'flex items-center gap-2',
          selectedMetric: 'text-base font-jp-600 text-[#525866]',
          slotContainer: 'flex items-center gap-2 shrink-0',
        },
        chartLegend: {
          container: 'flex items-center gap-8 justify-between',
          legendItemsContainer:
            'flex h-7 items-center overflow-x-hidden overflow-visible whitespace-nowrap flex-1',
          legendItem: 'h-4 flex items-center gap-2 cursor-pointer pr-4 transition-all duration-300',
          legendMarker: 'w-3 h-3 rounded-jp-sm shrink-0',
          resetButton:
            'text-sm flex items-center justify-center text-jp-primary-600 hover:text-jp-primary-700 hover:bg-jp-primary-50 rounded-jp-sm h-5 w-5 shrink-0',
          stackedLegendContainer: 'h-full w-full flex flex-col justify-center gap-2 ',
          legendItemText: 'text-jp-body-md font-jp-500 whitespace-nowrap overflow-hidden text-ellipsis',
        },
        tooltip: {
          container:
            'bg-jp-gray-0 font-sans shadow-jp-lg flex flex-col gap-3 rounded-jp-lg p-3 pl-2.5 border border-jp-gray-150 min-w-[220px] !max-w-[200px]',
        },
      },
    },
    menuv2: {
      baseStyles: 'rounded-jp-md shadow-md overflow-hidden bg-jp-gray-0 border border-gray-200 py-1',
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
        container: 'p-0 border-b  ',
        input:
          'w-full text-[14px] text-jp-gray-600 bg-transparent border-none outline-none focus:ring-0 pl-[22px]',
        icon: 'absolute left-2 flex items-center justify-center text-jp-gray-400',
        noResults: 'p-3 text-sm text-jp-gray-500 text-center',
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
          base: 'rounded-[10px] border border-jp-gray-200 overflow-hidden whitespace-nowrap',
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
          helpIcon: 'text-jp-gray-400',
          base: 'font-500 text-gray-700',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        sublabel: {
          base: 'font-normal text-jp-gray-500',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        hint: {
          base: 'font-normal text-jp-gray-500 mt-2',
          sizes: {
            SMALL: 'text-[12px]',
            MEDIUM: 'text-[14px]',
            LARGE: 'text-[14px]',
          },
        },
        leftIcon: {
          wrapper: 'text-jp-gray-400 flex items-center justify-center',
          base: 'mr-2',
          sizes: {
            SMALL: 'w-3 h-3',
            MEDIUM: 'w-3.5 h-3.5',
            LARGE: 'w-3.5 h-3.5',
          },
        },
        chevron: {
          wrapper: 'text-jp-gray-400 flex items-center justify-center',
          base: 'ml-2',
          sizes: {
            SMALL: 'w-3.5 h-3.5',
            MEDIUM: 'w-4 h-4',
            LARGE: 'w-4 h-4',
          },
        },
        displayText: 'flex-grow font-normal text-jp-gray-700',
        clearButton: {
          base: 'rounded-l-none',
          withContainer: 'border-[1px]',
          noContainer: 'border-[1px] border-jp-gray-200',
          icon: 'text-jp-gray-600',
        },
        multiSelectTag: {
          base: 'ml-1.5 flex items-center justify-center',
          sizeSm: 'h-4 w-4 min-w-4',
          sizeDefault: 'h-4 w-4 min-w-4',
        },
        selectedText: 'text-jp-gray-400 ml-1.5',
        baseClasses: 'relative flex items-center transition-colors',
        typeClasses: {
          ICON_ONLY: 'justify-center',
          SINGLE_SELECT: '',
          MULTI_SELECT: '',
        },
        states: {
          noBorder: {
            DEFAULT: 'bg-jp-gray-0 text-jp-gray-700',
            HOVER: 'bg-jp-gray-50 text-jp-gray-700',
            OPEN: 'bg-jp-gray-25 text-jp-gray-700',
            SELECTED: 'bg-jp-gray-0 text-jp-gray-700',
          },
          withBorder: {
            DEFAULT: 'bg-jp-gray-0 text-jp-gray-700 border border-jp-gray-200',
            HOVER: 'bg-jp-gray-50 text-jp-gray-700 border border-jp-gray-200',
            OPEN: 'bg-jp-gray-25 text-jp-gray-700 border border-jp-gray-200',
            SELECTED: 'bg-jp-gray-0 text-jp-gray-700 border border-jp-gray-200',
          },
        },
        sizes: {
          SMALL: 'h-8 px-3.5 py-1.5 text-jp-body-md',
          MEDIUM: 'h-9 px-3.5 py-2 text-jp-body-md',
          LARGE: 'h-10 px-3.5 py-2.5 text-jp-body-md',
        },
        subtypes: {
          HAS_CONTAINER: 'rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]',
          NO_CONTAINER: 'rounded-[10px]',
        },
        disabled: {
          true: 'opacity-50 cursor-not-allowed bg-jp-gray-100',
          false: 'cursor-pointer hover:bg-jp-gray-50',
        },
        positioning: {
          offset: 4,
          rightPadding: 10,
          menuWidth: 200,
          menuHeight: 200,
          maxHeightOffset: 20,
        },
      },
      separator: 'h-px my-1 bg-jp-gray-200',
      iconSize: 'w-4 h-4',
      chevronColor: 'text-jp-gray-400',
      textContent: 'flex-grow truncate font-feature-settings-normal',
      menuItem: {
        baseStyles: 'flex items-center px-3 py-1.5 text-jp-gray-600 text-jp-body-md font-500 ',
        types: {
          DEFAULT: 'cursor-pointer font-500 text-jp-gray-600',
          MULTI_SELECT: 'cursor-pointer',
          ACTION: 'cursor-pointer font-500',
          LABEL: 'font-semibold text-jp-body-xs text-jp-gray-500 uppercase tracking-wider py-1',
          SEPARATOR: 'py-0 my-1 border-b border-jp-gray-200',
          SUBMENU: 'cursor-pointer font-jp-500 text-jp-gray-600 relative',
        },
        states: {
          DEFAULT: 'bg-jp-gray-0',
          HOVER: '!bg-jp-gray-50',
          SELECTED: 'bg-jp-primary-600 text-jp-primary-700',
          NA: 'pointer-events-none',
        },
        actions: {
          NA: '',
          DANGER: 'text-jp-red-600',
          PRIMARY: 'text-jp-primary-600',
        },
        actionHover: {
          NA: '!bg-jp-gray-50',
          PRIMARY: '!bg-jp-primary-600',
          DANGER: '!bg-jp-red-50',
        },
        hover: {
          PRIMARY: 'hover:bg-jp-primary-600',
          DANGER: 'hover:bg-red-50',
          DEFAULT: 'hover:bg-[#F3F4F6]',
        },
        disabled: 'opacity-50 pointer-events-none',
        shortcut: 'ml-auto text-body-xs text-jp-gray-300',
        slots: {
          slotL: 'mr-2 flex-shrink-0',
          slotR1: 'ml-auto flex-shrink-0',
          slotR2: 'ml-2 flex-shrink-0',
        },
        submenu: {
          container:
            'bg-jp-gray-0 border border-jp-gray-200 rounded-jp-md shadow-lg py-1 min-w-[10rem] origin-top-left',
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
        rounded: 'rounded-jp-md',
      },
    },
    checkbox: {
      baseStyles:
        'flex items-center justify-center rounded border bg-jp-gray-0 focus:ring-2 focus:ring-primary-200 focus:ring-offset-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1 mr-2',
      indicator: {
        baseStyles: 'flex items-center justify-center',
        icon: 'text-jp-gray-0',
      },
      wrapper: 'flex items-center',
      rightSlot: 'ml-1.5',
      subtext: 'text-jp-gray-400 font-normal',
      disabledSubtext: 'text-jp-gray-200',
      sizes: {
        sm: {
          root: 'h-3.5 w-3.5 rounded',
          indicator: 'h-3.5 w-3.5',
          checkIcon: 'h-2.5 w-2.5',
          fontSize: 'text-jp-body-md',
          subtext: 'text-jp-body-sm ml-5 mt-1',
        },
        md: {
          root: 'h-4 w-4 rounded',
          indicator: 'h-4 w-4',
          checkIcon: 'h-3 w-3',
          fontSize: 'text-jp-body-md',
          subtext: 'text-jp-body-md ml-6 mt-1',
        },
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed bg-jp-gray-100 border-jp-gray-300',
        enabled:
          'cursor-pointer data-[state=checked]:bg-jp-primary-500 data-[state=checked]:border-jp-primary-500 data-[state=indeterminate]:bg-jp-primary-500 data-[state=indeterminate]:border-jp-primary-500 hover:border-jp-primary-600 hover:data-[state=checked]:bg-jp-primary-600 hover:data-[state=indeterminate]:bg-jp-primary-600 transition-colors duration-150',
        labelDisabled: 'text-jp-gray-400 cursor-not-allowed',
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
        divider: 'text-jp-gray-400',
      },
      item: {
        default: 'inline-flex items-center text-jp-gray-400 font-jp-500 cursor-pointer',
        hover: 'hover:text-jp-gray-1000',
        active: 'text-jp-gray-700 font-jp-600 cursor-default',
      },
      sizes: {
        sm: 'text-jp-body-sm',
        md: 'text-jp-body-md',
        lg: 'text-jp-body-lg',
      },
      moreButton: {
        base: 'inline-flex items-center justify-center text-jp-gray-400 font-500 p-2 gap-1.5 rounded-jp-lg w-8 h-8 transition-all duration-200',
        default: 'border border-transparent',
        hover: 'hover:text-jp-gray-1000 hover:border-jp-gray-150',
        active: 'border border-jp-gray-150 bg-jp-gray-50 text-jp-gray-1000',
      },
      dropdown: {
        container:
          'absolute top-full left-0 z-50 py-1 bg-jp-gray-0 rounded-jp-md shadow-lg border border-gray-200 min-w-48 translate-y-1',
        item: 'px-4 py-2 hover:bg-jp-gray-50',
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
          'flex items-center justify-between w-full px-3 py-2 border border-jp-gray-300 rounded-jp-md shadow-sm bg-jp-gray-0 text-jp-body-md text-jp-gray-700 hover:border-jp-gray-400 focus:outline-none focus:ring-2 focus:ring-jp-primary-500 focus:border-jp-primary-500 cursor-pointer',
      },
      input: {
        primary: 'border-jp-gray-300',
        secondary: 'border-jp-gray-200 bg-jp-gray-50',
        sizes: {
          sm: 'text-jp-body-sm py-1',
          md: 'text-jp-body-md py-2',
          lg: 'text-jp-body-lg py-2.5',
        },
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        disabledDay: 'opacity-40 cursor-not-allowed pointer-events-none',
      },
      calendar: {
        container:
          'absolute z-10 mt-1 w-auto min-w-96 bg-jp-gray-0 border border-jp-gray-200 rounded-jp-lg shadow-lg',
        gridContainer: 'max-h-[400px] overflow-y-auto p-4',
        monthContainer: 'mb-6',
        monthHeader: 'text-jp-body-lg font-jp-600 text-jp-gray-700 my-1',
        dayNamesContainer: 'grid grid-cols-7 text-center text-jp-gray-500',
        dayName: 'p-2 border-b border-jp-gray-100',
        weekRow: 'grid grid-cols-7 py-1',
        emptyCell: 'p-2',
        dayCell: 'cursor-pointer text-center p-2 relative font-500 box-border',
        startDate: 'bg-jp-primary-500 rounded-l-lg',
        endDate: 'bg-jp-primary-500 rounded-r-lg',
        singleDate: 'bg-jp-primary-500 rounded-jp-lg',
        rangeDay: 'bg-jp-primary-50',
        todayDay: 'font-500',
        todayIndicator:
          'absolute w-1 h-1 bg-jp-primary-500 rounded-full bottom-1 left-1/2 transform -translate-x-1/2',
        hoverState: 'hover:ring-1 hover:ring-inset hover:ring-jp-primary-500 hover:rounded-jp-lg',
      },
      presets: {
        button:
          'px-3 py-1 text-sm rounded-jp-md border border-jp-gray-200 hover:bg-jp-gray-50 focus:outline-none focus:ring-2 focus:ring-jp-primary-500 focus:border-jp-primary-500',
        activeButton: 'bg-jp-primary-50 border-jp-primary-500 text-jp-primary-700',
      },
      timePicker: {
        container: 'p-4 border-t border-jp-gray-200',
        input:
          'w-full px-3 py-2 border border-jp-gray-300 rounded-jp-lg shadow-sm focus:outline-none focus:ring-jp-primary-500 focus:border-jp-primary-500 text-jp-gray-700',
      },
      text: {
        label: 'text-jp-gray-400',
        value: 'text-jp-gray-600 font-jp-500 text-jp-body-md',
        dayName: 'text-jp-gray-400',
        dayNumber: 'text-jp-gray-600',
        selectedDay: 'text-jp-gray-0',
        rangeDay: 'text-jp-gray-600',
        todayDay: 'text-jp-primary-500',
      },
    },
    switch: {
      baseStyles:
        'relative rounded-full transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed',
      container: 'relative flex flex-col',
      thumb: {
        baseStyles:
          'absolute rounded-full bg-jp-gray-25 border border-jp-gray-300 transition-transform duration-300 border-[0.5px]',
      },
      label: {
        baseStyles: 'ml-2 font-jp-500 text-jp-gray-700',
        disabled: 'text-jp-gray-300',
      },
      subtext: 'text-jp-gray-400 font-normal',
      rightSlot: 'ml-2',
      wrapper: 'flex items-center',
      states: {
        enabled: 'bg-jp-primary-500',
        disabled: 'bg-jp-primary-300',
        inactive: 'bg-jp-gray-150',
      },
      groupLabel: 'text-sm font-jp-500 text-jp-gray-700 mb-2',
      sizes: {
        sm: {
          root: 'w-6 h-3',
          thumb: 'w-2.5 h-2.5 top-[1px]',
          thumbOn: 'translate-x-3',
          thumbOff: 'translate-x-0.5',
          label: 'text-jp-body-sm',
          subtext: 'text-jp-body-sm ml-8 mt-1',
        },
        md: {
          root: 'w-7 h-3.5',
          thumb: 'w-3 h-3 top-[1px]',
          thumbOn: 'translate-x-3.5',
          thumbOff: 'translate-x-0.5',
          label: 'text-jp-body-md',
          subtext: 'text-jp-body-md ml-9 mt-1',
        },
      },
      disabledSubtext: 'text-jp-gray-200',
    },
    radio: {
      baseStyles: 'relative flex flex-col',
      container: 'flex flex-col space-y-4',
      groupLabel: 'text-sm font-500 text-jp-gray-700',
      input: {
        base: 'text-jp-primary-600 border-jp-gray-300 hover:cursor-pointer ',
        disabled: 'text-jp-primary-300 cursor-not-allowed',
      },
      label: {
        base: 'ml-2 font-500 text-jp-gray-700',
        disabled: 'text-jp-gray-300',
      },
      subtext: 'text-jp-gray-400 font-normal',
      rightSlot: 'ml-1.5',
      wrapper: 'flex items-center',
      sizes: {
        sm: {
          input: 'h-3.5 w-3.5',
          label: 'text-jp-body-sm',
          subtext: 'text-jp-body-sm ml-5 mt-1',
        },
        md: {
          input: 'h-4 w-4',
          label: 'text-jp-body-md',
          subtext: 'text-jp-body-md ml-6 mt-1',
        },
      },
      disabledSubtext: 'text-jp-gray-200',
    },
    avatar: {
      base: {
        container: 'relative inline-flex items-center justify-center bg-jp-gray-100 border',
        image: 'h-full w-full object-cover',
        fallbackText: 'font-500 text-muted-foreground',
      },
      sizes: {
        sm: 'h-6 w-6 text-jp-body-xs text-500 text-jp-gray-900',
        regular: 'h-8 w-8 text-jp-body-sm text-500 text-jp-gray-900',
        md: 'h-10 w-10 text-jp-body-md text-500 text-jp-gray-900',
        lg: 'h-12 w-12 text-jp-body-lg text-500 text-jp-gray-900',
        xl: 'h-16 w-16 text-sm text-600 text-jp-gray-900',
      },
      shapes: {
        circular: 'rounded-jp-full',
        rounded: 'rounded-jp-md',
      },
      indicator: {
        base: 'absolute block rounded-full bg-jp-green-500 ring-white',
        sizes: {
          sm: 'h-1.5 w-1.5 ring-1 -top-0.5 -right-0.5',
          regular: 'h-2 w-2 ring-1 -top-0.5 -right-0.5',
          md: 'h-2.5 w-2.5 ring-1 -top-0.5 -right-0.5',
          lg: 'h-3 w-3 ring-2 -top-0.5 -right-0.5',
          xl: 'h-4 w-4 ring-2 -top-0.5 -right-0.5',
        },
      },
      border: {
        withImage: 'border-jp-gray-0',
        withoutImage: 'border-jp-gray-200',
      },
    },
    avatarGroup: {
      base: {
        container: 'flex flex-row items-center -space-x-2',
        avatarWrapper: 'relative cursor-pointer inline-flex items-center justify-center',
        overflowCounter:
          'relative inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-jp-gray-900 text-jp-gray-50 font-500 transition-colors',
      },
      selected: 'ring-2 ring-offset-2 ring-jp-primary-500 dark:ring-jp-primary-400',
      sizes: {
        sm: 'h-6 w-6 text-jp-body-xs',
        regular: 'h-8 w-8 text-jp-body-sm',
        md: 'h-10 w-10 text-jp-body-md',
        lg: 'h-12 w-12 text-jp-body-lg',
        xl: 'h-16 w-16 text-sm',
      },
    },
    accordion: {
      base: {
        container: 'w-full',
        item: 'border-b border-jp-gray-200',
        trigger:
          'flex w-full py-4 px-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jp-primary-500 disabled:cursor-not-allowed hover:bg-jp-gray-50',
        content:
          'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        title: 'text-jp-body-lg font-500',
        titleEnabled: 'text-jp-gray-800',
        titleDisabled: 'text-jp-gray-500',
        subtext: 'text-jp-body-md mt-1',
        subtextEnabled: 'text-jp-gray-600',
        subtextDisabled: 'text-jp-gray-300',
        contentWrapper: 'py-5 px-3',
      },
      variant: {
        bordered: {
          container: '',
          item: '',
          trigger: 'hover:bg-jp-gray-50',
          content: 'px-0',
          contentWrapper: 'border-t border-jp-gray-200',
        },
        filled: {
          container: '',
          item: 'bg-jp-gray-50 overflow-hidden',
          trigger: 'px-4 hover:bg-jp-gray-100',
          content: 'px-4',
          contentWrapper: '',
        },
      },
      type: {
        border: {
          container: 'space-y-6',
          item: 'border border-jp-gray-200 rounded-jp-lg overflow-hidden',
          trigger: 'px-4 data-[state=open]:bg-jp-gray-50',
          content: 'px-4',
          contentWrapper: '',
        },
        noborder: {
          container: 'space-y-5',
          item: 'border-b border-jp-gray-200 last:border-b-0',
          trigger: '',
          content: 'px-0',
          contentWrapper: 'border-t border-jp-gray-200',
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
          enabled: 'text-jp-gray-500',
          disabled: 'text-jp-gray-300',
        },
      },
      states: {
        disabled: 'bg-jp-gray-50',
      },
    },
    modal: {
      base: {
        container:
          'flex flex-col bg-jp-gray-0 relative rounded-xl shadow-xl max-w-[calc(100vw-2rem)] pointer-events-auto max-h-[calc(100vh-2rem)]',
        header:
          'p-4 flex gap-4 justify-between items-start flex-shrink-0 overflow-y-auto max-h-[20vh] border-b border-jp-gray-200',
        content: 'p-4 overflow-y-auto flex-grow',
        footer:
          'px-6 py-4 rounded-b-jp-lg flex justify-end space-x-3 flex-shrink-0 border-t border-jp-gray-200',
        backdrop: 'flex items-center justify-center fixed inset-0 bg-jp-gray-700/60  pointer-events-auto',
        wrapper: 'fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto',
        modalTitle: 'text-sm font-semibold text-gray-700 word-break',
        modalSubtitle: 'text-jp-body-md text-gray-500 font-normal word-break mt-1',
      },
    },
    popover: {
      base: {
        container:
          'flex flex-col gap-3 bg-jp-gray-0 rounded-2xl p-4 pt-3 z-50 fixed shadow-jp-md outline-none duration-150 max-w-[480px] min-w-[280px]',
        trigger: 'inline-block',
        content: 'word-break',
        header: 'flex flex-col gap-2',
        headerRow: 'flex items-center justify-between gap-3',
        heading: 'text-base font-semibold text-jp-gray-900 word-break',
        description: 'text-jp-body-md font-500 text-jp-gray-500 word-break',
        closeButton: 'h-5 w-5 text-jp-gray-500 cursor-pointer flex-shrink-0',
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
    sidebar: {
      base: {
        wrapper: 'w-full h-full flex bg-jp-gray-25',
        sidebarContainer:
          'max-w-[300px] will-change-transform duration-150 animate-slide-in-from-left w-full border-r border-jp-gray-200 flex',
        secondarySidebar: {
          tenantContainer:
            'w-fit h-full border-r border-jp-gray-200 bg-jp-gray-25 flex flex-col gap-4 items-center p-2.5',
          tenantButton:
            'w-8 h-8 rounded-jp-md flex items-center justify-center cursor-pointe outline outline-jp-gray-150 data-[active=true]:outline-jp-primary-500 duration-75',
        },
        primarySidebarContainer: 'w-full h-full flex flex-col relative',
        merchantSwitcherContainer:
          'w-full h-16 sticky top-0 z-10 bg-jp-gray-25 flex items-center justify-between gap-3 px-2',
        directoryContainer:
          'flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        footer: {
          container:
            'w-full bg-jp-gray-25 h-16 sticky bottom-0 z-10 flex items-center justify-between gap-3 px-2 border-t border-jp-gray-200',
          gradientBlurContainer:
            'absolute left-0 -top-[65px] right-0 h-16 rotate-180 pointer-events-none z-10',
        },
        mainContentContainer: {
          base: 'w-full h-full bg-jp-gray-0 relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          topbar: {
            wrapper:
              'w-full h-16 sticky top-0 z-10 border-b border-jp-gray-200 bg-jp-gray-0 flex items-center gap-4 px-8',
            content: 'flex-1',
          },
        },
      },
    },
    dataTable: {
      container: 'w-full',
      header: {
        container: 'flex justify-between items-start mb-4 md:flex-row gap-4',
        title: 'text-lg font-semibold',
        description: 'text-jp-body-md text-jp-gray-500',
      },
      filters: {
        container: 'flex flex-wrap gap-2 items-center',
      },
      table: {
        base: 'w-full table-auto border-collapse',
        variant: {
          default: 'border-separate border-spacing-0',
          compact: 'border-separate border-spacing-0',
          bordered: 'border border-jp-gray-200',
        },
        size: {
          sm: 'text-jp-body-md',
          md: 'text-jp-body-lg',
          lg: 'text-jp-body-xl',
        },
        striped: 'stripe-rows',
        hoverable: 'hover-rows',
      },
      thead: {
        base: 'bg-jp-gray-25 border-b border-jp-gray-150 h-10',
        variant: {
          default: '',
          compact: '',
          bordered: 'border-b border-jp-gray-200',
        },
      },
      th: {
        base: 'px-2 py-1 text-left font-600 text-jp-gray-400 text-jp-body-sm',
        variant: {
          default: '',
          compact: 'px-2 py-1',
          bordered: 'border-r last:border-r-0 border-jp-gray-200',
        },
        size: {
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-base',
        },
        sortable: 'cursor-pointer select-none',
      },
      tbody: 'divide-y divide-jp-gray-150',
      tr: {
        base: 'h-14',
        variant: {
          default: '',
          compact: '',
          bordered: '',
        },
        striped: 'bg-jp-gray-50',
      },
      td: {
        base: 'px-3 py-2 text-jp-body-md text-jp-gray-800 font-500',
        variant: {
          default: '',
          compact: 'px-2 py-1',
          bordered: 'border-r last:border-r-0 border-jp-gray-150',
        },
        size: {
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-base',
        },
      },
      pagination: {
        container: 'flex justify-between items-center py-1 px-4 border-t border-jp-gray-150 h-12',
        text: 'text-sm text-jp-gray-600 flex items-center gap-2',
        button: {
          base: 'p-1 rounded-jp-md flex items-center justify-center',
          enabled: 'hover:bg-jp-gray-100 text-jp-gray-700',
          disabled: 'opacity-50 cursor-not-allowed text-jp-gray-400',
        },
      },
      sortIcon: {
        base: 'ml-1 h-4 w-4 text-jp-gray-400',
        active: 'text-jp- gray-800',
        asc: 'transform rotate-0',
        desc: 'transform rotate-180',
      },
    },
    textField: {
      base: {
        inputContainer:
          'flex bg-jp-gray-0 border relative rounded-jp-xl transition-all duration-200 focus-within:outline-2',
        input: 'flex-1 w-full px-3 py-2 rounded-jp-xl outline-none',
        innerContainer: 'flex items-center flex-1 gap-2',
        leftSlot: 'pl-3 flex-shrink-0',
        rightSlot: 'pr-3 flex-shrink-0',
        labelContainer: 'flex flex-row justify-between mb-1',
      },
      status: {
        default: 'border-jp-gray-300 bg-jp-gray-0',
        hover: 'hover:border-jp-gray-400 hover:focus-within:border-jp-primary-500',
        active: 'active:border-jp-primary-500',
        focused: 'focus-within:border-jp-primary-500 focus-within:ring-2 focus-within:ring-jp-primary-100',
        statusMessage: 'mt-1',
        disabled: 'border-jp-gray-200 bg-jp-gray-100 cursor-not-allowed',
        error: 'border-jp-red-500 focus-within:border-jp-red-500 focus-within:ring-jp-red-100',
      },
      text: {
        base: 'w-full h-full text-jp-body-md font-500 outline-none disabled:cursor-not-allowed placeholder:text-jp-gray-400',
        fieldLabel: 'text-jp-body-md font-500 truncate',
        status: {
          default: ' text-jp-gray-800 placeholder:text-jp-gray-400',
          disabled: 'text-jp-gray-400 placeholder:text-jp-gray-300',
          error: 'text-jp-red-700 placeholder:text-jp-red-300',
        },
        statusMessage: 'text-jp-body-sm flex items-center gap-1 font-500',
        errorMessage: 'text-jp-red-600',
      },
      dropdownContainer: {
        base: 'flex items-center gap-2 px-3 py-2',
        selectionContainer: 'flex-1 justify-start overflow-hidden',
        label: 'text-jp-gray-800 font-500 truncate',
        placeholder: 'text-jp-gray-400',
        fieldLabel: 'font-500 text-jp-body-md',
        chevron: ' flex-shrink-0 text-jp-gray-400',
      },
      dropdown: {
        base: 'rounded-jp-xl bg-jp-gray-0 p-1 shadow-md border border-jp-gray-200 min-w-[8rem] z-50',
        item: {
          base: 'relative flex cursor-pointer select-none items-center rounded-jp-lg px-2 py-1.5 text-jp-body-md text-jp-gray-800 outline-none transition-colors data-[highlighted]:bg-jp-gray-50 focus:bg-jp-gray-50',
          active: 'bg-jp-gray-50 font-500',
          disabled: 'opacity-50 cursor-not-allowed',
        },
      },
      numberField: {
        base: 'flex flex-col border-l border-jp-gray-200',
        button: {
          base: 'flex items-center justify-center w-8 h-[18px] disabled:bg-jp-gray-50 disabled:cursor-not-allowed',
          colors: {
            default: 'text-jp-gray-500',
            hover: 'hover:bg-jp-gray-50',
            active: 'active:bg-jp-gray-100',
            disabled: 'text-jp-gray-300',
          },
        },
        divider: 'border-t border-jp-gray-200',
      },
      unitSelection: {
        base: 'flex items-center justify-center text-jp-body-md font-500 text-jp-gray-500 h-full bg-jp-gray-100',
        container: 'h-full',
        prefix: 'border-r border-jp-gray-300 px-3',
        suffix: 'border-l border-jp-gray-300 px-3',
        colors: {
          default: 'text-jp-gray-700',
          disabled: 'text-jp-gray-300',
        },
      },
    },
    textarea: {
      base: {
        container:
          'flex bg-jp-gray-0 border relative rounded-jp-xl transition-all duration-200 focus-within:outline-2',
      },
      status: {
        default: 'border-jp-gray-300 bg-jp-gray-0',
        hover: 'hover:border-jp-gray-400',
        focused: 'border-jp-primary-500 ring-2 ring-jp-primary-100',
        filled: 'border-jp-gray-300 bg-jp-gray-0',
        error: 'border-jp-red-500 focus-within:border-jp-red-500 focus-within:ring-jp-red-100',
        disabled: 'border-jp-gray-200 bg-jp-gray-100 text-jp-gray-400 cursor-not-allowed',
      },
      text: {
        base:
          'w-full h-full px-3 py-2 outline-none disabled:cursor-not-allowed rounded-jp-xl border transition-all placeholder:text-jp-gray-400',
        status: {
          default: 'border-jp-gray-300 bg-jp-gray-0',
          hover: 'hover:border-jp-gray-400 hover:focus-within:border-jp-primary-500',
          active: 'active:border-jp-primary-500',
          focused: 'focus-within:border-jp-primary-500 focus-within:ring-2 focus-within:ring-jp-primary-100',
          error: 'border-jp-red-500 focus-within:border-jp-red-500 focus-within:ring-jp-red-100',
          disabled: 'border-jp-gray-200 bg-jp-gray-100 cursor-not-allowed',
        },
        statusMessage: 'text-jp-body-sm flex items-center gap-1 font-500',
        errorMessage: 'text-jp-red-600',
      },
    },
    toast: {
      base: 'z-50 fixed p-4 rounded-jp-xl shadow-md w-full max-w-sm overflow-hidden',
      iconContainer: 'mr-3 h-5 w-5 shrink-0',
      closeButton: 'ml-4 flex-shrink-0 hover:opacity-80 text-jp-gray-25',
      default: {
        position: 'top-0 right-0 -translate-y-full',
        active: 'animate-slideInVertical',
      },
      positions: {
        heading: 'text-jp-body-lg font-jp-500 text-jp-gray-25',
        message: 'text-jp-body-md font-jp-400 break-words text-jp-gray-300',
      },
      action: 
        'text-jp-body-md font-jp-600 text-jp-gray-100 hover:text-jp-gray-0 justify-start active:text-jp-gray-0 focus:text-jp-gray-0',
      variant: {
        primary: {
          backgroundColor: 'bg-jp-gray-800',
          textColor: 'text-jp-gray-300',
          iconColor: 'text-jp-primary-400',
        },
        success: {
          backgroundColor: 'bg-jp-green-900',
          textColor: 'text-jp-gray-300',
          iconColor: 'text-jp-green-400',
        },
        alert: {
          backgroundColor: 'bg-jp-red-900',
          textColor: 'text-jp-gray-300',
          iconColor: 'text-jp-red-400',
        },
      },
    },
  },
};
