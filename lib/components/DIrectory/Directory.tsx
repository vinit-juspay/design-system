import { CalendarIcon, AlertCircle, BarChart2, BellIcon, Box, ChevronDown, ChevronRight, CreditCard, FileText, FormInput, Grid, Info, Layout, List, MenuIcon, Square, TagIcon, Users, ListFilter, Type } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

export interface DirectoryProps {
  directoryData?: DirectoryData[];
}

export interface DirectoryData {
  label?: string;
  items?: NavbarItem[];
  isCollapsible?: boolean;
  defaultOpen?: boolean;
}

export interface NavbarItem {
  label: string;
  items?: NavbarItem[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onClick?: () => void;
  href?: string;
}

// NavItem component to handle individual items
const NavItem = ({ item }: { item: NavbarItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <li className="w-full">
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-start gap-3 text-body-md px-3 py-1.5 text-left text-gray-600 font-500 hover:bg-gray-100 rounded-sm transition-colors"
      >
        <div className='flex items-center justify-start gap-2'>
          {item.leftSlot && <span>{item.leftSlot}</span>}
          <span>{item.label}</span>
          {item.rightSlot && <span>{item.rightSlot}</span>}
        </div>
        {hasChildren && (
          <div className="flex items-center justify-center ml-auto">
            <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        )}
      </button>

      {/* Render nested items if expanded */}
      {hasChildren && isExpanded && (
        <ul className="w-full space-y-2 pl-6 mt-2 relative">
          <div className="absolute left-4 top-0 h-full w-[1px] bg-gray-200"></div>
          {item.items && item.items.map((childItem, childIdx) => (
            <NavItem key={childIdx} item={childItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Section component to handle individual sections
const Section = ({ section, sectionIndex }: { section: DirectoryData, sectionIndex: number }) => {
  const [isOpen, setIsOpen] = useState(section.defaultOpen !== false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const isCollapsible = section.isCollapsible !== false;

  return (
    <div
      className="w-full py-3 px-2"
      data-state={isOpen ? 'open' : 'closed'}
      key={`section-${sectionIndex}`}
    >
      {section.label && (
        <div
          className={`px-3 text-body-sm font-medium text-gray-400 uppercase flex items-center gap-2 mb-2 ${isCollapsible ? 'cursor-pointer' : ''}`}
          onClick={isCollapsible ? toggleSection : undefined}
        >
          <p>{section.label}</p>
          {isCollapsible && (
            <ChevronRight className={`w-4 h-4 transition-transform duration-150 ${isOpen ? '-rotate-90' : ''}`} />
          )}
        </div>
      )}

      {section.items && isOpen && (
        <ul className="w-full space-y-2">
          {section.items.map((item, itemIdx) => (
            <NavItem key={itemIdx} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

const sampleData: DirectoryData[] = [
  {
    label: "Basic Components",
    items: [
      {
        label: "Button",
        leftSlot: <Square className="w-4 h-4" />,
      },
      {
        label: "Button Group",
        leftSlot: <Grid className="w-4 h-4" />,
      },
      {
        label: "Input",
        leftSlot: <FormInput className="w-4 h-4" />,
      },
      {
        label: "Tag",
        leftSlot: <TagIcon className="w-4 h-4" />,
      },
      {
        label: "Avatar",
        leftSlot: <Users className="w-4 h-4" />,
      }
    ]
  },
  {
    label: "Navigation",
    items: [
      {
        label: "Menu",
        leftSlot: <MenuIcon className="w-4 h-4" />,
        items: [
          {
            label: "Item 1",
            leftSlot: <Square className="w-4 h-4" />,
            items: [
              {
                label: "Item 1.1",
                leftSlot: <Square className="w-4 h-4" />,
                items: [
                  {
                    label: "Item 1.1.1",
                    leftSlot: <Square className="w-4 h-4" />,
                  }
                ]
              },
              
            ]
          },
          {
            label: "Item 2",
            leftSlot: <Square className="w-4 h-4" />,
          },

        ]
      },
      {
        label: "Dropdown",
        leftSlot: <ChevronDown className="w-4 h-4" />,
      },
      {
        label: "Tabs",
        leftSlot: <Layout className="w-4 h-4" />,
      },
      {
        label: "Accordion",
        leftSlot: <List className="w-4 h-4" />,
      }
    ]
  },
  {
    label: "Feedback",
    items: [
      {
        label: "Alert",
        leftSlot: <AlertCircle className="w-4 h-4" />,
      },
      {
        label: "Snackbar",
        leftSlot: <BellIcon className="w-4 h-4" />,
      },
      {
        label: "Tooltip",
        leftSlot: <Info className="w-4 h-4" />,
      },
      {
        label: "Modal",
        leftSlot: <Box className="w-4 h-4" />,

      }
    ]
  },
  {
    label: "Data Display",
    items: [
      {
        label: "Chart",
        leftSlot: <BarChart2 className="w-4 h-4" />,    
      },
      {
        label: "Chart V2",
        leftSlot: <BarChart2 className="w-4 h-4" />,
      },
      {
        label: "Stat Card",
        leftSlot: <FileText className="w-4 h-4" />,
      }
    ]
  },
  {
    label: "Form Elements",
    items: [
      {
        label: "Date Picker",
        leftSlot: <CalendarIcon className="w-4 h-4" />,
      },
      {
        label: "Selectors",
        leftSlot: <ListFilter className="w-4 h-4" />,
      }
    ]
  },
  {
    label: "Typography",
    items: [
      {
        label: "Fonts",
        leftSlot: <Type className="w-4 h-4" />,
      }
    ]
  }
];

const Directory = ({ directoryData = sampleData }: DirectoryProps) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col gap-4 items-center overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {directoryData.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  );
};

export default Directory;