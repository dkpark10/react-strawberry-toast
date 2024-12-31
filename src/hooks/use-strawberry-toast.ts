import { useStrawberryToast as useToast } from '../core/store';
import { toastStore } from '../core/headless-toast';

export const useStrawberryToast = () => {
  return useToast(toastStore);
};
