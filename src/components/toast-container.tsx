'use client';

import React from 'react';
import { Toast } from './toast';
import { useToasts } from '../hooks/use-toasts';
import { getDirection } from '../utils/get-direction';
import type { Position, NonHeadlessToastState as ToastState } from '../types';
import { STYLE_NAMESPACE } from '../constants';
import { Condition, If, Else } from './condition';
import '../styles/style.scss';

interface ToastContainerProps {
  position?: Position;
  containerId?: string;
  reverse?: boolean;
  gap?: number;
  pauseOnActivate?: boolean;
}

export function ToastContainer({
  position: globalPosition = 'top-center',
  containerId = '',
  gap = 9,
  reverse = false,
  pauseOnActivate = true,
}: ToastContainerProps) {
  const toastList = useToasts();

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList
    .filter((toast) => toast.containerId === null)
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
        <div className={`${STYLE_NAMESPACE}__toast-container`}>
          <div
            className={`${STYLE_NAMESPACE}__toast-inner-container`}
            style={{
              flexDirection: reverse ? 'column-reverse' : 'column',
              gap,
            }}
          >
            {toastList
              .filter((toast) => toast.containerId === containerId)
              .map((toast) => (
                <Toast key={toast.toastId} pauseOnActivate={pauseOnActivate} toastProps={toast} />
              ))}
          </div>
        </div>
      </If>
      <Else>
        <div className={`${STYLE_NAMESPACE}__toast-container`}>
          {Object.entries(toastsByPosition).map(([position, toasts]) => {
            const flexDirection = getDirection({
              position: position as Position,
              reverse,
            });

            return (
              <div
                key={position}
                data-testid={position}
                className={`${STYLE_NAMESPACE}__toast-inner-container ${STYLE_NAMESPACE}__${position}`}
                style={{
                  flexDirection,
                  gap,
                }}
              >
                {toasts.map((toast) => (
                  <Toast key={toast.toastId} toastProps={toast} pauseOnActivate={pauseOnActivate} />
                ))}
              </div>
            );
          })}
        </div>
      </Else>
    </Condition>
  );
}
