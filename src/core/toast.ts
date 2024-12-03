import type { ToastState, Options, ToastMoreOptions, Unpacked } from './types';
import { setState } from './store';

let toastQueue: ToastState = [];

export const toast = (data: ToastMoreOptions['data'], options?: Options) => {
  const id = new Date().getTime();

  const cleanUp = (timer: ReturnType<typeof setTimeout>) => {
    toastQueue = toastQueue.filter((q) => q.id !== id);
    setState([...toastQueue]);
    clearTimeout(timer);
  };

  const timeOut = options?.timeOut ?? import.meta.env.DEV ? 1_000 : 3_000;

  const timer = setTimeout(() => {
    cleanUp(timer);
  }, timeOut);

  const value: Unpacked<ToastState> = {
    ...options,
    id,
    data,
    close: cleanUp,
    timerId: timer,
  };

  toastQueue.push(value);

  setState([...toastQueue]);
};
