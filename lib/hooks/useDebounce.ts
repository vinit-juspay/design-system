import { useRef, useCallback } from "react";

/**
 * Custom React hook that returns a debounced version of the provided function.
 * The debounced function delays the invocation of the original function until
 * after a specified delay has elapsed since the last time it was invoked.
 *
 * Useful for optimizing performance when reacting to events that can fire frequently,
 * such as window resizing, keystrokes, or mouse movements.
 *
 * @param {(...args: any[]) => void} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay the function call.
 *
 * @returns {(…args: any[]) => void} - A debounced version of the original function.
 *
 * @example
 * const handleResize = () => console.log('Resized!');
 * const debouncedResize = useDebounce(handleResize, 300);
 * 
 * useEffect(() => {
 *   window.addEventListener('resize', debouncedResize);
 *   return () => window.removeEventListener('resize', debouncedResize);
 * }, [debouncedResize]);
 */
export const useDebounce = (fn: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback((...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);

  return debouncedFn;
};
