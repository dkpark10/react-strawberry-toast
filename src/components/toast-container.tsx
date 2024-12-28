import React from 'react';
import { useStrawberryToast } from '../core/store';
import { Toast } from './toast';
import { getDirection } from '../utils/get-direction';
import type { Position, ToastState } from '../core/types';
import { Condition, If, Else } from './condition';

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
  position?: Position;
  containerId?: string;
  reverse?: boolean;
  gap?: number;
}

export function ToastContainer({
  position: globalPosition = 'top-center',
  containerId = '',
  gap = 9,
  reverse = false,
}: ToastContainerProps) {
  const toastList = useStrawberryToast();

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList
    .filter((toast) => toast.containerId === undefined)
    .reduce((acc, toast) => {
      const key = toast.position || globalPosition;
      toast.position = key;
      acc[key] = acc[key] || [];
      acc[key].push(toast);
      return acc;
    }, {} as Record<Position, Array<ToastState>>);

  return (
    <Condition condition={!!containerId}>
      <If>
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: reverse ? 'column-reverse' : 'column',
              gap,
            }}
          >
            {toastList
              .filter((toast) => toast.containerId === containerId)
              .map((toast) => (
                <Toast key={toast.toastId} toast={toast} />
              ))}
          </div>
        </div>
      </If>
      <Else>
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
                data-testid={position}
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
      </Else>
    </Condition>
  );
}
