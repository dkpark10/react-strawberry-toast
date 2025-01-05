import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import { toastHandlers } from './toast-handler';
import type { ReactNode } from 'react';
import { type NonHeadlessToastState as ToastState, type Options, type ToastType } from '../types';

export const toastStore = new ToastStore<ToastState>();

const idGenerator = generateId();

const createToast =
  (toastType: ToastType = 'default') =>
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

    toastStore.state.push(value);
    toastStore.setState([...toastStore.state]);

    return toastId;
  };

export const toast = (data: ToastState['data'], options: Options = {}) => createToast()(data, options);

const handlers = toastHandlers<ToastState>(toastStore);
toast.isActive = handlers.isActive;
toast.disappear = handlers.disappear;
toast.resume = handlers.resume;
toast.pause = handlers.pause;
toast.replace = handlers.replace;
toast.remove = handlers.remove;

toast.success = createToast('success');
toast.error = createToast('error');
toast.warn = createToast('warn');
toast.loading = createToast('loading');

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
