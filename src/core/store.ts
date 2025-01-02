type Listener = () => void;

export class ToastStore<T> {
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

  getSnapShot(): Array<T> {
    return this.state;
  }
}
