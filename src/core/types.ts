import type { ReactNode } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastStatus =
  | 'default'
  | 'success'
  | 'error'
  | 'loading'
  | 'warn';

export interface Options {
  position?: Position;
  timeOut?: number;
  element?: HTMLElement;
}

interface ToastDataCallback {
  close: () => void;
  icon: ReactNode;
}

export interface ToastMoreOptions {
  toastId: number;
  data: string | ReactNode | ((props: ToastDataCallback) => ReactNode);
  isVisible: boolean;
  createdAt: number;
  toastStatus: ToastStatus;
  pausedAt?: number;
  updated?: boolean;
}

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export type ToastState = RequiredExcept<Options, 'element'> & ToastMoreOptions;
