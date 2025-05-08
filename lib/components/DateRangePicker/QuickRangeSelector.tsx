import { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils';
import { DateRangePreset } from './types';
import { getPresetLabel } from './utils';
import { themeConfig } from '../../themeConfig';

interface QuickRangeSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  activePreset: DateRangePreset;
  onPresetSelect: (preset: DateRangePreset) => void;
  excludeCustom?: boolean;
  className?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
  (
    {
      isOpen,
      onToggle,
      activePreset,
      onPresetSelect,
      excludeCustom = false,
      className,
      disableFutureDates = false,
      disablePastDates = false,
    },
    ref
  ) => {
    const activePresetLabel = getPresetLabel(activePreset);

    const getFilteredPresets = () => {
      const pastPresets = [
        DateRangePreset.YESTERDAY,
        DateRangePreset.LAST_1_HOUR,
        DateRangePreset.LAST_6_HOURS,
        DateRangePreset.LAST_7_DAYS,
      ];

      const futurePresets: DateRangePreset[] = [];

      let availablePresets = Object.values(DateRangePreset);

      if (disablePastDates) {
        availablePresets = availablePresets.filter(preset => !pastPresets.includes(preset));
      }

      if (disableFutureDates) {
        availablePresets = availablePresets.filter(preset => !futurePresets.includes(preset));
      }

      if (excludeCustom) {
        availablePresets = availablePresets.filter(preset => preset !== DateRangePreset.CUSTOM);
      }

      return availablePresets;
    };

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        <div
          className={cn(
            'h-10 border border-gray-300 rounded-l-lg py-2.5 px-3 flex justify-between items-center cursor-pointer w-full',
            'hover:border-gray-400 transition-colors duration-200'
          )}
          onClick={onToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center justify-between w-full text-gray-600">
            <span className={cn(themeConfig.euler.dateRangePicker.text.value)}>
              {activePresetLabel}
            </span>
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5 ml-2 text-gray-600" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-2 text-gray-600" />
            )}
          </div>
        </div>

        {isOpen && (
          <div
            className={cn(
              'absolute z-20 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-full',
              'max-h-60 overflow-y-auto'
            )}
            role="listbox"
            aria-labelledby="date-range-preset-selector"
          >
            <div className="p-1">
              {getFilteredPresets().map(preset => (
                <button
                  key={preset}
                  onClick={() => {
                    onPresetSelect(preset);
                    onToggle();
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150',
                    'focus:outline-none focus:bg-gray-50',
                    themeConfig.euler.dateRangePicker.text.value,
                    activePreset === preset && 'bg-primary-50 text-primary-700 font-medium'
                  )}
                  role="option"
                  aria-selected={activePreset === preset}
                >
                  {getPresetLabel(preset)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

QuickRangeSelector.displayName = 'QuickRangeSelector';

export default QuickRangeSelector;
