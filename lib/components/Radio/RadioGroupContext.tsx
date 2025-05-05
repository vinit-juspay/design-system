import { createContext } from 'react';

export interface RadioGroupContextType {
  name: string;
  value?: string;
  onChange?: (data: { name: string; value: string }) => void;
  isDisabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined); 