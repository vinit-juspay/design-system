import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import { Button, ButtonType } from '../Button';
import { Placement, Alignment } from './types';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A Popover component that displays content in a floating container next to a trigger element.
It supports various placements, alignments, and can include headers, descriptions, and action buttons.

## Features
- Multiple placement options (top, bottom, left, right)
- Different alignment options (start, center, end)
- Optional header and description
- Action buttons with customizable types
- Close button option
- Keyboard navigation support
- Collision detection
- Focus management
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(Placement),
      description: 'The placement of the popover relative to the trigger element',
    },
    alignment: {
      control: 'select',
      options: Object.values(Alignment),
      description: 'The alignment of the popover relative to the trigger element',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button in the header',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close the popover when the Escape key is pressed',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close the popover when clicking outside',
    },
    primaryButtonType: {
      control: 'select',
      options: Object.values(ButtonType),
      description: 'The type of the primary button',
    },
    secondaryButtonType: {
      control: 'select',
      options: Object.values(ButtonType),
      description: 'The type of the secondary button',
    },
    primaryButtonDisabled: {
      control: 'boolean',
      description: 'Whether the primary button is disabled',
    },
    secondaryButtonDisabled: {
      control: 'boolean',
      description: 'Whether the secondary button is disabled',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: <div className="p-4">This is a basic popover content.</div>,
  },
};

export const WithHeader: Story = {
  args: {
    trigger: <Button>With Header</Button>,
    heading: 'Popover Title',
    children: <div className="p-4">This popover has a header.</div>,
  },
};

export const WithDescription: Story = {
  args: {
    trigger: <Button>With Description</Button>,
    heading: 'Popover Title',
    description: 'This is a description for the popover content.',
    children: <div className="p-4">This popover has both a header and description.</div>,
  },
};

export const WithActions: Story = {
  args: {
    trigger: <Button>With Actions</Button>,
    heading: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    onPrimaryButtonClick: () => console.log('Confirmed'),
    onSecondaryButtonClick: () => console.log('Cancelled'),
    children: <div className="p-4">This popover includes action buttons.</div>,
  },
};

export const DifferentPlacements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.values(Placement).map(placement => (
        <Popover
          key={placement}
          trigger={<Button>{placement}</Button>}
          placement={placement}
          heading="Placement Example"
          description={`This popover is placed ${placement.toLowerCase()}`}
        >
          <div className="p-4">
            <p>Content for {placement} placement</p>
          </div>
        </Popover>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of different placement options for the Popover component.',
      },
    },
  },
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.values(Alignment).map(alignment => (
        <Popover
          key={alignment}
          trigger={<Button>{alignment}</Button>}
          alignment={alignment}
          heading="Alignment Example"
          description={`This popover is aligned ${alignment.toLowerCase()}`}
        >
          <div className="p-4">
            <p>Content for {alignment} alignment</p>
          </div>
        </Popover>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of different alignment options for the Popover component.',
      },
    },
  },
};

export const ComplexExample: Story = {
  args: {
    trigger: <Button>Complex Example</Button>,
    placement: Placement.BOTTOM,
    alignment: Alignment.CENTER,
    heading: 'Complex Popover',
    description: 'This is a complex example with multiple features.',
    showCloseButton: true,
    primaryButtonText: 'Save Changes',
    secondaryButtonText: 'Discard',
    primaryButtonType: ButtonType.PRIMARY,
    secondaryButtonType: ButtonType.SECONDARY,
    onPrimaryButtonClick: () => console.log('Saved'),
    onSecondaryButtonClick: () => console.log('Discarded'),
    children: (
      <div className="p-4">
        <p className="mb-2">This popover includes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Header with title</li>
          <li>Description text</li>
          <li>Custom content</li>
          <li>Action buttons</li>
          <li>Close button</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A complex example showcasing multiple features of the Popover component.',
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    trigger: <Button>No Close Button</Button>,
    showCloseButton: false,
    heading: 'No Close Button',
    description: "This popover doesn't have a close button.",
    children: (
      <div className="p-4">
        You can only close this popover by clicking outside or pressing escape.
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a Popover without a close button, demonstrating alternative closing methods.',
      },
    },
  },
};

export const DisabledButtons: Story = {
  args: {
    trigger: <Button>Disabled Buttons</Button>,
    heading: 'Disabled Actions',
    description: 'The buttons in this popover are disabled.',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    primaryButtonDisabled: true,
    secondaryButtonDisabled: true,
    children: <div className="p-4">This popover has disabled action buttons.</div>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a Popover with disabled action buttons.',
      },
    },
  },
};
