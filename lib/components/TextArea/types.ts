import { TextInputState } from '../TextInput/types';

export enum TextAreaSize {
  DEFAULT = 'default'
}

export interface TextAreaProps {
  hintText?: string;
  label?: string;
  mandatory?: boolean;
  placeholder?: string;
  showHint?: boolean;
  showInfo?: boolean;
  showLabel?: boolean;
  showSublabel?: boolean;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  infoTooltip?: string;
  rows?: number;
  maxLength?: number;
} 