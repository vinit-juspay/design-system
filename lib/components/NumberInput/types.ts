import { TextInputProps } from '../TextInput/types';

export interface NumberInputProps extends Omit<TextInputProps, 'type' | 'value'> {
  showStepper?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number | undefined) => void;
} 