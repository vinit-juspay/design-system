import React from 'react';
import { Menu } from '../../../lib/components/Menu';
import { MenuItemType, MenuType, MenuItemAction } from '../../../lib/components/Menu';
import { User, Settings, HelpCircle, Bell, AlertCircle, Home, Lock, Type, TagIcon, Layers } from 'lucide-react';

const MenuDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Menu Examples</h2>

      {/* Basic Menu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Menu</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.DEFAULT,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Settings',
              type: MenuItemType.DEFAULT,
              slotL: <Settings size={16} />,
            },
            {
              id: '3',
              text: 'Help',
              type: MenuItemType.DEFAULT,
              slotL: <HelpCircle size={16} />,
            },
          ]}
        />
      </div>

      {/* Menu with Submenu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Submenu</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.SUBMENU,
              slotL: <User size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '1-1',
                  text: 'View Profile',
                  type: MenuItemType.DEFAULT,
                  slotL: <User size={16} />,
                },
                {
                  id: '1-2',
                  text: 'Edit Profile',
                  type: MenuItemType.SUBMENU,
                  slotL: <Settings size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '1-2-1',
                      text: 'Personal Info',
                      type: MenuItemType.DEFAULT,
                      slotL: <User size={16} />,
                    },
                    {
                      id: '1-2-2',
                      text: 'Preferences',
                      type: MenuItemType.DEFAULT,
                      slotL: <Settings size={16} />,
                    },
                    {
                      id: '1-2-3',
                      text: 'Security',
                      type: MenuItemType.DEFAULT,
                      slotL: <Lock size={16} />,
                    },
                  ],
                },
                {
                  id: '1-3',
                  text: 'Account Settings',
                  type: MenuItemType.SUBMENU,
                  slotL: <Lock size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '1-3-1',
                      text: 'Billing',
                      type: MenuItemType.DEFAULT,
                      slotL: <TagIcon size={16} />,
                    },
                    {
                      id: '1-3-2',
                      text: 'Subscription',
                      type: MenuItemType.DEFAULT,
                      slotL: <Layers size={16} />,
                    },
                    {
                      id: '1-3-3',
                      text: 'API Keys',
                      type: MenuItemType.DEFAULT,
                      slotL: <Lock size={16} />,
                    },
                  ],
                },
              ],
            },
            {
              id: '2',
              text: 'Notifications',
              type: MenuItemType.SUBMENU,
              slotL: <Bell size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '2-1',
                  text: 'All Notifications',
                  type: MenuItemType.DEFAULT,
                  slotL: <Bell size={16} />,
                },
                {
                  id: '2-2',
                  text: 'Unread',
                  type: MenuItemType.SUBMENU,
                  slotL: <AlertCircle size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '2-2-1',
                      text: 'High Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '2-2-2',
                      text: 'Medium Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '2-2-3',
                      text: 'Low Priority',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '2-3',
                  text: 'Settings',
                  type: MenuItemType.SUBMENU,
                  slotL: <Settings size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '2-3-1',
                      text: 'Email Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                    {
                      id: '2-3-2',
                      text: 'Push Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                    {
                      id: '2-3-3',
                      text: 'SMS Notifications',
                      type: MenuItemType.DEFAULT,
                      slotL: <Bell size={16} />,
                    },
                  ],
                },
              ],
            },
            {
              id: '3',
              text: 'Help & Support',
              type: MenuItemType.SUBMENU,
              slotL: <HelpCircle size={16} />,
              hasSubmenu: true,
              submenuItems: [
                {
                  id: '3-1',
                  text: 'Documentation',
                  type: MenuItemType.SUBMENU,
                  slotL: <Type size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '3-1-1',
                      text: 'Getting Started',
                      type: MenuItemType.DEFAULT,
                      slotL: <Home size={16} />,
                    },
                    {
                      id: '3-1-2',
                      text: 'API Reference',
                      type: MenuItemType.DEFAULT,
                      slotL: <Type size={16} />,
                    },
                    {
                      id: '3-1-3',
                      text: 'Tutorials',
                      type: MenuItemType.DEFAULT,
                      slotL: <HelpCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '3-2',
                  text: 'Contact Support',
                  type: MenuItemType.SUBMENU,
                  slotL: <AlertCircle size={16} />,
                  hasSubmenu: true,
                  submenuItems: [
                    {
                      id: '3-2-1',
                      text: 'Email Support',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '3-2-2',
                      text: 'Live Chat',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                    {
                      id: '3-2-3',
                      text: 'Phone Support',
                      type: MenuItemType.DEFAULT,
                      slotL: <AlertCircle size={16} />,
                    },
                  ],
                },
                {
                  id: '3-3',
                  text: 'FAQ',
                  type: MenuItemType.DEFAULT,
                  slotL: <HelpCircle size={16} />,
                },
              ],
            },
          ]}
        />
      </div>

      {/* Multi-select Menu */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Multi-select Menu</h3>
        <Menu
          type={MenuType.MULTI_SELECT}
          items={[
            {
              id: '1',
              text: 'Option 1',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
            {
              id: '2',
              text: 'Option 2',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
            {
              id: '3',
              text: 'Option 3',
              type: MenuItemType.MULTI_SELECT,
              isMultiSelect: true,
            },
          ]}
        />
      </div>

      {/* Menu with Search */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Search</h3>
        <Menu
          hasSearch={true}
          searchPlaceholder="Search items..."
          items={[
            {
              id: '1',
              text: 'Profile',
              type: MenuItemType.DEFAULT,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Settings',
              type: MenuItemType.DEFAULT,
              slotL: <Settings size={16} />,
            },
            {
              id: '3',
              text: 'Help',
              type: MenuItemType.DEFAULT,
              slotL: <HelpCircle size={16} />,
            },
          ]}
        />
      </div>

      {/* Menu with Actions */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Menu with Actions</h3>
        <Menu
          items={[
            {
              id: '1',
              text: 'Edit Profile',
              type: MenuItemType.ACTION,
              action: MenuItemAction.PRIMARY,
              slotL: <User size={16} />,
            },
            {
              id: '2',
              text: 'Delete Account',
              type: MenuItemType.ACTION,
              action: MenuItemAction.DANGER,
              slotL: <User size={16} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default MenuDemo; 