import type { ToastState } from './types';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

let state: ToastState = [];

const listeners = new Set<Listener>();

/** @description must put a new memory value in the nextState. */
export const setState = (nextState: ToastState | ((state: ToastState) => ToastState)) => {
  state = typeof nextState === 'function' ? nextState(state) : nextState;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useStrawberryToast = (): ToastState => {
  return useSyncExternalStore(subscribe, () => state);
};
