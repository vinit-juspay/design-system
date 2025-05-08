import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch, SwitchGroup } from './index';
import { SwitchSize } from './types';
import { HelpCircle, Bell, Moon } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Switch Component

A toggle switch component that can be used standalone or within a SwitchGroup.

#### Usage

\`\`\`tsx
// Standalone Switch
<Switch 
  label="Enable notifications"
  subtext="Receive push notifications"
  rightSlot={<Bell className="w-4 h-4" />}
  onChange={(checked) => console.log(checked)}
/>

// Switch Group
<SwitchGroup 
  label="Notification Settings"
  name="notifications"
  onChange={(values) => console.log(values)}
>
  <Switch value="email" label="Email notifications" />
  <Switch value="sms" label="SMS notifications" />
</SwitchGroup>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the switch is checked by default (uncontrolled)',
    },
    size: {
      control: 'select',
      options: Object.values(SwitchSize),
      description: 'Size of the switch',
    },
    isDisabled: {
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
    defaultChecked: true,
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
        defaultChecked={true}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled switch (off)" isDisabled />
      <Switch label="Disabled switch (on)" defaultChecked isDisabled />
    </div>
  ),
};

export const WithRightSlot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch
        label="Light mode"
        rightSlot={<Moon className="w-4 h-4 text-gray-500" />}
        subtext="Toggle between light and dark mode"
      />
      <Switch
        label="Settings"
        rightSlot={<span className="text-xs text-gray-500">Configure</span>}
        defaultChecked
      />
    </div>
  ),
};

const ControlledSwitchDemo = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p>Switch is {checked ? 'ON' : 'OFF'}</p>
      <Switch label="Controlled switch" isChecked={checked} onChange={setChecked} />
    </div>
  );
};

export const ControlledSwitch: Story = {
  render: () => <ControlledSwitchDemo />,
};

const SwitchGroupDemo = () => {
  const [notifications, setNotifications] = React.useState<string[]>(['email']);
  const [privacy, setPrivacy] = React.useState<string[]>(['location']);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="font-medium mb-2">Selected notification types:</h4>
        <code className="bg-gray-100 p-2 rounded block mb-4">{JSON.stringify(notifications)}</code>

        <SwitchGroup
          label="Notification settings"
          name="notifications"
          value={notifications}
          onChange={setNotifications}
        >
          <Switch value="email" label="Email notifications" />
          <Switch value="sms" label="SMS notifications" />
          <Switch value="push" label="Push notifications" />
        </SwitchGroup>
      </div>

      <div>
        <h4 className="font-medium mb-2">Selected privacy settings:</h4>
        <code className="bg-gray-100 p-2 rounded block mb-4">{JSON.stringify(privacy)}</code>

        <SwitchGroup label="Privacy settings" name="privacy" value={privacy} onChange={setPrivacy}>
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
          <Switch value="cookies" label="Accept cookies" />
        </SwitchGroup>
      </div>

      <div>
        <SwitchGroup
          label="Disabled settings group (uncontrolled)"
          name="disabled-group"
          isDisabled
          defaultValue={['option1']}
        >
          <Switch value="option1" label="Option 1" />
          <Switch value="option2" label="Option 2" />
        </SwitchGroup>
      </div>
    </div>
  );
};

export const SwitchGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Switch Group Usage

SwitchGroup manages multiple related switches. It handles:
- Value management for multiple switches
- Consistent naming
- Group-level disabled state
- Shared onChange handler

\`\`\`tsx
const [values, setValues] = useState(['email']);

<SwitchGroup
  label="Notification Preferences"
  name="notifications"
  value={values}
  onChange={setValues}
>
  <Switch value="email" label="Email" />
  <Switch value="sms" label="SMS" />
</SwitchGroup>
\`\`\`
        `,
      },
    },
  },
  render: () => <SwitchGroupDemo />,
};
