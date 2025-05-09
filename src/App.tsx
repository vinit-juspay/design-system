import { useState } from 'react';
import {
  Search,
  Plus,
  ArrowRight,
  Trash2,
  Check,
  Info,
  AlertCircle,
  HelpCircle,
  Layers,
  Tag as TagIcon,
  Settings,
  User,
  Lock,
  Home,
  Bell,
  Menu as MenuIcon,
  BarChart2,
  Type,
  Calendar as CalendarIcon,
  ListFilter,
  User as UserIcon,
  ChevronDown,
} from 'lucide-react';
import {
  Button,
  Tag,
  SplitTag,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ButtonGroup,
} from '../lib/main';
import { Snackbar } from '../lib/components/Snackbar';
import { DateRangePicker, DateRangePickerVariant } from '../lib/components/DateRangePicker';
import { ButtonType, ButtonSize, ButtonSubType } from '../lib/components/Button/types';
import { ButtonGroupSize, ButtonGroupMode } from '../lib/components/ButtonGroup/types';
import { Menu, MenuType, MenuItemType, MenuItemAction, MenuDropdown, DropdownType, DropdownSize, DropdownSubType, DropdownSelectionType } from '../lib/components/Menuv2';
import AlertDemo from './Demos/AlertDemo/AlertDemo';
import ChartDemo from './Demos/ChartDemo/ChartDemo';
import ChartDemo2 from './Demos/ChartDemo2/ChartDemo2';
import FontDemo from './Demos/FontDemo/FontDemo';
import SelectorsDemo from './Demos/SelectorsDemo/SelectorsDemo';
import AvatarDemo from './Demos/AvatarDemo/AvatarDemo';
import TooltipDemoV2 from './Demos/TooltipV2Demo/TooltipDemoV2';
import AccordionDemo from './Demos/AccordionDemo/AccordionDemo';
import StatCardDemo from './Demos/StatCardDemo';

