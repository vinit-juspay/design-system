import { useState } from 'react';
import {
  Layers,
  Tag as TagIcon,
  Settings,
  Bell,
  Menu as MenuIcon,
  BarChart2,
  Type,
  Calendar as CalendarIcon,
  ListFilter,
  User as UserIcon,
  ChevronDown,
  Info,
  MessageSquare,
  Check,
  HelpCircle,
  Table,
} from 'lucide-react';

// Import demo components
import AlertDemo from './Demos/AlertDemo/AlertDemo';
import ChartDemo from './Demos/ChartDemo/ChartDemo';
import ChartDemo2 from './Demos/ChartDemo2/ChartDemo2';
import FontDemo from './Demos/FontDemo/FontDemo';
import SelectorsDemo from './Demos/SelectorsDemo/SelectorsDemo';
import AvatarDemo from './Demos/AvatarDemo/AvatarDemo';
import TooltipDemoV2 from './Demos/TooltipV2Demo/TooltipDemoV2';
import AccordionDemo from './Demos/AccordionDemo/AccordionDemo';
import ButtonDemo from './Demos/ButtonDemo/ButtonDemo';
import TagDemo from './Demos/TagDemo/TagDemo';
import TabsDemo from './Demos/TabsDemo/TabsDemo';
import ButtonGroupDemo from './Demos/ButtonGroupDemo/ButtonGroupDemo';
import DatePickerDemo from './Demos/DatePickerDemo/DatePickerDemo';
import MenuDemo from './Demos/MenuDemo/MenuDemo';
import DropdownDemo from './Demos/DropdownDemo/DropdownDemo';
import StatCardDemo from './Demos/StatCardDemo/StatCardDemo';
import SnackbarDemo from './Demos/SnackbarDemo/SnackbarDemo';
import ModalDemo from './Demos/ModalDemo/ModalDemo';
import InputDemo from './Demos/InputDemo/InputDemo';
import PopoverDemo from './Demos/PopoverDemo/PopoverDemo';import DataTableDemo from './Demos/DataTableDemo/DataTableDemo';

const App = () => {
  const [activeComponent, setActiveComponent] = useState<
    | 'buttons'
    | 'tooltipsV2'
    | 'tags'
    | 'tabs'
    | 'textInput'
    | 'alerts'
    | 'charts'
    | 'chartsV2'
    | 'fonts'
    | 'datePicker'
    | 'selectors'
    | 'buttonGroups'
    | 'avatars'
    | 'menu'
    | 'dropdown'
    | 'accordion'
    | 'statCard'
    | 'modal'
    | 'input'
    | 'snackbar' | 'dataTable'
    | 'popover'
  >('dataTable');

  const navigationItems = [
    { id: 'buttons', label: 'Buttons', icon: Layers },
    { id: 'buttonGroups', label: 'Button Groups', icon: ListFilter },
    { id: 'tooltipsV2', label: 'Tooltips V2', icon: Info },
    { id: 'tags', label: 'Tags', icon: TagIcon },
    { id: 'tabs', label: 'Tabs', icon: Settings },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'snackbar', label: 'Snackbar', icon: MessageSquare },
    { id: 'popover', label: 'Popover', icon: HelpCircle },
    { id: 'charts', label: 'Charts', icon: BarChart2 },
    { id: 'chartsV2', label: 'Charts V2', icon: BarChart2 },
    { id: 'fonts', label: 'Fonts', icon: Type },
    { id: 'datePicker', label: 'Date Picker', icon: CalendarIcon },
    { id: 'selectors', label: 'Selectors', icon: ChevronDown },
    { id: 'avatars', label: 'Avatars', icon: UserIcon },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'dropdown', label: 'Dropdown', icon: ChevronDown },
    { id: 'accordion', label: 'Accordion', icon: ChevronDown },
    { id: 'statCard', label: 'Stat Card', icon: BarChart2 },
    { id: 'modal', label: 'Modal', icon: Layers },
    { id: 'input', label: 'Input', icon: Check },
    { id: 'dataTable', label: 'Data Table', icon: Table },
  ];

  const renderSidebar = () => (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Design System</span>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveComponent(item.id as any)}
                className={`${activeComponent === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <Icon
                  className={`${activeComponent === item.id
                      ? 'text-blue-700'
                      : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            v1.0.0
          </span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="bg-white shadow rounded-lg p-6">
      {(() => {
        switch (activeComponent) {
          case 'buttons':
            return <ButtonDemo />;
          case 'buttonGroups':
            return <ButtonGroupDemo />;
          case 'tooltipsV2':
            return <TooltipDemoV2 />;
          case 'tags':
            return <TagDemo />;
          case 'tabs':
            return <TabsDemo />;
          case 'alerts':
            return <AlertDemo />;
          case 'snackbar':
            return <SnackbarDemo />;
          case 'popover':
            return <PopoverDemo />;
          case 'charts':
            return <ChartDemo />;
          case 'chartsV2':
            return <ChartDemo2 />;
          case 'fonts':
            return <FontDemo />;
          case 'datePicker':
            return <DatePickerDemo />;
          case 'selectors':
            return <SelectorsDemo />;
          case 'avatars':
            return <AvatarDemo />;
          case 'accordion':
            return <AccordionDemo />;
          case 'statCard':
            return <StatCardDemo />;
          case 'menu':
            return <MenuDemo />;
          case 'dropdown':
            return <DropdownDemo />;
          case 'modal':
            return <ModalDemo />;
          case 'input':
            return <InputDemo />;
          case 'dataTable':
            return <DataTableDemo />;
          default:
            return null;
        }
      })()}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSidebar()}
      <div className="pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
