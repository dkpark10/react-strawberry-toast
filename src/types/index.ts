import type { ReactNode } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastType = 'default' | 'custom' | 'success' | 'error' | 'loading' | 'warn';

export interface BaseOptions {
  toastId?: string;
  timeOut?: number;
  removeTimeOut?: number;
  className?: string;
  style?: React.CSSProperties;
}
export interface ToastBaseState {
  toastId: string;
  data: ReactNode;
  isVisible: boolean;
  createdAt: number;
  pausedAt: number | null;
  updated: number | null;
}

export interface Options extends BaseOptions {
  icon?: ReactNode;
  position?: Position | null;
  containerId?: string | null;
  pauseOnHover?: boolean;
}

export interface ToastDataCallback {
  toastId: ToastBaseState['toastId'];
  close: () => void;
  immediatelyClose: () => void;
  isVisible: boolean;
  icons: Record<Exclude<ToastType, 'default' | 'custom'>, ReactNode>;
}

export type ToastState = ToastBaseState & BaseOptions;

export type ToastDataWithCallback = (props: ToastDataCallback) => ReactNode;

export type NonHeadlessToastState = Required<Options & { toastType: ToastType }> &
  Omit<ToastState, 'data'> & {
    data: ToastDataWithCallback | ReactNode;
  };
