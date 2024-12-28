import { setState } from './store';
import { generateId } from '../utils/generate-id';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import type { ReactNode } from 'react';
import type { ToastState, Options, ToastType } from './types';

const idGenerator = generateId();

let toastQueue: Array<ToastState> = [];

/** @description key = toast id, value = timer id */
const toastTimers = new Map<ToastState['toastId'], number>();

const deleteTimer = (toastId: ToastState['toastId']) => {
  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
};

const createToast =
  (toastType: ToastType = 'success') =>
  (data: ToastState['data'], options: Options = {}): ToastState['toastId'] => {
    const { timeOut = DISAPPEAR_TIMEOUT, removeTimeOut = REMOVE_TIMEOUT, pauseOnHover = true } = options;

    const toastId = idGenerator();
    const createdAt = new Date().getTime();

    const value: ToastState = {
      ...options,
      timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
      toastId,
      data,
      createdAt,
      toastType,
      pauseOnHover,
      removeTimeOut,
      isVisible: true,
    };

    toastQueue.push(value);

    setState([...toastQueue]);

    return toastId;
  };

export const toast = (data: ToastState['data'], options: Options = {}) => createToast()(data, options);

toast.success = createToast('success');
toast.error = createToast('error');
toast.warn = createToast('warn');
toast.loading = createToast('loading');

toast.disappear = (toastId: ToastState['toastId'], timeOut: number): void => {
  const timer = setTimeout(
    () => {
      toastQueue = toastQueue.map((toast): ToastState => {
        if (toast.toastId === toastId) {
          return {
            ...toast,
            isVisible: false,
          };
        }
        return toast;
      });

      setState([...toastQueue]);

      const removeTimeOut = toastQueue.find((toast) => toast.toastId === toastId)?.removeTimeOut;
      toast.remove(toastId, removeTimeOut);
    },
    timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut
  );

  toastTimers.set(toastId, timer);
};

toast.resume = (toastId: ToastState['toastId']): void => {
  if (toastTimers.has(toastId)) return;

  const target = toastQueue.find((toast) => toast.toastId === toastId);

  if (!target) return;

  const leftTimeout = target.createdAt + target.timeOut - (target.pausedAt || 0);
  toast.disappear(toastId, leftTimeout);
};

toast.pause = (toastId: ToastState['toastId']): void => {
  const pausedAt = new Date().getTime();

  toastQueue = toastQueue.map((toast): ToastState => {
    if (toast.toastId === toastId) {
      return {
        ...toast,
        pausedAt,
      };
    }
    return toast;
  });

  deleteTimer(toastId);
  setState([...toastQueue]);
};

toast.replace = (toastId: ToastState['toastId'], data: ToastState['data'], options: Partial<ToastState>) => {
  toastQueue = toastQueue.map((toast): ToastState => {
    if (toast.toastId === toastId) {
      return {
        ...toast,
        ...options,
        updated: true,
        data,
      };
    }
    return toast;
  });

  setState([...toastQueue]);
};

toast.remove = (toastId: ToastState['toastId'], timeOut = REMOVE_TIMEOUT) => {
  setTimeout(() => {
    toastQueue = toastQueue.filter((toast) => toast.toastId !== toastId);
    setState([...toastQueue]);
  }, timeOut);

  deleteTimer(toastId);
};

toast.isActive = (toastId: ToastState['toastId']): boolean => toastTimers.has(toastId);

toast.promise = (
  promise: Promise<any>,
  promiseOption: {
    loading: string | ReactNode;
    success: string | ReactNode;
    error: string | ReactNode;
  },
  options: Options = {}
) => {
  const { loading, success, error } = promiseOption;

  const toastId = toast.loading(loading, {
    ...options,
    timeOut: MAX_TIMEOUT,
  });

  promise
    .then(() => {
      toast.replace(toastId, success, {
        ...options,
        toastType: 'success',
      });
    })
    .catch(() => {
      toast.replace(toastId, error, {
        ...options,
        toastType: 'error',
      });
    });
};
