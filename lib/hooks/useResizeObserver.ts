import { useEffect } from 'react';

/**
 * Custom React hook that sets up a `ResizeObserver` on a DOM element.
 * It observes changes to the size of the target element and calls the provided callback
 * with the new bounding rectangle (`DOMRectReadOnly`) whenever the size changes.
 *
 * @param {React.RefObject<HTMLElement>} targetRef - A React ref object pointing to the DOM element to be observed.
 * @param {(rect: DOMRectReadOnly) => void} callback - A callback function that is invoked with the new content rect
 *        each time the target element's size changes.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useResizeObserver(ref, (rect) => {
 *   console.log('New dimensions:', rect.width, rect.height);
 * });
 */
export function useResizeObserver(
  targetRef: React.RefObject<HTMLElement>,
  callback: (rect: DOMRectReadOnly) => void
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        callback(entry.contentRect);
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [targetRef, callback]);
}
