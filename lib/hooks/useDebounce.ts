import { useRef, useCallback } from "react";

/**
 * Custom React hook that returns a debounced version of the provided function.
 * The debounced function delays the invocation of the original function until
 * after a specified delay has elapsed since the last time it was invoked.
 *
 * @param fn - The function to debounce.
 * @param delay - The number of milliseconds to delay the function call.
 *
 * @returns A debounced version of the original function.
 *
 * @example
 * const handleInput = (value: string) => console.log(value);
 * const debouncedInput = useDebounce(handleInput, 300);
 */
export const useDebounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): ((...args: Args) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback((...args: Args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);

  return debouncedFn;
};
