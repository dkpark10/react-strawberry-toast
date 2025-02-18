'use client';

import React from 'react';
import { Toast } from './toast';
import { useToasts } from '../hooks/use-toasts';
import { getDirection } from '../utils/get-direction';
import type { Position, NonHeadlessToastState as ToastState } from '../types';
import { STYLE_NAMESPACE } from '../constants';
import '../styles/style.scss';

interface ToastContainerProps {
  className?: string;
  style?: React.CSSProperties;
  position?: Position;
  containerId?: string;
  reverse?: boolean;
  gap?: number;
  pauseOnActivate?: boolean;
  limit?: number;
}

export function ToastContainer({
  className,
  style,
  limit,
  position: globalPosition = 'top-center',
  containerId = '',
  gap = 9,
  reverse = false,
  pauseOnActivate = true,
}: ToastContainerProps) {
  const toastList = useToasts();

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList.reduce((acc, toast) => {
    const key = toast.position || globalPosition;
    toast.position = key;
    acc[key] = acc[key] || [];
    acc[key].push(toast);
    return acc;
  }, {} as Record<Position, Array<ToastState>>);

  return (
    <div id={`${STYLE_NAMESPACE}__root`}>
      {Object.entries(toastsByPosition).map(([position, toasts]) => {
        const flexDirection = getDirection({
          position: position as Position,
          reverse,
        });

        return (
          <div
            key={position}
            data-testid={position}
            className={`${`${STYLE_NAMESPACE}__z9999`} ${
              className || `${STYLE_NAMESPACE}__toast-container ${STYLE_NAMESPACE}__${position}`
            }`}
            style={{
              flexDirection,
              gap,
              ...style,
            }}
          >
            {toasts
              .filter((toast) =>
                containerId ? toast.containerId === containerId : toast.containerId ? false : true
              )
              .slice(0, limit)
              .map((toast) => (
                <Toast key={toast.toastId} toastProps={toast} pauseOnActivate={pauseOnActivate} />
              ))}
          </div>
        );
      })}
    </div>
  );
}
