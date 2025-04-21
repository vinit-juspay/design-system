import { useState } from 'react';
import Alert, {
  AlertActionPlacement,
  AlertStyle,
  AlertVariant,
} from '../../../lib/components/Alert';
import { FileWarning } from 'lucide-react';

const AlertDemo = () => {
  const [variant, setVariant] = useState<AlertVariant>(AlertVariant.PRIMARY);
  const [style, setStyle] = useState<AlertStyle>(AlertStyle.SUBTLE);
  const [actionPlacement, setActionPlacement] = useState<AlertActionPlacement>(
    AlertActionPlacement.BOTTOM
  );
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  const renderControls = () => (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Variant</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={variant}
          onChange={e => setVariant(e.target.value as AlertVariant)}
        >
          {Object.values(AlertVariant).map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Style</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={style}
          onChange={e => setStyle(e.target.value as AlertStyle)}
        >
          {Object.values(AlertStyle).map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Action Placement</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={actionPlacement}
          onChange={e => setActionPlacement(e.target.value as AlertActionPlacement)}
        >
          {Object.values(AlertActionPlacement).map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showCloseButton}
              onChange={e => setShowCloseButton(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Close Button</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showActions}
              onChange={e => setShowActions(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Actions</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showIcon}
              onChange={e => setShowIcon(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Icon</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAlertPreview = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Preview</h3>
      <Alert
        variant={variant}
        style={style}
        actionPlacement={actionPlacement}
        heading="Alert Title"
        description="This is a sample alert message that can be used to display important information to the user. This text is going to a run a bit longer. Sample text to test the alert message. "
        onClose={showCloseButton ? () => {} : undefined}
        icon={showIcon ? undefined : null}
        primaryAction={showActions ? { label: 'Action 1', onClick: () => {} } : undefined}
        secondaryAction={showActions ? { label: 'Action 2', onClick: () => {} } : undefined}
      />
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Alert Demo</h2>
      {renderControls()}
      {renderAlertPreview()}

      <div className=" flex flex-col py-7 gap-2">
        <h3 className="text-base font-medium text-gray-900">Custom Icon</h3>
        <Alert
          variant={AlertVariant.ERROR}
          style={AlertStyle.SUBTLE}
          actionPlacement={AlertActionPlacement.BOTTOM}
          heading="Alert Title"
          primaryAction={{ label: 'Action 1', onClick: () => {} }}
          secondaryAction={{ label: 'Action 2', onClick: () => {} }}
          description="This is a sample alert message that can be used to display important information to the user. This text is going to a run a bit longer. Sample text to test the alert message. "
          icon={<FileWarning size={16} className="pointer-events-none" />}
          onClose={() => {}}
        />
      </div>
    </div>
  );
};

export default AlertDemo;
