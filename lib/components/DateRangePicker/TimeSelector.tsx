import { forwardRef } from 'react';

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
}

const TimeSelector = forwardRef<HTMLSelectElement, TimeSelectorProps>(
  ({ value, onChange }, ref) => {
    // Convert 24h format to 12h format for display
    const formatTimeFor12Hour = (hour: number, minute: number): string => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedHour = displayHour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${period}`;
    };

    // Parse 12h display format back to 24h value format
    const parseTimeFrom12Hour = (timeStr: string): string => {
      const [timePart, period] = timeStr.split(' ');
      const [hourStr, minuteStr] = timePart.split(':');

      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (period === 'PM' && hour < 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }

      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const displayTime = formatTimeFor12Hour(hour, minute);

          options.push(
            <option key={timeValue} value={timeValue}>
              {displayTime}
            </option>
          );
        }
      }
      return options;
    };

    // Convert the current value to 12h format for display
    const get12HourDisplayValue = (value: string): string => {
      const [hourStr, minuteStr] = value.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      return formatTimeFor12Hour(hour, minute);
    };

    return (
      <select
        ref={ref}
        className="border border-gray-300 rounded-md px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {generateTimeOptions()}
      </select>
    );
  }
);

TimeSelector.displayName = 'TimeSelector';

export default TimeSelector;
