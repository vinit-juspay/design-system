import React from 'react';
import { Sidebar } from '../../../lib/components/Sidebar/Sidebar';
import { SidebarItems } from '../../../lib/components/Sidebar/types';
import { Code, FileText, FolderArchive, FolderOpen, Settings, Users } from 'lucide-react';

const SidebarDemo = () => {
  // Example data for the sidebar
  const basicSidebarData: SidebarItems[] = [
    {
      name: 'Navigation',
      items: [
        {
          label: 'Dashboard',
          items: [
            { label: 'Overview' },
            { label: 'Analytics' },
            { label: 'Reports' }
          ]
        },
        {
          label: 'Projects',
          items: [
            { label: 'Active Projects' },
            { label: 'Archived Projects' }
          ]
        },
        { label: 'Tasks' },
        { label: 'Calendar' }
      ],
      isCollapsible: true
    },
    {
      name: 'Team',
      items: [
        { label: 'Members' },
        { label: 'Roles' }
      ],
      isCollapsible: true,
      showSeperator: true
    },
    {
      name: 'Settings',
      items: [
        { label: 'Preferences' },
        { label: 'Account' },
        { label: 'Security' }
      ],
      isCollapsible: true
    }
  ];

  // Project explorer example data
  const fileExplorerData: SidebarItems[] = [
    {
      name: 'src',
      items: [
        {
          label: 'components',
          items: [
            {
              label: 'Button',
              items: [
                { label: 'Button.tsx' },
                { label: 'types.ts' },
                { label: 'utils.ts' }
              ]
            },
            {
              label: 'Modal',
              items: [
                { label: 'Modal.tsx' },
                { label: 'types.ts' }
              ]
            }
          ]
        },
        {
          label: 'hooks',
          items: [
            { label: 'useToggle.ts' },
            { label: 'useForm.ts' }
          ]
        },
        { label: 'App.tsx' },
        { label: 'index.ts' }
      ],
      isCollapsible: true
    },
    {
      name: 'public',
      items: [
        { label: 'index.html' },
        { label: 'favicon.ico' }
      ],
      isCollapsible: true
    }
  ];

  // Settings sidebar example
  const settingsSidebarData: SidebarItems[] = [
    {
      items: [
        { label: 'General' },
        { label: 'Account' },
        { label: 'Security' },
        { label: 'Notifications' },
        { label: 'Billing' },
        { label: 'Integrations' },
        { label: 'Appearance' }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Sidebar Examples</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Sidebar */}
        <div className="border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium p-4 border-b">Basic Sidebar</h3>
          <div className="h-[400px] relative overflow-hidden">
            <Sidebar sections={basicSidebarData} className="absolute top-0 left-0 z-10" />
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              A standard sidebar with collapsible sections and items.
            </p>
          </div>
        </div>

        {/* File Explorer Sidebar */}
        <div className="border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium p-4 border-b">File Explorer Sidebar</h3>
          <div className="h-[400px] relative overflow-hidden">
            <Sidebar sections={fileExplorerData} className="absolute top-0 left-0 z-10" />
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              A sidebar representing a file structure or project explorer.
            </p>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium p-4 border-b">Settings Sidebar</h3>
          <div className="h-[400px] relative overflow-hidden">
            <Sidebar sections={settingsSidebarData} className="absolute top-0 left-0 z-10" />
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              A simple sidebar with a flat structure, ideal for settings or navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo; 