import { TextInputState } from '../TextInput/types';

export enum OTPDigits {
  FOUR = '4',
  SIX = '6',
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum OTPKeyboardKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  BACKSPACE = 'Backspace',
}

export interface OTPInputProps {
  digits?: OTPDigits;
  hintText?: string;
  label?: string;
  mandatory?: boolean;
  state?: TextInputState;
  sublabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  infoTooltip?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}
