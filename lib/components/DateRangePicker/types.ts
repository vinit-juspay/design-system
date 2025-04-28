import { ReactNode } from "react";

export enum DateRangePreset {
  LAST_30_MINUTES = "last_30_minutes",
  LAST_1_HOUR = "last_1_hour",
  LAST_6_HOURS = "last_6_hours",
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_2_DAYS = "last_2_days",
  LAST_7_DAYS = "last_7_days",
  CUSTOM = "custom"
}

export enum DateRangePickerSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg"
}

export enum DateRangePickerVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary"
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