import type { ToastState, Options, ToastMoreOptions, Unpacked } from './types';
import { setState } from './store';

let toastQueue: ToastState = [];

const toastTimers = new Map<number, ReturnType<typeof setTimeout>>();

const cleanUp = (toastId: number) => {
  toastQueue = toastQueue.filter((q) => q.id !== toastId);
  setState([...toastQueue]);

  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
};

export const toast = (data: ToastMoreOptions['data'], options?: Options) => {
  const id = new Date().getTime();

  const timeOut = options?.timeOut ?? import.meta.env.DEV ? 1_000 : 3_000;

  const timer = options?.infinity
    ? 0
    : setTimeout(() => {
        cleanUp(timer);
      }, timeOut);

  if (!options?.infinity) {
    toastTimers.set(id, timer);
  }

  const value: Unpacked<ToastState> = {
    ...options,
    id,
    data,
    close: cleanUp,
    infinity: options?.infinity,
  };

  toastQueue.push(value);

  setState([...toastQueue]);
};
