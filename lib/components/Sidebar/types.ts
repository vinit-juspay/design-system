import { ReactNode } from "react";
import { DirectoryData } from "../DIrectory/Directory";

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

interface TenantInfo {
  label: string;
  icon: ReactNode;
  id?: string;
}

interface MerchantInfo {
  label: string;
  icon: ReactNode;
  id?: string;
}

export interface SidebarProps {
  tenants: TenantInfo[];
  merchants: MerchantInfo[];
  children: ReactNode;
  data: DirectoryData[];
  topbar: ReactNode;
  activeTenant?: string;
  setActiveTenant?: (tenant: string) => void;
  activeMerchant?: string;
  setActiveMerchant?: (merchant: string) => void;
}
