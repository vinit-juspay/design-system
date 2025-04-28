import { cn } from "../../utils";
import { DateRange, DateRangePickerSize, DateRangePickerVariant, DateRangePreset } from "./types";
import { themeConfig } from "../../themeConfig";

export const getDateRangePickerClassNames = (
  size: DateRangePickerSize,
  variant: DateRangePickerVariant,
  isDisabled: boolean
): string => {
  const theme = themeConfig.euler.dateRangePicker;
  
  return cn(
    theme.base.container,
    theme.variant[variant],
    theme.sizes[size],
    isDisabled && theme.states.disabled
  );
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

export const getCalendarGridClassNames = (
  isStart: boolean,
  isEnd: boolean,
  isRangeDay: boolean,
  isTodayDay: boolean,
  isSelectedDay: boolean
): string => {
  const theme = themeConfig.euler.dateRangePicker.calendar;
  
  return cn(
    theme.dayCell,
    isStart && theme.startDate,
    isEnd && theme.endDate,
    isRangeDay && !isSelectedDay && theme.rangeDay,
    isTodayDay && !isSelectedDay && theme.todayDay,
    theme.hoverState
  );
};

/**
 * Formats a date according to the specified format
 * @param date The date to format
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The formatted date string or empty string if date is invalid
 */
export const formatDate = (date: Date | null | undefined, format: string = "dd/MM/yyyy"): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  
  return format
    .replace("dd", day)
    .replace("MM", month)
    .replace("yyyy", year.toString())
    .replace("HH", hours)
    .replace("mm", minutes);
};

/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export const formatDateRange = (range: DateRange, showTime: boolean = false): string => {
  if (!range.startDate) {
    return "";
  }
  
  const startFormat = showTime ? "dd/MM/yyyy, HH:mm" : "dd/MM/yyyy";
  const endFormat = showTime ? "dd/MM/yyyy, HH:mm" : "dd/MM/yyyy";
  
  const start = formatDate(range.startDate, startFormat);
  
  if (!range.endDate) {
    return start;
  }
  
  const end = formatDate(range.endDate, endFormat);
  return `${start} – ${end}`;
};

/**
 * Parses a date string in the format dd/MM/yyyy
 * @param dateStr The date string to parse
 * @returns The parsed date or null if invalid
 */
export const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  
  const date = new Date(year, month, day);
  return isValidDate(date) ? date : null;
};

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns Whether the date is valid
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Gets a date range for a preset
 * @param preset The preset to get the date range for
 * @returns The date range for the preset
 */
export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
  const now = new Date();
  let startDate: Date;
  let endDate: Date = new Date(now);
  
  switch (preset) {
    case DateRangePreset.LAST_30_MINUTES:
      startDate = new Date(now.getTime() - 30 * 60 * 1000);
      break;
    case DateRangePreset.LAST_1_HOUR:
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case DateRangePreset.LAST_6_HOURS:
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000);
      break;
    case DateRangePreset.TODAY:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case DateRangePreset.YESTERDAY:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
      break;
    case DateRangePreset.LAST_2_DAYS:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
      break;
    case DateRangePreset.LAST_7_DAYS:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      break;
    case DateRangePreset.CUSTOM:
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
  }
  
  return { startDate, endDate };
};

/**
 * Gets a label for a preset
 * @param preset The preset to get the label for
 * @returns The label for the preset
 */
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
      return "Custom";
    default:
      return "";
  }
}; 