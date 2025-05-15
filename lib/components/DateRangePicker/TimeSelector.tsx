import { forwardRef } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../utils';

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
}

const TimeSelector = forwardRef<HTMLDivElement, TimeSelectorProps>(({ value, onChange }, ref) => {
  // Convert 24h format to 12h format for display
  const formatTimeFor12Hour = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedHour = displayHour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  // Parse the current value
  const [hour, minute] = value.split(':').map(Number);
  const displayTime = formatTimeFor12Hour(hour, minute);

  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const timeValue = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        const display = formatTimeFor12Hour(h, m);

        options.push(
          <DropdownMenu.Item
            key={timeValue}
            className={cn(
              'px-3 py-2 text-jp-body-sm outline-none cursor-pointer rounded-jp-md',
              'hover:bg-jp-gray-100 focus:bg-jp-gray-100',
              value === timeValue && 'bg-jp-primary-50 text-jp-primary-700 font-jp-500'
            )}
            onClick={() => onChange(timeValue)}
          >
            {display}
          </DropdownMenu.Item>
        );
      }
    }
    return options;
  };

  return (
    <div ref={ref}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="border border-jp-gray-300 rounded-jp-lg px-3 py-2 flex items-center gap-2 hover:border-jp-gray-400 focus:outline-none whitespace-nowrap"
            aria-label="Select time"
          >
            <span className="text-jp-gray-700">{displayTime}</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-jp-gray-0 rounded-md shadow-lg border border-jp-gray-200 p-1 max-h-60 overflow-y-auto z-50"
            sideOffset={5}
          >
            {generateTimeOptions()}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
});

TimeSelector.displayName = 'TimeSelector';

export default TimeSelector;
