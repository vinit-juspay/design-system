import { useState } from 'react';
import { Activity, ArrowUpRight, BarChart2, PieChart, User } from 'lucide-react';
import { ChangeType, StatCardVariant } from '../../../lib/components/StatCard/types';
import StatCard from '../../../lib/components/StatCard/StatCard';

const StatCardDemo = () => {
  const [variant, setVariant] = useState<StatCardVariant>(StatCardVariant.NUMBER);
  const [showChange, setShowChange] = useState(true);
  const [changeType, setChangeType] = useState<ChangeType>(ChangeType.INCREASE);
  const [changeValue, setChangeValue] = useState(12.5);
  const [showIcon, setShowIcon] = useState(true);
  const [showActionIcon, setShowActionIcon] = useState(true);
  const [progressValue, setProgressValue] = useState(73);

  // Generate sample chart data
  const lineChartData = Array.from({ length: 30 }, (_, i) => ({
    value: 20 + Math.floor(Math.random() * 30),
    label: `2025-05-${i + 1}`,
  }));

  const barChartData = Array.from({ length: 20 }, (_, i) => ({
    value: 20 + Math.floor(Math.random() * 10),
    label: `2025-05-${i + 1}`,
  }));

  const renderControls = () => (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Variant</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={variant}
          onChange={e => setVariant(e.target.value as StatCardVariant)}
        >
          {Object.values(StatCardVariant).map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Change Type</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={changeType}
          onChange={e => setChangeType(e.target.value as ChangeType)}
          disabled={!showChange}
        >
          {Object.values(ChangeType).map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Change Value (%)</label>
        <input
          type="number"
          value={changeValue}
          onChange={e => setChangeValue(Number(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          disabled={!showChange}
          min={0}
          max={100}
          step={0.1}
        />
      </div>

      {variant === StatCardVariant.PROGRESS_BAR && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Progress Value (%)</label>
          <input
            type="number"
            value={progressValue}
            onChange={e => setProgressValue(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            min={0}
            max={100}
            step={1}
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showChange}
              onChange={e => setShowChange(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Change</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showIcon}
              onChange={e => setShowIcon(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Title Icon</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showActionIcon}
              onChange={e => setShowActionIcon(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Action Icon</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStatCardPreview = () => {
    const titleIcon = showIcon ? <Activity size={18} className="text-purple-500" /> : undefined;
    const actionIcon = showActionIcon ? <ArrowUpRight size={18} className="text-gray-400" /> : undefined;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Preview</h3>
        <div className="max-w-xs">
          <StatCard
            variant={variant}
            title="Active Users"
            value="2,573"
            subtitle="Last 7 days"
            change={showChange ? {
              type: changeType,
              value: changeValue
            } : undefined}
            chartData={variant === StatCardVariant.LINE || variant === StatCardVariant.BAR ? variant === StatCardVariant.LINE ? lineChartData : barChartData : undefined}
            progressValue={variant === StatCardVariant.PROGRESS_BAR ? progressValue : undefined}
            titleIcon={titleIcon}
            actionIcon={actionIcon}
          />
        </div>
      </div>
    );
  };

  const renderPresetExamples = () => (
    <div className="mt-12 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Preset Examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Number Variant</p>
          <StatCard
            variant={StatCardVariant.NUMBER}
            title="Total Revenue"
            value="45,231"
            change={{ type: ChangeType.INCREASE, value: 12.5 }}
            titleIcon={<PieChart className="text-blue-500 w-full h-full" />}
            actionIcon={<ArrowUpRight size={16} />}
            helpIconText="This is a help icon text"
          />
        </div>

        {/* <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Progress Bar Variant</p>
          <StatCard
            variant={StatCardVariant.PROGRESS_BAR}
            title="Payment Methods"
            value="13%"
            change={{ type: ChangeType.INCREASE, value: 5.2 }}
            progressValue={10}
            titleIcon={<Activity size={18} className="text-purple-500" />}
          />
        </div> */}

        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Line Chart Variant</p>
          <StatCard
            variant={StatCardVariant.LINE}
            title="Daily Active Users"
            value="2,573"
            change={{ type: ChangeType.INCREASE, value: 8.2 }}
            chartData={lineChartData}
            titleIcon={<User size={18} className="text-green-500" />}
            actionIcon={<ArrowUpRight size={18} />}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Bar Chart Variant</p>
          <StatCard
            variant={StatCardVariant.BAR}
            title="Transactions"
            value="12,543"
            change={{ type: ChangeType.DECREASE, value: 3.7 }}
            chartData={barChartData}
            titleIcon={<BarChart2 size={16} className="text-orange-500" />}
            actionIcon={<ArrowUpRight size={16} className="text-gray-400" />}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Progress Bar Variant</p>
          <StatCard
            variant={StatCardVariant.PROGRESS_BAR}
            title="Payment Methods"
            value="73%"
            change={{ type: ChangeType.INCREASE, value: 5.2 }}
            progressValue={73}
            titleIcon={<Activity size={16} className="text-purple-500" />}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Stat Card Demo</h2>
      {renderControls()}
      {renderStatCardPreview()}
      {renderPresetExamples()}
    </div>
  );
};

export default StatCardDemo; 