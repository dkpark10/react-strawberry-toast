import { useSyncExternalStore } from 'react';
import { ToastStore } from '../core/store';
import type { ToastState } from '../types';

export const useStrawberryToast = <T = ToastState>(store: ToastStore<T>): Array<T> => {
  return useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapShot.bind(store),
    store.getSnapShot.bind(store)
  );
};
