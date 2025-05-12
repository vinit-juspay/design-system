import { ReactNode } from "react";

export interface SidebarNavItem {
  label: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onClick?: () => void;
}

interface SidebarNavSection {
  label?: string;
  navItems: SidebarNavItem[];
}

export interface MerchantData {
  label: string;
  sections: SidebarNavSection[];
}

export interface TenantData {
  label: string;
  icon: ReactNode;
  merchantData: MerchantData[];
}

export interface SidebarProps {
  children: ReactNode;
  data: TenantData[];
  topbar: ReactNode;
  activeTenant?: string;
  setActiveTenant?: (tenant: string) => void;
  activeMerchant?: string;
  setActiveMerchant?: (merchant: string) => void;
}
