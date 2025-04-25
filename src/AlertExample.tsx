import React, { useState } from 'react';
import Alert, { AlertVariant } from '../lib/components/Alert';

const AlertExample = () => {
  const [showDefaultAlert, setShowDefaultAlert] = useState(true);
  const [showRightActionsAlert, setShowRightActionsAlert] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">Alert Component Examples</h1>

      {showDefaultAlert && (
        <Alert
          heading="Info Heading"
          description="This is body message of the information bar which now you have successfully read. This text is going to a run a bit longer so that you can see how spacing in info bar body works"
          onClose={() => setShowDefaultAlert(false)}
        />
      )}

      {showRightActionsAlert && (
        <Alert
          heading="Info Heading"
          description="This is body message of the information bar which now you have successfully read. This text is going to a run a bit longer so that you can see how spacing in info bar body works"
          variant={AlertVariant.ERROR}
          onClose={() => setShowRightActionsAlert(false)}
          primaryAction={{ label: 'Send Alert', onClick: () => console.log('Alert sent') }}
          secondaryAction={{ label: 'Send a Message', onClick: () => console.log('Message sent') }}
        />
      )}
    </div>
  );
};

export default AlertExample;
