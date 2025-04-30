import { cn } from '../../utils';
import {
  DateRange,
  DateRangePickerVariant,
  DateRangePreset,
} from './types';
import { themeConfig } from '../../themeConfig';

export const getDateRangePickerClassNames = (
  isDisabled: boolean
): string => {
  const theme = themeConfig.euler.dateRangePicker;

  return cn(
    theme.base.container,
    isDisabled && theme.states.disabled
  );
};

export const getInputClassNames = (
  variant: DateRangePickerVariant,
): string => {
  const baseStyles =
    'flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer';
  const variantStyles =
    variant === DateRangePickerVariant.PRIMARY ? 'border-gray-300' : 'border-gray-200 bg-gray-50';
  return cn(baseStyles, variantStyles);
};

export const getCalendarClassNames = (): string => {
  return 'absolute z-10 mt-1 w-auto min-w-[320px] bg-white border border-gray-200 rounded-md shadow-lg';
};

export const getPresetButtonClassNames = (isActive: boolean): string => {
  const baseStyles =
    'px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
  const activeStyles = isActive ? 'bg-primary-50 border-primary-500 text-primary-700' : '';

  return cn(baseStyles, activeStyles);
};

export const getTimePickerClassNames = (): string => {
  return 'p-4 border-t border-gray-200';
};

export const getTimeInputClassNames = (): string => {
  return 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500';
};

export const getActionButtonClassNames = (isPrimary: boolean): string => {
  return isPrimary
    ? 'px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
    : 'px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
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
    isRangeDay && theme.rangeDay,
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
export const formatDate = (date: Date, format: string): string => {
  if (!date) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year.toString())
    .replace('HH', hours24.toString().padStart(2, '0'))
    .replace('hh', hours12.toString().padStart(2, '0'))
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('a', ampm);
};

/**
 * Formats time in 12-hour format
 * @param date The date to format
 * @returns The formatted time string
 */
export const formatTimeIn12Hour = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Formats a date range for display
 * @param range The date range to format
 * @param showTime Whether to include time in the formatted string
 * @returns The formatted date range string
 */
export const formatDateRange = (range: DateRange, showTime: boolean = false): string => {
  if (!range.startDate) {
    return '';
  }

  const startFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy';
  const endFormat = showTime ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy';

  const start = formatDate(range.startDate, startFormat);

  if (!range.endDate) {
    return start;
  }

  const end = formatDate(range.endDate, endFormat);
  return `${start} – ${end}`;
};

/**
 * Parses a date string according to the specified format
 * @param dateStr The date string to parse
 * @param format The format string (e.g., "dd/MM/yyyy")
 * @returns The parsed Date object or null if parsing fails
 */
export const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  
  try {
    // For now, we'll just support dd/MM/yyyy format regardless of the format parameter
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    const date = new Date(year, month, day);
    return isValidDate(date) ? date : null;
  } catch (e) {
    return null;
  }
};

/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns True if the date is valid, false otherwise
 */
export const isValidDate = (date: Date | null | undefined): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Handles date selection
 * @param newRange The new date range
 * @param selectedRange The current date range
 * @param dateFormat The date format
 * @param setSelectedRange Function to set the selected range
 * @param setStartDate Function to set the start date
 * @param setEndDate Function to set the end date
 * @param setActivePreset Function to set the active preset
 */
export const handleDateSelect = (
  newRange: DateRange,
  selectedRange: DateRange,
  dateFormat: string,
  setSelectedRange: (range: DateRange) => void,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  setActivePreset: (preset: DateRangePreset) => void
) => {
  let finalRange = newRange;

  if (
    newRange.startDate &&
    newRange.endDate &&
    newRange.startDate.getTime() > newRange.endDate.getTime()
  ) {
    finalRange = {
      startDate: newRange.endDate,
      endDate: newRange.startDate,
    };
  }

  if (finalRange.startDate && selectedRange.startDate) {
    finalRange.startDate.setHours(selectedRange.startDate.getHours());
    finalRange.startDate.setMinutes(selectedRange.startDate.getMinutes());
  }

  if (finalRange.endDate && selectedRange.endDate) {
    finalRange.endDate.setHours(selectedRange.endDate.getHours());
    finalRange.endDate.setMinutes(selectedRange.endDate.getMinutes());
  }

  setSelectedRange(finalRange);
  setStartDate(formatDate(finalRange.startDate, dateFormat));
  setEndDate(formatDate(finalRange.endDate, dateFormat));
  setActivePreset(DateRangePreset.CUSTOM);
};

