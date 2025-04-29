import type { Meta, StoryObj } from '@storybook/react';
import { Phone, Calendar, DollarSign } from 'lucide-react';

import DropdownInput from './DropdownInput';
import { DropdownInputSize, DropdownInputState, DropdownPosition } from './types';

const meta: Meta<typeof DropdownInput> = {
  title: 'Components/DropdownInput',
  component: DropdownInput,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DropdownInputSize),
    },
    state: {
      control: 'select',
      options: Object.values(DropdownInputState),
    },
    dropdownPosition: {
      control: 'select',
      options: Object.values(DropdownPosition),
    },
    leftSlot: {
      control: { type: 'boolean' },
    },
    rightSlot: {
      control: { type: 'boolean' },
    },
    mandatory: {
      control: 'boolean',
    },
    showSelectedOptionInInput: {
      control: 'boolean',
    },
    dropdownWidth: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DropdownInput>;

// Example options for countries with flags/icons
const countryOptions = [
  { 
    label: '+1', 
    value: 'us',
  },
  { 
    label: '+1', 
    value: 'ca',
  },
  { 
    label: '+44', 
    value: 'uk',
  },
  { 
    label: '+61', 
    value: 'au',
  },
  { 
    label: '+49', 
    value: 'de',
  },
  { 
    label: '+33', 
    value: 'fr',
  },
  { 
    label: '+81', 
    value: 'jp',
  },
];

// Currency options for financial inputs
const currencyOptions = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
  { label: 'JPY', value: 'jpy' },
  { label: 'CAD', value: 'cad' },
  { label: 'AUD', value: 'aud' },
];

// Unit options for measurement inputs
const unitOptions = [
  { label: 'px', value: 'pixels' },
  { label: '%', value: 'percent' },
  { label: 'em', value: 'em' },
  { label: 'rem', value: 'rem' },
  { label: 'vh', value: 'viewport-height' },
  { label: 'vw', value: 'viewport-width' },
];

// Date format options
const dateFormatOptions = [
  { label: 'MM/DD/YYYY', value: 'us' },
  { label: 'DD/MM/YYYY', value: 'eu' },
  { label: 'YYYY-MM-DD', value: 'iso' },
];


export const PhoneNumberInput: Story = {
  args: {
    label: 'Phone Number',
    sublabel: '(with country code)',
    placeholder: 'Enter your phone number',
    hintText: 'Select country code and enter your phone number',
    options: countryOptions,
    value: 'us',
    inputValue: '',
    showSelectedOptionInInput: true,
    dropdownWidth: '90px',
    dropdownPosition: DropdownPosition.LEFT,
    leftSlot: <Phone className="h-4 w-4 text-gray-400" />,
    rightSlot: <Phone className="h-4 w-4 text-gray-400" />,
  },
};

export const DropdownOnRight: Story = {
  args: {
    ...PhoneNumberInput.args,
    dropdownPosition: DropdownPosition.RIGHT,
    dropdownWidth: '110px',
    rightSlot: null,
  },
};

export const CurrencyInput: Story = {
  args: {
    ...PhoneNumberInput.args,
    label: 'Amount',
    sublabel: '(with currency)',
    placeholder: 'Enter amount',
    hintText: 'Select currency and enter amount',
    options: currencyOptions,
    value: 'usd',
    dropdownWidth: '80px',
    rightSlot: <DollarSign className="h-4 w-4 text-gray-400" />,
  },
};

export const UnitMeasurementInput: Story = {
  args: {
    ...PhoneNumberInput.args,
    label: 'Width',
    sublabel: '(with unit)',
    placeholder: 'Enter width value',
    hintText: 'Select measurement unit and enter value',
    options: unitOptions,
    value: 'pixels',
    dropdownPosition: DropdownPosition.RIGHT,
    dropdownWidth: '70px',
    rightSlot: null,
  },
};

export const DateInput: Story = {
  args: {
    ...PhoneNumberInput.args,
    label: 'Date',
    sublabel: '(with format)',
    placeholder: 'Enter date',
    hintText: 'Select date format and enter date',
    options: dateFormatOptions,
    value: 'us',
    dropdownWidth: '120px',
    rightSlot: <Calendar className="h-4 w-4 text-gray-400" />,
  },
};

export const NoLabel: Story = {
  args: {
    ...PhoneNumberInput.args,
    label: undefined,
    sublabel: undefined,
  },
};

export const NoHint: Story = {
  args: {
    ...PhoneNumberInput.args,
    hintText: undefined,
  },
};

export const LargeSize: Story = {
  args: {
    ...PhoneNumberInput.args,
    size: DropdownInputSize.LARGE,
  },
};

export const ErrorState: Story = {
  args: {
    ...PhoneNumberInput.args,
    state: DropdownInputState.ERROR,
    hintText: 'Please enter a valid value',
  },
};

export const DisabledState: Story = {
  args: {
    ...PhoneNumberInput.args,
    state: DropdownInputState.DISABLED,
  },
}; 