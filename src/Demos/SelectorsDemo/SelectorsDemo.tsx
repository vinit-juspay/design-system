import { useState } from 'react';
import { Checkbox, Switch, SwitchGroup, Radio, RadioGroup } from '../../../lib/main';
import { SwitchSize } from '../../../lib/components/Switch/types';
import { RadioSize } from '../../../lib/components/Radio/types';
import { HelpCircle, User, Info } from 'lucide-react';

const SelectorsDemo = () => {
  const [isChecked1, setIsChecked1] = useState<boolean | 'indeterminate'>(false);
  const [selectedRadio, setSelectedRadio] = useState('size-md');
  const [isToggled1, setIsToggled1] = useState(false);
  const [isToggled2, setIsToggled2] = useState(true);
  const [isToggled3, setIsToggled3] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold">Selectors</h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Checkboxes</h3>
          <div className="flex flex-col space-y-4">
            <Checkbox
              isChecked={isChecked1}
              onCheckedChange={checked => setIsChecked1(checked)}
              rightSlot={<Info className="w-3.5 h-3.5 text-gray-500" />}
              subtext="This is a helpful description"
            >
              Checkbox with right slot and subtext
            </Checkbox>
            <Checkbox rightSlot={<HelpCircle className="w-3.5 h-3.5 text-gray-500" />}>
              Checkbox with right slot only
            </Checkbox>
            <Checkbox isChecked={true} subtext="Additional information below the checkbox">
              Checkbox with subtext only
            </Checkbox>
            <Checkbox isChecked={true} isDisabled>
              Disabled checked checkbox
            </Checkbox>
            <Checkbox isChecked={false} isDisabled>
              Disabled unchecked checkbox
            </Checkbox>
            <Checkbox isChecked="indeterminate">Indeterminate checkbox</Checkbox>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Switches</h3>
          <div className="flex flex-col space-y-4">
            <Switch label="Unchecked switch" subtext="Like WhatsApp, Facebook" />
            <Switch defaultChecked={true} label="Checked switch" />
            <Switch isChecked={true} isDisabled label="Disabled checked switch" />
            <Switch isDisabled label="Disabled unchecked switch" />
            <Switch
              label="Switch with slot"
              rightSlot={<span className="text-xs text-gray-500">Additional info</span>}
            />
            <div className="space-y-2">
              <h4 className="text-lg font-medium">Switch sizes</h4>
              <Switch
                label="Small switch"
                size={SwitchSize.SMALL}
                subtext="Like WhatsApp, Facebook"
              />
              <Switch label="Medium switch" size={SwitchSize.MEDIUM} />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium">Switch Group</h4>
              <SwitchGroup name="features" onChange={values => console.log(values)}>
                <Switch
                  value="notifications"
                  isChecked={isToggled1}
                  onChange={setIsToggled1}
                  label="Enable notifications"
                />
                <Switch
                  value="marketing"
                  isChecked={isToggled2}
                  onChange={setIsToggled2}
                  label="Marketing emails"
                />
                <Switch
                  value="updates"
                  isChecked={isToggled3}
                  onChange={setIsToggled3}
                  label="Product updates"
                />
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
                isChecked={selectedRadio === 'size-sm'}
                onChange={checked => checked && setSelectedRadio('size-sm')}
                size={RadioSize.SMALL}
                rightSlot={<User className="w-2.5 h-2.5 text-gray-500" />}
              >
                Small radio
              </Radio>
              <Radio
                value="size-md"
                isChecked={selectedRadio === 'size-md'}
                onChange={checked => checked && setSelectedRadio('size-md')}
                size={RadioSize.MEDIUM}
              >
                Medium radio (default)
              </Radio>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium">Radio Group</h4>
              <RadioGroup
                label="Where do you want to collect payments?"
                name="payment-collection"
                onChange={checked => checked && setSelectedRadio('size-md')}
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
