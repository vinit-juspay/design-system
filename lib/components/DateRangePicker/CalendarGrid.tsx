import { forwardRef, useEffect, useRef } from 'react';
import { DateRange } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { getCalendarDayClassNames } from './utils';

interface CalendarGridProps {
  selectedRange: DateRange;
  onDateSelect: (range: DateRange) => void;
  today: Date;
  allowSingleDateSelection?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  (
    {
      selectedRange,
      onDateSelect,
      today,
      allowSingleDateSelection = false,
      disableFutureDates,
      disablePastDates,
    },
    ref
  ) => {
    const currentMonthRef = useRef<HTMLDivElement>(null);

    // Scroll to current month when component mounts
    useEffect(() => {
      if (currentMonthRef.current) {
        currentMonthRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, []);

    // Generate months to display - from Jan 2012 to 5 years in the future
    const months = [];
    const startYear = 2012;
    const startMonth = 0;
    const currentDate = new Date();
    const endYear = currentDate.getFullYear() + 5;

    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startMonth : 0;
      const monthEnd = year === endYear ? 11 : 11; // Show all months for years in between

      for (let month = monthStart; month <= monthEnd; month++) {
        months.push({ month, year });
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

    const isStartDate = (date: Date): boolean => {
      if (!selectedRange.startDate) return false;
      return (
        date.getDate() === selectedRange.startDate.getDate() &&
        date.getMonth() === selectedRange.startDate.getMonth() &&
        date.getFullYear() === selectedRange.startDate.getFullYear()
      );
    };

    const isEndDate = (date: Date): boolean => {
      if (!selectedRange.endDate) return false;
      return (
        date.getDate() === selectedRange.endDate.getDate() &&
        date.getMonth() === selectedRange.endDate.getMonth() &&
        date.getFullYear() === selectedRange.endDate.getFullYear()
      );
    };

    const isInRange = (date: Date): boolean => {
      if (!selectedRange.startDate || !selectedRange.endDate) return false;
      return date > selectedRange.startDate && date < selectedRange.endDate;
    };

    const isToday = (date: Date): boolean => {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const handleDateClick = (year: number, month: number, day: number) => {
      const clickedDate = new Date(year, month, day);

      // Don't allow selecting disabled dates
      if (
        (disableFutureDates && clickedDate > today) ||
        (disablePastDates && clickedDate < today)
      ) {
        return;
      }

      let newRange: DateRange;

      if (!selectedRange.startDate || allowSingleDateSelection) {
        // If no start date is selected or single date selection is allowed, set both start and end to the clicked date
        newRange = {
          startDate: clickedDate,
          endDate: clickedDate,
        };
      } else if (!selectedRange.endDate || clickedDate < selectedRange.startDate) {
        // If no end date is selected or clicked date is before start date, set clicked date as start date
        newRange = {
          startDate: clickedDate,
          endDate: selectedRange.endDate || clickedDate,
        };
      } else {
        // Otherwise, set clicked date as end date
        newRange = {
          startDate: selectedRange.startDate,
          endDate: clickedDate,
        };
      }

      onDateSelect(newRange);
    };

    const renderMonthCalendar = (year: number, month: number) => {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();

      let firstDayOfWeek = firstDayOfMonth.getDay();
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

      // Create a 2D array for the calendar grid
      const weeks = [];
      let week = Array(7).fill(null);
      let dayCounter = 1;

      // Fill in the first week with empty cells before the first day
      for (let i = firstDayOfWeek; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++;
      }
      weeks.push(week);

      // Fill in the remaining weeks
      while (dayCounter <= daysInMonth) {
        week = Array(7).fill(null);
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
          week[i] = dayCounter++;
        }
        weeks.push(week);
      }

      const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

      return (
        <div
          key={`month-${year}-${month}`}
          className={themeConfig.euler.dateRangePicker.calendar.monthContainer}
          data-month={`${month}-${year}`}
          data-current-month={isCurrentMonth ? 'true' : 'false'}
          ref={isCurrentMonth ? currentMonthRef : null}
        >
          <div className={themeConfig.euler.dateRangePicker.calendar.monthHeader}>
            {monthNames[month]} {year}
          </div>

          <div className={themeConfig.euler.dateRangePicker.calendar.dayNamesContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
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
                const isSingleDate = isStart && isEnd;
                const isDisabled = Boolean(
                  (disableFutureDates && date > today) || (disablePastDates && date < today)
                );

                // Get classes from the utility function
                const { dayClasses, textColorClass } = getCalendarDayClassNames({
                  isStart,
                  isEnd,
                  isRangeDay,
                  isTodayDay,
                  isSingleDate,
                  isDisabled,
                });

                return (
                  <div
                    key={`${year}-${month}-${day}`}
                    onClick={() => handleDateClick(year, month, day)}
                    className={cn(
                      dayClasses, 
                      textColorClass,
                      !isStart && !isEnd && !isRangeDay && isTodayDay ? 'text-primary-500' : 
                      !isStart && !isEnd ? 'text-gray-600' : ''
                    )}
                  >
                    {day}
                    {isTodayDay && !isStart && !isEnd && !isRangeDay && (
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
