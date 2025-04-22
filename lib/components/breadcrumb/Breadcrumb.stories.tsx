import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './index';
import { BreadcrumbItemProps } from './types';

// Create a wrapper component that uses text inputs instead of object controls
interface TextInputBreadcrumbProps {
  path?: string;
  currentPage?: string;
}

const TextInputBreadcrumb = ({ path = 'Home / Products', currentPage = 'Categories' }: TextInputBreadcrumbProps) => {
  // Split the path into segments
  const pathSegments = path.split('/').map(segment => segment.trim());
  
  // Create items array for the Breadcrumb component
  const items = [
    ...pathSegments.map(segment => ({
      label: segment,
      href: '#',
    })),
    { label: currentPage, isCurrentPage: true }
  ];
  
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
        component: 'Breadcrumb navigation component that automatically truncates paths longer than 4 items and shows a dropdown menu for the hidden items.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    path: {
      control: 'text',
      description: 'Path segments separated by / character',
    },
    currentPage: {
      control: 'text',
      description: 'Current page (last breadcrumb item)',
    }
  },
};

export default meta;

export const Default: TextInputStory = {
  args: {
    path: 'Home',
    currentPage: 'Products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default breadcrumb with two levels. Add more levels by separating path segments with / character.'
      }
    }
  }
};

export const ThreeLevels: TextInputStory = {
  args: {
    path: 'Home / Products',
    currentPage: 'Categories',
  },
  parameters: {
    docs: {
      description: {
        story: 'Three-level breadcrumb navigation.'
      }
    }
  }
};

export const FourLevels: TextInputStory = {
  args: {
    path: 'Home / Products / Categories',
    currentPage: 'Electronics',
  },
  parameters: {
    docs: {
      description: {
        story: 'Four-level breadcrumb navigation - the maximum number of items shown without truncation.'
      }
    }
  }
};

export const Truncated: TextInputStory = {
  args: {
    path: 'Home / Products / Categories / Electronics',
    currentPage: 'Computers',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with more than 4 items is automatically truncated. Middle items are accessible via the dropdown menu.'
      }
    }
  }
};

export const LongPath: TextInputStory = {
  args: {
    path: 'Home / Products / Categories / Electronics / Computers',
    currentPage: 'Laptops',
  },
  parameters: {
    docs: {
      description: {
        story: 'Long breadcrumb path with six levels. Only the first, last two items, and the dropdown menu button are shown.'
      }
    }
  }
};

export const WithLongLabels: TextInputStory = {
  args: {
    path: 'Home / Category with a very long name that should wrap or truncate / Subcategory with long name',
    currentPage: 'Product with an extremely long title that demonstrates how the component handles long text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with very long item labels to test text wrapping and truncation behavior.'
      }
    }
  }
}; 