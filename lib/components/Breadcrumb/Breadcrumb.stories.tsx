import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './index';
import { Home, User, Lock, AlertCircle, ChevronRight, File, Folder } from 'lucide-react';

// Create a wrapper component that uses text inputs instead of object controls
interface TextInputBreadcrumbProps {
  path?: string;
  hrefs?: string;
  showLeftSlots?: boolean;
  showRightSlots?: boolean;
}

const TextInputBreadcrumb = ({
  path = 'Home / Products / Categories',
  hrefs = '/ /products',
  showLeftSlots = true,
  showRightSlots = true,
}: TextInputBreadcrumbProps) => {
  // Split the path into segments
  const pathSegments = path.split('/').map(segment => segment.trim());

  // Split the hrefs into segments (by space instead of slash)
  const hrefSegments = hrefs
    .split(' ')
    .map(segment => segment.trim())
    .filter(Boolean);

  // Create items array for the Breadcrumb component
  const items = pathSegments.map((segment, index) => {
    // Add icons based on position and segment name
    let leftSlot, rightSlot;

    // Determine left icon based on segment name or position
    if (segment.toLowerCase() === 'home') {
      leftSlot = <Home size={18} />;
    } else if (segment.toLowerCase().includes('product')) {
      leftSlot = <Folder size={18} />;
    } else if (segment.toLowerCase().includes('test')) {
      leftSlot = <File size={18} />;
    } else if (segment.toLowerCase().includes('categor')) {
      leftSlot = <Folder size={18} />;
    } else if (index === pathSegments.length - 1) {
      leftSlot = <Lock size={18} />;
    } else {
      // Default icon for other items
      leftSlot = <File size={18} />;
    }

    // Add right icon to all items except the last one
    if (index < pathSegments.length - 1) {
      rightSlot = <ChevronRight size={18} />;
    } else {
      // Only the last item gets a different right icon
      rightSlot = <AlertCircle size={18} />;
    }

    return {
      label: segment,
      href:
        index < pathSegments.length - 1 && index < hrefSegments.length
          ? hrefSegments[index]
          : undefined,
      ...(leftSlot && showLeftSlots && { leftSlot }),
      ...(rightSlot && showRightSlots && { rightSlot }),
    };
  });

  // Truncation is now automatic based on item count
  return <Breadcrumb items={items} />;
};

// Create a separate type for the TextInputBreadcrumb story
type TextInputStory = StoryObj<typeof TextInputBreadcrumb>;

const meta: Meta<typeof TextInputBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: TextInputBreadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb navigation component that automatically truncates paths longer than 4 items and shows a dropdown menu for the hidden items. The last item is always the current page.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    path: {
      control: 'text',
      description: 'All path segments (including current page) separated by / character',
    },
    hrefs: {
      control: 'text',
      description: 'Full URLs for each path segment (except the last one), separated by spaces',
    },
    showLeftSlots: {
      control: 'boolean',
      name: 'Show Left Icons',
      description: 'Toggle visibility of left icon slots',
    },
    showRightSlots: {
      control: 'boolean',
      name: 'Show Right Icons',
      description: 'Toggle visibility of right icon slots',
    },
  },
};

export default meta;

export const Default: TextInputStory = {
  args: {
    path: 'Home / Products / Categories',
    hrefs: '/ /products',
    showLeftSlots: true,
    showRightSlots: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default breadcrumb with customizable paths and URLs. Last segment is automatically the current page.',
      },
    },
  },
};

export const Truncated: TextInputStory = {
  args: {
    path: 'Home / Products / Categories / Test 1 / Test 2 / Test 3',
    hrefs: '/ /products /categories /test1 /test2',
    showLeftSlots: true,
    showRightSlots: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with more than 4 levels automatically showing truncation with dropdown. You will see the first item, ellipsis menu, and last three items.',
      },
    },
  },
};

// Direct component stories for more complex examples
export const WithIcons = () => {
  return (
    <Breadcrumb
      items={[
        {
          label: 'Home',
          href: '#',
          leftSlot: <Home size={18} />,
        },
        {
          label: 'User Settings',
          href: '#',
          leftSlot: <User size={18} />,
        },
        {
          label: 'Security',
          leftSlot: <Lock size={18} />,
          rightSlot: <AlertCircle size={18} />,
        },
      ]}
    />
  );
};

WithIcons.parameters = {
  docs: {
    description: {
      story: 'Breadcrumb items with left and right icon slots for additional visual information.',
    },
  },
};
