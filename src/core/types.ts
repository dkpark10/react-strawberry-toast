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
  infinity?: boolean;
}

type CloseFunc = (timer: ReturnType<typeof setTimeout>) => void;

export interface ToastMoreOptions {
  id: number;
  data: string | ReactNode | ((props: { close: () => void }) => ReactNode);
  close: CloseFunc;
}

export type ToastState = Array<Options & ToastMoreOptions>;

export type Unpacked<T> = T extends (infer U)[] ? U : never;