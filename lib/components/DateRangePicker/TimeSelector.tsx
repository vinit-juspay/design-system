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
