import { Calendar, Download, Filter } from 'lucide-react';
import { Button, ButtonSize, ButtonType } from '../../../lib/main';
import Charts from '../../../lib/components/Charts/Charts';
import {
  ChartLegendPosition,
  ChartType,
  NewNestedDataPoint,
} from '../../../lib/components/Charts/types';


const ChartDemo2 = () => {
  const sampleNestedData: NewNestedDataPoint[] = [
    {
      name: 'Jan',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4000 },
          aux: [{ label: 'Growth', val: 12 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 2400 },
          aux: [{ label: 'Margin', val: 24 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 15000 },
          aux: [{ label: 'Change', val: 8 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 3.2 },
          aux: [{ label: 'Change', val: 0.5 }],
        },
      },
    },
    {
      name: 'Feb',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3000 },
          aux: [{ label: 'Growth', val: -25 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 1398 },
          aux: [{ label: 'Margin', val: 19 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 13000 },
          aux: [{ label: 'Change', val: -13 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 2.8 },
          aux: [{ label: 'Change', val: -0.4 }],
        },
      },
    },
    {
      name: 'Mar',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 2000 },
          aux: [{ label: 'Growth', val: -33 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 9800 },
          aux: [{ label: 'Margin', val: 32 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 17000 },
          aux: [{ label: 'Change', val: 30 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 3.5 },
          aux: [{ label: 'Change', val: 0.7 }],
        },
      },
    },
    {
      name: 'Apr',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 2780 },
          aux: [{ label: 'Growth', val: 39 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 3908 },
          aux: [{ label: 'Margin', val: 28 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 19500 },
          aux: [{ label: 'Change', val: 15 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 4.1 },
          aux: [{ label: 'Change', val: 0.6 }],
        },
      },
    },
    {
      name: 'May',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3490 },
          aux: [{ label: 'Growth', val: 25 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 4300 },
          aux: [{ label: 'Margin', val: 31 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 21000 },
          aux: [{ label: 'Change', val: 8 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 3.9 },
          aux: [{ label: 'Change', val: -0.2 }],
        },
      },
    },
    {
      name: 'Jun',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 3200 },
          aux: [{ label: 'Growth', val: -8 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 3800 },
          aux: [{ label: 'Margin', val: 29 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 18500 },
          aux: [{ label: 'Change', val: -12 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 4.2 },
          aux: [{ label: 'Change', val: 0.3 }],
        },
      },
    },
    {
      name: 'Jul',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4100 },
          aux: [{ label: 'Growth', val: 28 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 5200 },
          aux: [{ label: 'Margin', val: 35 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 22500 },
          aux: [{ label: 'Change', val: 22 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 4.5 },
          aux: [{ label: 'Change', val: 0.3 }],
        },
      },
    },
    {
      name: 'Aug',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4800 },
          aux: [{ label: 'Growth', val: 17 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 5900 },
          aux: [{ label: 'Margin', val: 38 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 24000 },
          aux: [{ label: 'Change', val: 7 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 4.8 },
          aux: [{ label: 'Change', val: 0.3 }],
        },
      },
    },
    {
      name: 'Sep',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 5200 },
          aux: [{ label: 'Growth', val: 8 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 6100 },
          aux: [{ label: 'Margin', val: 40 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 25500 },
          aux: [{ label: 'Change', val: 6 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 5.0 },
          aux: [{ label: 'Change', val: 0.2 }],
        },
      },
    },
    {
      name: 'Oct',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 4900 },
          aux: [{ label: 'Growth', val: -6 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 5700 },
          aux: [{ label: 'Margin', val: 37 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 23000 },
          aux: [{ label: 'Change', val: -10 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 4.7 },
          aux: [{ label: 'Change', val: -0.3 }],
        },
      },
    },
    {
      name: 'Nov',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 5500 },
          aux: [{ label: 'Growth', val: 12 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 6300 },
          aux: [{ label: 'Margin', val: 42 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 26000 },
          aux: [{ label: 'Change', val: 13 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 5.2 },
          aux: [{ label: 'Change', val: 0.5 }],
        },
      },
    },
    {
      name: 'Dec',
      data: {
        revenue: {
          primary: { label: 'Total Revenue', val: 6200 },
          aux: [{ label: 'Growth', val: 13 }],
        },
        profit: {
          primary: { label: 'Net Profit', val: 7100 },
          aux: [{ label: 'Margin', val: 45 }],
        },
        traffic: {
          primary: { label: 'Website Traffic', val: 28000 },
          aux: [{ label: 'Change', val: 8 }],
        },
        conversions: {
          primary: { label: 'Conversion Rate', val: 5.5 },
          aux: [{ label: 'Change', val: 0.3 }],
        },
      },
    },
  ];

  
  return (
    <div className="flex flex-col gap-8 max-w-[900px] mx-auto">
      <Charts
        data={sampleNestedData}
        chartType={ChartType.LINE}
        chartHeaderSlot={
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">Line Chart</h2>
          </div>
        }
        slot1={
          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Calendar}
            size={ButtonSize.SMALL}
            onClick={() => {
              console.log('Calendar clicked');
            }}
          >
            Last 6 months
          </Button>
        }
        slot2={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Filter} size={ButtonSize.SMALL}>
            Filters
          </Button>
        }
        slot3={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Download} size={ButtonSize.SMALL}>
            Export
          </Button>
        }
      />

      <Charts
        data={sampleNestedData}
        chartType={ChartType.BAR}
        chartHeaderSlot={
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">Bar Chart</h2>
          </div>
        }
        slot1={
          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Calendar}
            size={ButtonSize.SMALL}
            onClick={() => {
              console.log('Calendar clicked');
            }}
          >
            Last 6 months
          </Button>
        }
        slot2={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Filter} size={ButtonSize.SMALL}>
            Filters
          </Button>
        }
        slot3={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Download} size={ButtonSize.SMALL}>
            Export
          </Button>
        }
      />

      <Charts
        data={sampleNestedData}
        chartType={ChartType.PIE}
        chartHeaderSlot={
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">Pie Chart</h2>
          </div>
        }
        slot1={
          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Calendar}
            size={ButtonSize.SMALL}
            onClick={() => {
              console.log('Calendar clicked');
            }}
          >
            Last 6 months
          </Button>
        }
        slot2={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Filter} size={ButtonSize.SMALL}>
            Filters
          </Button>
        }
        slot3={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Download} size={ButtonSize.SMALL}>
            Export
          </Button>
        }
      />
      <Charts
        data={sampleNestedData}
        legendPosition={ChartLegendPosition.RIGHT}
        chartType={ChartType.PIE}
        chartHeaderSlot={
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap truncate">
            <h2 className="text-base font-semibold ">Pie Chart with Right Legend Position</h2>
          </div>
        }
        slot1={
          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Calendar}
            size={ButtonSize.SMALL}
            onClick={() => {
              console.log('Calendar clicked');
            }}
          >
            Last 6 months
          </Button>
        }
        slot2={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Filter} size={ButtonSize.SMALL}>
            Filters
          </Button>
        }
        slot3={
          <Button buttonType={ButtonType.SECONDARY} leadingIcon={Download} size={ButtonSize.SMALL}>
            Export
          </Button>
        }
      />
    </div>
  );
};

export default ChartDemo2;
