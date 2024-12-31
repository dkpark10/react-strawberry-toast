import type { ToastState } from './types';
import { useSyncExternalStore } from 'react';

type Listener = () => void;

type ToastStateList = Array<ToastState>;

export class ToastStore<T extends ToastState = ToastState> {
  state: Array<T> = [];

  listeners = new Set<Listener>();

  constructor() {}

  subscribe(listener: Listener): Listener {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    }
  }

  /** @description must put a new memory value in the nextState. */
  setState(nextState: Array<T> | ((state: Array<T>) => Array<T>)): void {
    this.state = typeof nextState === 'function' ? nextState(this.state) : nextState;
    this.listeners.forEach((listener) => listener());
  }

  getSnapShot() {
    return this.state;
  }
}

export const useStrawberryToast = (store: ToastStore): ToastStateList => {
  return useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapShot.bind(store),
    store.getSnapShot.bind(store),
  );
};
