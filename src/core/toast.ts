import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import { ToastTypeIcons } from '../components/toast-icons';
import { toastHandlers } from './toast-handler';
import type { ReactNode } from 'react';
import type {
  NonHeadlessToastState,
  ToastState,
  Options,
  ToastType,
  ToastDataWithCallback,
  ToastDataCallback,
} from '../types';

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
      target,
      closeButton,
    } = options;

    const toastId = optionToastId || idGenerator();

    if (toast.isActive(toastId)) {
      throw new Error('A duplicate custom ID is not available.');
    }

    const createdAt = new Date().getTime();

    const value: NonHeadlessToastState = {
      updated: null,
      pausedAt: null,
      className: className || null,
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
      closeButton: closeButton || false, 
      target: target || null,
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
toast.info = createToast('info');
toast.loading = createToast('loading');
toast.custom = createToast<ToastState['data'] | ToastDataWithCallback>('custom');

toast.promise = <T>(
  promise: Promise<T>,
  promiseOption: {
    loading: ReactNode;
    success: ReactNode | ((response: T, opt: ToastDataCallback) => ReactNode);
    error: ReactNode | ((err: any, opt: ToastDataCallback) => ReactNode);
  },
  options: Options = {}
) => {
  const { loading, success, error } = promiseOption;

  const toastId = toast.loading(loading, {
    ...options,
    timeOut: MAX_TIMEOUT,
  });

  const opt: ToastDataCallback = {
    toastId,
    close: () => toast.disappear(toastId, 0),
    immediatelyClose: () => {
      toast.disappear(toastId, 0);
      toast.remove(toastId, 0);
    },
    icons: {
      success: ToastTypeIcons.success,
      error: ToastTypeIcons.error,
      warn: ToastTypeIcons.warn,
      loading: ToastTypeIcons.loading,
      info: ToastTypeIcons.info,
    },
    isVisible: true,
  };

  const timeOut = options.timeOut ||= DISAPPEAR_TIMEOUT;

  promise
    .then((res) => {
      toast.replace(toastId, typeof success === 'function' ? success(res, opt) : success, {
        ...options,
        timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
        toastType: 'success',
      });
    })
    .catch((err) => {
      toast.replace(toastId, typeof error === 'function' ? error(err, opt) : error, {
        ...options,
        timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
        toastType: 'error',
      });
    });
};
