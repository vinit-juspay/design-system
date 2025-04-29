import { ChartHeaderProps } from './types';
import { getChartHeaderContainer, getChartSlotContainer } from './themeUtils';

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  slot1,
  slot2,
  slot3,
  chartHeaderSlot,
}) => {
  return (
    <div className={getChartHeaderContainer()}>
      <div>{chartHeaderSlot}</div>
      <div className={getChartSlotContainer()}>
        {slot1}
        {slot2}
        {slot3}
      </div>
    </div>
  );
};
