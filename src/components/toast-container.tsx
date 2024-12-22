import React from 'react';
import { useStrawberryToast } from '../core/store';
import { Toast } from './toast';
import { getDirection } from '../utils/get-direction';
import { ToastAbsolute } from './toast-absolute-container'
import type { Position, ToastState } from '../core/types';

const OFFSET = 16;

const positionStyle: Record<Position, React.CSSProperties> = {
  'top-left': {
    top: OFFSET,
    left: OFFSET,
  },
  'top-center': {
    top: OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: OFFSET,
    right: OFFSET,
  },
  'bottom-left': {
    bottom: OFFSET,
    left: OFFSET,
  },
  'bottom-center': {
    bottom: OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-right': {
    bottom: OFFSET,
    right: OFFSET,
  },
};

interface ToastContainerProps {
  reverse?: boolean;
  gap?: number;
}

export function ToastContainer({ gap = 9, reverse = false }: ToastContainerProps) {
  const toastList = useStrawberryToast();

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList
    .filter((toast) => !toast.element)
    .reduce((acc, toast) => {
      const key = toast.position;
      acc[key] = acc[key] || [];
      acc[key].push(toast);
      return acc;
    }, {} as Record<Position, Array<ToastState>>);

  const toastsByElement = toastList.filter((toast) => toast.element);

  return (
    <React.Fragment>
      {toastsByElement.map((toast) => (
        <ToastAbsolute key={toast.toastId} toast={toast} />
      ))}
      <div
        style={{
          position: 'fixed',
          zIndex: 9999,
          top: OFFSET,
          left: OFFSET,
          right: OFFSET,
          bottom: OFFSET,
          pointerEvents: 'none',
        }}
      >
        {Object.entries(toastsByPosition).map(([position, toasts]) => {
          const style = positionStyle[position as Position];

          const flexDirection = getDirection({
            position: position as Position,
            reverse,
          });

          return (
            <div
              key={position}
              style={{
                pointerEvents: 'auto',
                position: 'fixed',
                display: 'flex',
                flexDirection,
                gap,
                ...style,
              }}
            >
              {toasts.map((toast) => (
                <Toast key={toast.toastId} toast={toast} />
              ))}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
