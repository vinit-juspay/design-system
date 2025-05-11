import React, { useState } from 'react';
import { Button } from '../../../lib/main';
import { DateRangePicker, DateRangePickerVariant } from '../../../lib/components/DateRangePicker';
import { ButtonType } from '../../../lib/components/Button/types';

const DatePickerDemo = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const handleDateRangeChange = (newRange: any) => {
    console.log('Selected Date Range:', newRange);
    setSelectedDateRange(newRange);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Date Range Picker</h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Default DateRangePicker</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            placeholder="Select a date range"
            showTimePicker={true}
            showPresets={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Secondary Variant</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            variant={DateRangePickerVariant.SECONDARY}
            showTimePicker={false}
            showPresets={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">With Custom Trigger Button</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={false}
            triggerElement={<Button buttonType={ButtonType.SECONDARY}>Select Date Range</Button>}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Disable Future Dates</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            disableFutureDates={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Disable Past Dates</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            disablePastDates={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Allow Single Date Selection</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            allowSingleDateSelection={true}
          />
        </div>
      </div>
    </>
  );
};

export default DatePickerDemo; 