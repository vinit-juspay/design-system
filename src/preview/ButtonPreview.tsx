import React from 'react';
import Button from '../components/Button';

/**
 * Preview component for Button
 * Displays all variants and states of the Button component
 */
const ButtonPreview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Types</h3>
        <div className="flex gap-4 flex-wrap">
          <Button type="primary" size="medium">Primary Button</Button>
          <Button type="secondary" size="medium">Secondary Button</Button>
          <Button type="danger" size="medium">Danger Button</Button>
          <Button type="success" size="medium">Success Button</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <Button type="primary" size="small">Small Button</Button>
          <Button type="primary" size="medium">Medium Button</Button>
          <Button type="primary" size="large">Large Button</Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonPreview; 