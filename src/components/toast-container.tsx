import React from 'react';
import { useStrawberryToast } from '../core/store';
import { toast as strawBerryToast } from '../core/toast';
import { Toast } from './toast';
import { getDirection } from '../utils/get-direction';
import { DefaultToast, ToastStatusIcons } from './toast-default';
import { ToastAbsoluteContainer } from './toast-absolute-container'
import { Condition, If, Else } from './condition';
import type { Position, ToastState } from '../core/types';
import { createPortal } from 'react-dom';

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

  const toastListByPosition: Record<Position, Array<ToastState>> = toastList.reduce((acc, toast) => {
    const key = toast.position;
    acc[key] = acc[key] || [];
    acc[key].push(toast);
    return acc;
  }, {} as Record<Position, Array<ToastState>>);

  return (
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
      {Object.entries(toastListByPosition).map(([position, toasts]) => {
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
            {toasts.map((toast) => {
              const close = () => strawBerryToast.disappear(toast.toastId, 0);

              const immediatelyClose = () => {
                strawBerryToast.disappear(toast.toastId, 0);
                strawBerryToast.remove(toast.toastId, 0);
              };

              const Icon = ToastStatusIcons[toast.toastStatus];

              const onMouseEnter = () => {
                strawBerryToast.pause(toast.toastId);
              };

              const onMouseLeave = () => {
                strawBerryToast.resume(toast.toastId);
              };

              const content =
                typeof toast.data === 'function'
                  ? toast.data({ close, immediatelyClose, icon: <Icon />, isVisible: toast.isVisible })
                  : toast.data;

              if (toast.element) {
                return (
                  <Toast
                    key={toast.toastId}
                    toast={toast}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    <Condition condition={typeof toast.data === 'function'}>
                      {/** custom component not styling */}
                      <If>
                        {createPortal(
                          <ToastAbsoluteContainer element={toast.element}>
                            {content}
                          </ToastAbsoluteContainer>,
                          document.body
                        )}
                      </If>
                      <Else>
                        {createPortal(
                          <ToastAbsoluteContainer element={toast.element}>
                            <DefaultToast
                              position={position as Position}
                              isVisible={toast.isVisible}
                              icon={<Icon />}
                            >
                              {content}
                            </DefaultToast>
                          </ToastAbsoluteContainer>,
                          document.body
                        )}
                      </Else>
                    </Condition>
                  </Toast>
                );
              }

              return (
                <Toast
                  key={toast.toastId}
                  toast={toast}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Condition condition={typeof toast.data === 'function'}>
                    {/** custom component not styling */}
                    <If>{content}</If>
                    <Else>
                      <DefaultToast
                        position={position as Position}
                        isVisible={toast.isVisible}
                        icon={<Icon />}
                      >
                        {content}
                      </DefaultToast>
                    </Else>
                  </Condition>
                </Toast>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
