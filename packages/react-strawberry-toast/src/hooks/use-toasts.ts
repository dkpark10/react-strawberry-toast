import { useSyncExternalStore } from 'react';
import { toastStore } from '../core/toast';
import type { NonHeadlessToastState } from '../types';

export const useToasts = (): Array<NonHeadlessToastState> => {
  return useSyncExternalStore(
    toastStore.subscribe.bind(toastStore),
    toastStore.getSnapShot.bind(toastStore),
    toastStore.getSnapShot.bind(toastStore)
  );
};
