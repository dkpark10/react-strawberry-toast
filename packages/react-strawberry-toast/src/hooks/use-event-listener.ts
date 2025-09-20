import { useEffect, useRef } from 'react';

export const useEventListener = (eventName: keyof WindowEventMap, callback: (e: Event) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    window.addEventListener(eventName, callbackRef.current);
    return () => {
      window.removeEventListener(eventName, callbackRef.current);
    };
  }, [eventName]);
};
