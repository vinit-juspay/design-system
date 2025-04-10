import { TextInputState } from '../TextInput/types';

export type OTPDigits = '4' | '6';

export interface OTPInputProps {
  digits?: OTPDigits;
  hintText?: string;
  label?: string;
  mandatory?: boolean;
  showHint?: boolean;
  showInfo?: boolean;
  showLabel?: boolean;
  showSublabel?: boolean;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  infoTooltip?: string;
} 