import { useState } from 'react';
import Snackbar from '../../../lib/components/Snackbar/Snackbar';
import { SnackbarPosition, SnackbarType } from '../../../lib/components/Snackbar/types';

const SnackbarDemo = () => {
  const [type, setType] = useState<SnackbarType>('info');
  const [position, setPosition] = useState<SnackbarPosition>('topRight');
  const [heading, setHeading] = useState('Notification');
  const [message, setMessage] = useState('This is a sample notification message.');
  const [actionMessage, setactionMessage] = useState('');
  const [showIcon, setShowIcon] = useState(true);
  const [autoClose, setAutoClose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowSnackbar = () => {
    setIsVisible(true);
  };

  const handleCloseSnackbar = () => {
    setIsVisible(false);
  };

  const renderControls = () => (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={type}
          onChange={e => setType(e.target.value as SnackbarType)}
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="success">Success</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={position}
          onChange={e => setPosition(e.target.value as SnackbarPosition)}
        >
          <option value="topRight">Top Right</option>
          <option value="topLeft">Top Left</option>
          <option value="bottomRight">Bottom Right</option>
          <option value="bottomLeft">Bottom Left</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={e => setHeading(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Action Message (Optional)</label>
        <input
          type="text"
          value={actionMessage}
          onChange={e => setactionMessage(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Additional action message"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showIcon}
              onChange={e => setShowIcon(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Icon</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoClose}
              onChange={e => setAutoClose(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Auto Close (5s)</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Snackbar Demo</h2>
      {renderControls()}

      <div className="mt-6">
        <button
          onClick={handleShowSnackbar}
          className="px-4 py-2 bg-primary-500 text-jp-gray-0 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Show Snackbar
        </button>
      </div>

      {isVisible && (
        <Snackbar
          type={type}
          heading={heading}
          message={message}
          actionMessage={actionMessage || undefined}
          showIcon={showIcon}
          autoClose={autoClose}
          position={position}
          onClose={handleCloseSnackbar}
        />
      )}

      <div className="mt-12 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Preset Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-md">
            <p className="mb-2 text-sm font-medium text-gray-500">Info Snackbar</p>
            <Snackbar
              type="info"
              heading="Information"
              message="This is an informational message"
              autoClose={false}
              position="topRight"
            />
          </div>

          <div className="border p-4 rounded-md">
            <p className="mb-2 text-sm font-medium text-gray-500">Success Snackbar</p>
            <Snackbar
              type="success"
              heading="Success"
              message="Operation completed successfully"
              autoClose={false}
              position="topRight"
            />
          </div>

          <div className="border p-4 rounded-md">
            <p className="mb-2 text-sm font-medium text-gray-500">Warning Snackbar</p>
            <Snackbar
              type="warning"
              heading="Warning"
              message="Please review before proceeding"
              autoClose={false}
              position="topRight"
            />
          </div>

          <div className="border p-4 rounded-md">
            <p className="mb-2 text-sm font-medium text-gray-500">Error Snackbar</p>
            <Snackbar
              type="error"
              heading="Error"
              message="An error occurred while processing your request"
              actionMessage="Please try again or contact support"
              autoClose={false}
              position="topRight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackbarDemo;
