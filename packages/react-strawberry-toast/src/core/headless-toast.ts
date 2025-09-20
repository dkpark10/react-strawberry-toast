import { generateId } from '../utils/generate-id';
import { ToastStore } from '../core/store';
import { REMOVE_TIMEOUT, MAX_TIMEOUT, DISAPPEAR_TIMEOUT } from '../constants';
import { toastHandlers } from './toast-handler';
import type { BaseOptions, ToastState } from '../types';

export const toastStore = new ToastStore<ToastState>();

const idGenerator = generateId();

const createToast =
  () =>
  (data: ToastState['data'], options: BaseOptions = {}): ToastState['toastId'] => {
    const { timeOut = DISAPPEAR_TIMEOUT, removeTimeOut = REMOVE_TIMEOUT, toastId: optionToastId } = options;

    const toastId = optionToastId || idGenerator();

    if (toast.isActive(toastId)) {
      throw new Error('A duplicate custom ID is not available.');
    }

    const createdAt = new Date().getTime();

    const value: ToastState = {
      timeOut: timeOut > MAX_TIMEOUT ? MAX_TIMEOUT : timeOut,
      toastId,
      data,
      pausedAt: null,
      updated: null,
      createdAt,
      removeTimeOut,
      isVisible: true,
    };

    toastStore.state.push(value);
    toastStore.setState([...toastStore.state]);

    return toastId;
  };

export const toast = (data: ToastState['data'], options: BaseOptions = {}) => createToast()(data, options);

const handlers = toastHandlers(toastStore);
toast.setActive = handlers.setActive;
toast.isActive = handlers.isActive;
toast.disappear = handlers.disappear;
toast.resume = handlers.resume;
toast.pause = handlers.pause;
toast.replace = handlers.replace;
toast.remove = handlers.remove;
toast.allClear = handlers.allClear;
