import { useEffect } from "react";

export const useScrollLock = (shouldLock: boolean) => {
    useEffect(() => {
      if (shouldLock) {
        document.documentElement.classList.add('overflow-hidden', 'touch-none', 'overscroll-none');
        document.body.classList.add('overflow-hidden', 'fixed', 'w-full', 'h-full');
      } else {
        document.documentElement.classList.remove('overflow-hidden', 'touch-none', 'overscroll-none');
        document.body.classList.remove('overflow-hidden', 'fixed', 'w-full', 'h-full');
      }
  
      return () => {
        document.documentElement.classList.remove('overflow-hidden', 'touch-none', 'overscroll-none');
        document.body.classList.remove('overflow-hidden', 'fixed', 'w-full', 'h-full');
      };
    }, [shouldLock]);
  };