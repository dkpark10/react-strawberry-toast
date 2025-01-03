import { useSyncExternalStore } from 'react';
import { toastStore } from '../core/headless-toast';
import type { ToastState } from '../types';

export const useStrawberryToast = (): Array<ToastState> => {
  return useSyncExternalStore(
    toastStore.subscribe.bind(toastStore),
    toastStore.getSnapShot.bind(toastStore),
    toastStore.getSnapShot.bind(toastStore)
  );
};
