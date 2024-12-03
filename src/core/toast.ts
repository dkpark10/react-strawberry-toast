import type { ToastState, Options } from './types';
import { setState } from './store';
import type { ReactNode } from 'react';

let toastQueue: ToastState = [];

const toastTimer = new Map<number, ReturnType<typeof setTimeout>>();

export const toast = (data: string | ReactNode, options?: Options) => {
  const id = new Date().getTime();

  const timer = setTimeout(() => {
    toastTimer.delete(id);
    toastQueue = toastQueue.filter((q) => q.id !== id);
    setState([...toastQueue]);

    clearTimeout(timer);
  }, options?.timeOut ?? 3_000);

  const value = {
    ...options,
    data,
    id,
  };

  toastTimer.set(id, timer);
  toastQueue.push(value);

  setState([...toastQueue]);
};
