import { TooltipProps } from "recharts";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { getChartTooltipContainer } from "./themeUtils";

export const CustomTooltipV2 = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  /*
  Label is the xAxis value
  Payload is the data for the hovered xAxis value
  active is a boolean that indicates if the tooltip is active
  */

  console.log(active, payload, label)


  return (
    <div className={getChartTooltipContainer()}>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );

};