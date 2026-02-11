'use client';

import { Toast } from './toast';
import { useToasts } from '../hooks/use-toasts';
import type { ToasterProps, Position, ToastContainerProps, NonHeadlessToastState as ToastState } from '../types';
import { STYLE_NAMESPACE } from '../constants';

export function ToastContainer({
  className,
  style,
  position: globalPosition = 'top-center',
  containerId = '',
  gap = 9,
  reverse = false,
  pauseOnActivate = true,
  stack = false,
}: ToastContainerProps) {
  const toastList = useToasts();

  const absoluteToastsFilter = (toast: ToastState) => toast.target?.element;
  const containerIdFilter = (toast: ToastState) =>
    containerId ? toast.containerId === containerId : toast.containerId ? false : true;

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList
    .filter((toast) => !absoluteToastsFilter(toast))
    .reduce((acc, toast) => {
      const key = toast.position || globalPosition;
      toast.position = key;
      acc[key] = acc[key] || [];
      acc[key].push(toast);
      return acc;
    }, {} as Record<Position, Array<ToastState>>);

  return (
    <div id={`${STYLE_NAMESPACE}__root`} data-container-id={containerId}>
      {toastList
        .filter(absoluteToastsFilter)
        .filter(containerIdFilter)
        .map((toast, order, self) => {
          const mergedProps: ToasterProps['toastProps'] =
            Object.assign(toast, { gap, order, toastsBySamePosition: self, pauseOnActivate, stack });

          return (
            <Toast
              key={toast.toastId}
              toastProps={mergedProps}
            />
          )
        })}
      {Object.entries(toastsByPosition).map(([position, toastByPosition]) => {
        const filteredToasts = toastByPosition.filter(containerIdFilter);
        const toasts = reverse && !stack ? filteredToasts.reverse() : filteredToasts;
        const cn = `${STYLE_NAMESPACE}__z9999 ${className ?? `${STYLE_NAMESPACE}__toast-container ${STYLE_NAMESPACE}__${position}`}`;

        return (
          <div
            key={position}
            data-testid={position}
            className={cn}
            style={style}
          >
            {toasts.map((toast, order, self) => {
              const mergedProps: ToasterProps['toastProps'] =
                Object.assign(toast, { gap, order, toastsBySamePosition: self, pauseOnActivate, stack });

              return (
                <Toast
                  key={toast.toastId}
                  toastProps={mergedProps}
                />
              )
            })}
          </div>
        );
      })}
    </div>
  );
}
