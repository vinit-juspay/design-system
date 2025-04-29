
import { getChartHeaderContainer, getChartSlotContainer } from './themeUtils';
import { ChartHeaderPropsV2 } from './types';

export const ChartHeaderV2: React.FC<ChartHeaderPropsV2> = ({
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
