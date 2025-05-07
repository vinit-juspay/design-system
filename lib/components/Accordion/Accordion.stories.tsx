import { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';
import { AccordionType, AccordionVariant } from './types';
import { Info, AlertCircle, Settings } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  args: {
    defaultValue: 'item-1',
    children: (
      <>
        <AccordionItem value="item-1" title="Item 1">
          Content for item 1
        </AccordionItem>
        <AccordionItem value="item-2" title="Item 2">
          Content for item 2
        </AccordionItem>
        <AccordionItem value="item-3" title="Item 3">
          Content for item 3
        </AccordionItem>
      </>
    ),
  },
};

// Bordered Variant
export const Bordered: Story = {
  args: {
    variant: AccordionVariant.BORDERED,
    defaultValue: 'item-1',
    children: (
      <>
        <AccordionItem 
          value="item-1" 
          title="Basic Information" 
          subtext="Personal and account details"
          leftSlot={<Info />}
        >
          This section contains all your basic profile information.
        </AccordionItem>
        <AccordionItem 
          value="item-2" 
          title="Security Settings" 
          subtext="Password and authentication options"
          leftSlot={<Settings />}
        >
          Manage your security preferences here.
        </AccordionItem>
        <AccordionItem 
          value="item-3" 
          title="Notifications" 
          subtext="Email and push notification preferences"
          rightSlot={<span className="bg-red-100 text-red-600 text-xs rounded-full px-2 py-1">New</span>}
        >
          Control which notifications you receive and how they are delivered.
        </AccordionItem>
      </>
    ),
  },
};

// Filled Variant
export const Filled: Story = {
  args: {
    variant: AccordionVariant.FILLED,
    defaultValue: 'item-1',
    children: (
      <>
        <AccordionItem 
          value="item-1" 
          title="How do I create an account?" 
          leftSlot={<AlertCircle />}
        >
          To create an account, click the "Sign Up" button and follow the instructions.
        </AccordionItem>
        <AccordionItem 
          value="item-2" 
          title="What payment methods do you accept?"
        >
          We accept credit cards, PayPal, and bank transfers.
        </AccordionItem>
        <AccordionItem 
          value="item-3" 
          title="How do I contact support?"
          isDisabled={true}
        >
          This content is not accessible because the item is disabled.
        </AccordionItem>
      </>
    ),
  },
};

// Multiple Selection
export const Multiple: Story = {
  args: {
    isMultiple: true,
    defaultValue: ['item-1', 'item-3'],
    children: (
      <>
        <AccordionItem value="item-1" title="Item 1">
          Content for item 1
        </AccordionItem>
        <AccordionItem value="item-2" title="Item 2" subtext="With additional information">
          Content for item 2
        </AccordionItem>
        <AccordionItem value="item-3" title="Item 3">
          Content for item 3
        </AccordionItem>
      </>
    ),
  },
};

// No Border Type Example
export const NoBorder: Story = {
  args: {
    type: AccordionType.NO_BORDER,
    defaultValue: 'item-1',
    className: 'w-[400px]',
    children: (
      <>
        <AccordionItem 
          value="item-1" 
          title="Basic FAQ Item" 
        >
          This is a simple no-border accordion item.
        </AccordionItem>
        <AccordionItem 
          value="item-2" 
          title="With Subtext" 
          subtext="Additional information below the title"
        >
          No-border accordion with subtext.
        </AccordionItem>
        <AccordionItem 
          value="item-3" 
          title="With Icon" 
          leftSlot={<Info />}
        >
          No-border accordion with an icon.
        </AccordionItem>
      </>
    ),
  },
};

// Border Type Example
export const Border: Story = {
  args: {
    type: AccordionType.BORDER,
    defaultValue: 'item-1',
    className: 'w-[400px]',
    children: (
      <>
        <AccordionItem 
          value="item-1" 
          title="Bordered Item" 
        >
          This item has a full border around it.
        </AccordionItem>
        <AccordionItem 
          value="item-2" 
          title="Another Bordered Item" 
        >
          Each item is independently bordered.
        </AccordionItem>
      </>
    ),
  },
};
