// TODO: remove this
import { useRef } from "react";

export function useUniqueLogger() {
  const lastLogRef = useRef<string | null>(null);

  function log(...args: unknown[]) {
    const message = JSON.stringify(args);
    if (message !== lastLogRef.current) {
      console.log(...args);
      lastLogRef.current = message;
    }
  }

  return log;
}