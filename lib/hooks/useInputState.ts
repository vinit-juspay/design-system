import { useState } from 'react';
import { TextInputState } from '../components/TextInput/types';

interface UseInputStateProps {
  initialState?: TextInputState;
  initialValue?: string | number;
  isStepperInteraction?: boolean;
}

/**
 * Custom hook for managing input component visual states
 * Provides consistent state management for focus, hover, filled states
 * and special interactions like stepper buttons
 */
export function useInputState({
  initialState = TextInputState.DEFAULT,
  initialValue = '',
  isStepperInteraction = false,
}: UseInputStateProps = {}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(isStepperInteraction);
  const [value, setValue] = useState<string>(initialValue.toString());

  // Compute the visual state based on current conditions
  const visualState =
    initialState === TextInputState.ERROR
      ? TextInputState.ERROR // Always keep ERROR state regardless of focus
      : isFocused || isInteracting
        ? TextInputState.FOCUSED
        : // If we have a value and the base state is DEFAULT, show as FILLED
          value && initialState === TextInputState.DEFAULT
          ? TextInputState.FILLED
          : initialState;

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle input blur - only if not interacting with a secondary control
  const handleBlur = () => {
    if (!isInteracting) {
      setIsFocused(false);
    }
  };

  // Handle interaction with secondary controls (like stepper buttons)
  const startInteraction = () => {
    setIsInteracting(true);
  };

  // End interaction with secondary controls
  const endInteraction = () => {
    setIsInteracting(false);
    // Optionally refocus the input
  };

  // Update value used for filled state detection
  const updateValue = (newValue: string | number) => {
    setValue(newValue.toString());
  };

  return {
    isFocused,
    visualState,
    handleFocus,
    handleBlur,
    startInteraction,
    endInteraction,
    updateValue,
    value,
  };
}
