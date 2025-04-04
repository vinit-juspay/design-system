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
    }
  }
}; 