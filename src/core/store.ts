import type { ToastState } from './types';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

type ToastStateList = Array<ToastState>;

let state: ToastStateList = [];

const listeners = new Set<Listener>();

/** @description must put a new memory value in the nextState. */
export const setState = (nextState: ToastStateList | ((state: ToastStateList) => ToastStateList)): void => {
  state = typeof nextState === 'function' ? nextState(state) : nextState;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: Listener): Listener => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useStrawberryToast = (): ToastStateList => {
  return useSyncExternalStore(subscribe, () => state);
};
