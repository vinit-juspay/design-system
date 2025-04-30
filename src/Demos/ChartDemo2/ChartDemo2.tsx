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
          aux: [{ label: 'Growth', val: 12 }, { label: 'GGWP', val: 32 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2400 },
          aux: [{ label: 'Margin', val: 24 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 15000 },
          aux: [{ label: 'Change', val: 8 }]
        }
      }
    },
    {
      name: 'Feb',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3000 },
          aux: [{ label: 'Growth', val: -25 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 1398 },
          aux: [{ label: 'Margin', val: 19 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 13000 },
          aux: [{ label: 'Change', val: -13 }]
        }
      }
    },
    {
      name: 'Mar',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 2000 },
          aux: [{ label: 'Growth', val: -33 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 9800 },
          aux: [{ label: 'Margin', val: 32 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 17000 },
          aux: [{ label: 'Change', val: 30 }]
        }
      }
    },
    {
      name: 'Apr',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 2800 },
          aux: [{ label: 'Growth', val: 40 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 1200 },
          aux: [{ label: 'Margin', val: 43 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 19000 },
          aux: [{ label: 'Change', val: 12 }]
        }
      }
    },
    {
      name: 'May',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3500 },
          aux: [{ label: 'Growth', val: 25 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 1800 },
          aux: [{ label: 'Margin', val: 51 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 21000 },
          aux: [{ label: 'Change', val: 10 }]
        }
      }
    },
    {
      name: 'Jun',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4200 },
          aux: [{ label: 'Growth', val: 20 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2100 },
          aux: [{ label: 'Margin', val: 50 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 23000 },
          aux: [{ label: 'Change', val: 9 }]
        }
      }
    },
    {
      name: 'Jul',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4800 },
          aux: [{ label: 'Growth', val: 14 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2500 },
          aux: [{ label: 'Margin', val: 52 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 25000 },
          aux: [{ label: 'Change', val: 8 }]
        }
      }
    },
    {
      name: 'Aug',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 5200 },
          aux: [{ label: 'Growth', val: 8 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2700 },
          aux: [{ label: 'Margin', val: 52 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 27000 },
          aux: [{ label: 'Change', val: 8 }]
        }
      }
    },
    {
      name: 'Sep',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4900 },
          aux: [{ label: 'Growth', val: -6 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2400 },
          aux: [{ label: 'Margin', val: 49 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 24000 },
          aux: [{ label: 'Change', val: -11 }]
        }
      }
    },
    {
      name: 'Oct',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 5500 },
          aux: [{ label: 'Growth', val: 12 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2900 },
          aux: [{ label: 'Margin', val: 53 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 28000 },
          aux: [{ label: 'Change', val: 17 }]
        }
      }
    },
    {
      name: 'Nov',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 6000 },
          aux: [{ label: 'Growth', val: 9 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 3200 },
          aux: [{ label: 'Margin', val: 53 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 30000 },
          aux: [{ label: 'Change', val: 7 }]
        }
      }
    },
    {
      name: 'Dec',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 7000 },
          aux: [{ label: 'Growth', val: 17 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 3800 },
          aux: [{ label: 'Margin', val: 54 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 35000 },
          aux: [{ label: 'Change', val: 17 }]
        }
      }
    },
  ];

  const pieChartData: NewNestedDataPoint[] = [
    {
      name: 'Jan',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4000 },
          aux: [{ label: 'Growth', val: 12 }, { label: 'GGWP', val: 32 }]
        },
        profit: {
          primary: { label: 'Net Profit', val: 2400 },
          aux: [{ label: 'Margin', val: 24 }]
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 15000 },
          aux: [{ label: 'Change', val: 8 }]
        }
      }
    },
  ];


  return (
    <div className='flex flex-col gap-4'>
      {/* <ChartsV2 data={sampleNestedData} chartType={ChartTypeV2.LINE} chartHeaderSlot={<div>Line Chart Demo</div>} /> */}
      {/* <ChartsV2 data={sampleNestedData} chartType={ChartTypeV2.BAR} chartHeaderSlot={<div>Bar Chart Demo</div>} /> */}
      <ChartsV2 data={pieChartData} chartType={ChartTypeV2.PIE} chartHeaderSlot={<div>Pie Chart Demo</div>} />
    </div>
  )
}

export default ChartDemo2