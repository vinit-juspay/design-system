import { useState } from 'react';
import {
  Tag as TagIcon,
  Menu as MenuIcon,
  BarChart2,
  Type,
  Calendar as CalendarIcon,
  ListFilter,
  User as UserIcon,
  ChevronDown,
  Info,
  FormInput,
  AlertCircle,
  Bell as BellIcon,
  Square,
  Users,
  Layout,
  FileText,
  List,
  Grid,
  Box,
  Search,
  EyeClosed,
  IndianRupee,
  Table,
  Palette,
  MessageCircle,
  Globe,
} from 'lucide-react';

// Import demo components
import AlertDemo from './Demos/AlertDemo/AlertDemo';
import BaseTooltipDemo from './Demos/BaseTooltipDemo/BaseTooltipDemo';
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
import { DirectoryData } from '../lib/components/Directory/types';
import Sidebar from '../lib/components/Sidebar';
import DataTableDemo from './Demos/DataTableDemo/DataTableDemo';
import ColorPaletteDemo from './Demos/ColorPaletteDemo';
import PopoverDemo from './Demos/PopoverDemo/PopoverDemo';
import { Tag, TextInput } from '../lib/main';
import { TextInputSize } from '../lib/components/TextInput';
import { DropdownType, MenuDropdown, MenuItemType } from '../lib/components/Menu';
import { Button, ButtonType } from '../lib/components/Button';
import TesterPage from './Demos/TesterPage';

