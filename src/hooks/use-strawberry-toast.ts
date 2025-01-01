import { useStrawberryToast as useToast } from '../core/store';
import { toastStore } from '../core/headless-toast';
export type { HeadlessToastState } from '../types';

export const useStrawberryToast = () => {
  return useToast(toastStore);
};
