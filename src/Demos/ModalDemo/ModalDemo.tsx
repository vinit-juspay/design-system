import { useState } from 'react';
import Modal from '../../../lib/components/Modal/Modal';
import { Button, ButtonType, ButtonSubType } from '../../../lib/components/Button';
import { X } from 'lucide-react';

const ModalDemo = () => {

  const [isOpenButtonTypes, setIsOpenButtonTypes] = useState(false);
  const [isOpenPlayground, setIsOpenPlayground] = useState(false);

  
  // Playground state
  const [playgroundConfig, setPlaygroundConfig] = useState({
    title: "Modal Heading",
    subtitle: "One line description of the modal ",
    primaryButtonText: "Confirm",
    secondaryButtonText: "Cancel",
    primaryButtonType: ButtonType.PRIMARY,
    secondaryButtonType: ButtonType.SECONDARY,
    showCloseButton: true,
    showHeader: true,
    showFooter: true,
    showPrimaryButton: true,
    showSecondaryButton: true,
    closeOnBackdropClick: true,
    primaryButtonDisabled: false,
    secondaryButtonDisabled: false,
    useCustomHeader: false,
    useCustomFooter: false,
  });

  // Custom header component
  const CustomHeader = () => (
    <div className="p-4 bg-primary-50 border-b border-primary-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white font-semibold">!</span>
          </div>
          <div className='flex flex-col gap-1 p-4' >
            <h3 className="text-sm font-semibold text-primary-900">Custom Header</h3>
            <p className="text-xs text-primary-600">With custom styling and layout</p>
          </div>
        </div>
        {playgroundConfig.showCloseButton && (
          <Button
            buttonType={ButtonType.SECONDARY}
            subType={ButtonSubType.ICON_ONLY}
            onClick={() => setIsOpenPlayground(false)}
            className="p-1 rounded-full hover:bg-primary-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-primary-500" onClick={() => setIsOpenPlayground(false)} />
          </Button>
        )}
      </div>
    </div>
  );

  // Custom footer component
  const CustomFooter = () => (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Status:</span> Ready to proceed
        </div>
        <div className="flex space-x-3">
          {playgroundConfig.showSecondaryButton && (
            <Button
              buttonType={playgroundConfig.secondaryButtonType}
              onClick={() => setIsOpenPlayground(false)}
              disabled={playgroundConfig.secondaryButtonDisabled}
            >
              {playgroundConfig.secondaryButtonText}
            </Button>
          )}
          {playgroundConfig.showPrimaryButton && (
            <Button
              buttonType={playgroundConfig.primaryButtonType}
              onClick={() => setIsOpenPlayground(false)}
              disabled={playgroundConfig.primaryButtonDisabled}
            >
              {playgroundConfig.primaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h2 className="text-2xl font-semibold">Modal Examples</h2>

      {/* Modal Playground */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Modal Playground</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={playgroundConfig.title}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, title: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={playgroundConfig.subtitle}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, subtitle: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={playgroundConfig.primaryButtonText}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, primaryButtonText: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={playgroundConfig.secondaryButtonText}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, secondaryButtonText: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Type</label>
              <select
                value={playgroundConfig.primaryButtonType}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, primaryButtonType: e.target.value as ButtonType })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {Object.values(ButtonType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Type</label>
              <select
                value={playgroundConfig.secondaryButtonType}
                onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, secondaryButtonType: e.target.value as ButtonType })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {Object.values(ButtonType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.showCloseButton}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, showCloseButton: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Close Button</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.showHeader}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, showHeader: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Header</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.showFooter}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, showFooter: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Footer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.showPrimaryButton}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, showPrimaryButton: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Primary Button</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.showSecondaryButton}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, showSecondaryButton: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Secondary Button</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.closeOnBackdropClick}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, closeOnBackdropClick: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Close on Backdrop Click</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.primaryButtonDisabled}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, primaryButtonDisabled: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Disable Primary Button</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.secondaryButtonDisabled}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, secondaryButtonDisabled: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Disable Secondary Button</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Custom Components</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.useCustomHeader}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, useCustomHeader: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Use Custom Header</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={playgroundConfig.useCustomFooter}
                    onChange={(e) => setPlaygroundConfig({ ...playgroundConfig, useCustomFooter: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Use Custom Footer</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button
          buttonType={ButtonType.PRIMARY}
          onClick={() => setIsOpenPlayground(true)}
        >
          Open Playground Modal
        </Button>

        <Modal
          isOpen={isOpenPlayground}
          onClose={() => setIsOpenPlayground(false)}
          title={playgroundConfig.title}
          subtitle={playgroundConfig.subtitle}
          primaryButtonText={playgroundConfig.primaryButtonText}
          secondaryButtonText={playgroundConfig.secondaryButtonText}
          onPrimaryButtonClick={() => setIsOpenPlayground(false)}
          onSecondaryButtonClick={() => setIsOpenPlayground(false)}
          primaryButtonType={playgroundConfig.primaryButtonType}
          secondaryButtonType={playgroundConfig.secondaryButtonType}
          showCloseButton={playgroundConfig.showCloseButton}
          showHeader={playgroundConfig.showHeader}
          showFooter={playgroundConfig.showFooter}
          showPrimaryButton={playgroundConfig.showPrimaryButton}
          showSecondaryButton={playgroundConfig.showSecondaryButton}
          closeOnBackdropClick={playgroundConfig.closeOnBackdropClick}
          primaryButtonDisabled={playgroundConfig.primaryButtonDisabled}
          secondaryButtonDisabled={playgroundConfig.secondaryButtonDisabled}
          customHeader={playgroundConfig.useCustomHeader ? <CustomHeader /> : undefined}
          customFooter={playgroundConfig.useCustomFooter ? <CustomFooter /> : undefined}
          headerRightSlot={<Button buttonType={ButtonType.SECONDARY}>Close</Button>}
        >
          <div className="text-gray-600">
            <p className="mb-4">This is a playground modal where you can customize all properties in real-time.</p>
            <p>Try different combinations of settings to see how the modal behaves.</p>
          </div>
        </Modal>
      </div>



      {/* Button Types Demo */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Types Demo</h3>
        <Button
          buttonType={ButtonType.PRIMARY}
          onClick={() => setIsOpenButtonTypes(true)}
        >
          Open Button Types Demo
        </Button>

        <Modal
          isOpen={isOpenButtonTypes}
          onClose={() => setIsOpenButtonTypes(false)}
          title="Button Types Demo"
          subtitle="Showcasing different button type combinations"
          primaryButtonText="Primary Action"
          secondaryButtonText="Secondary Action"
          onPrimaryButtonClick={() => setIsOpenButtonTypes(false)}
          onSecondaryButtonClick={() => setIsOpenButtonTypes(false)}
          primaryButtonType={ButtonType.PRIMARY}
          secondaryButtonType={ButtonType.SECONDARY}
        >
          <div className="space-y-4">
            <div className="text-gray-600">
              <h4 className="font-medium mb-2">Available Button Types:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>PRIMARY - For main actions</li>
                <li>SECONDARY - For alternative actions</li>
                <li>DANGER - For destructive actions</li>
                <li>SUCCESS - For positive actions</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button buttonType={ButtonType.PRIMARY}>Primary</Button>
              <Button buttonType={ButtonType.SECONDARY}>Secondary</Button>
              <Button buttonType={ButtonType.DANGER}>Danger</Button>
              <Button buttonType={ButtonType.SUCCESS}>Success</Button>
            </div>
          </div>
        </Modal>
      </div>

    </>
  );
};

export default ModalDemo; 