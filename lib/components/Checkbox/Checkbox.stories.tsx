import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { CheckboxSize, CheckboxPosition } from './types';
import { HelpCircle, Info, Settings } from 'lucide-react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Checkbox Component

A customizable checkbox component built on Radix UI primitives that supports various states and appearances.

#### Usage

\`\`\`tsx
// Basic usage
<Checkbox
  isChecked={isChecked}
  onCheckedChange={setIsChecked}
>
  Accept terms and conditions
</Checkbox>

// With additional features
<Checkbox
  isChecked={isChecked}
  onCheckedChange={setIsChecked}
  subtext="We'll send you occasional product updates"
  rightSlot={<Info className="w-4 h-4" />}
  size={CheckboxSize.MEDIUM}
>
  Subscribe to newsletter
</Checkbox>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when uncontrolled',
    },
    size: {
      control: 'select',
      options: Object.values(CheckboxSize),
      description: 'Size of the checkbox',
    },
    position: {
      control: 'select',
      options: Object.values(CheckboxPosition),
      description: 'Position of the checkbox relative to label',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required in a form',
    },
    children: {
      control: 'text',
      description: 'Label text to display next to the checkbox',
    },
    subtext: {
      control: 'text',
      description: 'Additional text to display below the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
    defaultChecked: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size={CheckboxSize.SMALL}>Small checkbox</Checkbox>
      <Checkbox size={CheckboxSize.MEDIUM}>Medium checkbox (default)</Checkbox>
      <Checkbox size={CheckboxSize.LARGE}>Large checkbox</Checkbox>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox defaultChecked={false}>Unchecked</Checkbox>
      <Checkbox defaultChecked={true}>Checked</Checkbox>
      <Checkbox isChecked="indeterminate">Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled unchecked</Checkbox>
      <Checkbox isDisabled isChecked={true}>Disabled checked</Checkbox>
      <Checkbox isDisabled isChecked="indeterminate">Disabled indeterminate</Checkbox>
    </div>
  ),
};

export const WithSubtext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        defaultChecked={true}
        subtext="We'll send you occasional product updates"
      >
        Subscribe to newsletter
      </Checkbox>
      <Checkbox
        subtext="Required for account creation"
        rightSlot={<Info className="w-3.5 h-3.5 text-blue-500" />}
      >
        Accept terms and privacy policy
      </Checkbox>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox position={CheckboxPosition.LEFT}>Checkbox on the left (default)</Checkbox>
      <Checkbox position={CheckboxPosition.RIGHT}>Checkbox on the right</Checkbox>
    </div>
  ),
};

export const WithRightSlot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox 
        rightSlot={<HelpCircle className="w-3.5 h-3.5 text-gray-500" />}
      >
        With help icon
      </Checkbox>
      <Checkbox 
        rightSlot={<Settings className="w-3.5 h-3.5 text-blue-500" />}
        subtext="Configure advanced settings"
      >
        Advanced options
      </Checkbox>
    </div>
  ),
};

const ControlledCheckboxDemo = () => {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);
  
  const toggleState = () => {
    setChecked(current => {
      if (current === false) return true;
      if (current === true) return 'indeterminate';
      return false;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Current state: {checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}</p>
      <button onClick={toggleState} className="px-3 py-1 bg-blue-500 text-white rounded mb-2">
        Toggle state
      </button>
      <Checkbox 
        isChecked={checked} 
        onCheckedChange={setChecked}
      >
        Controlled checkbox
      </Checkbox>
    </div>
  );
};

export const ControlledCheckbox: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Controlled Component

Demonstrates how to use the checkbox as a controlled component by managing its state externally.
        `,
      },
    },
  },
  render: () => <ControlledCheckboxDemo />,
};

export const FormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Form Integration

Shows how to use checkboxes in a form with validation.
        `,
      },
    },
  },
  render: () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [formData, setFormData] = React.useState({
      terms: false,
      newsletter: false,
      offers: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      console.log('Form submitted with:', formData);
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-4">Sign-up preferences</h3>
        
        <div className="space-y-3 mb-6">
          <Checkbox
            isChecked={formData.terms}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, terms: checked as boolean }))
            }
            required
            subtext="You must accept to continue"
          >
            I agree to terms and conditions
          </Checkbox>
          
          <Checkbox
            isChecked={formData.newsletter}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, newsletter: checked as boolean }))
            }
          >
            Subscribe to newsletter
          </Checkbox>
          
          <Checkbox
            isChecked={formData.offers}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, offers: checked as boolean }))
            }
            subtext="Get notifications about discounts and special offers"
          >
            Receive special offers
          </Checkbox>
        </div>
        
        <button 
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        
        {submitted && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            <p>Form submitted successfully!</p>
            <pre className="text-xs mt-2 overflow-auto max-h-28">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    );
  },
}; 