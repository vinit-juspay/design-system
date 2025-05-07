import { useState } from 'react';
import { Checkbox, Switch, SwitchGroup, Radio, RadioGroup } from '../../../lib/main';
import { SwitchSize } from '../../../lib/components/Switch/types';
import { RadioSize } from '../../../lib/components/Radio/types';
import { HelpCircle, User, Info } from 'lucide-react';

const SelectorsDemo = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isToggled1, setIsToggled1] = useState(false);
  const [isToggled2, setIsToggled2] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('size-md');

  return (
    <>
      <h2 className="text-2xl font-semibold">Selectors</h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Checkboxes</h3>
          <div className="flex flex-col space-y-4">
            <Checkbox
              checked={isChecked1}
              onCheckedChange={setIsChecked1}
              rightSlot={<Info className="w-3.5 h-3.5 text-gray-500" />}
              subtext="This is a helpful description"
            >
              Checkbox with right slot and subtext
            </Checkbox>
            <Checkbox
              checked={isChecked2}
              onCheckedChange={setIsChecked2}
              rightSlot={<HelpCircle className="w-3.5 h-3.5 text-gray-500" />}
            >
              Checkbox with right slot only
            </Checkbox>
            <Checkbox checked={true} subtext="Additional information below the checkbox">
              Checkbox with subtext only
            </Checkbox>
            <Checkbox checked={true} disabled>
              Disabled checked checkbox
            </Checkbox>
            <Checkbox checked={false} disabled>
              Disabled unchecked checkbox
            </Checkbox>
            <Checkbox checked="indeterminate">Indeterminate checkbox</Checkbox>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Switches</h3>
          <div className="flex flex-col space-y-4">
            <Switch
              checked={isToggled1}
              onCheckedChange={setIsToggled1}
              label="Unchecked switch"
              subtext="Like WhatsApp, Facebook"
            />
            <Switch checked={isToggled2} onCheckedChange={setIsToggled2} label="Checked switch" />
            <Switch checked={true} disabled label="Disabled checked switch" />
            <Switch checked={false} disabled label="Disabled unchecked switch" />
            <Switch
              checked={isToggled1}
              onCheckedChange={setIsToggled1}
              label="Switch with slot"
              rightSlot={<span className="text-xs text-gray-500">Additional info</span>}
            />
            <div className="space-y-2">
              <h4 className="text-lg font-medium">Switch sizes</h4>
              <Switch
                checked={isToggled1}
                onCheckedChange={setIsToggled1}
                label="Small switch"
                size={SwitchSize.SMALL}
              />
              <Switch
                checked={isToggled1}
                onCheckedChange={setIsToggled1}
                label="Medium switch"
                size={SwitchSize.MEDIUM}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium">Switch Group</h4>
              <SwitchGroup name="features" onChange={data => console.log(data)}>
                <Switch value="notifications" label="Enable notifications" />
                <Switch value="marketing" label="Marketing emails" />
                <Switch value="updates" label="Product updates" />
              </SwitchGroup>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Radio Buttons</h3>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h4 className="text-lg font-medium">Radio sizes</h4>
              <Radio
                value="size-sm"
                checked={selectedRadio === 'size-sm'}
                onChange={e => setSelectedRadio(e.target.value)}
                size={RadioSize.SMALL}
                rightSlot={<User className="w-2.5 h-2.5 text-gray-500" />}
              >
                Small radio
              </Radio>
              <Radio
                value="size-md"
                checked={selectedRadio === 'size-md'}
                onChange={e => setSelectedRadio(e.target.value)}
                size={RadioSize.MEDIUM}
              >
                Medium radio (default)
              </Radio>
              <Radio
                value="size-lg"
                checked={selectedRadio === 'size-lg'}
                onChange={e => setSelectedRadio(e.target.value)}
              >
                Large radio
              </Radio>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium">Radio Group</h4>
              <RadioGroup
                label="Where do you want to collect payments?"
                name="payment-collection"
                onChange={({ name, value }) => console.log({ name, value })}
                defaultValue="website"
              >
                <Radio rightSlot={<HelpCircle className="w-3 h-3 text-gray-500" />} value="website">
                  Website
                </Radio>
                <Radio value="android">Android App</Radio>
                <Radio value="ios">iOS App</Radio>
                <Radio value="social-media" subtext="Like WhatsApp, Facebook, Instagram">
                  Social Media
                </Radio>
                <Radio value="offline-store">Offline Store</Radio>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium">Disabled Radio Group</h4>
              <RadioGroup
                label="Subscription plan (disabled)"
                name="subscription-plan"
                defaultValue="professional"
                isDisabled
              >
                <Radio value="basic">Basic Plan</Radio>
                <Radio value="professional">Professional Plan</Radio>
                <Radio value="enterprise">Enterprise Plan</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorsDemo;
