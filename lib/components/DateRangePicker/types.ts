import { ReactNode } from 'react';

export enum DateRangePreset {
  CUSTOM = 'custom',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_1_HOUR = 'last_1_hour',
  LAST_6_HOURS = 'last_6_hours',
  LAST_7_DAYS = 'last_7_days',
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
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  triggerElement?: ReactNode;
}
