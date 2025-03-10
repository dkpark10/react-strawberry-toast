import { ToastState } from "../types";

type Listener = () => void;

export class ToastStore<T = ToastState> {
  state: Array<T> = [];

  listeners = new Set<Listener>();

  /** @description list containing toast activated since mount */
  activatedToasts = new Set<ToastState['toastId']>();

  /** @description list with a timer for toast */
  toastTimers = new Map<ToastState['toastId'], number>();

  constructor() {}

  subscribe(listener: Listener): Listener {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** @description must put a new memory value in the nextState. */
  setState(nextState: Array<T> | ((state: Array<T>) => Array<T>)): void {
    this.state = typeof nextState === 'function' ? nextState(this.state) : nextState;
    this.listeners.forEach((listener) => listener());
  }

  getSnapShot(): Array<T> {
    return this.state;
  }
}
