import { themeConfig } from '../../themeConfig';
import { TextInputState } from '../TextInput/types';
import { UnitPosition } from './types';
import { cn } from '../../utils';

const { unitInput: unitTheme } = themeConfig.euler;

export const getUnitClasses = (position: UnitPosition, state: TextInputState) => {
  const isDisabled = state === 'disabled';
  
  return cn(
    unitTheme.unit.base,
    unitTheme.unit.positions[position],
    isDisabled && unitTheme.unit.states.disabled
  );
}; 