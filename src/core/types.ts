import type { ReactNode } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastType = 'success' | 'error' | 'loading' | 'warn';

export interface Options {
  position?: Position;
  timeOut?: number;
  removeTimeOut?: number;
  containerId?: string;
  pauseOnHover?: boolean;
}

interface ToastDataCallback {
  close: () => void;
  immediatelyClose: () => void;
  isVisible: boolean;
  icon: ReactNode;
}

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export type ToastState = RequiredExcept<Options, 'containerId'> & {
  toastId: number;
  data: string | ReactNode | ((props: ToastDataCallback) => ReactNode);
  isVisible: boolean;
  createdAt: number;
  toastType: ToastType;
  pausedAt?: number;
  updated?: boolean;
};

export type Coord = {
  y: number;
  x: number;
};
