import type { ReactNode } from 'react';
import type { RequiredExcept } from './utils';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastType = 'default' | 'success' | 'error' | 'loading' | 'warn';

export interface BaseOptions {
  timeOut?: number;
  removeTimeOut?: number;
}
interface ToastBaseState {
  toastId: string;
  data: string | ReactNode;
  isVisible: boolean;
  createdAt: number;
  pausedAt?: number;
  updated?: boolean;
}

export interface Options extends BaseOptions {
  position?: Position;
  containerId?: string;
  pauseOnHover?: boolean;
  toastType?: ToastType;
}
interface ToastDataCallback {
  close: () => void;
  immediatelyClose: () => void;
  isVisible: boolean;
  icons: Record<Exclude<ToastType, 'default'>, ReactNode>;
}

export type ToastState = ToastBaseState & BaseOptions;

export type ToastDataWithCallback = (props: ToastDataCallback) => ReactNode | string;

export type NonHeadlessToastState = RequiredExcept<Options, 'containerId' | 'position'> &
  Omit<ToastState, 'data'> & {
    data: ToastDataWithCallback | ReactNode | string;
  };
