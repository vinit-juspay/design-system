import { TextInputState } from '../TextInput/types';

export enum TextAreaSize {
  DEFAULT = 'default',
}

export interface TextAreaProps {
  hintText?: string;
  label?: string;
  mandatory?: boolean;
  placeholder?: string;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  infoTooltip?: string;
  rows?: number;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}
