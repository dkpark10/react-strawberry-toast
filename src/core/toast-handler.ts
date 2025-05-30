import { ToastStore } from './store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import type { ToastState, Options, NonHeadlessToastState } from '../types';

export const toastHandlers = <T = ToastState>(
  toastStore: ToastStore<T extends ToastState ? ToastState : NonHeadlessToastState>
) => {
  const deleteTimer = (toastId: ToastState['toastId']) => {
    const timerId = toastStore.toastTimers.get(toastId);
    clearTimeout(timerId);

    toastStore.toastTimers.delete(toastId);
  };

  const setActive = (toastId: ToastState['toastId']): void => {
    toastStore.activatedToasts.add(toastId);
  }
  
  const isActive = (toastId: ToastState['toastId']): boolean => toastStore.activatedToasts.has(toastId);

  const remove = (toastId: ToastState['toastId'], timeOut = REMOVE_TIMEOUT) => {
    if (!isActive(toastId)) {
      return;
    }

    toastStore.activatedToasts.delete(toastId);

    setTimeout(() => {
      toastStore.state = toastStore.state.filter((toast) => toast.toastId !== toastId);
      toastStore.setState([...toastStore.state]);
    }, timeOut);

    deleteTimer(toastId);
  };

  const allClear = () => {
    toastStore.state.forEach((t) => {
      disappear(t.toastId, 0);
    });
  };

  const replace = (
    toastId: ToastState['toastId'],
    data: ToastState['data'],
    options?: Options & { toastType: NonHeadlessToastState['toastType'] }
  ) => {
    toastStore.state = toastStore.state.map((toast) => {
      if (toast.toastId === toastId) {
        return {
          ...toast,
          ...options,
          updated: new Date().getTime(),
          data,
        };
      }
      return toast;
    });

    toastStore.setState([...toastStore.state]);
  };

  const pause = (toastId: ToastState['toastId']): void => {
    const pausedAt = new Date().getTime();

    toastStore.state = toastStore.state.map((toast) => {
      if (toast.toastId === toastId) {
        return {
          ...toast,
          pausedAt,
        };
      }
      return toast;
    });

    deleteTimer(toastId);
  };

  const disappear = (toastId: ToastState['toastId'], timeOut: number): void => {
    const timer = setTimeout(
      () => {
        toastStore.state = toastStore.state.map((toast) => {
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

    // @ts-ignore
    toastStore.toastTimers.set(toastId, timer);
  };

  const resume = (toastId: ToastState['toastId']): void => {
    if (toastStore.toastTimers.has(toastId)) return;

    const target = toastStore.state.find((toast) => toast.toastId === toastId);
    if (!target) return;

    const leftTimeout = target.createdAt + (target.timeOut || DISAPPEAR_TIMEOUT) - (target.pausedAt || 0);
    disappear(toastId, leftTimeout);
  };

  return { setActive, isActive, disappear, resume, pause, replace, remove, allClear };
};
