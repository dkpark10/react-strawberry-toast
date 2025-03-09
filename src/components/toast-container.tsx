'use client';

import React, { useRef } from 'react';
import { Toast } from './toast';
import { useToasts } from '../hooks/use-toasts';
import type { Position, NonHeadlessToastState as ToastState } from '../types';
import { STYLE_NAMESPACE } from '../constants';
import '../styles/style.scss';

type ChildRef = Record<ToastState['toastId'], number>;

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

  const heights = useRef<ChildRef>({});

  const toastsByPosition: Record<Position, Array<ToastState>> = toastList.reduce((acc, toast) => {
    const key = toast.position || globalPosition;
    toast.position = key;
    acc[key] = acc[key] || [];
    acc[key].push(toast);
    return acc;
  }, {} as Record<Position, Array<ToastState>>);

  return (
    <div id={`${STYLE_NAMESPACE}__root`}>
      {Object.entries(toastsByPosition).map(([position, toastByPosition]) => {
        const filteredToasts = toastByPosition
          .filter((toast) =>
            containerId ? toast.containerId === containerId : toast.containerId ? false : true
          )
          .slice(0, limit);

        const toasts = reverse ? filteredToasts.reverse() : filteredToasts;

        return (
          <div
            key={position}
            data-testid={position}
            className={`${`${STYLE_NAMESPACE}__z9999`} ${
              className ?? `${STYLE_NAMESPACE}__toast-container ${STYLE_NAMESPACE}__${position}`
            }`}
            style={style}
          >
            {toasts.map((toast, idx, self) => (
              <Toast
                ref={(element) => {
                  if (!element) {
                    delete heights.current[toast.toastId];
                    return;
                  }

                  const transition = 'transform 0.2s cubic-bezier(0.43, 0.14, 0.2, 1.05)';

                  const height = heights.current[toast.toastId] || element.getBoundingClientRect().height;
                  heights.current[toast.toastId] = height;

                  const x = /left/.test(position) ? 50 : /center/.test(position) ? 0 : -50;

                  const limitIdx = /bottom/.test(position) ? 0 : 1;

                  const top = self
                    .filter((_, order) => order <= idx - limitIdx)
                    .reduce((acc, t) => {
                      return /bottom/.test(position)
                        ? (acc -= gap + heights.current[t.toastId])
                        : (acc += gap + heights.current[t.toastId]);
                    }, 0);

                  element.style.transition = transition;
                  element.style.transform = `translate(${x}%, ${top}px)`;
                }}
                key={toast.toastId}
                toastProps={toast}
                pauseOnActivate={pauseOnActivate}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

