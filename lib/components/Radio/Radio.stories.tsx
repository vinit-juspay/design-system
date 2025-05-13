import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './index';
import { RadioSize } from './types';
import { HelpCircle, Bell, Settings } from 'lucide-react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Radio Component

A radio button component for selecting a single option from a list. Can be used standalone or within a RadioGroup.

#### Usage

\`\`\`tsx
// Standalone Radio
<Radio 
  value="option1"
  isChecked={selected === 'option1'}
  onChange={(checked) => checked && setSelected('option1')}
>
  Option 1
</Radio>

// Radio Group
<RadioGroup 
  label="Payment Method"
  name="payment"
  value={selectedMethod}
  onChange={setSelectedMethod}
>
  <Radio value="card">Credit Card</Radio>
  <Radio value="upi">UPI</Radio>
  <Radio value="netbanking">Net Banking</Radio>
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: 'Whether the radio is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the radio is checked by default (uncontrolled)',
    },
    size: {
      control: 'select',
      options: Object.values(RadioSize),
      description: 'Size of the radio button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    children: {
      control: 'text',
      description: 'Label content',
    },
    subtext: {
      control: 'text',
      description: 'Additional description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    children: 'Radio option',
    value: 'option1',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio size={RadioSize.SMALL} value="small">
        Small radio
      </Radio>
      <Radio size={RadioSize.MEDIUM} value="medium">
        Medium radio
      </Radio>
    </div>
  ),
};

export const WithSubtext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio
        value="card"
        defaultChecked
        subtext="Pay securely with credit or debit card"
        rightSlot={<HelpCircle className="w-4 h-4 text-gray-500" />}
      >
        Card Payment
      </Radio>
      <Radio
        value="upi"
        subtext="Pay instantly with UPI apps"
        rightSlot={<Bell className="w-4 h-4 text-gray-500" />}
      >
        UPI Payment
      </Radio>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio value="disabled" isDisabled>
        Disabled radio (unchecked)
      </Radio>
      <Radio value="disabled-checked" defaultChecked isDisabled>
        Disabled radio (checked)
      </Radio>
    </div>
  ),
};

export const WithRightSlot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio value="settings" rightSlot={<Settings className="w-4 h-4 text-gray-500" />}>
        Configure settings
      </Radio>
      <Radio value="help" rightSlot={<span className="text-xs text-gray-500">Learn more</span>}>
        Help options
      </Radio>
    </div>
  ),
};

const ControlledRadioDemo = () => {
  const [selected, setSelected] = React.useState('option1');

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">Selected: {selected}</p>
      <Radio
        value="option1"
        isChecked={selected === 'option1'}
        onChange={checked => checked && setSelected('option1')}
      >
        Option 1
      </Radio>
      <Radio
        value="option2"
        isChecked={selected === 'option2'}
        onChange={checked => checked && setSelected('option2')}
      >
        Option 2
      </Radio>
    </div>
  );
};

export const ControlledRadio: Story = {
  render: () => <ControlledRadioDemo />,
};

const RadioGroupDemo = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [shippingMethod, setShippingMethod] = React.useState('standard');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="font-medium mb-2">Selected payment method: {paymentMethod}</h4>
        <RadioGroup
          label="Payment Method"
          name="payment"
          value={paymentMethod}
          onChange={setPaymentMethod}
        >
          <Radio
            value="card"
            subtext="Pay securely with credit or debit card"
            rightSlot={<HelpCircle className="w-4 h-4 text-gray-500" />}
          >
            Card Payment
          </Radio>
          <Radio value="upi" subtext="Pay instantly using UPI">
            UPI
          </Radio>
          <Radio value="netbanking">Net Banking</Radio>
        </RadioGroup>
      </div>

      <div>
        <h4 className="font-medium mb-2">Selected shipping: {shippingMethod}</h4>
        <RadioGroup
          label="Shipping Method"
          name="shipping"
          value={shippingMethod}
          onChange={setShippingMethod}
        >
          <Radio value="express" subtext="Delivery in 1-2 business days">
            Express Shipping
          </Radio>
          <Radio value="standard" subtext="Delivery in 3-5 business days">
            Standard Shipping
          </Radio>
        </RadioGroup>
      </div>

      <RadioGroup label="Disabled Group" name="disabled-group" defaultValue="option1" isDisabled>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    </div>
  );
};

export const RadioGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Radio Group Usage

RadioGroup manages a set of related radio buttons. It provides:
- Single selection management
- Consistent naming
- Group-level disabled state
- Shared onChange handler

\`\`\`tsx
const [selected, setSelected] = useState('card');

<RadioGroup
  label="Payment Method"
  name="payment"
  value={selected}
  onChange={setSelected}
>
  <Radio value="card">Card Payment</Radio>
  <Radio value="upi">UPI</Radio>
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
  render: () => <RadioGroupDemo />,
};
