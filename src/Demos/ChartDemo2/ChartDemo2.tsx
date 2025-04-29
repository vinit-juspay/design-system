import ChartsV2 from '../../../lib/components/ChartsV2/ChartsV2';
import { ChartTypeV2, NewNestedDataPoint } from '../../../lib/components/ChartsV2/types';

const ChartDemo2 = () => {

  const data: { name: string, revenue: number }[] = [{ name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 2000 }]

  const sampleNestedData: NewNestedDataPoint[] = [
    {
      name: 'Jan',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4000 },
          aux: [{ label: 'Growth', val: '+12%' }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2400 },
          aux: [{ label: 'Margin', val: '24%' }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 15000 },
          aux: [{ label: 'Change', val: '+8%' }]
        }
      }
    },
    {
      name: 'Feb',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3000 },
          aux: [{ label: 'Growth', val: '-25%' }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 1398 },
          aux: [{ label: 'Margin', val: '19%' }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 13000 },
          aux: [{ label: 'Change', val: '-13%' }]
        }
      }
    },
    {
      name: 'Mar',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 2000 },
          aux: [{ label: 'Growth', val: '-33%' }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 9800 },
          aux: [{ label: 'Margin', val: '32%' }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 17000 },
          aux: [{ label: 'Change', val: '+30%' }]
        }
      }
    },
  ];
  return (
    <div className='flex flex-col gap-4'>
      <ChartsV2 data={sampleNestedData} chartType={ChartTypeV2.LINE} chartHeaderSlot={<div>Hello</div>} />
      <ChartsV2 data={sampleNestedData} chartType={ChartTypeV2.BAR} chartHeaderSlot={<div>Hello</div>} />

    </div>
  )
}

export default ChartDemo2