import React from 'react';
import { Tag, SplitTag } from '../../../lib/main';
import { Info, Check, AlertCircle, ArrowRight } from 'lucide-react';

const TagDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Tag Examples</h2>

      {/* Basic Tag Examples */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Tags</h3>
        <div className="flex flex-wrap gap-4">
          <Tag label="Default" />
          <Tag variant="attentive" label="Attentive" />
          <Tag variant="subtle" label="Subtle" />
          <Tag color="primary" label="Primary" />
          <Tag color="success" label="Success" />
          <Tag color="error" label="Error" />
          <Tag color="warning" label="Warning" />
          <Tag color="purple" label="Purple" />
        </div>
      </div>

      {/* Tag Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tag Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Tag size="xs" label="Extra Small" />
          <Tag size="sm" label="Small" />
          <Tag size="md" label="Medium" />
          <Tag size="lg" label="Large" />
        </div>
      </div>

      {/* Tag Styles */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tag Styles</h3>
        <div className="flex flex-wrap gap-4">
          <Tag tagStyle="squarical" label="Squarical" />
          <Tag tagStyle="rounded" label="Rounded" />
        </div>
      </div>

      {/* Tags with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tags with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Tag label="Leading Icon" leadingSlot={<Info size={16} />} />
          <Tag label="Trailing Icon" trailingSlot={<Check size={16} />} />
          <Tag
            label="Both Icons"
            leadingSlot={<AlertCircle size={16} />}
            trailingSlot={<ArrowRight size={16} />}
          />
        </div>
      </div>

      {/* Split Tags */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Split Tags</h3>
        <div className="flex flex-wrap gap-4">
          <SplitTag leftLabel="2" rightLabel="New" />
          <SplitTag leftLabel="5" rightLabel="Pending" color="warning" />
          <SplitTag leftLabel="10" rightLabel="Completed" color="success" />
          <SplitTag leftLabel="3" rightLabel="Failed" color="error" />
          <SplitTag leftLabel="Key" rightLabel="Value" color="primary" tagStyle="squarical" />
        </div>
      </div>
    </>
  );
};

export default TagDemo;
