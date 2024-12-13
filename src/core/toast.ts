import type { ToastState, Options, ToastMoreOptions, ToastStatus } from './types';
import { setState } from './store';
import { generateId } from '../utils';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DEFAULT_TIMEOUT } from '../constants';

const idGenerator = generateId();

let toastQueue: Array<ToastState> = [];

/** @description key = toast id, value = timer id */
const toastTimers = new Map<number, number>();

const deleteTimer = (toastId: number) => {
  const timerId = toastTimers.get(toastId);
  clearTimeout(timerId);

  toastTimers.delete(toastId);
}

const remove = (toastId: number): void => {
  setTimeout(() => {
    toastQueue = toastQueue.filter((toast) => toast.toastId !== toastId);
    setState([...toastQueue]);
  }, REMOVE_TIMEOUT);

  deleteTimer(toastId);
};

const createToast =
  (toastStatus: ToastStatus): ((data: ToastMoreOptions['data'], options?: Options) => void) =>
  (data: ToastMoreOptions['data'], options: Options = {}) => {
    const { timeOut = DEFAULT_TIMEOUT, position = 'top-center' } = options;

    const toastId = idGenerator();
    const createdAt = new Date().getTime();

    const value: ToastState = {
      ...options,
      timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
      position,
      toastId,
      data,
      createdAt,
      toastStatus,
      isVisible: true,
    };

    toastQueue.push(value);

    setState([...toastQueue]);
  };

export const toast = (data: ToastMoreOptions['data'], options: Options = {}) =>
  createToast('default')(data, options);

toast.success = createToast('success');
toast.error = createToast('error');
toast.warn = createToast('warn');
toast.loading = createToast('loading');

toast.disappear = (toastId: number, timeOut: number) => {
  const timer = setTimeout(
    () => {
      toastQueue = toastQueue.map((toast) => {
        if (toast.toastId === toastId) {
          return {
            ...toast,
            isVisible: false,
          };
        }
        return toast;
      });
      setState([...toastQueue]);
      remove(toastId);
    },
    timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
  );

  toastTimers.set(toastId, timer);
};

toast.resume = (toastId: number): void => {
  if (toastTimers.has(toastId)) return;

  const target = toastQueue.find((toast) => toast.toastId === toastId) as ToastState;

  const leftTimeout = target.createdAt + target.timeOut - (target.pausedAt || 0);
  
  toast.disappear(toastId, leftTimeout);
};

toast.pause = (toastId: number): void => {
  const pausedAt = new Date().getTime();

  toastQueue = toastQueue.map((toast) => {
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

/** @todo */
// toast.promise = (
//   promise: Promise<any>,
//   promiseOption: {
//     loading: string | ReactNode;
//     success: string | ReactNode;
//     error: string | ReactNode;
//   },
//   options: Options = {},
// ) => {
//   const toastId = idGenerator();

//   const { position = 'top-center' } = options;

//   promise.then(() => {}).catch(() => {});
// };