const App = () => {
  const [activeComponent, setActiveComponent] = useState<
    'buttons' | 'tooltipsV2' | 'tags' | 'tabs' | 'alerts' | 'charts' | 'chartsV2' | 'fonts' | 'datePicker' | 'selectors' | 'buttonGroups' | 'avatars' | 'menu' | 'dropdown' | 'accordion' | 'statCard'
  >('buttons');

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  
  const handleDateRangeChange = (newRange: any) => {
    console.log('Selected Date Range:', newRange);
    setSelectedDateRange(newRange);
  };

  const navigationItems = [
    { id: 'buttons', label: 'Buttons', icon: Layers },
    { id: 'buttonGroups', label: 'Button Groups', icon: ListFilter },
    { id: 'tooltips', label: 'Tooltips', icon: Info },
    { id: 'tooltipsV2', label: 'Tooltips V2', icon: Info },
    { id: 'tags', label: 'Tags', icon: TagIcon },
    { id: 'tabs', label: 'Tabs', icon: Settings },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'charts', label: 'Charts', icon: BarChart2 },
    { id: 'chartsV2', label: 'Charts V2', icon: BarChart2 },
    { id: 'fonts', label: 'Fonts', icon: Type },
    { id: 'datePicker', label: 'Date Picker', icon: CalendarIcon },
    { id: 'selectors', label: 'Selectors', icon: Check },
    { id: 'avatars', label: 'Avatars', icon: UserIcon },
    { id: 'menu', label: 'Menu V2', icon: MenuIcon },
    { id: 'dropdown', label: 'Dropdown V2', icon: ChevronDown },
    { id: 'accordion', label: 'Accordion', icon: ChevronDown },
    { id: 'statCard', label: 'Stat Card', icon: BarChart2 },
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
                className={`${
                  activeComponent === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <Icon
                  className={`${
                    activeComponent === item.id
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

  const renderButtons = () => (
    <>
      <h2 className="text-2xl font-semibold">Button Examples</h2>
      <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Types</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY}>Primary Button</Button>
          <Button buttonType={ButtonType.SECONDARY}>Secondary Button</Button>
          <Button buttonType={ButtonType.DANGER}>Danger Button</Button>
          <Button buttonType={ButtonType.SUCCESS}>Success Button</Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.SMALL}>
            Small Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.MEDIUM}>
            Medium Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.LARGE}>
            Large Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} onClick={() => console.log('Button clicked!')}>
            Click Me
          </Button>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} leadingIcon={Search}>
            Search
          </Button>
          <Button buttonType={ButtonType.PRIMARY} trailingIcon={ArrowRight}>
            Next
          </Button>
          <Button buttonType={ButtonType.PRIMARY} leadingIcon={Search} trailingIcon={ArrowRight}>
            Search & Go
          </Button>
        </div>
      </div>

      {/* Icon Only Buttons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Icon Only Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            buttonType={ButtonType.PRIMARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Plus}
            aria-label="Add item"
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Search}
            aria-label="Search"
          />
          <Button
            buttonType={ButtonType.DANGER}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Trash2}
            aria-label="Delete"
          />
          <Button
            buttonType={ButtonType.SUCCESS}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Check}
            aria-label="Approve"
          />
        </div>
      </div>

      {/* Link Buttons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Link Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} subType={ButtonSubType.LINK}>
            Primary Link
          </Button>
          <Button buttonType={ButtonType.SECONDARY} subType={ButtonSubType.LINK}>
            Secondary Link
          </Button>
          <Button buttonType={ButtonType.DANGER} subType={ButtonSubType.LINK}>
            Danger Link
          </Button>
          <Button buttonType={ButtonType.SUCCESS} subType={ButtonSubType.LINK}>
            Success Link
          </Button>
        </div>
      </div>

      {/* Button States */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} isLoading={true}>
            Loading
          </Button>
          <Button buttonType={ButtonType.PRIMARY} isDisabled={true}>
            Disabled
          </Button>
        </div>
      </div>

      {/* Accessibility Examples */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Accessibility Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            buttonType={ButtonType.SECONDARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={MenuIcon}
            ariaLabel="Open menu"
            ariaExpanded={false}
            ariaControls="main-menu"
            ariaHasPopup="menu"
          />

          <Button buttonType={ButtonType.PRIMARY} ariaPressed={true}>
            Selected Option
          </Button>

          <Button buttonType={ButtonType.PRIMARY} ariaPressed={false}>
            Unselected Option
          </Button>

          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Settings}
            ariaControls="settings-panel"
            ariaExpanded={false}
          >
            Settings
          </Button>
        </div>
      </div>
    </>
  );

  const renderTags = () => (
    <>
      <h2 className="text-2xl font-semibold">Tag Examples</h2>

      {/* Basic Tag Examples */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Tags</h3>
        <div className="flex flex-wrap gap-4">
          <Tag label="Default" />
          <Tag variant="attentive" label="Attentive" />
          <Tag variant="subtle" label="Subtle" />
          <Tag color="primary" label="Primary" />
          <Tag color="success" label="Success" />
          <Tag color="error" label="Error" />
          <Tag color="warning" label="Warning" />
          <Tag color="purple" label="Purple" />
        </div>
      </div>

      {/* Tag Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tag Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Tag size="xs" label="Extra Small" />
          <Tag size="sm" label="Small" />
          <Tag size="md" label="Medium" />
          <Tag size="lg" label="Large" />
        </div>
      </div>

      {/* Tag Styles */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tag Styles</h3>
        <div className="flex flex-wrap gap-4">
          <Tag tagStyle="squarical" label="Squarical" />
          <Tag tagStyle="rounded" label="Rounded" />
        </div>
      </div>

      {/* Tags with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tags with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Tag label="Leading Icon" leadingSlot={<Info size={16} />} />
          <Tag label="Trailing Icon" trailingSlot={<Check size={16} />} />
          <Tag
            label="Both Icons"
            leadingSlot={<AlertCircle size={16} />}
            trailingSlot={<ArrowRight size={16} />}
          />
        </div>
      </div>

      {/* Split Tags */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Split Tags</h3>
        <div className="flex flex-wrap gap-4">
          <SplitTag leftLabel="2" rightLabel="New" />
          <SplitTag leftLabel="5" rightLabel="Pending" color="warning" />
          <SplitTag leftLabel="10" rightLabel="Completed" color="success" />
          <SplitTag leftLabel="3" rightLabel="Failed" color="error" />
          <SplitTag leftLabel="Key" rightLabel="Value" color="primary" tagStyle="squarical" />
        </div>
      </div>
    </>
  );

  const renderTabs = () => (
    <>
      <h2 className="text-2xl font-semibold">Tabs Examples</h2>

      {/* Underline Tabs */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Underline Tabs</h3>
        <Tabs defaultValue="account" className="w-full">
          <TabsList variant="underline">
            <TabsTrigger value="account" leftSlot={<User size={16} />}>
              Account
            </TabsTrigger>
            <TabsTrigger value="password" leftSlot={<Lock size={16} />}>
              Password
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <p className="text-gray-600 mt-2">Manage your account preferences here.</p>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Password Settings</h3>
              <p className="text-gray-600 mt-2">Change your password and security settings.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">General Settings</h3>
              <p className="text-gray-600 mt-2">Configure your application preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Boxed Tabs */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Boxed Tabs</h3>
        <Tabs defaultValue="home" variant="boxed" className="w-full">
          <TabsList variant="boxed">
            <TabsTrigger value="home" variant="boxed" leftSlot={<Home size={16} />}>
              Home
            </TabsTrigger>
            <TabsTrigger value="account" variant="boxed" leftSlot={<User size={16} />}>
              Account
            </TabsTrigger>
            <TabsTrigger value="settings" variant="boxed" rightSlot={<Settings size={16} />}>
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Home Dashboard</h3>
              <p className="text-gray-600 mt-2">Welcome to your dashboard.</p>
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <p className="text-gray-600 mt-2">Manage your account preferences here.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">General Settings</h3>
              <p className="text-gray-600 mt-2">Configure your application preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Tabs */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Floating Tabs</h3>
        <Tabs defaultValue="profile" variant="floating" className="w-full">
          <TabsList variant="floating">
            <TabsTrigger value="profile" variant="floating" leftSlot={<User size={16} />}>
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              variant="floating"
              leftSlot={<AlertCircle size={16} />}
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="help" variant="floating" leftSlot={<HelpCircle size={16} />}>
              Help
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">User Profile</h3>
              <p className="text-gray-600 mt-2">View and edit your profile information.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Notification Settings</h3>
              <p className="text-gray-600 mt-2">Manage your notification preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="help">
            <div className="p-4 rounded-md border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold">Help Center</h3>
              <p className="text-gray-600 mt-2">Find answers to common questions.</p>
            </div>
          </TabsContent>
        </Tabs>

        <Snackbar
          type="success"
          heading="Info Heading"
          message="This is body message of the information bar. This text is going to a run a bit longer."
          alertMessage="Alert Message "
          position="topRight"
          autoClose={false}
        />
        <Snackbar
          type="success"
          heading="Info Heading"
          message="This is body message of the information bar. This text is going to a run a bit longer."
          alertMessage="Alert Message "
          position="topRight"
          autoClose={false}
        />
        <Snackbar
          type="error"
          heading="Info Heading"
          message="This is body message of the information bar. This text is going to a run a bit longer."
          alertMessage="Alert Message "
          position="bottomRight"
          autoClose={true}
        />
      </div>
    </>
  );

  const renderButtonGroups = () => (
    <>
      <h2 className="text-2xl font-semibold">Button Group Examples</h2>

      {/* Basic Button Groups */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Button Groups</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 4" />
          </ButtonGroup>
        </div>
      </div>

      {/* Non-Stacked Button Groups */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Non-Stacked Button Groups</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={false}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={false}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
          </ButtonGroup>
        </div>
      </div>

      {/* Button Group Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Group Sizes</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.SMALL}>
            <Button buttonType={ButtonType.PRIMARY} text="Small 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Small 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Small 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Medium 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Medium 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Medium 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.LARGE}>
            <Button buttonType={ButtonType.PRIMARY} text="Large 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Large 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Large 3" />
          </ButtonGroup>
        </div>
      </div>

      {/* Button Type Control Modes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Type Control Modes</h3>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Single Primary Mode (Default)</h4>
          <p className="text-gray-600 mb-2">
            Only the first non-secondary button keeps its type, others become secondary
          </p>
          <ButtonGroup mode={ButtonGroupMode.SINGLE_PRIMARY}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary (kept)" />
            <Button buttonType={ButtonType.DANGER} text="Now Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Now Secondary" />
          </ButtonGroup>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">No Transform Mode</h4>
          <p className="text-gray-600 mb-2">Each button keeps its original button type</p>
          <ButtonGroup mode={ButtonGroupMode.NO_TRANSFORM}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
          </ButtonGroup>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">All Secondary Mode</h4>
          <p className="text-gray-600 mb-2">Forces all buttons to be secondary type</p>
          <ButtonGroup mode={ButtonGroupMode.ALL_SECONDARY}>
            <Button buttonType={ButtonType.PRIMARY} text="Now Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Now Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Now Secondary" />
          </ButtonGroup>
        </div>
      </div>

      {/* Mixed Button Types */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Mixed Button Types</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={true}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
          </ButtonGroup>
        </div>
      </div>
    </>
  );

  const renderAlerts = () => <AlertDemo />;

  const renderDatePicker = () => (
    <>
      <h2 className="text-2xl font-semibold">Date Range Picker</h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Default DateRangePicker</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            placeholder="Select a date range"
            showTimePicker={true}
            showPresets={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Secondary Variant</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            variant={DateRangePickerVariant.SECONDARY}
            showTimePicker={false}
            showPresets={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">With Custom Trigger Button</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={false}
            triggerElement={<Button buttonType={ButtonType.SECONDARY}>Select Date Range</Button>}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Disable Future Dates</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            disableFutureDates={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Disable Past Dates</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            disablePastDates={true}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Allow Single Date Selection</h3>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            showTimePicker={true}
            showPresets={true}
            allowSingleDateSelection={true}
          />
        </div>
      </div>
    </>
  );

  const renderMenu = () => (
    <>
      <h2 className="text-2xl font-semibold">Menu V2 Examples</h2>

      {/* Basic Menu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Menu</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.DEFAULT,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Settings',
              type: MenuItemType.DEFAULT,
              slotL: <Settings size={16} />,
            },
            {
              id: '3',
              text: 'Help',
              type: MenuItemType.DEFAULT,
              slotL: <HelpCircle size={16} />,
            },
          ]}
        />
      </div>

      {/* Menu with Submenu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Submenu</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.SUBMENU,
              slotL: <User size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '1-1',
                  text: 'View Profile',
                  type: MenuItemType.DEFAULT,
                  slotL: <User size={16} />,
                },
                {
                  id: '1-2',
                  text: 'Edit Profile',
                  type: MenuItemType.SUBMENU,
                  slotL: <Settings size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '1-2-1',
                      text: 'Personal Info',
                      type: MenuItemType.DEFAULT,
                      slotL: <User size={16} />,
                    },
                    {
                      id: '1-2-2',
                      text: 'Preferences',
                      type: MenuItemType.DEFAULT,
                      slotL: <Settings size={16} />,
                    },
                    {
                      id: '1-2-3',
                      text: 'Security',
                      type: MenuItemType.DEFAULT,
                      slotL: <Lock size={16} />,
                    },
                  ],
                },
                {
                  id: '1-3',
                  text: 'Account Settings',
                  type: MenuItemType.SUBMENU,
                  slotL: <Lock size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '1-3-1',
                      text: 'Billing',
                      type: MenuItemType.DEFAULT,
                      slotL: <TagIcon size={16} />,
                    },
                    {
                      id: '1-3-2',
                      text: 'Subscription',
                      type: MenuItemType.DEFAULT,
                      slotL: <Layers size={16} />,
                    },
                    {
                      id: '1-3-3',
                      text: 'API Keys',
                      type: MenuItemType.DEFAULT,
                      slotL: <Lock size={16} />,
                    },
                  ],
                },
              ],
            },
            {
              id: '2',
              text: 'Notifications',
              type: MenuItemType.SUBMENU,
              slotL: <Bell size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '2-1',
                  text: 'All Notifications',
                  type: MenuItemType.DEFAULT,
                  slotL: <Bell size={16} />,
                },
                {
                  id: '2-2',
                  text: 'Unread',
                  type: MenuItemType.SUBMENU,
                  slotL: <AlertCircle size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '2-2-1',
                      text: 'High Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '2-2-2',
                      text: 'Medium Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '2-2-3',
                      text: 'Low Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '2-3',
                  text: 'Settings',
                  type: MenuItemType.SUBMENU,
                  slotL: <Settings size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '2-3-1',
                      text: 'Email Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                    {
                      id: '2-3-2',
                      text: 'Push Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                    {
                      id: '2-3-3',
                      text: 'SMS Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                  ],
                },
              ],
            },
            {
              id: '3',
              text: 'Help & Support',
              type: MenuItemType.SUBMENU,
              slotL: <HelpCircle size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '3-1',
                  text: 'Documentation',
                  type: MenuItemType.SUBMENU,
                  slotL: <Type size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '3-1-1',
                      text: 'Getting Started',
                      type: MenuItemType.DEFAULT,
                      slotL: <Home size={16} />,
                    },
                    {
                      id: '3-1-2',
                      text: 'API Reference',
                      type: MenuItemType.DEFAULT,
                      slotL: <Type size={16} />,
                    },
                    {
                      id: '3-1-3',
                      text: 'Tutorials',
                      type: MenuItemType.DEFAULT,
                      slotL: <HelpCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '3-2',
                  text: 'Contact Support',
                  type: MenuItemType.SUBMENU,
                  slotL: <AlertCircle size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '3-2-1',
                      text: 'Email Support',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '3-2-2',
                      text: 'Live Chat',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '3-2-3',
                      text: 'Phone Support',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '3-3',
                  text: 'FAQ',
                  type: MenuItemType.DEFAULT,
                  slotL: <HelpCircle size={16} />,
                },
              ],
            },
          ]}
        />
      </div>

      {/* Multi-select Menu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Multi-select Menu</h3>
        <Menu
          type={MenuType.MULTI_SELECT}
          items={[
            {
              id: '1',
              text: 'Option 1',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
            {
              id: '2',
              text: 'Option 2',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
            {
              id: '3',
              text: 'Option 3',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
          ]}
        />
      </div>

      {/* Menu with Search */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Search</h3>
        <Menu
          hasSearch={true}
          searchPlaceholder="Search items..."
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.DEFAULT,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Settings',
              type: MenuItemType.DEFAULT,
              slotL: <Settings size={16} />,
            },
            {
              id: '3',
              text: 'Help',
              type: MenuItemType.DEFAULT,
              slotL: <HelpCircle size={16} />,
            },
          ]}
        />
      </div>

      {/* Menu with Actions */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Actions</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Edit Profile',
              type: MenuItemType.ACTION,
              action: MenuItemAction.PRIMARY,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Delete Account',
              type: MenuItemType.ACTION,
              action: MenuItemAction.DANGER,
              slotL: <Trash2 size={16} />,
            },
          ]}
        />
      </div>
    </>
  );

  const renderDropdown = () => (
    <>
      <h2 className="text-2xl font-semibold">Dropdown V2 Examples</h2>

      {/* Dropdown Types */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Dropdown Types</h3>
        
        {/* Single Select */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">1. Single Select Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default (HAS_CONTAINER)</p>
              <MenuDropdown 
                type={DropdownType.SINGLE_SELECT}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                  { id: '3', text: 'Option 3', type: MenuItemType.DEFAULT },
                ]}
                hasLabel={true}
                label="Single Select"
                hasHint={true}
                hint="Select one option"
                placeholder="Select an option"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown 
                type={DropdownType.SINGLE_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                  { id: '3', text: 'Option 3', type: MenuItemType.DEFAULT },
                ]}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
        
        {/* Icon Only */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">2. Icon Only Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default (HAS_CONTAINER)</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                menuItems={[
                  { id: '1', text: 'Profile', type: MenuItemType.DEFAULT, slotL: <User size={16} /> },
                  { id: '2', text: 'Settings', type: MenuItemType.DEFAULT, slotL: <Settings size={16} /> },
                  { id: '3', text: 'Help', type: MenuItemType.DEFAULT, slotL: <HelpCircle size={16} /> },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                hasLabel={true}
                label="Icon Only"
                hasHint={true}
                hint="Click icon to open"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Profile', type: MenuItemType.DEFAULT, slotL: <User size={16} /> },
                  { id: '2', text: 'Settings', type: MenuItemType.DEFAULT, slotL: <Settings size={16} /> },
                  { id: '3', text: 'Help', type: MenuItemType.DEFAULT, slotL: <HelpCircle size={16} /> },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
              />
            </div>
          </div>
        </div>
        
        {/* Multi Select */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">3. Multi Select Dropdown</h4>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Count Display (HAS_CONTAINER)</p>
              <MenuDropdown 
                type={DropdownType.MULTI_SELECT}
                selectionType={DropdownSelectionType.COUNT}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', type: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', type: MenuItemType.MULTI_SELECT },
                ]}
                hasLabel={true}
                label="Multi Select (Count)"
                hasHint={true}
                hint="Select multiple options"
                placeholder="Select options"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Text Display (HAS_CONTAINER)</p>
              <MenuDropdown 
                type={DropdownType.MULTI_SELECT}
                selectionType={DropdownSelectionType.TEXT}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', type: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', type: MenuItemType.MULTI_SELECT },
                ]}
                hasLabel={true}
                label="Multi Select (Text)"
                hasHint={true}
                hint="Select multiple options"
                placeholder="Select options"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER Variant</p>
              <MenuDropdown 
                type={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', type: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', type: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="Select options"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">NO_CONTAINER with Text Display</p>
              <MenuDropdown 
                type={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                selectionType={DropdownSelectionType.TEXT}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', type: MenuItemType.MULTI_SELECT },
                  { id: '3', text: 'Option 3', type: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="Text display"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Subtypes */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Dropdown Subtypes</h3>
        
        {/* HAS_CONTAINER */}
        <div className="mt-6 pb-6 border-b border-gray-200">
          <h4 className="text-lg font-medium mb-4">1. HAS_CONTAINER Subtype</h4>
          <p className="text-gray-600 mb-4">Shows label, sublabel, and hint text</p>
          
          <div className="flex flex-col space-y-4">
            <MenuDropdown 
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="Regular Label"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Basic label"
            />
            
            <MenuDropdown 
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="With Sublabel"
              hasSubLabel={true}
              subLabel="(optional)"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Label and sublabel"
            />
            
            <MenuDropdown 
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="With Hint"
              hasHint={true}
              hint="This is a helpful hint text"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Label and hint"
            />
            
            <MenuDropdown 
              subType={DropdownSubType.HAS_CONTAINER}
              hasLabel={true}
              label="Required Field"
              mandatory={true}
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="With required indicator"
            />
          </div>
        </div>
        
        {/* NO_CONTAINER */}
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-4">2. NO_CONTAINER Subtype</h4>
          <p className="text-gray-600 mb-4">Standalone dropdown with no labels, hints, or borders</p>
          
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Single Select</p>
              <MenuDropdown 
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                ]}
                placeholder="No container dropdown"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Multi Select</p>
              <MenuDropdown 
                type={DropdownType.MULTI_SELECT}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.MULTI_SELECT },
                  { id: '2', text: 'Option 2', type: MenuItemType.MULTI_SELECT },
                ]}
                placeholder="No container multiselect"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Icon Only</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                subType={DropdownSubType.NO_CONTAINER}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT, slotL: <User size={16} /> },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT, slotL: <Settings size={16} /> },
                ]}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Sizes */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Dropdown Sizes</h3>
        <div className="flex flex-wrap gap-6 items-end">
          <div>
            <p className="text-sm text-gray-600 mb-2">Small (sm)</p>
            <MenuDropdown 
              size={DropdownSize.SMALL}
              hasLabel={true}
              label="Small Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Small"
            />
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Medium (md)</p>
            <MenuDropdown 
              size={DropdownSize.MEDIUM}
              hasLabel={true}
              label="Medium Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Medium"
            />
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Large (lg)</p>
            <MenuDropdown 
              size={DropdownSize.LARGE}
              hasLabel={true}
              label="Large Dropdown"
              menuItems={[
                { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
              ]}
              placeholder="Large"
            />
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Icon Size Comparison</h4>
          <div className="flex flex-wrap gap-6 items-end">
            <div>
              <p className="text-sm text-gray-600 mb-2">Small (sm)</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                size={DropdownSize.SMALL}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                ]}
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Medium (md)</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                size={DropdownSize.MEDIUM}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                ]}
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Large (lg)</p>
              <MenuDropdown 
                type={DropdownType.ICON_ONLY}
                size={DropdownSize.LARGE}
                hasLeftIcon={true}
                leftIcon={<User size={16} />}
                menuItems={[
                  { id: '1', text: 'Option 1', type: MenuItemType.DEFAULT },
                  { id: '2', text: 'Option 2', type: MenuItemType.DEFAULT },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => (
    <div className="bg-white shadow rounded-lg p-6">
      {(() => {
        switch (activeComponent) {
          case 'buttons':
        return renderButtons();
      case 'buttonGroups':
        return renderButtonGroups();
      case 'tooltipsV2':
        return <TooltipDemoV2 />;
      case 'tags':
        return renderTags();
      case 'tabs':
        return renderTabs();
      case 'alerts':
        return renderAlerts();
      case 'charts':
        return <ChartDemo />;
      case 'chartsV2':
        return <ChartDemo2 />;
      case 'fonts':
        return <FontDemo />;
      case 'datePicker':
        return renderDatePicker();
      case 'selectors':
        return <SelectorsDemo />;
      case 'avatars':
        return <AvatarDemo />;
      case 'accordion':
          return <AccordionDemo />;
      case 'statCard':
          return <StatCardDemo />;
          case 'menu':
            return renderMenu();
          case 'dropdown':
            return renderDropdown();
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
        {' '}
        {/* Add left padding to account for sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
