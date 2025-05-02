import { Chart } from '../../../lib/components/Charts/Charts';
import { Calendar, Download, Filter } from 'lucide-react';
import { Button } from '../../../lib/components/Button';
import { ButtonType, ButtonSize } from '../../../lib/components/Button/types';

import { useRef } from 'react';
import { ChartLegendPosition } from '../../../lib/components/Charts/types';
import { ChartType } from '../../../lib/components/Charts/types';

const ChartDemo = () => {
  const condensedLineChartData = [
    {
      name: 'Jan', // xAxis value
      revenue: {
        primary: { name: 'Total Revenue', val: 4000 },
        aux: [{ name: 'Growth', val: '+12%' }],
      },
      profit: {
        primary: { name: 'Net Profit', val: 2400 },
        aux: [{ name: 'Margin', val: '24%' }],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 15000 },
        aux: [{ name: 'Change', val: '+8%' }],
      },
    },
    {
      name: 'Feb',
      revenue: {
        primary: { name: 'Total Revenue', val: 3000 },
        aux: [{ name: 'Growth', val: '-25%' }],
      },
      profit: {
        primary: { name: 'Net Profit', val: 1398 },
        aux: [{ name: 'Margin', val: '19%' }],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 13000 },
        aux: [{ name: 'Change', val: '-13%' }],
      },
    },
    {
      name: 'Mar',
      revenue: {
        primary: { name: 'Total Revenue', val: 2000 },
        aux: [{ name: 'Growth', val: '-33%' }],
      },
      profit: {
        primary: { name: 'Net Profit', val: 9800 },
        aux: [{ name: 'Margin', val: '32%' }],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 17000 },
        aux: [{ name: 'Change', val: '+30%' }],
      },
    },
  ];

  const lineChartData = [
    {
      name: 'Jan',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 4000 },
        aux: [
          { name: 'Growth', val: '+12%' },
          { name: 'YoY Change', val: '+$450' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 2400 },
        aux: [
          { name: 'Margin', val: '24%' },
          { name: 'YoY Change', val: '+$200' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 1600 },
        aux: [
          { name: 'Change', val: '+5%' },
          { name: 'YoY Change', val: '+$80' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 1200 },
        aux: [
          { name: 'Efficiency', val: '80%' },
          { name: 'YoY Change', val: '-$100' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 45 },
        aux: [
          { name: 'Change', val: '-10%' },
          { name: 'New Customers', val: 320 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 76 },
        aux: [
          { name: 'QoQ Change', val: '+2%' },
          { name: 'Churn Rate', val: '24%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 6.2 },
        aux: [
          { name: 'Change', val: '+0.5%' },
          { name: 'Leads', val: 500 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 15000 },
        aux: [
          { name: 'Change', val: '+8%' },
          { name: 'New Visitors', val: 4200 },
        ],
      },
    },
    {
      name: 'Feb',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 3000 },
        aux: [
          { name: 'Growth', val: '-25%' },
          { name: 'YoY Change', val: '-$1000' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 1398 },
        aux: [
          { name: 'Margin', val: '19%' },
          { name: 'YoY Change', val: '-$1002' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 1602 },
        aux: [
          { name: 'Change', val: '-8%' },
          { name: 'YoY Change', val: '-$400' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 1100 },
        aux: [
          { name: 'Efficiency', val: '75%' },
          { name: 'YoY Change', val: '-$150' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 55 },
        aux: [
          { name: 'Change', val: '+22%' },
          { name: 'New Customers', val: 250 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 72 },
        aux: [
          { name: 'QoQ Change', val: '-4%' },
          { name: 'Churn Rate', val: '28%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 5.8 },
        aux: [
          { name: 'Change', val: '-0.4%' },
          { name: 'Leads', val: 460 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 13000 },
        aux: [
          { name: 'Change', val: '-13%' },
          { name: 'New Visitors', val: 3700 },
        ],
      },
    },
    {
      name: 'Mar',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 2000 },
        aux: [
          { name: 'Growth', val: '-33%' },
          { name: 'YoY Change', val: '-$1000' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 9800 },
        aux: [
          { name: 'Margin', val: '32%' },
          { name: 'YoY Change', val: '+$8402' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 1200 },
        aux: [
          { name: 'Change', val: '-10%' },
          { name: 'YoY Change', val: '-$200' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 1000 },
        aux: [
          { name: 'Efficiency', val: '90%' },
          { name: 'YoY Change', val: '-$50' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 48 },
        aux: [
          { name: 'Change', val: '-5%' },
          { name: 'New Customers', val: 400 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 80 },
        aux: [
          { name: 'QoQ Change', val: '+8%' },
          { name: 'Churn Rate', val: '20%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 6.5 },
        aux: [
          { name: 'Change', val: '+0.3%' },
          { name: 'Leads', val: 520 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 17000 },
        aux: [
          { name: 'Change', val: '+30%' },
          { name: 'New Visitors', val: 4800 },
        ],
      },
    },
    {
      name: 'Apr',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 2780 },
        aux: [
          { name: 'Growth', val: '+39%' },
          { name: 'YoY Change', val: '+$780' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 3908 },
        aux: [
          { name: 'Margin', val: '28%' },
          { name: 'YoY Change', val: '-$5892' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 2100 },
        aux: [
          { name: 'Change', val: '+18%' },
          { name: 'YoY Change', val: '+$600' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 1600 },
        aux: [
          { name: 'Efficiency', val: '70%' },
          { name: 'YoY Change', val: '+$300' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 52 },
        aux: [
          { name: 'Change', val: '+9%' },
          { name: 'New Customers', val: 310 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 78 },
        aux: [
          { name: 'QoQ Change', val: '-1%' },
          { name: 'Churn Rate', val: '22%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 5.9 },
        aux: [
          { name: 'Change', val: '-0.2%' },
          { name: 'Leads', val: 490 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 14000 },
        aux: [
          { name: 'Change', val: '-17%' },
          { name: 'New Visitors', val: 4000 },
        ],
      },
    },
    {
      name: 'May',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 1890 },
        aux: [
          { name: 'Growth', val: '-32%' },
          { name: 'YoY Change', val: '-$890' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 4800 },
        aux: [
          { name: 'Margin', val: '35%' },
          { name: 'YoY Change', val: '+$892' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 1200 },
        aux: [
          { name: 'Change', val: '-7%' },
          { name: 'YoY Change', val: '-$400' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 950 },
        aux: [
          { name: 'Efficiency', val: '85%' },
          { name: 'YoY Change', val: '-$150' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 40 },
        aux: [
          { name: 'Change', val: '-12%' },
          { name: 'New Customers', val: 500 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 82 },
        aux: [
          { name: 'QoQ Change', val: '+4%' },
          { name: 'Churn Rate', val: '18%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 6.8 },
        aux: [
          { name: 'Change', val: '+0.6%' },
          { name: 'Leads', val: 550 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 18000 },
        aux: [
          { name: 'Change', val: '+28%' },
          { name: 'New Visitors', val: 5000 },
        ],
      },
    },
    {
      name: 'Jun',
      'revenue 7.4%': {
        primary: { name: 'Total Revenue', val: 2390 },
        aux: [
          { name: 'Growth', val: '+26%' },
          { name: 'YoY Change', val: '+$500' },
        ],
      },
      profit: {
        primary: { name: 'Net Profit', val: 3800 },
        aux: [
          { name: 'Margin', val: '29%' },
          { name: 'YoY Change', val: '-$1000' },
        ],
      },
      expenses: {
        primary: { name: 'Total Expenses', val: 1700 },
        aux: [
          { name: 'Change', val: '+4%' },
          { name: 'YoY Change', val: '+$200' },
        ],
      },
      operatingCost: {
        primary: { name: 'Operating Cost', val: 1400 },
        aux: [
          { name: 'Efficiency', val: '77%' },
          { name: 'YoY Change', val: '+$100' },
        ],
      },
      customerAcquisition: {
        primary: { name: 'CAC', val: 46 },
        aux: [
          { name: 'Change', val: '+6%' },
          { name: 'New Customers', val: 360 },
        ],
      },
      retentionRate: {
        primary: { name: 'Retention Rate', val: 75 },
        aux: [
          { name: 'QoQ Change', val: '-3%' },
          { name: 'Churn Rate', val: '25%' },
        ],
      },
      conversionRate: {
        primary: { name: 'Conversion Rate', val: 6.0 },
        aux: [
          { name: 'Change', val: '-0.1%' },
          { name: 'Leads', val: 480 },
        ],
      },
      traffic: {
        primary: { name: 'Website Traffic', val: 16000 },
        aux: [
          { name: 'Change', val: '-11%' },
          { name: 'New Visitors', val: 4300 },
        ],
      },
    },
  ];

  const pieChartData = [
    {
      name: 'Q1',
      mobile: {
        primary: { name: 'Mobile Revenue', val: 4000 },
        aux: [
          { name: 'Users', val: '15K' },
          { name: 'Growth', val: '+12%' },
        ],
      },
      web: {
        primary: { name: 'Web Revenue', val: 3000 },
        aux: [
          { name: 'Users', val: '10K' },
          { name: 'Growth', val: '+8%' },
        ],
      },
      desktop: {
        primary: { name: 'Desktop Revenue', val: 2000 },
        aux: [
          { name: 'Users', val: '5K' },
          { name: 'Growth', val: '+5%' },
        ],
      },
      tablet: {
        primary: { name: 'Tablet Revenue', val: 2000 },
        aux: [
          { name: 'Users', val: '5K' },
          { name: 'Growth', val: '+5%' },
        ],
      },
    },
  ];

  const metrics = ['Revenue Analysis', 'Profit Overview', 'Platform Distribution'];

  const lineChartContainerRef = useRef<HTMLDivElement>(null!);
  const barChartContainerRef = useRef<HTMLDivElement>(null!);
  const pieChartContainerRef = useRef<HTMLDivElement>(null!);
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full p-4" ref={lineChartContainerRef}>
        <Chart
          type={ChartType.LINE}
          chartHeaderSlot={
            <div className="flex items-center gap-2">
              <Button
                buttonType={ButtonType.SECONDARY}
                leadingIcon={Calendar}
                size={ButtonSize.SMALL}
              >
                Last 6 months
              </Button>
            </div>
          }
          data={lineChartData}
          height={400}
          xAxisLabel="Month"
          yAxisLabel="Amount ($)"
          metrics={metrics}
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
            <Button
              buttonType={ButtonType.SECONDARY}
              leadingIcon={Download}
              size={ButtonSize.SMALL}
            >
              Export
            </Button>
          }
        />
      </div>

      {/* <div className="w-full mt-7" ref={barChartContainerRef}>
        <Chart
          chartHeaderSlot={
            <div className="flex items-center gap-2">
              <Button
                buttonType={ButtonType.SECONDARY}
                leadingIcon={Calendar}
                size={ButtonSize.SMALL}
              >
                Last 6 months
              </Button>
            </div>
          }
          type={ChartType.BAR}
          data={condensedLineChartData}
          height={400}
          xAxisLabel="Month"
          yAxisLabel="Amount ($)"
          metrics={metrics}
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
            <Button
              buttonType={ButtonType.SECONDARY}
              leadingIcon={Download}
              size={ButtonSize.SMALL}
            >
              Export
            </Button>
          }
        />
        <div className="w-full mt-7" ref={pieChartContainerRef}>
          <Chart
            chartHeaderSlot={
              <div className="flex items-center gap-2">
                <Button
                  buttonType={ButtonType.SECONDARY}
                  leadingIcon={Calendar}
                  size={ButtonSize.SMALL}
                >
                  Last 6 months
                </Button>
              </div>
            }
            type={ChartType.PIE}
            data={pieChartData}
            height={400}
            metrics={metrics}
            legendPosition={ChartLegendPosition.RIGHT}
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
              <Button
                buttonType={ButtonType.SECONDARY}
                leadingIcon={Filter}
                size={ButtonSize.SMALL}
              >
                Filters
              </Button>
            }
            slot3={
              <Button
                buttonType={ButtonType.SECONDARY}
                leadingIcon={Download}
                size={ButtonSize.SMALL}
              >
                Export
              </Button>
            }
          />
        </div>
      </div> */}
    </div>
  );
};

export default ChartDemo;
