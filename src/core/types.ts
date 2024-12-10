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
  | 'warn'

export interface Options {
  position?: Position;
  timeOut?: number;
  element?: HTMLElement;
}

type CloseFunc = (toastId: number) => void;
type PauseFunc = CloseFunc;
type ResumeFunc = CloseFunc;

export interface ToastMoreOptions {
  id: number;
  data: string | ReactNode | ((props: { close: () => void }) => ReactNode);
  close: CloseFunc;
  pause: PauseFunc;
  resume: ResumeFunc;
  isVisible: boolean;
  createdAt: number;
  toastStatus: ToastStatus;
  pausedAt?: number;
}

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export type ToastState = RequiredExcept<Options, 'element'> & ToastMoreOptions;
