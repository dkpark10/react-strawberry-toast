import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import type { BaseOptions, ToastState, Options, NonHeadlessToastState } from '../types';

export const toastStore = new ToastStore<ToastState>();

const idGenerator = generateId();

const createToast =
  () =>
  (data: ToastState['data'], options: BaseOptions = {}): ToastState['toastId'] => {
    const { timeOut = DISAPPEAR_TIMEOUT, removeTimeOut = REMOVE_TIMEOUT } = options;

    const toastId = 'h' + idGenerator();
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

    toastStore.state.push(value);

    toastStore.setState([...toastStore.state]);

    return toastId;
  };

export const toastHandlers = (toastStore: ToastStore) => {
  const deleteTimer = (toastId: ToastState['toastId']) => {
    const timerId = toastStore.toastTimers.get(toastId);
    clearTimeout(timerId);

    toastStore.toastTimers.delete(toastId);
  };

  const isActive = (toastId: ToastState['toastId']): boolean => toastStore.toastTimers.has(toastId);

  const remove = (toastId: ToastState['toastId'], timeOut = REMOVE_TIMEOUT) => {
    setTimeout(() => {
      toastStore.state = toastStore.state.filter((toast) => toast.toastId !== toastId);
      toastStore.setState([...toastStore.state]);
    }, timeOut);

    deleteTimer(toastId);
  };

  const replace = (
    toastId: ToastState['toastId'],
    data: ToastState['data'],
    options: Options & { toastType: NonHeadlessToastState['toastType'] }
  ) => {
    toastStore.state = toastStore.state.map((toast): ToastState => {
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

    toastStore.setState([...toastStore.state]);
  };

  const pause = (toastId: ToastState['toastId']): void => {
    const pausedAt = new Date().getTime();

    toastStore.state = toastStore.state.map((toast): ToastState => {
      if (toast.toastId === toastId) {
        return {
          ...toast,
          pausedAt,
        };
      }
      return toast;
    });

    deleteTimer(toastId);
    toastStore.setState([...toastStore.state]);
  };

  const disappear = (toastId: ToastState['toastId'], timeOut: number): void => {
    const timer = setTimeout(
      () => {
        toastStore.state = toastStore.state.map((toast): ToastState => {
          if (toast.toastId === toastId) {
            return {
              ...toast,
              isVisible: false,
            };
          }
          return toast;
        });

        toastStore.setState([...toastStore.state]);

        const removeTimeOut = toastStore.state.find((toast) => toast.toastId === toastId)?.removeTimeOut;
        remove(toastId, removeTimeOut);
      },
      timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut
    );

    toastStore.toastTimers.set(toastId, timer);
  };

  const resume = (toastId: ToastState['toastId']): void => {
    if (toastStore.toastTimers.has(toastId)) return;

    const target = toastStore.state.find((toast) => toast.toastId === toastId);
    if (!target) return;

    const leftTimeout = target.createdAt + (target.timeOut || DISAPPEAR_TIMEOUT) - (target.pausedAt || 0);
    disappear(toastId, leftTimeout);
  };

  return { isActive, disappear, resume, pause, replace, remove };
};

export const toast = (data: ToastState['data'], options: BaseOptions = {}) => createToast()(data, options);

const handlers = toastHandlers(toastStore);
toast.isActive = handlers.isActive;
toast.disappear = handlers.disappear;
toast.resume = handlers.resume;
toast.pause = handlers.pause;
toast.replace = handlers.replace;
toast.remove = handlers.remove;
