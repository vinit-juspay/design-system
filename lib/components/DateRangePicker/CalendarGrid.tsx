import { forwardRef } from "react";
import { cn } from "../../utils";
import { DateRange } from "./types";

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
    const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    const startYear = currentDate.getFullYear();
    const startMonth = currentDate.getMonth();
    
    for (let i = 0; i < 24; i++) {
      const year = startYear + Math.floor((startMonth + i) / 12);
      const month = (startMonth + i) % 12;
      months.push({ year, month });
    }
    
    return months;
  };
  
  const months = generateMonths();
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handleDateClick = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month, day);
    
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      onDateSelect({
        startDate: newDate,
        endDate: allowSingleDateSelection ? newDate : selectedRange.endDate || newDate
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
          weekDays.push(<div key={`empty-${week}-${i}`} className="p-2"></div>);
        } else {
          const date = new Date(year, month, day);
          const isRangeDay = isDateInRange(date);
          const isSelectedDay = isDateSelected(date);
          const isTodayDay = isToday(date);
          const isStart = isStartDate(date);
          const isEnd = isEndDate(date);
          
          weekDays.push(
            <div 
              key={`${year}-${month}-${day}`}
              onClick={() => handleDateClick(year, month, day)}
              className={cn(
                "cursor-pointer text-center p-2 relative",
                isStart && "bg-primary-500 text-gray-0 rounded-lg",
                isEnd && "bg-primary-500 text-gray-0 rounded-lg",
                isRangeDay && "bg-primary-50 text-gray-600",
                isTodayDay && !isSelectedDay && "font-medium text-blue-700",
                "hover:border hover:border-primary-300 hover:rounded-lg"
              )}
            >
              {day}
              {isTodayDay && !isSelectedDay && (
                <div className="absolute w-1 h-1 bg-blue-500 rounded-full bottom-1 left-1/2 transform -translate-x-1/2"></div>
              )}
            </div>
          );
          day++;
        }
      }
      
      calendarDays.push(
        <div key={`week-${year}-${month}-${week}`} className="grid grid-cols-7">
          {weekDays}
        </div>
      );
    }
    
    return (
      <div key={`month-${year}-${month}`} className="mb-6">
        <div className="text-lg font-medium mb-2">
          {monthNames[month]} {year}
        </div>
        
        <div className="grid grid-cols-7 text-center text-gray-500">
          {dayNames.map((day, index) => (
            <div key={index} className="p-2">{day}</div>
          ))}
        </div>
        
        <div>{calendarDays}</div>
      </div>
    );
  };
  
  return (
    <div ref={ref}>
      {months.map(({ year, month }) => renderMonthCalendar(year, month))}
    </div>
  );
});

CalendarGrid.displayName = "CalendarGrid";

export default CalendarGrid; 