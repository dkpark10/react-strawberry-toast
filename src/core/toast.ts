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
      className,
      style,
    } = options;

    const toastId = optionToastId || idGenerator();

    if (toast.isActive(toastId)) {
      throw new Error('A duplicate custom ID is not available.');
    }

    const createdAt = new Date().getTime();

    const value: NonHeadlessToastState = {
      updated: null,
      pausedAt: null,
      className: className || '',
      style: style || {},
      icon: options.icon || null,
      containerId: options.containerId || null,
      position: options.position || null,
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
toast.allClear = handlers.allClear;

toast.success = createToast('success');
toast.error = createToast('error');
toast.warn = createToast('warn');
toast.loading = createToast('loading');
toast.custom = createToast<ToastState['data'] | ToastDataWithCallback>('custom');

toast.promise = <T>(
  promise: Promise<T>,
  promiseOption: {
    loading: ReactNode;
    success: ReactNode | ((response: T) => ReactNode);
    error: ReactNode | ((err: any) => ReactNode);
  },
  options: Options = {}
) => {
  const { loading, success, error } = promiseOption;

  const toastId = toast.loading(loading, {
    ...options,
    timeOut: MAX_TIMEOUT,
  });

  promise
    .then((res) => {
      toast.replace(toastId, typeof success === 'function' ? success(res) : success, {
        ...options,
        timeOut: options.timeOut || DISAPPEAR_TIMEOUT,
        toastType: 'success',
      });
    })
    .catch((err) => {
      toast.replace(toastId, typeof error === 'function' ? error(err) : error, {
        ...options,
        timeOut: options.timeOut || DISAPPEAR_TIMEOUT,
        toastType: 'error',
      });
    });
};
