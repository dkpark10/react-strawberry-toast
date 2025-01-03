import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import type { BaseOptions, ToastState } from '../types';

export const toastStore = new ToastStore<ToastState>();

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
  () =>
  (data: ToastState['data'], options: BaseOptions = {}): ToastState['toastId'] => {
    const { timeOut = DISAPPEAR_TIMEOUT, removeTimeOut = REMOVE_TIMEOUT } = options;

    const toastId = idGenerator();
    const createdAt = new Date().getTime();

    const value: ToastState = {
      ...options,
      timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
      toastId,
      data,
      createdAt,
      removeTimeOut,
      isVisible: true,
    };

    toastQueue.push(value);

    toastStore.setState([...toastQueue]);

    return toastId;
  };

export const toast = (data: ToastState['data'], options: BaseOptions = {}) =>
  createToast()(data, options);

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

      toastStore.setState([...toastQueue]);

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

  const leftTimeout = target.createdAt + (target.timeOut || DISAPPEAR_TIMEOUT) - (target.pausedAt || 0);
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
  toastStore.setState([...toastQueue]);
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

  toastStore.setState([...toastQueue]);
};

toast.remove = (toastId: ToastState['toastId'], timeOut = REMOVE_TIMEOUT) => {
  setTimeout(() => {
    toastQueue = toastQueue.filter((toast) => toast.toastId !== toastId);
    toastStore.setState([...toastQueue]);
  }, timeOut);

  deleteTimer(toastId);
};

toast.isActive = (toastId: ToastState['toastId']): boolean => toastTimers.has(toastId);
