import { Search, Plus, ArrowRight, Trash2, Check, Info, AlertCircle, HelpCircle, Copy, Settings, User, LogOut, UserPlus, Mail, MoreHorizontal, Pencil, Clipboard, Apple, Banana, Leaf, Carrot, ChevronDown, DollarSign, ShoppingBag, CreditCard, Clock } from "lucide-react";
import { Button, Tooltip, Menu, Select } from "../lib/main";
import { useState } from "react";

const App = () => {
  const [fruitValue, setFruitValue] = useState("apple");
  const [sizeValue, setSizeValue] = useState("md");
  const [paymentValue, setPaymentValue] = useState("");
  
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
      
      {/* Basic menu */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Edit', icon: Pencil, onSelect: () => console.log('Edit') },
            { content: 'Duplicate', icon: Copy, onSelect: () => console.log('Duplicate') },
            { content: 'Delete', icon: Trash2, onSelect: () => console.log('Delete'), disabled: true }
          ]}
        >
          <Button buttonType="secondary" size="md">Actions</Button>
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

      {/* Menu with checkboxes and radios */}
      <div className="flex gap-8 items-center justify-center">
        <Menu 
          items={[
            { content: 'Show notifications', isCheckbox: true, checked: true, onSelect: () => console.log('Toggle notifications') },
            { content: 'Show activity', isCheckbox: true, checked: false, onSelect: () => console.log('Toggle activity') },
            { isSeparator: true },
            { content: 'Message Type', isLabel: true },
            { content: 'Direct Message', isRadio: true, value: 'direct', checked: true },
            { content: 'Group Message', isRadio: true, value: 'group' },
            { content: 'All Messages', isRadio: true, value: 'all' }
          ]}
        >
          <Button buttonType="secondary" size="md">Checkbox Menu</Button>
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

      {/* Select Examples */}
      <h2 className="text-2xl font-semibold mt-8">Select Examples</h2>
      
      {/* Basic select */}
      <div className="flex flex-col gap-8 w-64">
        <Select 
          placeholder="Select a fruit"
          value={fruitValue}
          onValueChange={setFruitValue}
          items={[
            { value: "apple", text: "Apple", icon: Apple },
            { value: "banana", text: "Banana", icon: Banana },
            { value: "orange", text: "Orange" },
            { value: "grape", text: "Grape" },
            { value: "strawberry", text: "Strawberry" }
          ]}
        />
      </div>

      {/* Different sizes */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">Different Sizes</p>
        <Select 
          placeholder="Small size"
          size="sm"
          items={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
            { value: "option3", text: "Option 3" }
          ]}
        />
        
        <Select 
          placeholder="Medium size"
          size="md"
          items={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
            { value: "option3", text: "Option 3" }
          ]}
        />
        
        <Select 
          placeholder="Large size"
          size="lg"
          items={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
            { value: "option3", text: "Option 3" }
          ]}
        />
      </div>

      {/* With groups */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">Grouped Items</p>
        <Select 
          placeholder="Select a vegetable"
          items={[
            { 
              label: "Fruits", 
              items: [
                { value: "apple", text: "Apple", icon: Apple },
                { value: "banana", text: "Banana", icon: Banana }
              ] 
            },
            { isSeparator: true },
            { 
              label: "Vegetables", 
              items: [
                { value: "carrot", text: "Carrot", icon: Carrot },
                { value: "lettuce", text: "Lettuce", icon: Leaf },
                { value: "spinach", text: "Spinach" }
              ] 
            }
          ]}
        />
      </div>

      {/* Disabled state */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">Disabled Select</p>
        <Select 
          placeholder="Disabled select"
          disabled
          items={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" }
          ]}
        />
      </div>

      {/* Controlled example */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">Controlled Select with Radio Buttons</p>
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-600">Selected: </label>
          <div className="flex gap-2">
            <button 
              className={`px-2 py-1 text-sm rounded-md ${sizeValue === 'sm' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100'}`}
              onClick={() => setSizeValue('sm')}
            >
              Small
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded-md ${sizeValue === 'md' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100'}`}
              onClick={() => setSizeValue('md')}
            >
              Medium
            </button>
            <button 
              className={`px-2 py-1 text-sm rounded-md ${sizeValue === 'lg' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100'}`}
              onClick={() => setSizeValue('lg')}
            >
              Large
            </button>
          </div>
        </div>
        <Select 
          placeholder="Select a size"
          value={sizeValue}
          onValueChange={setSizeValue}
          size={sizeValue as 'sm' | 'md' | 'lg'}
          items={[
            { value: "sm", text: "Small" },
            { value: "md", text: "Medium" },
            { value: "lg", text: "Large" }
          ]}
        />
      </div>

      {/* With custom trigger content */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">Custom Trigger</p>
        <Select 
          placeholder="Payment Method"
          value={paymentValue}
          onValueChange={setPaymentValue}
          triggerContent={
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className={paymentValue ? 'text-gray-700' : 'text-gray-400'}>
                  {paymentValue ? 
                    paymentValue === 'card' ? 'Credit Card' : 
                    paymentValue === 'cash' ? 'Cash' : 
                    'Bank Transfer' 
                    : 'Payment Method'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          }
          items={[
            { value: "card", text: "Credit Card", icon: CreditCard },
            { value: "cash", text: "Cash", icon: DollarSign },
            { value: "bank", text: "Bank Transfer", icon: ShoppingBag }
          ]}
        />
      </div>

      {/* With disabled options */}
      <div className="flex flex-col gap-4 w-64">
        <p className="font-medium text-gray-700">With Disabled Options</p>
        <Select 
          placeholder="Delivery Time"
          items={[
            { value: "now", text: "Deliver Now", icon: Clock },
            { value: "scheduled", text: "Schedule Delivery", disabled: true },
            { value: "pickup", text: "Pick Up Later" }
          ]}
        />
      </div>
    </div>
  );
};

export default App;
