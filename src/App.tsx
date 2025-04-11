import { Search, Plus, ArrowRight, Trash2, Check, Info, AlertCircle, HelpCircle, Copy, Settings, User, LogOut, UserPlus, Mail, MoreHorizontal, Pencil, Clipboard, CreditCard, Users, FileText, Globe, Bell, Send, Save, Square } from "lucide-react";
import { Button, Tooltip, Menu, Checkbox } from "../lib/main";
import { useState } from "react";

const App = () => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(['push', 'email']);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [marketingPreference, setMarketingPreference] = useState(false);
  
  return (
    <div className="p-4 space-y-8 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-semibold">Button Examples</h2>
      <div className="flex gap-4">
        <Button buttonType="primary" size="md">Primary Button</Button>
        <Button buttonType="secondary" size="md">Secondary Button</Button>
        <Button buttonType="danger" size="md">Danger Button</Button>
        <Button buttonType="success" size="md">Success Button</Button>
      </div>

      <div className="flex gap-4">
        <Button 
          buttonType="primary" 
          size="md"
          leadingIcon={Search}
          trailingIcon={ArrowRight}
        >
          Search
        </Button>
        <Button 
          buttonType="danger" 
          size="md"
          leadingIcon={Trash2}
        >
          Delete
        </Button>
        <Button 
          buttonType="success" 
          size="md"
          leadingIcon={Check}
        >
          Confirm
        </Button>
      </div>

      <div className="flex gap-4">
        <Button 
          buttonType="primary" 
          size="md"
          subType="iconOnly"
          leadingIcon={Plus}
          aria-label="Add item"
        />
        <Button 
          buttonType="secondary" 
          size="md"
          subType="iconOnly"
          leadingIcon={Search}
          aria-label="Search"
        />
      </div>

      <div className="flex gap-4">
        <Button 
          buttonType="primary" 
          size="md"
          subType="link"
        >
          Learn more
        </Button>
        <Button 
          buttonType="secondary" 
          size="md"
          subType="link"
        >
          View details
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Button buttonType="primary" size="sm">Small</Button>
        <Button buttonType="primary" size="md">Medium</Button>
        <Button buttonType="primary" size="lg">Large</Button>
      </div>

      <div className="flex gap-4">
        <Button buttonType="primary" size="md" isLoading>
          Loading
        </Button>
        <Button 
          buttonType="primary" 
          size="md"
          subType="iconOnly"
          isLoading
          aria-label="Loading"
        />
      </div>

      <div className="flex gap-4">
        <Button buttonType="primary" size="md" isDisabled>
          Disabled
        </Button>
        <Button 
          buttonType="primary" 
          size="md"
          subType="iconOnly"
          isDisabled
          leadingIcon={Plus}
          aria-label="Add item"
        />
      </div>

      {/* Tooltip Examples */}
      <h2 className="text-2xl font-semibold mt-8">Tooltip Examples</h2>
      
      {/* Basic tooltips */}
      <div className="flex gap-8 items-center justify-center">
        <Tooltip content="Small tooltip" size="sm">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Large tooltip with more text" size="lg">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
      </div>

      {/* Different arrow positions */}
      <div className="grid grid-cols-3 gap-8 p-12">
        <Tooltip content="Default (top center)" arrow="default">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Top left" arrow="topLeft">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Top right" arrow="topRight">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Left" arrow="left">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="No arrow" arrow="none">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Right" arrow="right">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Bottom left" arrow="bottomLeft">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Bottom center" arrow="bottomCenter">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip content="Bottom right" arrow="bottomRight">
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
      </div>

      {/* Tooltips with icons */}
      <div className="flex gap-6 items-center">
        <Tooltip 
          content="Information tooltip" 
          slot={Info}
          slotDirection="left"
        >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip 
          content="Warning message" 
          slot={AlertCircle}
          slotDirection="left"
        >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
        <Tooltip 
          content="Help is available" 
          slot={HelpCircle}
          slotDirection="right"
        >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
      </div>

      {/* Tooltip with custom provider props */}
      <div className="flex gap-4 items-center">
        <Tooltip 
          content="Delayed tooltip (1000ms)" 
          providerProps={{ delayDuration: 1000 }}
        >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
      </div>
      
      <Tooltip content="Small tooltip" size="sm" rootProps={{ open: true }}>
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
      
      {/* Adding small tooltip with info icon */}
      <Tooltip 
        content="Small tooltip with icon" 
        size="sm" 
        rootProps={{ open: true }}
        slot={Info}
        slotDirection="left"
      >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
      </Tooltip>

      <Tooltip content="Large tooltip" size="lg" rootProps={{ open: true }}>
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
        
      {/* Adding large tooltip with help icon */}
      <Tooltip 
        content="Large tooltip with icon" 
        size="lg" 
        rootProps={{ open: true }}
        slot={HelpCircle}
        slotDirection="right"
      >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
      </Tooltip>

      {/* Menu Examples */}
      <h2 className="text-2xl font-semibold mt-8">Menu Examples</h2>
      
      {/* Basic menu - without icons and with icons */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Edit this into a long text for testing purposes', onSelect: () => console.log('Edit') },
            { content: 'Duplicate', onSelect: () => console.log('Duplicate') },
            { content: 'Delete', onSelect: () => console.log('Delete'), disabled: true }
          ]}
        >
          <Button buttonType="secondary" size="md">Actions without icons</Button>
        </Menu>

        <Menu 
          items={[
            { content: 'Edit', icon: Pencil, onSelect: () => console.log('Edit') },
            { content: 'Duplicate', icon: Copy, onSelect: () => console.log('Duplicate') },
            { content: 'Delete', icon: Trash2, onSelect: () => console.log('Delete'), disabled: true }
          ]}
        >
          <Button buttonType="secondary" size="md">Actions with icons which is a long text for testing purposes</Button>

        </Menu>
      </div>

      {/* Menu with checkbox list for multiple selection */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Notification Settings', isLabel: true },
            { content: 'Push Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'push', icon: Bell },
            { content: 'Email Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'email', icon: Mail },
            { content: 'SMS Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'sms', icon: Send },
            { content: 'Desktop Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'desktop', icon: Globe },
            { isSeparator: true },
            { content: 'Apply Changes', icon: Save, onSelect: () => console.log('Settings saved') }
          ]}
          multiSelect={{
            enabled: true,
            selectedValues: selectedNotifications,
            onSelectionChange: (values) => {
              setSelectedNotifications(values);
              console.log('Selected notification settings:', values);
            }
          }}
        >
          <Button buttonType="secondary" size="md">
            Notification Preferences ({selectedNotifications.length})
          </Button>
        </Menu>
      </div>

      {/* Menu with submenu */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Profile', icon: User, onSelect: () => console.log('Profile') },
            { 
              content: 'More Options', 
              icon: MoreHorizontal, 
              hasSubmenu: true,
              submenuItems: [
                { content: 'Settings', icon: Settings, onSelect: () => console.log('Settings') },
                { content: 'Help', icon: HelpCircle, onSelect: () => console.log('Help') }
              ]
            },
            { isSeparator: true },
            { content: 'Log out', icon: LogOut, onSelect: () => console.log('Log out') }
          ]}
        >
          <Button buttonType="secondary" size="md">Menu with Submenu</Button>
        </Menu>
      </div>

      {/* Menu with sections */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Account', isLabel: true },
            { content: 'Profile', icon: User, onSelect: () => console.log('Profile') },
            { content: 'Settings', icon: Settings, onSelect: () => console.log('Settings') },
            { isSeparator: true },
            { content: 'Actions', isLabel: true },
            { content: 'New message', icon: Mail, onSelect: () => console.log('New message') },
            { content: 'Invite user', icon: UserPlus, onSelect: () => console.log('Invite user') }
          ]}
        >
          <Button buttonType="secondary" size="md">Sectioned Menu</Button>
        </Menu>
      </div>


      {/* Menu with Agent Widgets header and shortcuts */}
      <div className="flex gap-8 items-center justify-center mt-4">
        <Menu 
          items={[
            { 
              content: 'AGENT WIDGETS',
              isLabel: true
            },
            { 
              content: 'Union', 
              icon: Square,
              subtext: 'Combine two elements together',
              shortcut: '⌘ U',
              onSelect: () => console.log('Union') 
            },
            { 
              content: 'Copy JSON', 
              icon: Copy,
              subtext: 'Generate code & use in your editor',
              shortcut: '⌘ C',
              onSelect: () => console.log('Copy JSON') 
            },
            { isSeparator: true },
            { 
              content: 'Delete File', 
              icon: Trash2, 
              color: 'danger',
              shortcut: '⌘ Del',
              onSelect: () => console.log('Delete File') 
            }
          ]}
        >
          <Button buttonType="secondary" size="md">
            Agent Widgets Menu
          </Button>
        </Menu>
      </div>

      {/* Menu with icon only trigger */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Copy', icon: Copy, onSelect: () => console.log('Copy') },
            { content: 'Paste', icon: Clipboard, onSelect: () => console.log('Paste') },
            { isSeparator: true },
            { content: 'Edit', icon: Pencil, onSelect: () => console.log('Edit') }
          ]}
        >
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={MoreHorizontal}
            aria-label="More options"
          />
        </Menu>
      </div>

      {/* Menu with search functionality */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Account', isLabel: true },
            { content: 'Profile', icon: User, onSelect: () => console.log('Profile') },
            { content: 'Settings', icon: Settings, onSelect: () => console.log('Settings') },
            { content: 'Billing', icon: CreditCard, onSelect: () => console.log('Billing') },
            { isSeparator: true },
            { content: 'Team', isLabel: true },
            { content: 'Invite Members', icon: UserPlus, onSelect: () => console.log('Invite Members') },
            { content: 'Team Settings', icon: Users, onSelect: () => console.log('Team Settings') },
            { isSeparator: true },
            { content: 'Help', isLabel: true },
            { content: 'Documentation', icon: FileText, onSelect: () => console.log('Documentation') },
            { content: 'Help Center', icon: HelpCircle, onSelect: () => console.log('Help Center') },
            { isSeparator: true },
            { content: 'Sign out', icon: LogOut, onSelect: () => console.log('Sign out') }
          ]}
          search={{
            enabled: true,
            placeholder: "Search menu..."
          }}
        >
          <Button buttonType="secondary" size="md">Searchable Menu with a long text for testing purposes</Button>
        </Menu>
      </div>

      {/* Checkbox Examples */}
      <h2 className="text-2xl font-semibold mt-8">Checkbox Examples</h2>
      
      {/* Basic checkbox */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-8">
          <Checkbox
            checked={isTermsAccepted}
            onCheckedChange={setIsTermsAccepted}
          >
            I accept the terms and conditions
          </Checkbox>

          <Checkbox
            checked={marketingPreference}
            onCheckedChange={setMarketingPreference}
          >
            Receive marketing emails
          </Checkbox>
        </div>
        
        {/* Indeterminate state */}
        <div className="flex gap-8 mt-4">
          <Checkbox checked="indeterminate">
            Indeterminate state
          </Checkbox>
        </div>
        
        {/* Different sizes */}
        <div className="flex gap-8 mt-4">
          <Checkbox size="sm">Small checkbox</Checkbox>
          <Checkbox size="md">Medium checkbox</Checkbox>
        </div>
        
        {/* Different positions */}
        <div className="flex gap-8 mt-4">
          <Checkbox position="left">Checkbox on left (default)</Checkbox>
          <Checkbox position="right">Checkbox on right</Checkbox>
        </div>
        
        {/* Disabled state */}
        <div className="flex gap-8 mt-4">
          <Checkbox disabled>Disabled unchecked</Checkbox>
          <Checkbox disabled checked={true}>Disabled checked</Checkbox>
          <Checkbox disabled checked="indeterminate">Disabled indeterminate</Checkbox>
        </div>
        
        {/* Checkbox without label */}
        <div className="flex gap-8 mt-4">
          <Checkbox checked={isTermsAccepted} onCheckedChange={setIsTermsAccepted} />
          <span className="text-sm text-gray-600">
            Standalone checkbox is {isTermsAccepted ? 'checked' : 'unchecked'}
          </span>
        </div>
      </div>

      {/* Add examples of position control for Menu */}
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-xl font-semibold">Checkbox Position in Menu</h3>
        <div className="flex gap-8 items-center justify-center">
          {/* Menu with checkbox list positioned on the left */}
          <Menu 
            items={[
              { content: 'Left Position (Default)', isLabel: true },
              { content: 'Push Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'push', icon: Bell },
              { content: 'Email Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'email', icon: Mail },
            ]}
            multiSelect={{
              enabled: true,
              selectedValues: selectedNotifications,
              onSelectionChange: (values) => setSelectedNotifications(values)
            }}
            checkboxPosition="left"
          >
            <Button buttonType="secondary" size="md">
              Checkboxes Left
            </Button>
          </Menu>

          {/* Menu with checkbox list positioned on the right */}
          <Menu 
            items={[
              { content: 'Right Position', isLabel: true },
              { content: 'Push Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'push', icon: Bell },
              { content: 'Email Notifications', isCheckbox: true, isCheckboxListItem: true, value: 'email', icon: Mail },
            ]}
            multiSelect={{
              enabled: true,
              selectedValues: selectedNotifications,
              onSelectionChange: (values) => setSelectedNotifications(values)
            }}
            checkboxPosition="right"
          >
            <Button buttonType="secondary" size="md">
              Checkboxes Right
            </Button>
          </Menu>
        </div>
      </div>

      {/* Add a placeholder for the new Select component we'll build */}
      <h2 className="text-2xl font-semibold mt-8">Select Component (Coming Soon)</h2>
      <div className="bg-gray-100 p-4 rounded-md w-80 text-center">
        <p>Select component will be rebuilt from scratch</p>
      </div>

    </div>
  );
};

export default App;
