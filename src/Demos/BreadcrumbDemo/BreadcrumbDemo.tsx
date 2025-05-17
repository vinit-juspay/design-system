import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbVariant } from '../../../lib/components/Breadcrumb';
import { Home, File, FolderOpen, ChevronRight } from 'lucide-react';

const BreadcrumbDemo = () => {
  const [variant, setVariant] = useState<BreadcrumbVariant>(BreadcrumbVariant.DEFAULT);

  const simpleBreadcrumb = [
    { label: 'Home', href: '#', leftSlot: <Home className="w-4 h-4" /> },
    { label: 'Documents', href: '#', leftSlot: <FolderOpen className="w-4 h-4" /> },
    { label: 'Current Page', leftSlot: <File className="w-4 h-4" /> },
  ];

  const longBreadcrumb = [
    { label: 'Home', href: '#', leftSlot: <Home className="w-4 h-4" /> },
    { label: 'Documents', href: '#', leftSlot: <FolderOpen className="w-4 h-4" /> },
    { label: 'Projects', href: '#', leftSlot: <FolderOpen className="w-4 h-4" /> },
    { label: 'Design', href: '#', leftSlot: <FolderOpen className="w-4 h-4" /> },
    { label: 'Components', href: '#', leftSlot: <FolderOpen className="w-4 h-4" /> },
    { label: 'Current Page', leftSlot: <File className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Breadcrumb</h2>
        <p className="mb-6">
          Breadcrumbs help users navigate through a website by showing the hierarchy path.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Simple Breadcrumb</h3>
            <div className="p-6 border border-jp-gray-200 rounded-md">
              <Breadcrumb items={simpleBreadcrumb} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Long Breadcrumb (Default)</h3>
            <div className="p-6 border border-jp-gray-200 rounded-md">
              <Breadcrumb items={longBreadcrumb} variant={BreadcrumbVariant.DEFAULT} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Long Breadcrumb (Truncated)</h3>
            <div className="p-6 border border-jp-gray-200 rounded-md">
              <Breadcrumb items={longBreadcrumb} variant={BreadcrumbVariant.TRUNCATED} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">With Custom Styling</h3>
            <div className="p-6 border border-jp-gray-200 rounded-md bg-jp-gray-50">
              <Breadcrumb 
                items={simpleBreadcrumb} 
                className="bg-white shadow-sm rounded-lg p-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbDemo; 