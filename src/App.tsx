import { Search, Plus, ArrowRight, Trash2, Check, Info, AlertCircle, HelpCircle } from "lucide-react";
import { Button, Tooltip } from "../lib/main";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const App = () => {
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
          hasSlot 
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
          hasSlot 
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
          hasSlot 
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
      <Tooltip content="Large tooltip" size="lg" rootProps={{ open: true }}>
          <Button 
            buttonType="secondary" 
            size="md"
            subType="iconOnly"
            leadingIcon={Plus}
            aria-label="Add item"
          />
        </Tooltip>
    </div>
  );
};

export default App;
