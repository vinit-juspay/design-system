import { Button } from '../../../lib/main';
import { Info, AlertCircle, HelpCircle, Settings } from 'lucide-react';
import { ButtonType } from '../../../lib/components/Button/types';
import BaseTooltip from '../../../lib/components/BaseTooltip/BaseTooltip';

const BaseTooltipDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Base Tooltip Examples</h2>

      {/* Basic Tooltips */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Tooltips</h3>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip
            trigger={<Button buttonType={ButtonType.PRIMARY}>Hover Me</Button>}
            content="This is a basic tooltip"
          />

          <BaseTooltip
            trigger={<Button buttonType={ButtonType.SECONDARY}>Info Tooltip</Button>}
            content={
              <div className="flex items-center gap-2">
                <Info size={16} />
                <span>Information tooltip</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Tooltips with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip
            trigger={
              <Button buttonType={ButtonType.PRIMARY} leadingIcon={Info}>
                Info
              </Button>
            }
            content="Information tooltip"
          />

          <BaseTooltip
            trigger={
              <Button buttonType={ButtonType.PRIMARY} leadingIcon={AlertCircle}>
                Alert
              </Button>
            }
            content="Alert tooltip"
          />

          <BaseTooltip
            trigger={
              <Button buttonType={ButtonType.PRIMARY} leadingIcon={HelpCircle}>
                Help
              </Button>
            }
            content="Help tooltip"
          />

          <BaseTooltip
            trigger={
              <Button buttonType={ButtonType.PRIMARY} leadingIcon={Settings}>
                Settings
              </Button>
            }
            content="Settings tooltip"
          />
        </div>
      </div>

      {/* Tooltips with Custom Content */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Custom Content</h3>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip
            trigger={<Button buttonType={ButtonType.PRIMARY}>Custom Content</Button>}
            content={
              <div className="p-2">
                <h4 className="font-bold mb-1">Custom Tooltip</h4>
                <p>This is a custom tooltip with HTML content</p>
              </div>
            }
          />

          <BaseTooltip
            trigger={<Button buttonType={ButtonType.PRIMARY}>Complex Content</Button>}
            content={
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <Info size={16} />
                  <div>
                    <h4 className="font-bold">Title</h4>
                    <p className="text-sm">Description text</p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Tooltips with Different Triggers */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Different Triggers</h3>
        <div className="flex flex-wrap gap-4">
          <BaseTooltip
            trigger={<span className="text-blue-500 cursor-help">Hover over text</span>}
            content="Text trigger tooltip"
          />

          <BaseTooltip
            trigger={<div className="w-8 h-8 rounded-full bg-gray-200 cursor-help" />}
            content="Circle trigger tooltip"
          />

          <BaseTooltip
            trigger={<Info className="w-6 h-6 text-gray-500 cursor-help" />}
            content="Icon trigger tooltip"
          />
        </div>
      </div>
    </>
  );
};

export default BaseTooltipDemo;
