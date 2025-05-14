import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { Button, ButtonType } from '../Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        subtitle="This is a subtitle of the modal content."
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={() => setIsOpen(false)}
        onSecondaryButtonClick={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <p>This is the main content of the modal.</p>
          <p>You can put any content here.</p>
        </div>
      </Modal>
    </>
  );
};

const ModalWithCustomFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Custom Footer</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Footer Modal"
        subtitle="This modal has custom footer buttons."
        customFooter={
          <div className="flex gap-2">
            <Button buttonType={ButtonType.SECONDARY} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button buttonType={ButtonType.PRIMARY} onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>This modal has custom footer buttons.</p>
          <p>You can customize the footer content as needed.</p>
        </div>
      </Modal>
    </>
  );
};

const ModalWithLongContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Long Content</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Long Content Modal"
        subtitle="This modal contains a lot of content to demonstrate scrolling behavior."
        primaryButtonText="Close"
        onPrimaryButtonClick={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <p key={index}>
              This is paragraph {index + 1} of a long content modal. The content should scroll when
              it exceeds the maximum height.
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
};

const ModalWithoutHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal without Header</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showHeader={false}
        primaryButtonText="Close"
        onPrimaryButtonClick={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <p>This modal doesn't have a header.</p>
          <p>The content starts from the top.</p>
        </div>
      </Modal>
    </>
  );
};

const ModalWithoutDividers = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal without Dividers</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal without Dividers"
        subtitle="This modal doesn't have divider borders between sections."
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={() => setIsOpen(false)}
        onSecondaryButtonClick={() => setIsOpen(false)}
        showDivider={false}
      >
        <div className="space-y-4">
          <p>This modal has no divider borders between the header, content, and footer.</p>
          <p>Notice the cleaner look without the horizontal lines.</p>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithContent />,
};

export const WithCustomFooter: Story = {
  render: () => <ModalWithCustomFooter />,
};

export const WithLongContent: Story = {
  render: () => <ModalWithLongContent />,
};

export const WithoutHeader: Story = {
  render: () => <ModalWithoutHeader />,
};

export const WithoutDividers: Story = {
  render: () => <ModalWithoutDividers />,
};
