import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { TextInputState } from '../TextInput/types';
import { UnitPosition } from './types';

const { unitInput: unitInputTheme } = themeConfig.euler;

export const getUnitClasses = (
  position: UnitPosition,
  state: TextInputState = TextInputState.DEFAULT
) => {
  return cn(
    unitInputTheme.unit.base,
    unitInputTheme.unit.positions[position],
    state === TextInputState.DISABLED && unitInputTheme.unit.states.disabled
  );
};
