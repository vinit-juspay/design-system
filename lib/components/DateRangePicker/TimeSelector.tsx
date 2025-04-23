import { forwardRef } from "react";

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
}

const TimeSelector = forwardRef<HTMLSelectElement, TimeSelectorProps>(({
  value,
  onChange
}, ref) => {
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeValue = `${formattedHour}:${formattedMinute}`;
        const displayTime = `${formattedHour}:${formattedMinute}`;
        
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
      onChange={(e) => onChange(e.target.value)}
    >
      {generateTimeOptions()}
    </select>
  );
});

TimeSelector.displayName = "TimeSelector";

export default TimeSelector; 