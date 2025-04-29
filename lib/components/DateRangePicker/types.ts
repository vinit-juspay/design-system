import { ReactNode } from 'react';

export enum DateRangePreset {
  CUSTOM = 'custom',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  THIS_WEEK = 'this_week',
  LAST_WEEK = 'last_week',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  THIS_YEAR = 'this_year',
  LAST_YEAR = 'last_year',
  LAST_15_MINUTES = 'last_15_minutes',
  LAST_30_MINUTES = 'last_30_minutes',
  LAST_1_HOUR = 'last_1_hour',
  LAST_4_HOURS = 'last_4_hours',
  LAST_6_HOURS = 'last_6_hours',
  LAST_12_HOURS = 'last_12_hours',
  LAST_24_HOURS = 'last_24_hours',
  LAST_2_DAYS = 'last_2_days',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  LAST_90_DAYS = 'last_90_days',
}

export enum DateRangePickerSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum DateRangePickerVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  showTimePicker?: boolean;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  size?: DateRangePickerSize;
  variant?: DateRangePickerVariant;
  showTimePicker?: boolean;
  showPresets?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  icon?: ReactNode;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  ariaLabel?: string;
  allowSingleDateSelection?: boolean;
}
