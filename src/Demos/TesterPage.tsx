import { Calendar, Filter, ListFilter } from 'lucide-react';
import { Button, Dropdown, Tabs, TabsContent, TabsList, TabsTrigger, Tag } from '../../lib/main';
import { ButtonSize, ButtonType } from '../../lib/components/Button';
import { MenuItemType, DropdownType, MenuDropdown } from '../../lib/components/Menu';
import { useState } from 'react';
import StatCard from '../../lib/components/StatCard';
import { StatCardVariant, ChangeType } from '../../lib/components/StatCard/types';
import {
  Activity,
  BarChart2,
  PieChart,
  User,
  ArrowUpRight,
  List,
  HelpCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import ChartDemo from './ChartDemo/ChartDemo';
import ChartDemo2 from './ChartDemo2/ChartDemo2';

const TesterPage = () => {
  // State management for each dropdown
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedCompare, setSelectedCompare] = useState<string>('Compare With');
  const [selectedTransaction, setSelectedTransaction] = useState<string>('Transactions');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Menu items for each dropdown
  const dateMenuItems = [
    { id: 'today', text: 'Today', menuType: MenuItemType.DEFAULT },
    { id: 'yesterday', text: 'Yesterday', menuType: MenuItemType.DEFAULT },
    { id: 'last7days', text: 'Last 7 Days', menuType: MenuItemType.DEFAULT },
    { id: 'last30days', text: 'Last 30 Days', menuType: MenuItemType.DEFAULT },
    { id: 'custom', text: 'Custom Range', menuType: MenuItemType.DEFAULT },
  ];

  const compareMenuItems = [
    { id: 'previous', text: 'Previous Period', menuType: MenuItemType.DEFAULT },
    { id: 'lastYear', text: 'Same Period Last Year', menuType: MenuItemType.DEFAULT },
    { id: 'custom', text: 'Custom Period', menuType: MenuItemType.DEFAULT },
  ];

  const transactionMenuItems = [
    { id: 'all', text: 'All Transactions', menuType: MenuItemType.DEFAULT },
    { id: 'successful', text: 'Successful', menuType: MenuItemType.DEFAULT },
    { id: 'failed', text: 'Failed', menuType: MenuItemType.DEFAULT },
    { id: 'pending', text: 'Pending', menuType: MenuItemType.DEFAULT },
  ];

  const filterMenuItems = [
    { id: 'amount', text: 'Amount Range', menuType: MenuItemType.MULTI_SELECT },
    { id: 'status', text: 'Status', menuType: MenuItemType.MULTI_SELECT },
    { id: 'paymentMethod', text: 'Payment Method', menuType: MenuItemType.MULTI_SELECT },
    { id: 'merchant', text: 'Merchant', menuType: MenuItemType.MULTI_SELECT },
  ];

  // Generate sample chart data
  const lineChartData = Array.from({ length: 10 }, (_, i) => ({
    value: 20 + Math.floor(Math.random() * 30),
    label: `2025-05-${i + 1}`,
  }));

  const barChartData = Array.from({ length: 10 }, (_, i) => ({
    value: 20 + Math.floor(Math.random() * 10),
    label: `2025-05-${i + 1}`,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-jp-heading-md font-jp-600 text-jp-gray-800">Transaction Analytics</h2>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Dropdown
            selectedText={selectedDate}
            leftIcon={<Calendar className="w-4 h-4 text-jp-gray-600" />}
            hasLeftIcon={true}
            onSelect={item => {
              if (!Array.isArray(item)) {
                setSelectedDate(item.text);
              }
            }}
            menuItems={dateMenuItems}
          />
          <Dropdown
            selectedText={selectedCompare}
            onSelect={item => {
              if (!Array.isArray(item)) {
                setSelectedCompare(item.text);
              }
            }}
            menuItems={compareMenuItems}
          />
          <Dropdown
            selectedText={selectedTransaction}
            onSelect={item => {
              if (!Array.isArray(item)) {
                setSelectedTransaction(item.text);
              }
            }}
            menuItems={transactionMenuItems}
          />
          <MenuDropdown
            selectedText="Filters"
            leftIcon={<ListFilter className="w-4 h-4 text-jp-gray-600" />}
            hasLeftIcon={true}
            dropdownType={DropdownType.MULTI_SELECT}
            onSelect={items => {
              if (Array.isArray(items)) {
                setSelectedFilters(items.map(item => item.text));
              }
            }}
            menuItems={filterMenuItems}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          variant={StatCardVariant.LINE}
          title="Transaction Success Rate"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<BarChart2 className="text-jp-gray-400" size={16} />}
          helpIconText="Percentage of successful transactions."
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="Success Transaction"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<TrendingUp className="text-jp-green-500" size={16} />}
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="Average Ticket Size"
          value="83.24%"
          change={{ type: ChangeType.DECREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<PieChart className="text-jp-gray-400" size={16} />}
          actionIcon={<ArrowUpRight size={18} />}
        />
        <StatCard
          variant={StatCardVariant.PROGRESS_BAR}
          title="Authorization Rate"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          progressValue={73}
          titleIcon={<List className="text-jp-blue-500" size={16} />}
          subtitle="UPI"
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="Transaction Success Rate"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<BarChart2 className="text-jp-gray-400" size={16} />}
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="Average Latency"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData.map(d => ({ ...d, value: d.value - 10 }))}
          titleIcon={<Activity className="text-jp-gray-400" size={16}     />}
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="Conflicted Transaction Rate"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<TrendingDown className="text-jp-gray-400" size={16} />}
          className="border-2 border-jp-violet-400"
        />
        <StatCard
          variant={StatCardVariant.LINE}
          title="TP 50 Latency"
          value="83.24%"
          change={{ type: ChangeType.INCREASE, value: 23.45 }}
          chartData={lineChartData}
          titleIcon={<User className="text-jp-gray-400 w-4 h-4" size={16} />}
        />
      </div>

      <div>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Merchant ID</TabsTrigger>
            <TabsTrigger value="tab2">Payment Gateway</TabsTrigger>
            <TabsTrigger value="tab3">Payment Method</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className=' py-6'>
              <ChartDemo2 className='!max-w-[1500px]'/>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Payment Gateway</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Payment Method</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TesterPage;
