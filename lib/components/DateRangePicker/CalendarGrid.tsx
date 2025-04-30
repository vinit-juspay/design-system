import { forwardRef, useEffect, useRef } from 'react';
import { DateRange } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

interface CalendarGridProps {
  selectedRange: DateRange;
  onDateSelect: (range: DateRange) => void;
  today: Date;
  allowSingleDateSelection?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  ({ selectedRange, onDateSelect, today, allowSingleDateSelection = false, disableFutureDates, disablePastDates }, ref) => {
    const currentMonthRef = useRef<HTMLDivElement>(null);

    // Scroll to current month when component mounts
    useEffect(() => {
      if (currentMonthRef.current) {
        currentMonthRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, []);

    // Generate months from Jan 2012 to current year + 5 years
    const generateMonths = () => {
      const months = [];
      const currentDate = new Date();
      const startYear = 2012;
      const startMonth = 0; // January
      const endYear = currentDate.getFullYear() + 5;
      const endMonth = 11; // December

      for (let year = startYear; year <= endYear; year++) {
        const monthStart = year === startYear ? startMonth : 0;
        const monthEnd = year === endYear ? endMonth : 11;

        for (let month = monthStart; month <= monthEnd; month++) {
          months.push({ year, month });
        }
      }

      return months;
    };

    const months = generateMonths();

    // Check if a date is in the selected range (but not start or end date)
    const isInRange = (date: Date) => {
      if (!selectedRange.startDate || !selectedRange.endDate) return false;

      const time = date.getTime();
      return time > selectedRange.startDate.getTime() && time < selectedRange.endDate.getTime();
    };

    // Check if a date is the start date
    const isStartDate = (date: Date) => {
      if (!selectedRange.startDate) return false;

      const dateWithoutTime = new Date(date);
      dateWithoutTime.setHours(0, 0, 0, 0);

      const startWithoutTime = new Date(selectedRange.startDate);
      startWithoutTime.setHours(0, 0, 0, 0);

      return dateWithoutTime.getTime() === startWithoutTime.getTime();
    };

    // Check if a date is the end date
    const isEndDate = (date: Date) => {
      if (!selectedRange.endDate) return false;

      const dateWithoutTime = new Date(date);
      dateWithoutTime.setHours(0, 0, 0, 0);

      const endWithoutTime = new Date(selectedRange.endDate);
      endWithoutTime.setHours(0, 0, 0, 0);

      return dateWithoutTime.getTime() === endWithoutTime.getTime();
    };

    // Check if a date is today
    const isToday = (date: Date) => {
      const todayWithoutTime = new Date(today);
      todayWithoutTime.setHours(0, 0, 0, 0);

      const dateWithoutTime = new Date(date);
      dateWithoutTime.setHours(0, 0, 0, 0);

      return dateWithoutTime.getTime() === todayWithoutTime.getTime();
    };

    // Handle date click
    const handleDateClick = (year: number, month: number, day: number) => {
      const clickedDate = new Date(year, month, day);

      if (allowSingleDateSelection) {
        // For single date selection, set both start and end to the same date
        onDateSelect({
          startDate: clickedDate,
          endDate: clickedDate,
        });
        return;
      }

      if (
        !selectedRange.startDate ||
        (selectedRange.startDate &&
          selectedRange.endDate &&
          selectedRange.startDate.getTime() !== selectedRange.endDate.getTime())
      ) {
        // Start a new range
        onDateSelect({
          startDate: clickedDate,
          endDate: clickedDate,
        });
      } else if (selectedRange.startDate) {
        // Complete the range
        if (clickedDate.getTime() < selectedRange.startDate.getTime()) {
          onDateSelect({
            startDate: clickedDate,
            endDate: selectedRange.startDate,
          });
        } else {
          onDateSelect({
            startDate: selectedRange.startDate,
            endDate: clickedDate,
          });
        }
      }
    };

    const renderMonthCalendar = (year: number, month: number) => {
      // Generate days for the month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();

      // Adjust for Sunday as first day (0-indexed)
      const days = [];
      let week = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }

      // Add days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      // Group days into weeks
      const weeks = [];

      for (let i = 0; i < days.length; i++) {
        week.push(days[i]);

        if (week.length === 7 || i === days.length - 1) {
          // Pad the last week if needed
          while (week.length < 7) {
            week.push(null);
          }

          weeks.push(week);
          week = [];
        }
      }

      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const isCurrentMonth = year === currentYear && month === currentMonth;

      return (
        <div
          key={`month-${year}-${month}`}
          className={themeConfig.euler.dateRangePicker.calendar.monthContainer}
          data-month={`${month}-${year}`}
          data-current-month={isCurrentMonth ? 'true' : 'false'}
          ref={isCurrentMonth ? currentMonthRef : null}
        >


          <div className={themeConfig.euler.dateRangePicker.calendar.dayNamesContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div 
                key={day} 
                className={cn(
                  themeConfig.euler.dateRangePicker.calendar.dayName,
                  themeConfig.euler.dateRangePicker.text.dayName
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={themeConfig.euler.dateRangePicker.calendar.monthHeader}>
            {monthNames[month]} {year}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={themeConfig.euler.dateRangePicker.calendar.weekRow}>
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return (
                    <div
                      key={dayIndex}
                      className={themeConfig.euler.dateRangePicker.calendar.emptyCell}
                    />
                  );
                }

                const date = new Date(year, month, day);
                const isRangeDay = isInRange(date);
                const isStart = isStartDate(date);
                const isEnd = isEndDate(date);
                const isTodayDay = isToday(date);

                // Apply classes based on state
                let dayClasses = cn(
                  themeConfig.euler.dateRangePicker.calendar.dayCell,
                  themeConfig.euler.dateRangePicker.calendar.hoverState
                );

                if (isStart) {
                  dayClasses = cn(dayClasses, themeConfig.euler.dateRangePicker.calendar.startDate);
                } else if (isEnd) {
                  dayClasses = cn(dayClasses, themeConfig.euler.dateRangePicker.calendar.endDate);
                } else if (isRangeDay) {
                  dayClasses = cn(dayClasses, themeConfig.euler.dateRangePicker.calendar.rangeDay);
                }

                // Add today indicator without changing the selection styling
                if (isTodayDay && !isStart && !isEnd) {
                  dayClasses = cn(dayClasses, themeConfig.euler.dateRangePicker.calendar.todayDay);
                }

                // Add disabled state for future/past dates
                if ((disableFutureDates && date > today) || 
                    (disablePastDates && date < today)) {
                  dayClasses = cn(dayClasses, 'opacity-40 cursor-not-allowed pointer-events-none');
                }

                return (
                  <div
                    key={`${year}-${month}-${day}`}
                    onClick={() => handleDateClick(year, month, day)}
                    className={dayClasses}
                  >
                    {day}
                    {isTodayDay && !isStart && !isEnd && (
                      <div className={themeConfig.euler.dateRangePicker.calendar.todayIndicator} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div ref={ref} className={themeConfig.euler.dateRangePicker.calendar.gridContainer}>
        {months.map(({ year, month }) => renderMonthCalendar(year, month))}
      </div>
    );
  }
);

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;
