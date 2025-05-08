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
  Menu,
  BarChart2,
  Type,
  Calendar as CalendarIcon,
  ListFilter,
  User as UserIcon,
  Sidebar as SidebarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button, Tag, SplitTag, Tabs, TabsList, TabsTrigger, TabsContent, ButtonGroup } from '../lib/main';
import { Snackbar } from '../lib/components/Snackbar';
import { DateRangePicker, DateRangePickerVariant } from '../lib/components/DateRangePicker';
import { ButtonType, ButtonSize, ButtonSubType } from '../lib/components/Button/types';
import { ButtonGroupSize, ButtonGroupMode } from '../lib/components/ButtonGroup/types';
import TooltipDemo from './Demos/TooltipDemos/TooltipDemo';
import AlertDemo from './Demos/AlertDemo/AlertDemo';
import ChartDemo from './Demos/ChartDemo/ChartDemo';
import ChartDemo2 from './Demos/ChartDemo2/ChartDemo2';
import FontDemo from './Demos/FontDemo/FontDemo';
import SelectorsDemo from './Demos/SelectorsDemo/SelectorsDemo';
import AvatarDemo from './Demos/AvatarDemo/AvatarDemo';
import SidebarDemo from './Demos/SidebarDemo/SidebarDemo';

const App = () => {
  const [activeComponent, setActiveComponent] = useState<
    'buttons' | 'tooltips' | 'tags' | 'tabs' | 'alerts' | 'charts' | 'chartsV2' | 'fonts' | 'datePicker' | 'selectors' | 'buttonGroups' | 'avatars' | 'sidebar'
  >('sidebar');

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChange = (newRange: any) => {
    console.log('Selected Date Range:', newRange);
    setSelectedDateRange(newRange);
  };

  // Component navigation list
  const componentNavItems = [
    { id: 'buttons', label: 'Buttons', icon: Layers },
    { id: 'buttonGroups', label: 'Button Groups', icon: ListFilter },
    { id: 'tooltips', label: 'Tooltips', icon: Info },
    { id: 'tags', label: 'Tags', icon: TagIcon },
    { id: 'tabs', label: 'Tabs', icon: Settings },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'charts', label: 'Charts', icon: BarChart2 },
    { id: 'chartsV2', label: 'Charts V2', icon: BarChart2 },
    { id: 'fonts', label: 'Fonts', icon: Type },
    { id: 'datePicker', label: 'Date Picker', icon: CalendarIcon },
    { id: 'selectors', label: 'Selectors', icon: Check },
    { id: 'avatars', label: 'Avatars', icon: UserIcon },
    { id: 'sidebar', label: 'Sidebar', icon: SidebarIcon },
  ];

  const renderComponentsNav = () => (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center mr-6">
            <span className="text-lg font-bold text-gray-900">Design System</span>
            <span className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              v1.0.0
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable component list - used for both mobile and desktop */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 flex space-x-1 whitespace-nowrap">
          {componentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveComponent(item.id as any)}
                className={`
                  inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeComponent === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Shadow indicators for scroll */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
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
            leadingIcon={Menu}
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
          <p className="text-gray-600 mb-2">Only the first non-secondary button keeps its type, others become secondary</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {renderComponentsNav()}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          {activeComponent === 'buttons' && renderButtons()}
          {activeComponent === 'buttonGroups' && renderButtonGroups()}
          {activeComponent === 'tooltips' && <TooltipDemo />}
          {activeComponent === 'tags' && renderTags()}
          {activeComponent === 'tabs' && renderTabs()}
          {activeComponent === 'alerts' && renderAlerts()}
          {activeComponent === 'charts' && <ChartDemo />}
          {activeComponent === 'chartsV2' && <ChartDemo2 />}
          {activeComponent === 'fonts' && <FontDemo />}
          {activeComponent === 'datePicker' && renderDatePicker()}
          {activeComponent === 'selectors' && <SelectorsDemo />}
          {activeComponent === 'avatars' && <AvatarDemo />}
          {activeComponent === 'sidebar' && <SidebarDemo />}
        </div>
      </div>
    </div>
  );
};

export default App;
