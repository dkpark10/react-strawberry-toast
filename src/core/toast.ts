import type { ToastState, Options, ToastMoreOptions } from './types';
import { setState } from './store';
import { generateId } from '../utils';
import { MAX_TIMEOUT, DEFAULT_TIMEOUT } from '../constants';

const idGenerator = generateId();

let toastQueue: Array<ToastState> = [];

const toastTimers = new Map<number, ReturnType<typeof setTimeout>>();

const cleanUp = (toastId: number) => {
  toastQueue = toastQueue.filter((q) => q.id !== toastId);
  setState([...toastQueue]);

  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
};

const pause = (toastId: number) => {
  const pausedAt = new Date().getTime();

  toastQueue = toastQueue.map((toast) => {
    if (toast.id === toastId) {
      return {
        ...toast,
        pausedAt,
      };
    }
    return toast;
  });

  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
  setState([...toastQueue]);
};

const resume = (toastId: number) => {
  const target = toastQueue.find((toast) => toast.id === toastId) as ToastState;

  const timeOut = target.createdAt + target.timeOut - (target.pausedAt || 0);

  const timer = setTimeout(() => {
    cleanUp(toastId);
  }, timeOut);

  toastTimers.set(toastId, timer);
};

export const toast = (data: ToastMoreOptions['data'], options: Options = {}) => {
  const { timeOut = DEFAULT_TIMEOUT, position = 'top-center' } = options;

  const id = idGenerator();
  const createdAt = new Date().getTime();

  const timer = setTimeout(
    () => {
      cleanUp(id);
    },
    timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
  );

  toastTimers.set(id, timer);

  const value: ToastState = {
    ...options,
    timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
    position,
    id,
    data,
    createdAt,
    close: cleanUp,
    pause,
    resume,
  };

  toastQueue.push(value);

  setState([...toastQueue]);
};
