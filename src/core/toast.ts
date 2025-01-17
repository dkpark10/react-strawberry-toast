import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import { toastHandlers } from './toast-handler';
import type { ReactNode } from 'react';
import type { NonHeadlessToastState, ToastState, Options, ToastType, ToastDataWithCallback } from '../types';

export const toastStore = new ToastStore<NonHeadlessToastState>();

const idGenerator = generateId();

const createToast =
  <T = ToastState['data']>(toastType: ToastType = 'default') =>
  (
    data: T extends ToastState['data'] ? ToastState['data'] : ToastDataWithCallback,
    options: Options = {}
  ): ToastState['toastId'] => {
    const {
      timeOut = DISAPPEAR_TIMEOUT,
      removeTimeOut = REMOVE_TIMEOUT,
      pauseOnHover = true,
      toastId: optionToastId,
    } = options;

    const toastId = optionToastId || idGenerator();

    if (toast.isActive(toastId)) {
      throw new Error('A duplicate custom ID is not available.');
    }

    const createdAt = new Date().getTime();

    const value: NonHeadlessToastState = {
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

export const toast = (data: ToastState['data'] | ToastDataWithCallback, options: Options = {}) =>
  createToast<ToastState['data'] | ToastDataWithCallback>()(data, options);

const handlers = toastHandlers<NonHeadlessToastState>(toastStore);
toast.setActive = handlers.setActive;
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
toast.custom = createToast<ToastState['data'] | ToastDataWithCallback>('custom');

toast.promise = (
  promise: Promise<any>,
  promiseOption: {
    loading: ReactNode;
    success: ReactNode;
    error: ReactNode;
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
