import type { ReactNode } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export type ToastType = 'default' | 'custom' | 'success' | 'error' | 'loading' | 'warn' | 'info';

export interface BaseOptions {
  toastId?: string;
  timeOut?: number;
  removeTimeOut?: number;
  className?: string | null;
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
  closeButton?: boolean;
  target?: {
    element: HTMLElement;
    offset?: [number, number];
  } | null;
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

export interface ToastContainerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: Position;
  containerId?: string;
  reverse?: boolean;
  gap?: number;
  pauseOnActivate?: boolean;
  stack?: boolean;
}

export type AddionalProps = {
  order: number;
  toastsBySamePosition: Array<NonHeadlessToastState>;
} & Required<Pick<ToastContainerProps, 'gap' | 'pauseOnActivate' | 'stack'>>

export interface ToasterProps {
  toastProps: NonHeadlessToastState & AddionalProps;
}
