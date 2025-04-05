// Copy your existing themeConfig.ts file here
// This is a placeholder - use your actual theme config
export const themeConfig = {
  euler: {
    button: {
      buttonType: {
        primary: {
          backgroundColor: 'bg-blue-600',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-blue-700',
          borderColor: 'border border-blue-600'
        },
        secondary: {
          backgroundColor: 'bg-gray-100',
          textColor: 'text-gray-900',
          hoverBackgroundColor: 'hover:bg-gray-200',
          borderColor: 'border border-gray-200'
        },
        danger: {
          backgroundColor: 'bg-red-600',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-red-700',
          borderColor: 'border border-red-600'
        },
        success: {
          backgroundColor: 'bg-green-600',
          textColor: 'text-white',
          hoverBackgroundColor: 'hover:bg-green-700',
          borderColor: 'border border-green-600'
        }
      },
      sizes: {
        sm: {
          height: 'h-8',
          padding: 'px-3',
          fontSize: 'text-sm',
          iconSize: 'w-4 h-4',
          gap: 'gap-1.5'
        },
        md: {
          height: 'h-10',
          padding: 'px-4',
          fontSize: 'text-sm',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        },
        lg: {
          height: 'h-12',
          padding: 'px-5',
          fontSize: 'text-base',
          iconSize: 'w-5 h-5',
          gap: 'gap-2'
        }
      },
      linkColors: {
        primary: {
          text: 'text-blue-600',
          hover: 'hover:text-blue-700',
          focus: 'focus:text-blue-700'
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
          warning: 'bg-gray-0 text-amber-500 border border-orange-500',
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
          warning: 'bg-orange-50 text-amber-600 border border-orange-100',
          purple: 'bg-purple-50 text-purple-600 border border-purple-100'
        }
      },
      splitTag: {
        neutral: {
          left: 'bg-gray-0 text-gray-950 border border-gray-950',
          right: 'bg-gray-950 text-gray-0'
        },
        primary: {
          left: 'bg-blue-200 text-blue-800',
          right: 'bg-blue-100 text-blue-700'
        },
        success: {
          left: 'bg-green-200 text-green-800',
          right: 'bg-green-100 text-green-700'
        },
        error: {
          left: 'bg-red-200 text-red-800',
          right: 'bg-red-100 text-red-700'
        },
        warning: {
          left: 'bg-amber-200 text-amber-800',
          right: 'bg-amber-100 text-amber-700'
        },
        purple: {
          left: 'bg-purple-200 text-purple-800',
          right: 'bg-purple-100 text-purple-700'
        }
      },
      sizes: {
        xs: {
          height: 'h-5',
          padding: 'px-1.5 py-0.5',
          fontSize: 'text-body-xs font-body'
        },
        sm: {
          height: 'h-[22px]',
          padding: 'px-2 py-0.75',
          fontSize: 'text-body-sm font-body'
        },
        md: {
          height: 'h-6',
          padding: 'px-2.5 py-1',
          fontSize: 'text-body-md font-body'
        },
        lg: {
          height: 'h-7',
          padding: 'px-3 py-1.5',
          fontSize: 'text-body-lg font-body'
        }
      },
      style: {
        squarical: 'rounded',
        rounded: 'rounded-full'
      },
      splitStyle: {
        squarical: {
          left: 'rounded-l',
          right: 'rounded-r'
        },
        rounded: {
          left: 'rounded-l-full',
          right: 'rounded-r-full'
        }
      }
    }
  }
}; 