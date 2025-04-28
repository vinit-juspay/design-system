import { forwardRef } from "react";
import { DateRange } from "./types";
import { getCalendarGridClassNames } from "./utils";
import { themeConfig } from "../../themeConfig";

interface CalendarGridProps {
  selectedRange: DateRange;
  onDateSelect: (range: DateRange) => void;
  today: Date;
  allowSingleDateSelection?: boolean;
}

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(({
  selectedRange,
  onDateSelect,
  today,
  allowSingleDateSelection = false
}, ref) => {
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
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Calendar utility functions
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 7 : day; // Convert Sunday (0) to 7 for Monday-based week
  };
  
  // Date selection handlers
  const handleDateClick = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month, day);
    
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      onDateSelect({
        startDate: newDate,
        endDate: newDate
      });
    } else {
      if (allowSingleDateSelection) {
        onDateSelect({
          startDate: newDate,
          endDate: newDate
        });
        return;
      }
      
      if (newDate < selectedRange.startDate) {
        onDateSelect({
          startDate: newDate,
          endDate: selectedRange.startDate
        });
      } else {
        onDateSelect({
          startDate: selectedRange.startDate,
          endDate: newDate
        });
      }
    }
  };
  
  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false;
    return date > selectedRange.startDate && date < selectedRange.endDate;
  };
  
  const isDateSelected = (date: Date) => {
    if (!selectedRange.startDate) return false;
    
    if (selectedRange.endDate) {
      return (
        date.getTime() === selectedRange.startDate.getTime() || 
        date.getTime() === selectedRange.endDate.getTime()
      );
    }
    
    return date.getTime() === selectedRange.startDate.getTime();
  };
  
  const isStartDate = (date: Date) => {
    if (!selectedRange.startDate) return false;
    return date.getTime() === selectedRange.startDate.getTime();
  };
  
  const isEndDate = (date: Date) => {
    if (!selectedRange.endDate) return false;
    return date.getTime() === selectedRange.endDate.getTime();
  };
  
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const renderMonthCalendar = (year: number, month: number) => {
    const days = daysInMonth(year, month);
    const firstDay = startOfMonth(year, month) || 7; // Adjust for Monday start (0 => 7)
    const adjustedFirstDay = firstDay === 1 ? 7 : firstDay - 1; // Convert Sunday (1) to 7
    const weeks = Math.ceil((days + adjustedFirstDay - 1) / 7);
    
    let calendarDays = [];
    let day = 1;
    
    for (let week = 0; week < weeks; week++) {
      let weekDays = [];
      
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < adjustedFirstDay - 1) || day > days) {
          weekDays.push(<div key={`empty-${week}-${i}`} className={themeConfig.euler.dateRangePicker.calendar.emptyCell}></div>);
        } else {
          const date = new Date(year, month, day);
          const isRangeDay = isDateInRange(date);
          const isSelectedDay = isDateSelected(date);
          const isTodayDay = isToday(date);
          const isStart = isStartDate(date);
          const isEnd = isEndDate(date);
          
          const dayClasses = getCalendarGridClassNames(isStart, isEnd, isRangeDay, isTodayDay, isSelectedDay);
          
          weekDays.push(
            <div 
              key={`${year}-${month}-${day}`}
              onClick={() => handleDateClick(year, month, day)}
              className={dayClasses}
            >
              {day}
              {isTodayDay && !isSelectedDay && (
                <div className={themeConfig.euler.dateRangePicker.calendar.todayIndicator}></div>
              )}
            </div>
          );
          day++;
        }
      }
      
      calendarDays.push(
        <div key={`week-${year}-${month}-${week}`} className={themeConfig.euler.dateRangePicker.calendar.weekRow}>
          {weekDays}
        </div>
      );
    }
    
    return (
      <div key={`month-${year}-${month}`} className={themeConfig.euler.dateRangePicker.calendar.monthContainer}>
        <div className={themeConfig.euler.dateRangePicker.calendar.monthHeader}>
          {monthNames[month]} {year}
        </div>
        
        <div className={themeConfig.euler.dateRangePicker.calendar.dayNamesContainer}>
          {dayNames.map((day, index) => (
            <div key={index} className={themeConfig.euler.dateRangePicker.calendar.dayName}>{day}</div>
          ))}
        </div>
        
        <div>{calendarDays}</div>
      </div>
    );
  };
  
  return (
    <div ref={ref} className={themeConfig.euler.dateRangePicker.calendar.gridContainer}>
      {months.map(({ year, month }) => renderMonthCalendar(year, month))}
    </div>
  );
});

CalendarGrid.displayName = "CalendarGrid";

export default CalendarGrid; 