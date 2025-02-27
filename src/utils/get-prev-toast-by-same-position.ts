import { toastStore } from '../core/toast';
import { ToastState } from '../types';

export const getPrevToastBySamePosition = (toastId: ToastState['toastId']): ToastState['toastId'] | null => {
  const currentToastPosition = toastStore.state.find((t) => toastId === t.toastId)?.position || 'top-center';

  const isTop = /top/.test(currentToastPosition);
  const isLeft = /left/.test(currentToastPosition);
  const isCenter = /center/.test(currentToastPosition);

  const toastsBySamePosition = toastStore.state
    .filter((t) => (isTop ? /top/.test(t.position!) : /bottom/.test(t.position!)))
    .filter((t) => {
      if (isLeft) {
        return /left/.test(t.position!);
      } else if (isCenter) {
        return /center/.test(t.position!);
      }
      return /right/.test(t.position!);
    });

  const prevIndex = toastsBySamePosition.findIndex((t) => t.toastId === toastId) - 1;
  if (prevIndex <= -1) return null;

  return toastsBySamePosition[prevIndex].toastId;
};
