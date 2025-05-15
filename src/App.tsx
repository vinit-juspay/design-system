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
import { DirectoryData } from '../lib/components/Directory/types';
import Sidebar from '../lib/components/Sidebar';
import DataTableDemo from './Demos/DataTableDemo/DataTableDemo';

const App = () => {
  const [activeComponent, setActiveComponent] = useState<
    'buttons' | 'tooltipsV2' | 'tags' | 'tabs' | 'textInput' | 'alerts' | 'charts' | 'chartsV2' | 'fonts' | 'datePicker' | 'selectors' | 'buttonGroups' | 'avatars' | 'menu' | 'dropdown' | 'accordion' | 'statCard' | 'modal' | 'input' | 'snackbar' | 'dataTable'
  >('dataTable');

  const [activeTenant, setActiveTenant] = useState<string>("Juspay");
  const [activeMerchant, setActiveMerchant] = useState<string | undefined>("");


  const topbar = (
    <div className="flex items-center justify-between w-full flex-1">
      <div className=" font-bold text-gray-900">
        <div className='flex w-40 h-full outline font-400 text-body-sm outline-gray-200 rounded-md px-2 items-center gap-2'>
          <Search className="w-4 h-4" />
          <p>Search</p>
        </div>
      </div>
      <p>{activeMerchant}</p>
      <p>{activeTenant}</p>
      <p>{activeComponent}</p>

      <EyeClosed className="w-4 h-4" />
    </div>
  );

  const renderContent = () => (
    <div className="p-6">
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
          default:
            return null;
        }
      })()}
    </div>
  );

  const tenants = [{
    label: "Juspay",
    icon: <IndianRupee className="w-4 h-4" />,
    id: "juspay"
  }, {
    label: "Razorpay",
    icon: <UserIcon className="w-4 h-4" />,
    id: "razorpay"
  }]

  const merchants = [{
    label: "Design System",
    icon: <UserIcon className="w-4 h-4" />,
    id: "design-system"
  }, {
    label: "Design System 2",
    icon: <UserIcon className="w-4 h-4" />,
    id: "design-system-2"
  }]

  const sampleData: DirectoryData[] = [
    {
      label: "Basic Components",
      items: [
        {
          label: "Button",
          leftSlot: <Square className="w-4 h-4" />,
          onClick: () => setActiveComponent("buttons")
        },
        {
          label: "Button Group",
          leftSlot: <Grid className="w-4 h-4" />,
          onClick: () => setActiveComponent("buttonGroups")
        },
        {
          label: "Input",
          leftSlot: <FormInput className="w-4 h-4" />,
          onClick: () => setActiveComponent("input")
        },
        {
          label: "Tag",
          leftSlot: <TagIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent("tags")
        },
        {
          label: "Avatar",
          leftSlot: <Users className="w-4 h-4" />,
          onClick: () => setActiveComponent("avatars")
        }
      ]
    },
    {
      label: "Navigation",
      items: [
        {
          label: "Menu",
          leftSlot: <MenuIcon className="w-4 h-4" />,
          items: [
            {
              label: "Item 1",
              leftSlot: <Square className="w-4 h-4" />,
              onClick: () => setActiveComponent("menu"),
              items: [
                {
                  label: "Item 1.1",
                  leftSlot: <Square className="w-4 h-4" />,
                  onClick: () => setActiveComponent("menu"),
                  items: [
                    {
                      label: "Item 1.1.1",
                      leftSlot: <Square className="w-4 h-4" />,
                      onClick: () => setActiveComponent("menu"),
                    }
                  ]
                },

              ]
            },
            {
              label: "Item 2",
              leftSlot: <Square className="w-4 h-4" />,
            },
          ]
        },
        {
          label: "Dropdown",
          leftSlot: <ChevronDown className="w-4 h-4" />,
          onClick: () => setActiveComponent("dropdown")
        },
        {
          label: "Tabs",
          leftSlot: <Layout className="w-4 h-4" />,
          onClick: () => setActiveComponent("tabs")
        },
        {
          label: "Accordion",
          leftSlot: <List className="w-4 h-4" />,
          onClick: () => setActiveComponent("accordion")
        }
      ]
    },
    {
      label: "Feedback",
      items: [
        {
          label: "Alert",
          leftSlot: <AlertCircle className="w-4 h-4" />,
          onClick: () => setActiveComponent("alerts")
        },
        {
          label: "Snackbar",
          leftSlot: <BellIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent("snackbar")
        },
        {
          label: "Tooltip",
          leftSlot: <Info className="w-4 h-4" />,
          onClick: () => setActiveComponent("tooltipsV2")
        },
        {
          label: "Modal",
          leftSlot: <Box className="w-4 h-4" />,
          onClick: () => setActiveComponent("modal")
        }
      ]
    },
    {
      label: "Data Display",
      isCollapsible: true,
      defaultOpen: true,
      items: [
        {
          label: "Chart",
          leftSlot: <BarChart2 className="w-4 h-4" />,
          onClick: () => setActiveComponent("charts")
        },
        {
          label: "Stat Card",
          leftSlot: <FileText className="w-4 h-4" />,
          onClick: () => setActiveComponent("statCard")
        },
        {
          label: "Data Table",
          leftSlot: <Table className="w-4 h-4" />,
          onClick: () => setActiveComponent("dataTable")
        }
      ]
    },
    {
      label: "Form Elements",
      isCollapsible: true,
      defaultOpen: false,
      items: [
        {
          label: "Date Picker",
          leftSlot: <CalendarIcon className="w-4 h-4" />,
          onClick: () => setActiveComponent("datePicker")
        },
        {
          label: "Selectors",
          leftSlot: <ListFilter className="w-4 h-4" />,
          onClick: () => setActiveComponent("selectors")
        }
      ]
    },
    {
      label: "Typography",
      items: [
        {
          label: "Fonts",
          leftSlot: <Type className="w-4 h-4" />,
          onClick: () => setActiveComponent("fonts")
        }
      ]
    }
  ];

  const footer = <div className="w-full bg-gray-25 flex items-center justify-between gap-3 px-2">
    <div className='flex items-center gap-2'>
      Lorem ipsum dolor sit.
    </div>
  </div>

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
        <div className="h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-white">
          {renderContent()}
        </div>
      </Sidebar>
    </div>
  );
};

export default App;
