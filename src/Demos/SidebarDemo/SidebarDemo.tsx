
import { Calculator, Code, FileInput } from 'lucide-react';
import { Sidebar } from '../../../lib/components/Sidebar/Sidebar';


const SidebarDemo = () => {
  const sections = [
    {
      name: "Getting Started",
      isCollapsible: true,
      items: [
        {
          label: "Introduction",
          items: [
            {
              label: "Overview", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Installation", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Quick Start", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, }
          ]
        },
        {
          label: "Components",
          items: [
            { label: "Buttons", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Inputs", leftSlot: <FileInput className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Cards", leftSlot: <Calculator className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, }
          ]
        }
      ],
      showSeperator: true
    },
    {
      name: "Components",
      isCollapsible: true,
      items: [
        {
          label: "Layout",
          items: [
            { label: "Grid", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Container", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Spacing", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, }
          ]
        },
        {
          label: "Navigation",
          items: [
            { label: "Menu", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Tabs", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, },
            { label: "Breadcrumbs", leftSlot: <Code className="h-4 w-4" />,
              rightSlot: <Calculator className="h-4 w-4" />, }
          ]
        }
      ],
      showSeperator: true
    },
    {
      name: "Utilities",
      isCollapsible: false,
      items: [
        { label: "Colors", leftSlot: <Code className="h-4 w-4" />,
          rightSlot: <Calculator className="h-4 w-4" />, },
        { label: "Typography", leftSlot: <Code className="h-4 w-4" />,
          rightSlot: <Calculator className="h-4 w-4" />, },
        { label: "Spacing", leftSlot: <Code className="h-4 w-4" />,
          rightSlot: <Calculator className="h-4 w-4" />, },
        { label: "Shadows", leftSlot: <Code className="h-4 w-4" />,
          rightSlot: <Calculator className="h-4 w-4" />, }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Sidebar Component</h2>
        <p className="text-gray-600 mb-4">
          A flexible sidebar component that supports nested navigation items and collapsible sections.
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <div className="h-[600px] w-64">
          <Sidebar sections={sections} />
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo; 