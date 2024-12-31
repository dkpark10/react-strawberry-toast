import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import type { HeadlessOption, HeadlessToastState } from './types';

export const toastStore = new ToastStore<HeadlessToastState>();

const idGenerator = generateId();

let toastQueue: Array<HeadlessToastState> = [];

/** @description key = toast id, value = timer id */
const toastTimers = new Map<HeadlessToastState['toastId'], number>();

const deleteTimer = (toastId: HeadlessToastState['toastId']) => {
  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
};

const createToast =
  () =>
  (data: HeadlessToastState['data'], options: HeadlessOption = {}): HeadlessToastState['toastId'] => {
    const { timeOut = DISAPPEAR_TIMEOUT, removeTimeOut = REMOVE_TIMEOUT } = options;

    const toastId = idGenerator();
    const createdAt = new Date().getTime();

    const value: HeadlessToastState = {
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

export const toast = (data: HeadlessToastState['data'], options: HeadlessOption = {}) =>
  createToast()(data, options);

toast.disappear = (toastId: HeadlessToastState['toastId'], timeOut: number): void => {
  const timer = setTimeout(
    () => {
      toastQueue = toastQueue.map((toast): HeadlessToastState => {
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

toast.resume = (toastId: HeadlessToastState['toastId']): void => {
  if (toastTimers.has(toastId)) return;

  const target = toastQueue.find((toast) => toast.toastId === toastId);

  if (!target) return;

  const leftTimeout = target.createdAt + target.timeOut - (target.pausedAt || 0);
  toast.disappear(toastId, leftTimeout);
};

toast.pause = (toastId: HeadlessToastState['toastId']): void => {
  const pausedAt = new Date().getTime();

  toastQueue = toastQueue.map((toast): HeadlessToastState => {
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

toast.replace = (toastId: HeadlessToastState['toastId'], data: HeadlessToastState['data'], options: Partial<HeadlessToastState>) => {
  toastQueue = toastQueue.map((toast): HeadlessToastState => {
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

toast.remove = (toastId: HeadlessToastState['toastId'], timeOut = REMOVE_TIMEOUT) => {
  setTimeout(() => {
    toastQueue = toastQueue.filter((toast) => toast.toastId !== toastId);
    toastStore.setState([...toastQueue]);
  }, timeOut);

  deleteTimer(toastId);
};

toast.isActive = (toastId: HeadlessToastState['toastId']): boolean => toastTimers.has(toastId);
