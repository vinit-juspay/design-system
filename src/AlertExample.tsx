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
          onClose={() => setShowDefaultAlert(false)}
          actions={[
            { label: 'Send Alert', onClick: () => console.log('Alert sent') }
          ]}
        >
          This is body message of the information bar which now you have successfully read. This text is going to a run a bit longer so that you can see how spacing in info bar body works
        </Alert>
      )}
      
      {showRightActionsAlert && (
        <Alert 
          heading="Info Heading"
          variant={AlertVariant.ACTIONS_RIGHT}
          onClose={() => setShowRightActionsAlert(false)}
          actions={[
            { label: 'Send Alert', onClick: () => console.log('Alert sent') },
            { label: 'Send a Message', onClick: () => console.log('Message sent') }
          ]}
        >
          This is body message of the information bar which now you have successfully read. This text is going to a run a bit longer so that you can see how spacing in info bar body works
        </Alert>
      )}
    </div>
  );
};

export default AlertExample; 