/**
 * Handles preset range selection
 * @param preset The selected preset
 * @param setSelectedRange Function to set the selected range
 * @param setActivePreset Function to set the active preset
 * @param setStartDate Function to set the start date
 * @param setEndDate Function to set the end date
 * @param onChange Function to call on change
 */
export const handlePresetRange = (
  preset: DateRangePreset,
  setSelectedRange: (range: DateRange) => void,
  setActivePreset: (preset: DateRangePreset) => void,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  setStartTime: (time: string) => void,
  setEndTime: (time: string) => void,
  dateFormat: string,
  onChange?: (range: DateRange) => void
) => {
  const newRange = getPresetDateRange(preset);
  setSelectedRange(newRange);
  setActivePreset(preset);
  setStartDate(formatDate(newRange.startDate, dateFormat));
  setEndDate(formatDate(newRange.endDate, dateFormat));
  setStartTime(formatDate(newRange.startDate, 'HH:mm'));
  setEndTime(formatDate(newRange.endDate, 'HH:mm'));
  onChange?.(newRange);
};

/**
 * Handles start date change
 * @param value The input value
 * @param selectedRange The current selected range
 * @param dateFormat The date format
 * @param setSelectedRange Function to set the selected range
 * @param setStartDate Function to set the start date
 * @param setEndDate Function to set the end date
 * @param setActivePreset Function to set the active preset
 */
export const handleStartDateChange = (
  value: string,
  selectedRange: DateRange,
  dateFormat: string,
  setSelectedRange: (range: DateRange) => void,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  setActivePreset: (preset: DateRangePreset) => void
) => {
  setStartDate(value);
  const parsedDate = parseDate(value);

  if (parsedDate && isValidDate(parsedDate)) {
    const newStartDate = new Date(parsedDate);
    if (selectedRange.startDate) {
      newStartDate.setHours(selectedRange.startDate.getHours());
      newStartDate.setMinutes(selectedRange.startDate.getMinutes());
    }

    if (selectedRange.endDate && newStartDate > selectedRange.endDate) {
      setSelectedRange({
        startDate: newStartDate,
        endDate: new Date(newStartDate),
      });
      setEndDate(formatDate(newStartDate, dateFormat));
    } else {
      setSelectedRange({
        ...selectedRange,
        startDate: newStartDate,
      });
    }
    setActivePreset(DateRangePreset.CUSTOM);
  }
};

/**
 * Handles end date change
 * @param value The input value
 * @param selectedRange The current selected range
 * @param dateFormat The date format
 * @param setSelectedRange Function to set the selected range
 * @param setStartDate Function to set the start date
 * @param setEndDate Function to set the end date
 * @param setActivePreset Function to set the active preset
 */
export const handleEndDateChange = (
  value: string,
  selectedRange: DateRange,
  dateFormat: string,
  setSelectedRange: (range: DateRange) => void,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  setActivePreset: (preset: DateRangePreset) => void
) => {
  setEndDate(value);
  const parsedDate = parseDate(value);

  if (parsedDate && isValidDate(parsedDate)) {
    const newEndDate = new Date(parsedDate);
    if (selectedRange.endDate) {
      newEndDate.setHours(selectedRange.endDate.getHours());
      newEndDate.setMinutes(selectedRange.endDate.getMinutes());
    }

    if (selectedRange.startDate && newEndDate < selectedRange.startDate) {
      setSelectedRange({
        startDate: new Date(newEndDate),
        endDate: newEndDate,
      });
      setStartDate(formatDate(newEndDate, dateFormat));
    } else {
      setSelectedRange({
        ...selectedRange,
        endDate: newEndDate,
      });
    }
    setActivePreset(DateRangePreset.CUSTOM);
  }
};

