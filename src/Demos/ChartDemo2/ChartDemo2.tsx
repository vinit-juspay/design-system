import ChartsV2 from '../../../lib/components/ChartsV2/ChartsV2';
import { NestedDataPoint } from '../../../lib/components/ChartsV2/types';

const ChartDemo2 = () => {
 
  const data: {name: string, revenue: number}[] = [{name: 'Jan', revenue: 4000}, {name: 'Feb', revenue: 3000}, {name: 'Mar', revenue: 2000}]

  const sampleNestedData: NestedDataPoint[] = [
    {
      name: 'January',
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
      name: 'February',
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
      name: 'March',
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
    }
  ];
  return (
    <div>
      <ChartsV2 data={sampleNestedData} />
    </div>
  )
}

export default ChartDemo2