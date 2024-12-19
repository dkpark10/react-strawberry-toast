import type { ReactNode } from 'react';

export type Top = 'top';
export type Left = 'left';
export type Right = 'right';
export type Bottom = 'bottom';

export type Direction = Top | Left | Right | Bottom;

export type Position =
  | `${Bottom}-${Left}`
  | `${Bottom}-center`
  | `${Bottom}-${Right}`
  | `${Top}-${Left}`
  | `${Top}-center`
  | `${Top}-${Right}`

export type ToastStatus =
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
  immediatelyClose: () => void;
  isVisible: boolean;
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

export type Coord = {
  y: number;
  x: number;
}