/**
 * Handles start time change
 * @param time The selected time
 * @param selectedRange The current selected range
 * @param setSelectedRange Function to set the selected range
 * @param setActivePreset Function to set the active preset
 */
export const handleStartTimeChange = (
  time: string,
  selectedRange: DateRange,
  setSelectedRange: (range: DateRange) => void,
  setActivePreset: (preset: DateRangePreset) => void
) => {
  if (selectedRange.startDate) {
    const [hours, minutes] = time.split(':').map(Number);
    const newStartDate = new Date(selectedRange.startDate);
    newStartDate.setHours(hours);
    newStartDate.setMinutes(minutes);

    setSelectedRange({
      ...selectedRange,
      startDate: newStartDate,
    });
    setActivePreset(DateRangePreset.CUSTOM);
  }
};

/**
 * Handles end time change
 * @param time The selected time
 * @param selectedRange The current selected range
 * @param setSelectedRange Function to set the selected range
 * @param setActivePreset Function to set the active preset
 */
export const handleEndTimeChange = (
  time: string,
  selectedRange: DateRange,
  setSelectedRange: (range: DateRange) => void,
  setActivePreset: (preset: DateRangePreset) => void
) => {
  if (selectedRange.endDate) {
    const [hours, minutes] = time.split(':').map(Number);
    const newEndDate = new Date(selectedRange.endDate);
    newEndDate.setHours(hours);
    newEndDate.setMinutes(minutes);

    setSelectedRange({
      ...selectedRange,
      endDate: newEndDate,
    });
    setActivePreset(DateRangePreset.CUSTOM);
  }
};

/**
 * Gets a date range for a preset
 * @param preset The preset to get the date range for
 * @returns The date range for the preset
 */
export const getPresetDateRange = (preset: DateRangePreset): DateRange => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate: Date;
  let endDate: Date = new Date(now);

  switch (preset) {
    case DateRangePreset.LAST_1_HOUR:
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case DateRangePreset.LAST_6_HOURS:
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000);
      break;
    case DateRangePreset.TODAY:
      startDate = today;
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      break;
    case DateRangePreset.YESTERDAY:
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 1);
      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      break;
    case DateRangePreset.LAST_7_DAYS:
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
      break;
    case DateRangePreset.CUSTOM:
    default:
      startDate = today;
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
    case DateRangePreset.LAST_1_HOUR:
      return 'Last 1 hour';
    case DateRangePreset.TODAY:
      return 'Today';
    case DateRangePreset.YESTERDAY:
      return 'Yesterday';
    case DateRangePreset.LAST_7_DAYS:
      return 'Last 7 days';
    case DateRangePreset.CUSTOM:
      return 'Custom';
    default:
      return '';
  }
};

export const getDateRangePickerBaseClassNames = (): string => {
  return themeConfig.euler.dateRangePicker.base.container;
};

export const getDateRangePickerStatesClassNames = (isDisabled: boolean): string => {
  return isDisabled ? themeConfig.euler.dateRangePicker.states.disabled : '';
};

export const getDateRangePickerInputClassNames = (): string => {
  return themeConfig.euler.dateRangePicker.base.input;
};

export const getDateRangePickerCalendarClassNames = (): string => {
  return themeConfig.euler.dateRangePicker.calendar.container;
};

export const getDateRangePickerPresetsButtonClassNames = (isActive: boolean): string => {
  return isActive
    ? themeConfig.euler.dateRangePicker.presets.activeButton
    : themeConfig.euler.dateRangePicker.presets.button;
};

export const getDateRangePickerTimePickerClassNames = (): string => {
  return themeConfig.euler.dateRangePicker.timePicker.container;
};

export const getDateRangePickerTimeInputClassNames = (): string => {
  return themeConfig.euler.dateRangePicker.timePicker.input;
};
