import { useState } from "react";
import { Search, Plus, ArrowRight, Trash2, Check, Info, AlertCircle, HelpCircle, Layers, Tag as TagIcon } from "lucide-react";
import { Button, Tag, SplitTag, TextInput, Tooltip } from "../lib/main";

const App = () => {
  const [activeComponent, setActiveComponent] = useState<'buttons' | 'tooltips' | 'tags'>('buttons');
  
  const renderNavbar = () => (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-lg font-bold text-gray-900">Design System</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => setActiveComponent('buttons')}
                className={`${
                  activeComponent === 'buttons'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Layers className="mr-2 h-5 w-5" />
                Buttons
              </button>
              <button
                onClick={() => setActiveComponent('tooltips')}
                className={`${
                  activeComponent === 'tooltips'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Info className="mr-2 h-5 w-5" />
                Tooltips
              </button>
              <button
                onClick={() => setActiveComponent('tags')}
                className={`${
                  activeComponent === 'tags'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <TagIcon className="mr-2 h-5 w-5" />
                Tags
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <button
            onClick={() => setActiveComponent('buttons')}
            className={`${
              activeComponent === 'buttons'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex items-center`}
          >
            <Layers className="mr-3 h-5 w-5" />
            Buttons
          </button>
          <button
            onClick={() => setActiveComponent('tooltips')}
            className={`${
              activeComponent === 'tooltips'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex items-center`}
          >
            <Info className="mr-3 h-5 w-5" />
            Tooltips
          </button>
          <button
            onClick={() => setActiveComponent('tags')}
            className={`${
              activeComponent === 'tags'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left flex items-center`}
          >
            <TagIcon className="mr-3 h-5 w-5" />
            Tags
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderButtons = () => (
    <>
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
    </>
  );
  
  const renderTooltips = () => (
    <>
      <h2 className="text-2xl font-semibold">Tooltip Examples</h2>
      
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
          <Tag 
            label="Leading Icon" 
            leadingSlot={<Info size={16} />} 
          />
          <Tag 
            label="Trailing Icon" 
            trailingSlot={<Check size={16} />} 
          />
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
          <SplitTag 
            leftLabel="5" 
            rightLabel="Pending" 
            color="warning"
          />
          <SplitTag 
            leftLabel="10" 
            rightLabel="Completed" 
            color="success"
          />
          <SplitTag 
            leftLabel="3" 
            rightLabel="Failed" 
            color="error"
          />
          <SplitTag 
            leftLabel="Key" 
            rightLabel="Value" 
            color="primary"
            tagStyle="squarical"
          />
        </div>
      </div>
    </>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavbar()}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          {activeComponent === 'buttons' && renderButtons()}
          {activeComponent === 'tooltips' && renderTooltips()}
          {activeComponent === 'tags' && renderTags()}
        </div>
      </div>


      {/* Input Field Examples */}
      <h2 className="text-2xl font-semibold mt-8">Input Field Examples</h2>
      <TextInput label="Search" size="md" />
      <TextInput label="Search" size="lg" rightSlot={<ArrowRight className="text-gray-400 w-4 h-4" />} />
    </div>
  );
};

export default App;