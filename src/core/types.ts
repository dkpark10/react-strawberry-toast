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

export type ToastState = Array<
  Options & { id: number; data: string | ReactNode }
>;