const App = () => {
  const [activeComponent, setActiveComponent] = useState<
    | 'tester-page'
    | 'buttons'
    | 'tooltipsV2'
    | 'baseTooltip'
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
    | 'snackbar'
    | 'dataTable'
    | 'colorPalette'
    | 'popover'
  >('tester-page');

  const [activeTenant, setActiveTenant] = useState<string>('Juspay');
  const [activeMerchant, setActiveMerchant] = useState<string | undefined>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia Pacific');

  const topbar = (
    <div className="flex items-center justify-between w-full flex-1">
      <div className=" font-bold text-jp-gray-900 shrink-0">
        <TextInput
          placeholder="Search"
          size={TextInputSize.MEDIUM}
          leftSlot={<Search className="w-4 h-4 text-jp-gray-600" />}
        />
      </div>
      <div className="flex items-center gap-2">
        {activeMerchant && (
          <Tag
            label={activeMerchant}
            variant="subtle"
            color="success"
            size="sm"
            tagStyle="rounded"
          />
        )}
        {activeTenant && (
          <Tag label={activeTenant} variant="subtle" color="primary" size="sm" tagStyle="rounded" />
        )}
        {activeComponent && (
          <Tag
            label={activeComponent}
            variant="subtle"
            color="success"
            size="sm"
            tagStyle="rounded"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <MenuDropdown
          selectedText={selectedTimezone}
          onSelect={item => {
            if (Array.isArray(item)) {
              setSelectedTimezone(item[0].text);
            } else {
              setSelectedTimezone(item.text);
            }
          }}
          menuItems={[
            { id: '1', text: 'Asia Pacific', menuType: MenuItemType.DEFAULT },
            { id: '2', text: 'Europe', menuType: MenuItemType.DEFAULT },
            { id: '3', text: 'America', menuType: MenuItemType.DEFAULT },
          ]}
        />
        <Button buttonType={ButtonType.SECONDARY} text="Test Mode" />
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="p-6">
      {(() => {
        switch (activeComponent) {
          case 'tester-page':
            return <TesterPage />;
          case 'buttons':
            return <ButtonDemo />;
          case 'buttonGroups':
            return <ButtonGroupDemo />;
          case 'tooltipsV2':
            return <TooltipDemoV2 />;
          case 'baseTooltip':
            return <BaseTooltipDemo />;
          case 'tags':
            return <TagDemo />;
          case 'tabs':
            return <TabsDemo />;
          case 'alerts':
            return <AlertDemo />;
          case 'snackbar':
            return <SnackbarDemo />;
          case 'charts':
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
          case 'colorPalette':
            return <ColorPaletteDemo />;
          case 'popover':
            return <PopoverDemo />;
          default:
            return null;
        }
      })()}
    </div>
  );

  const tenants = [
    {
      label: 'Juspay',
      icon: <IndianRupee className="w-4 h-4" />,
      id: 'juspay',
    },
    {
      label: 'Razorpay',
      icon: <UserIcon className="w-4 h-4" />,
      id: 'razorpay',
    },
  ];

  const merchants = [
    {
      label: 'Design System',
      icon: <UserIcon className="w-4 h-4" />,
      id: 'design-system',
    },
    {
      label: 'Design System 2',
      icon: <UserIcon className="w-4 h-4" />,
      id: 'design-system-2',
    },
  ];

  const sampleData: DirectoryData[] = [
    {
      items: [
        {
          label: 'Tester Page',
          leftSlot: <Globe className="w-4 h-4" />,
          rightSlot: (
            <Tag label="New" variant="subtle" color="primary" size="sm" tagStyle="rounded" />
          ),
          onClick: () => setActiveComponent('tester-page'),
        },
      ],
    },
    {
      label: 'Basic Components',
      items: [
        {
          label: 'Button',
          leftSlot: <Square className="w-4 h-4" />,
          onClick: () => setActiveComponent('buttons'),
        },
        {
          label: 'Button Group',
          leftSlot: <Grid className="w-4 h-4" />,
          onClick: () => setActiveComponent('buttonGroups'),
        },
        {
          label: 'Input',
          leftSlot: <FormInput className="w-4 h-4" />,
          onClick: () => setActiveComponent('input'),
        },
        {
          label: 'Tag',
          leftSlot: <TagIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent('tags'),
        },
        {
          label: 'Avatar',
          leftSlot: <Users className="w-4 h-4" />,
          onClick: () => setActiveComponent('avatars'),
        },
      ],
    },
    {
      label: 'Navigation',
      items: [
        {
          label: 'Menu',
          leftSlot: <MenuIcon className="w-4 h-4" />,
          rightSlot: (
            <Tag label="Nested" variant="subtle" color="purple" size="sm" tagStyle="rounded" />
          ),
          items: [
            {
              label: 'Item 1',
              leftSlot: <Square className="w-4 h-4" />,
              rightSlot: (
                <Tag label="Nested" variant="subtle" color="purple" size="sm" tagStyle="rounded" />
              ),
              onClick: () => setActiveComponent('menu'),
              items: [
                {
                  label: 'Item 1.1',
                  leftSlot: <Square className="w-4 h-4" />,
                  onClick: () => setActiveComponent('menu'),
                  items: [
                    {
                      label: 'Item 1.1.1',
                      leftSlot: <Square className="w-4 h-4" />,
                      onClick: () => setActiveComponent('menu'),
                    },
                  ],
                },
              ],
            },
            {
              label: 'Item 2',
              leftSlot: <Square className="w-4 h-4" />,
            },
          ],
        },
        {
          label: 'Dropdown',
          leftSlot: <ChevronDown className="w-4 h-4" />,
          onClick: () => setActiveComponent('dropdown'),
        },
        {
          label: 'Tabs',
          leftSlot: <Layout className="w-4 h-4" />,
          onClick: () => setActiveComponent('tabs'),
        },
        {
          label: 'Accordion',
          leftSlot: <List className="w-4 h-4" />,
          onClick: () => setActiveComponent('accordion'),
        },
      ],
    },
    {
      label: 'Feedback',
      items: [
        {
          label: 'Alert',
          leftSlot: <AlertCircle className="w-4 h-4" />,
          onClick: () => setActiveComponent('alerts'),
        },
        {
          label: 'Snackbar',
          leftSlot: <BellIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent('snackbar'),
        },
        {
          label: 'Tooltip V2',
          leftSlot: <Info className="w-4 h-4" />,
          onClick: () => setActiveComponent('tooltipsV2'),
        },
        {
          label: 'Base Tooltip',
          leftSlot: <Info className="w-4 h-4" />,
          onClick: () => setActiveComponent('baseTooltip'),
        },
        {
          label: 'Modal',
          leftSlot: <Box className="w-4 h-4" />,
          onClick: () => setActiveComponent('modal'),
        },
        {
          label: 'Popover',
          leftSlot: <MessageCircle className="w-4 h-4" />,
          onClick: () => setActiveComponent('popover'),
        },
      ],
    },
    {
      label: 'Data Display',
      isCollapsible: true,
      defaultOpen: true,
      items: [
        {
          label: 'Chart',
          leftSlot: <BarChart2 className="w-4 h-4" />,
          rightSlot: (
            <Tag label="New" variant="subtle" color="primary" size="sm" tagStyle="rounded" />
          ),
          onClick: () => setActiveComponent('charts'),
        },
        {
          label: 'Stat Card',
          leftSlot: <FileText className="w-4 h-4" />,
          onClick: () => setActiveComponent('statCard'),
        },
        {
          label: 'Data Table',
          leftSlot: <Table className="w-4 h-4" />,
          onClick: () => setActiveComponent('dataTable'),
        },
      ],
    },
    {
      label: 'Form Elements',
      isCollapsible: true,
      defaultOpen: false,
      items: [
        {
          label: 'Date Picker',
          leftSlot: <CalendarIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent('datePicker'),
        },
        {
          label: 'Selectors',
          leftSlot: <ListFilter className="w-4 h-4" />,
          onClick: () => setActiveComponent('selectors'),
        },
      ],
    },
    {
      label: 'Typography',
      items: [
        {
          label: 'Fonts',
          leftSlot: <Type className="w-4 h-4" />,
          onClick: () => setActiveComponent('fonts'),
        },
      ],
    },
    {
      label: 'Design System',
      items: [
        {
          label: 'Color Palette',
          leftSlot: <Palette className="w-4 h-4" />,
          onClick: () => setActiveComponent('colorPalette'),
        },
      ],
    },
  ];

  const footer = (
    <div className="w-full bg-jp-gray-25 flex items-center justify-between gap-3 px-2">
      <div className="flex items-center gap-2">Lorem ipsum dolor sit.</div>
    </div>
  );

  return (
    <div className="h-screen ">
      <Sidebar
        tenants={tenants}
        merchants={merchants}
        data={sampleData}
        topbar={topbar}
        activeTenant={activeTenant}
        setActiveTenant={setActiveTenant}
        activeMerchant={activeMerchant}
        setActiveMerchant={setActiveMerchant}
        footer={footer}
      >
        <div className="h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-jp-gray-0">
          {renderContent()}
        </div>
      </Sidebar>
    </div>
  );
};

export default App;
