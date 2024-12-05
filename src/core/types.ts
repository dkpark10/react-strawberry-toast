import type { ReactNode, RefObject } from 'react';

export type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

export interface Options {
  position?: Position;
  timeOut?: number;
  ref?: RefObject<HTMLElement>;
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
  createdAt: number;
  pausedAt?: number;
}

export type ToastState = Array<Options & ToastMoreOptions>;

export type Unpacked<T> = T extends (infer U)[] ? U : never;