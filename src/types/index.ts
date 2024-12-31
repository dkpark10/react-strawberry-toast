import type { ReactNode } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastType = 'success' | 'error' | 'loading' | 'warn';

export interface BaseOptions {
  timeOut?: number;
  removeTimeOut?: number;
}
interface ToastBaseState {
  toastId: number;
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
}
interface ToastDataCallback {
  close: () => void;
  immediatelyClose: () => void;
  isVisible: boolean;
  icon: ReactNode;
}

export type HeadlessToastState = ToastBaseState & BaseOptions;

type DataCallback = (props: ToastDataCallback) => ReactNode | string;

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

type ToastStateWithCallback = Omit<ToastBaseState, 'data'> & { data: DataCallback | ReactNode | string };

export type ToastState = RequiredExcept<Options, 'containerId' | 'position'> &
  ToastStateWithCallback & {
    toastType: ToastType;
  };

export type Coord = {
  y: number;
  x: number;
};
