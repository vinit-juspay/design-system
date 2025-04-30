import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DateRangePickerProps,
  DateRangePreset,
  DateRange,
} from './types';
import {
  formatDate,
  getPresetDateRange,
  getDateRangePickerBaseClassNames,
  getDateRangePickerStatesClassNames,
  getDateRangePickerCalendarClassNames,
  getDateRangePickerTimeInputClassNames,
  isValidDate,
  parseDate,
} from './utils';
import { cn } from '../../utils';
import Button from '../Button/Button';
import { ButtonType, ButtonSize } from '../Button/types';
import CalendarGrid from './CalendarGrid';
import QuickRangeSelector from './QuickRangeSelector';
import TimeSelector from './TimeSelector';

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      showTimePicker = false,
      showPresets = true,
      placeholder = 'Select date range',
      isDisabled = false,
      className,
      dateFormat = 'dd/MM/yyyy',
      ariaLabel = 'Date range picker',
      allowSingleDateSelection = false,
      disableFutureDates = false,
      disablePastDates = false,
      triggerElement = null,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isQuickRangeOpen, setIsQuickRangeOpen] = useState(false);
    const [showTimePickerState, setShowTimePickerState] = useState(showTimePicker);

    const [selectedRange, setSelectedRange] = useState<DateRange>(
      value || getPresetDateRange(DateRangePreset.TODAY)
    );

    const [activePreset, setActivePreset] = useState<DateRangePreset>(DateRangePreset.TODAY);

    const [startTime, setStartTime] = useState(formatDate(selectedRange.startDate, 'HH:mm'));
    const [endTime, setEndTime] = useState(formatDate(selectedRange.endDate, 'HH:mm'));

    const [startDate, setStartDate] = useState(formatDate(selectedRange.startDate, dateFormat));
    const [endDate, setEndDate] = useState(formatDate(selectedRange.endDate, dateFormat));

    const calendarRef = useRef<HTMLDivElement>(null);
    const quickRangeRef = useRef<HTMLDivElement>(null);
    const calendarScrollRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const today = new Date();

    // Update state when value prop changes
    useEffect(() => {
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
    }, [value, dateFormat]);

    // Handle click outside to close dropdowns
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownRef.current) return;

        const isOutsideDropdown = !dropdownRef.current.contains(event.target as Node);
        const isOutsideCalendar =
          calendarRef.current && !calendarRef.current.contains(event.target as Node);
        const isOutsideQuickRange =
          quickRangeRef.current && !quickRangeRef.current.contains(event.target as Node);
        const isOutsideTrigger =
          triggerRef.current && !triggerRef.current.contains(event.target as Node);

        if (isOutsideDropdown && isOutsideCalendar && isOutsideQuickRange && isOutsideTrigger) {
          setIsOpen(false);
          setIsQuickRangeOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Scroll to current month when calendar opens
    useEffect(() => {
      if (isOpen && calendarScrollRef.current) {
        setTimeout(() => {
          const currentMonthElement = calendarScrollRef.current?.querySelector(
            `[data-current-month="true"]`
          );

          if (currentMonthElement) {
            currentMonthElement.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 0);
      }
    }, [isOpen]);

    // Format the date display for the input
    const formatDateDisplay = () => {
      if (!selectedRange.startDate) return placeholder;

      const formattedStartDate = formatDate(selectedRange.startDate, dateFormat);
      
      if (allowSingleDateSelection && 
          selectedRange.startDate.getTime() === selectedRange.endDate.getTime()) {
        return formattedStartDate;
      }
      
      const formattedEndDate = formatDate(selectedRange.endDate, dateFormat);
      return `${formattedStartDate} - ${formattedEndDate}`;
    };

    // Handle date selection from calendar
    const handleDateSelectCallback = useCallback(
      (range: DateRange) => {
        // Preserve time when selecting dates
        if (range.startDate) {
          const [startHour, startMinute] = startTime.split(':').map(Number);
          range.startDate.setHours(startHour, startMinute);
        }

        if (range.endDate) {
          const [endHour, endMinute] = endTime.split(':').map(Number);
          range.endDate.setHours(endHour, endMinute);
        }

        setSelectedRange(range);
        setStartDate(formatDate(range.startDate, dateFormat));
        setEndDate(formatDate(range.endDate, dateFormat));
        setActivePreset(DateRangePreset.CUSTOM);
      },
      [startTime, endTime, dateFormat]
    );

    // Handle preset selection
    const handlePresetRangeCallback = useCallback(
      (preset: DateRangePreset) => {
        const range = getPresetDateRange(preset);
        
        // Preserve time when selecting presets
        if (showTimePickerState) {
          const [startHour, startMinute] = startTime.split(':').map(Number);
          range.startDate.setHours(startHour, startMinute);
          
          const [endHour, endMinute] = endTime.split(':').map(Number);
          range.endDate.setHours(endHour, endMinute);
        }
        
        setSelectedRange(range);
        setStartDate(formatDate(range.startDate, dateFormat));
        setEndDate(formatDate(range.endDate, dateFormat));
        setActivePreset(preset);
      },
      [startTime, endTime, dateFormat, showTimePickerState]
    );

    // Handle start date input change
    const handleStartDateChangeCallback = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setStartDate(newDate);
        
          const parsedDate = parseDate(newDate );
        if (isValidDate(parsedDate) && parsedDate !== null) {
          // Preserve time
          const [hours, minutes] = startTime.split(':').map(Number);
          parsedDate.setHours(hours, minutes);
          
          const newRange = { ...selectedRange, startDate: parsedDate };
          setSelectedRange(newRange);
          setActivePreset(DateRangePreset.CUSTOM);
        }
      },
      [selectedRange, startTime, dateFormat]
    );

    // Handle end date input change
    const handleEndDateChangeCallback = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setEndDate(newDate);
        
        const parsedDate = parseDate(newDate);
        if (isValidDate(parsedDate) && parsedDate !== null) {
          // Preserve time
          const [hours, minutes] = endTime.split(':').map(Number);
          parsedDate.setHours(hours, minutes);
          
          const newRange = { ...selectedRange, endDate: parsedDate };
          setSelectedRange(newRange);
          setActivePreset(DateRangePreset.CUSTOM);
        }
      },
      [selectedRange, endTime, dateFormat]
    );

    // Handle start time change
    const handleStartTimeChangeCallback = useCallback(
      (newTime: string) => {
        setStartTime(newTime);
        
        if (selectedRange.startDate) {
          const [hours, minutes] = newTime.split(':').map(Number);
          const newDate = new Date(selectedRange.startDate);
          newDate.setHours(hours, minutes);
          
          const newRange = { ...selectedRange, startDate: newDate };
          setSelectedRange(newRange);
          setActivePreset(DateRangePreset.CUSTOM);
        }
      },
      [selectedRange]
    );

    // Handle end time change
    const handleEndTimeChangeCallback = useCallback(
      (newTime: string) => {
        setEndTime(newTime);
        
        if (selectedRange.endDate) {
          const [hours, minutes] = newTime.split(':').map(Number);
          const newDate = new Date(selectedRange.endDate);
          newDate.setHours(hours, minutes);
          
          const newRange = { ...selectedRange, endDate: newDate };
          setSelectedRange(newRange);
          setActivePreset(DateRangePreset.CUSTOM);
        }
      },
      [selectedRange]
    );

    // Handle apply button click
    const handleApply = () => {
      setIsOpen(false);
      onChange?.(selectedRange);
    };

    // Handle cancel button click
    const handleCancel = useCallback(() => {
      // Reset to the original value
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
      setIsOpen(false);
    }, [value, dateFormat]);

    const baseClassNames = getDateRangePickerBaseClassNames();
    const statesClassNames = getDateRangePickerStatesClassNames(isDisabled);
    const calendarClassNames = getDateRangePickerCalendarClassNames();
    const timeInputClassNames = getDateRangePickerTimeInputClassNames();

    const renderTrigger = () => {
      if (triggerElement) {
        return (
          <div 
            ref={triggerRef}
            onClick={() => !isDisabled && setIsOpen(!isOpen)}
            className={isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          >
            {triggerElement}
          </div>
        );
      }

      return (
        <div
          className={cn(
            baseClassNames,
            statesClassNames,
            'border border-gray-300',
            showPresets ? 'rounded-r-lg' : 'rounded-lg',
            'p-2 flex justify-between items-center cursor-pointer w-full h-10'
          )}
          onClick={e => {
            e.stopPropagation();
            if (!isDisabled) setIsOpen(!isOpen);
          }}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-disabled={isDisabled}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className="text-gray-600 font-medium text-md flex-1 flex items-center justify-end">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{formatDateDisplay()}</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 ml-2" />
            ) : (
              <ChevronDown className="w-5 h-5 ml-2" />
            )}
          </div>
        </div>
      );
    };

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        <div className="flex flex-col sm:flex-row">
          {showPresets && (
            <div
              className="relative w-full sm:w-32 mb-2 sm:mb-0 h-10"
              ref={quickRangeRef}
            >
              <QuickRangeSelector
                isOpen={isQuickRangeOpen}
                onToggle={() => !isDisabled && setIsQuickRangeOpen(!isQuickRangeOpen)}
                activePreset={activePreset}
                onPresetSelect={handlePresetRangeCallback}
                excludeCustom={true}
                disableFutureDates={disableFutureDates}
                disablePastDates={disablePastDates}
              />
            </div>
          )}

          <div
            className={cn('relative sm:min-w-96')}
            ref={calendarRef}
          >
            {renderTrigger()}

            {isOpen && (
              <div
                ref={dropdownRef}
                className={cn(calendarClassNames)}
              >
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-24 text-gray-500">Start</div>
                      <input
                        type="text"
                        className={cn(timeInputClassNames)}
                        placeholder="DD/MM/YYYY"
                        value={startDate}
                        onChange={handleStartDateChangeCallback}
                      />
                      {showTimePickerState && (
                        <TimeSelector value={startTime} onChange={handleStartTimeChangeCallback} />
                      )}
                    </div>

                    {(!allowSingleDateSelection ||
                      (allowSingleDateSelection &&
                        selectedRange.startDate &&
                        selectedRange.endDate &&
                        selectedRange.startDate.getTime() !== selectedRange.endDate.getTime())) && (
                      <div className="flex items-center">
                        <div className="w-24 text-gray-500">End</div>
                        <input
                          type="text"
                          className={cn(timeInputClassNames)}
                          placeholder="DD/MM/YYYY"
                          value={endDate}
                          onChange={handleEndDateChangeCallback}
                        />
                        {showTimePickerState && (
                          <TimeSelector value={endTime} onChange={handleEndTimeChangeCallback} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Scrollable Calendar */}
                  <div ref={calendarScrollRef} className="mt-4 max-h-[300px] overflow-y-auto">
                    <CalendarGrid
                      selectedRange={selectedRange}
                      onDateSelect={handleDateSelectCallback}
                      today={today}
                      allowSingleDateSelection={allowSingleDateSelection}
                      disableFutureDates={disableFutureDates}
                      disablePastDates={disablePastDates}
                    />
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-gray-200 mt-4">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          'w-10 h-5 relative rounded-full transition-colors duration-200 ease-in-out cursor-pointer',
                          showTimePickerState ? 'bg-primary-500' : 'bg-gray-200'
                        )}
                        onClick={() => {
                          const newShowTimePickerState = !showTimePickerState;
                          setShowTimePickerState(newShowTimePickerState);
                        }}
                      >
                        <div
                          className={cn(
                            'absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out',
                            showTimePickerState && 'transform translate-x-5'
                          )}
                        ></div>
                      </div>
                      <span className="ml-2 text-gray-600 text-md">Time Ranges</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
