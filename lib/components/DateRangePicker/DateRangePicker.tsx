import { forwardRef, useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import {
  DateRangePickerProps,
  DateRangePickerSize,
  DateRangePickerVariant,
  DateRangePreset,
  DateRange,
} from './types';
import {
  getDateRangePickerClassNames,
  formatDate,
  getPresetDateRange,
  parseDate,
  isValidDate,
  getPresetLabel,
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
      size = DateRangePickerSize.MEDIUM,
      variant = DateRangePickerVariant.PRIMARY,
      showTimePicker = false,
      showPresets = true,
      placeholder = 'Select date range',
      isDisabled = false,
      className,
      dateFormat = 'dd/MM/yyyy',
      ariaLabel = 'Date range picker',
      allowSingleDateSelection = false,
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

    const today = new Date();

    useEffect(() => {
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
    }, [value, dateFormat]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownRef.current) return;

        const isOutsideDropdown = !dropdownRef.current.contains(event.target as Node);
        const isOutsideCalendar =
          calendarRef.current && !calendarRef.current.contains(event.target as Node);
        const isOutsideQuickRange =
          quickRangeRef.current && !quickRangeRef.current.contains(event.target as Node);

        if (isOutsideDropdown && isOutsideCalendar && isOutsideQuickRange) {
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

    const formatDateDisplay = () => {
      if (!selectedRange.startDate) return placeholder;

      if (activePreset !== DateRangePreset.CUSTOM && showPresets) {
        return getPresetLabel(activePreset);
      }

      const formatTimeIn12Hour = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      };

      const formattedStart =
        formatDate(selectedRange.startDate, dateFormat) +
        (showTimePickerState ? `, ${formatTimeIn12Hour(selectedRange.startDate)}` : '');

      if (
        allowSingleDateSelection &&
        selectedRange.startDate.getTime() === selectedRange.endDate.getTime()
      ) {
        return formattedStart;
      }

      const formattedEnd =
        formatDate(selectedRange.endDate, dateFormat) +
        (showTimePickerState ? `, ${formatTimeIn12Hour(selectedRange.endDate)}` : '');

      return `${formattedStart} – ${formattedEnd}`;
    };

    const handleDateSelect = (newRange: DateRange) => {
      // Ensure start date is always less than end date
      let finalRange = newRange;

      if (
        newRange.startDate &&
        newRange.endDate &&
        newRange.startDate.getTime() > newRange.endDate.getTime()
      ) {
        // Swap dates if start is after end
        finalRange = {
          startDate: newRange.endDate,
          endDate: newRange.startDate,
        };
      }

      // Preserve time values
      if (finalRange.startDate && selectedRange.startDate) {
        finalRange.startDate.setHours(selectedRange.startDate.getHours());
        finalRange.startDate.setMinutes(selectedRange.startDate.getMinutes());
      }

      if (finalRange.endDate && selectedRange.endDate) {
        finalRange.endDate.setHours(selectedRange.endDate.getHours());
        finalRange.endDate.setMinutes(selectedRange.endDate.getMinutes());
      }

      setSelectedRange(finalRange);

      // Update input fields
      setStartDate(formatDate(finalRange.startDate, dateFormat));
      setEndDate(formatDate(finalRange.endDate, dateFormat));

      setStartTime(formatDate(finalRange.startDate, 'HH:mm'));
      setEndTime(formatDate(finalRange.endDate, 'HH:mm'));

      setActivePreset(DateRangePreset.CUSTOM);
    };

    const handlePresetRange = (preset: DateRangePreset) => {
      const newRange = getPresetDateRange(preset);
      setSelectedRange(newRange);
      setActivePreset(preset);

      setStartDate(formatDate(newRange.startDate, dateFormat));
      setEndDate(formatDate(newRange.endDate, dateFormat));

      setStartTime(formatDate(newRange.startDate, 'HH:mm'));
      setEndTime(formatDate(newRange.endDate, 'HH:mm'));

      setIsQuickRangeOpen(false);

      onChange?.(newRange);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStartDate(value);

      const parsedDate = parseDate(value);
      if (parsedDate && isValidDate(parsedDate)) {
        const newStartDate = new Date(parsedDate);
        if (selectedRange.startDate) {
          newStartDate.setHours(selectedRange.startDate.getHours());
          newStartDate.setMinutes(selectedRange.startDate.getMinutes());
        }

        // Ensure start date is not after end date
        if (selectedRange.endDate && newStartDate > selectedRange.endDate) {
          // If new start date is after end date, set end date to start date
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

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEndDate(value);

      const parsedDate = parseDate(value);
      if (parsedDate && isValidDate(parsedDate)) {
        const newEndDate = new Date(parsedDate);
        if (selectedRange.endDate) {
          newEndDate.setHours(selectedRange.endDate.getHours());
          newEndDate.setMinutes(selectedRange.endDate.getMinutes());
        }

        // Ensure end date is not before start date
        if (selectedRange.startDate && newEndDate < selectedRange.startDate) {
          // If new end date is before start date, set start date to end date
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

    const handleStartTimeChange = (time: string) => {
      setStartTime(time);

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

    const handleEndTimeChange = (time: string) => {
      setEndTime(time);

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

    const handleApply = () => {
      onChange?.({
        ...selectedRange,
        showTimePicker: showTimePickerState,
      });
      setIsOpen(false);
    };

    const handleCancel = () => {
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
      setIsOpen(false);
    };

    const componentClassName = getDateRangePickerClassNames(size, variant, isDisabled);

    return (
      <div className={cn('relative', className)} ref={ref}>
        <div className="flex">
          {showPresets && (
            <div
              className="relative"
              ref={quickRangeRef}
              style={{ width: showPresets ? '40%' : '0%' }}
            >
              <QuickRangeSelector
                isOpen={isQuickRangeOpen}
                onToggle={() => setIsQuickRangeOpen(!isQuickRangeOpen)}
                activePreset={activePreset}
                onPresetSelect={handlePresetRange}
                excludeCustom={true}
              />
            </div>
          )}

          <div
            className={cn('relative', showPresets ? 'flex-1' : 'w-full')}
            ref={calendarRef}
            style={{ width: showPresets ? '60%' : '100%' }}
          >
            <div
              className={cn(
                componentClassName,
                'border border-gray-300',
                showPresets ? 'rounded-r-md' : 'rounded-md',
                'p-2 flex justify-between items-center cursor-pointer w-full'
              )}
              onClick={e => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label={ariaLabel}
              aria-expanded={isOpen}
              aria-disabled={isDisabled}
              role="button"
              tabIndex={isDisabled ? -1 : 0}
            >
              <div className={cn(showPresets ? 'hidden' : 'flex', 'items-center')}>
                <span className="mr-2">Date Range</span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
              <div className="text-primary-500 flex-1 flex items-center justify-end">
                <span>{formatDateDisplay()}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 ml-2" />
                )}
              </div>
            </div>

            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-10 mt-1 right-0 bg-white rounded-md shadow-lg border border-gray-200"
                style={{ width: '400px' }}
              >
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-24 text-gray-500">Start</div>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-32"
                        placeholder="DD/MM/YYYY"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      {showTimePickerState && (
                        <TimeSelector value={startTime} onChange={handleStartTimeChange} />
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
                          className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-32"
                          placeholder="DD/MM/YYYY"
                          value={endDate}
                          onChange={handleEndDateChange}
                        />
                        {showTimePickerState && (
                          <TimeSelector value={endTime} onChange={handleEndTimeChange} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Scrollable Calendar */}
                  <div ref={calendarScrollRef} className="mt-4 max-h-[300px] overflow-y-auto">
                    <CalendarGrid
                      selectedRange={selectedRange}
                      onDateSelect={handleDateSelect}
                      today={today}
                      allowSingleDateSelection={allowSingleDateSelection}
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
                      <span className="ml-2 text-gray-700">Time Ranges</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
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
