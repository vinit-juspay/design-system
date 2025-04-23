import { cn } from "../../utils";
import { DateRange, DateRangePickerSize, DateRangePickerVariant, DateRangePreset } from "./types";

export const getDateRangePickerClassNames = (
  variant: DateRangePickerVariant,
  size: DateRangePickerSize,
  isDisabled: boolean
): string => {
  const baseStyles = "relative inline-flex w-full";
  const variantStyles = variant === DateRangePickerVariant.PRIMARY ? "text-gray-900" : "text-gray-700 bg-gray-50";
  const sizeStyles = size === DateRangePickerSize.SMALL ? "h-8 text-xs" : 
                     size === DateRangePickerSize.MEDIUM ? "h-10 text-sm" : "h-12 text-base";
  const disabledStyles = isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return cn(baseStyles, variantStyles, sizeStyles, disabledStyles);
};

export const getInputClassNames = (
  variant: DateRangePickerVariant,
  size: DateRangePickerSize
): string => {
  const baseStyles = "flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer";
  const variantStyles = variant === DateRangePickerVariant.PRIMARY ? "border-gray-300" : "border-gray-200 bg-gray-50";
  const sizeStyles = size === DateRangePickerSize.SMALL ? "text-xs py-1" : 
                     size === DateRangePickerSize.MEDIUM ? "text-sm py-2" : "text-base py-2.5";

  return cn(baseStyles, variantStyles, sizeStyles);
};

export const getCalendarClassNames = (): string => {
  return "absolute z-10 mt-1 w-auto min-w-[320px] bg-white border border-gray-200 rounded-md shadow-lg";
};

export const getPresetButtonClassNames = (isActive: boolean): string => {
  const baseStyles = "px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const activeStyles = isActive ? "bg-primary-50 border-primary-500 text-primary-700" : "";

  return cn(baseStyles, activeStyles);
};

export const getTimePickerClassNames = (): string => {
  return "p-4 border-t border-gray-200";
};

export const getTimeInputClassNames = (): string => {
  return "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500";
};

export const getActionButtonClassNames = (isPrimary: boolean): string => {
  return isPrimary 
    ? "px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    : "px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
};

// Format date to string using native JS
export const formatDate = (date: Date, format: string): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Simple format conversion (not as flexible as date-fns but works for basic needs)
  let formattedDate = format
    .replace(/yyyy/g, year.toString())
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes);
    
  if (format.includes('a')) {
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const hour12 = date.getHours() % 12 || 12;
    formattedDate = formattedDate
      .replace(/h/g, hour12.toString())
      .replace(/a/g, ampm);
  }
  
  if (format.includes('MMM')) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    formattedDate = formattedDate.replace(/MMM/g, monthNames[date.getMonth()]);
  }
  
  return formattedDate;
};

export const formatDateRange = (range: DateRange, dateFormat: string): string => {
  const { startDate, endDate } = range;
  return `${formatDate(startDate, dateFormat)} – ${formatDate(endDate, dateFormat)}`;
};

// Helper functions to manipulate dates
const subtractMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - minutes);
  return result;
};

const subtractHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() - hours);
  return result;
};

const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
  const now = new Date();
  
  switch (preset) {
    case DateRangePreset.LAST_30_MINUTES:
      return {
        startDate: subtractMinutes(now, 30),
        endDate: now
      };
    
    case DateRangePreset.LAST_1_HOUR:
      return {
        startDate: subtractHours(now, 1),
        endDate: now
      };
    
    case DateRangePreset.LAST_6_HOURS:
      return {
        startDate: subtractHours(now, 6),
        endDate: now
      };
    
    case DateRangePreset.TODAY:
      return {
        startDate: startOfDay(now),
        endDate: now
      };
    
    case DateRangePreset.YESTERDAY:
      return {
        startDate: startOfDay(subtractDays(now, 1)),
        endDate: endOfDay(subtractDays(now, 1))
      };
    
    case DateRangePreset.LAST_2_DAYS:
      return {
        startDate: startOfDay(subtractDays(now, 2)),
        endDate: now
      };
    
    case DateRangePreset.LAST_7_DAYS:
      return {
        startDate: startOfDay(subtractDays(now, 7)),
        endDate: now
      };
    
    default:
      return {
        startDate: now,
        endDate: now
      };
  }
};

export const getPresetLabel = (preset: DateRangePreset): string => {
  switch (preset) {
    case DateRangePreset.LAST_30_MINUTES:
      return "Last 30 minutes";
    case DateRangePreset.LAST_1_HOUR:
      return "Last 1 hour";
    case DateRangePreset.LAST_6_HOURS:
      return "Last 6 hours";
    case DateRangePreset.TODAY:
      return "Today";
    case DateRangePreset.YESTERDAY:
      return "Yesterday";
    case DateRangePreset.LAST_2_DAYS:
      return "Last 2 days";
    case DateRangePreset.LAST_7_DAYS:
      return "Last 7 days";
    case DateRangePreset.CUSTOM:
      return "Custom Range";
    default:
      return "";
  }
};

export const parseDate = (dateString: string, format: string): Date | null => {
  // This is a simplified parser - for production, you might want a more robust solution
  try {
    if (format === "yyyy-MM-dd") {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }    
    return new Date(dateString);
  } catch (e) {
    return null;
  }
};

export const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
}; 