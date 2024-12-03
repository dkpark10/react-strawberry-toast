import type { ToastState } from './types';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

let state: ToastState = [];

const listeners = new Set<Listener>();

const getState = () => state;

// must put a new memory value in the nextState.
export const setState = (
  nextState: ToastState | ((state: ToastState) => ToastState)
) => {
  state = typeof nextState === 'function' ? nextState(state) : nextState;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useToast = (): ToastState => {
  return useSyncExternalStore(subscribe, () => getState());
};
