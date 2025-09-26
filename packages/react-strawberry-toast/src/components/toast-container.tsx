'use client';

import React from 'react';
import { Toast, type OtherProps } from './toast';
import { useToasts } from '../hooks/use-toasts';
import type { Position, NonHeadlessToastState as ToastState } from '../types';
import { STYLE_NAMESPACE } from '../constants';
interface ToastContainerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: Position;
  containerId?: string;
  reverse?: boolean;
  gap?: number;
  pauseOnActivate?: boolean;
}

export function ToastContainer({
  className,
  style,
  position: globalPosition = 'top-center',
  containerId = '',
  gap = 9,
  reverse = false,
  pauseOnActivate = true,
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
          const mergedProps: OtherProps & ToastState =
            Object.assign(toast, { gap, order, samePositionLists: self, pauseOnActivate });

          return (
            <Toast
              key={toast.toastId}
              toastProps={mergedProps}
            />
          )
        })}
      {Object.entries(toastsByPosition).map(([position, toastByPosition]) => {
        const filteredToasts = toastByPosition.filter(containerIdFilter);

        const toasts = reverse ? filteredToasts.reverse() : filteredToasts;

        return (
          <div
            key={position}
            data-testid={position}
            className={`${STYLE_NAMESPACE}__z9999 ${className ?? `${STYLE_NAMESPACE}__toast-container ${STYLE_NAMESPACE}__${position}`
              }`}
            style={style}
          >
            {toasts.map((toast, order, self) => {
              const mergedProps: OtherProps & ToastState =
                Object.assign(toast, { gap, order, samePositionLists: self, pauseOnActivate });

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
