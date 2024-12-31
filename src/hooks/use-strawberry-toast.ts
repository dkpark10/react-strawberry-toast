import { useStrawberryToast as useToast } from '../core/store';
import { toast, toastStore } from '../core/headless-toast';

export const useStrawberryToast = () => {
  const toasts = useToast(toastStore);

  return {
    toasts,
    handlers: {
      pause: toast.pause,
      resume: toast.resume,
      disappear: toast.disappear,
      replace: toast.replace,
      remove: toast.remove,
      toast,
    },
  };
};
