import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch, SwitchGroup } from './index';
import { SwitchSize } from './types';
import { HelpCircle, Bell, Settings, Moon } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    size: {
      control: 'select',
      options: Object.values(SwitchSize),
      description: 'Size of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text to display next to the switch',
    },
    subtext: {
      control: 'text',
      description: 'Text to display below the switch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size={SwitchSize.SMALL} label="Small switch" />
      <Switch size={SwitchSize.MEDIUM} label="Medium switch" />
    </div>
  ),
};

export const WithSubtext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch 
        label="Remember Me" 
        subtext="Save my login details for next time"
        rightSlot={<HelpCircle className="w-5 h-5 text-purple-400" />}
      />
      <Switch 
        label="Notifications" 
        subtext="Receive email notifications for important updates"
        rightSlot={<Bell className="w-4 h-4 text-gray-500" />}
        checked={true}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled switch (off)" disabled />
      <Switch label="Disabled switch (on)" checked disabled />
    </div>
  ),
};

export const WithRightSlot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch 
        label="Light mode" 
        rightSlot={<Moon className="w-4 h-4 text-gray-500" />}
      />
      <Switch 
        label="Settings" 
        rightSlot={<Settings className="w-4 h-4 text-gray-500" />}
        checked
      />
    </div>
  ),
};

const ControlledSwitchDemo = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p>Switch is {checked ? 'ON' : 'OFF'}</p>
      <Switch 
        label="Controlled switch" 
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  );
};

export const ControlledSwitch: Story = {
  render: () => <ControlledSwitchDemo />,
};

export const SwitchGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <SwitchGroup 
        label="Notification settings"
        name="notifications"
        defaultValue={["email"]}
        onChange={({name, values}) => console.log({name, values})}
      >
        <Switch value="email" label="Email notifications" />
        <Switch value="sms" label="SMS notifications" />
        <Switch value="push" label="Push notifications" />
      </SwitchGroup>
      
      <SwitchGroup 
        label="Privacy settings"
        name="privacy"
        defaultValue={["location"]}
        onChange={({name, values}) => console.log({name, values})}
      >
        <Switch 
          value="location" 
          label="Location services" 
          subtext="Allow the app to use your location"
        />
        <Switch 
          value="analytics" 
          label="Usage analytics" 
          subtext="Help us improve by sending anonymous usage data"
          rightSlot={<HelpCircle className="w-4 h-4 text-blue-500" />}
        />
        <Switch 
          value="cookies" 
          label="Accept cookies" 
        />
      </SwitchGroup>
      
      <SwitchGroup 
        label="Disabled settings group"
        name="disabled-group"
        isDisabled
        defaultValue={["option1"]}
      >
        <Switch value="option1" label="Option 1" />
        <Switch value="option2" label="Option 2" />
      </SwitchGroup>
    </div>
  ),
}; 