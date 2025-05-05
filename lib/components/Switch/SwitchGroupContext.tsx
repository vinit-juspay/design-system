import { createContext } from 'react';

export interface SwitchGroupContextType {
  name: string;
  values?: string[];
  onChange?: (data: { name: string; value: string; checked: boolean }) => void;
  isDisabled?: boolean;
}

export const SwitchGroupContext = createContext<SwitchGroupContextType | undefined>(undefined); 