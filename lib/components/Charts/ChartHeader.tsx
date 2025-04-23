import { Dropdown } from "../Dropdown/Dropdown"
import { ChartHeaderProps } from "./utils"


export const ChartHeader: React.FC<ChartHeaderProps> = ({
  metrics,
  selectedMetric,
  handleMetricChange,
  slot1,
  slot2,
  slot3
}) => { 
  return (            <div className="flex items-center justify-between gap-2 py-4 px-[18px] bg-[#FCFCFD] border-b border-[#ECEFF3]">
      <div>
          {metrics.length > 0 ? (
              <Dropdown
                  options={metrics}
                  selectedOption={selectedMetric}
                  onSelect={handleMetricChange}
              />
          ) : (
              <h3 className="text-base font-semibold text-[#525866]">{selectedMetric}</h3>
          )}
      </div>
      <div className='flex items-center gap-2'>
          {slot1}
          {slot2}
          {slot3}
      </div>
  </div>)
}