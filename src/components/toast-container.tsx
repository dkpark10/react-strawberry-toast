import { useStrawberryToast } from '../core/store';
import { ToastBase } from './toast-base';
import { styled } from '@linaria/react';
import type { Position, ToastState } from '../core/types';

const OFFSET = 16;

const ToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 16px;
  pointer-events: none;
`;

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

export function ToastContainer() {
  const toastList = useStrawberryToast();

  const toastListByPosition: Record<Position, Array<ToastState>> = toastList.reduce(
    (acc, toast) => {
      const key = toast.position;
      acc[key] = acc[key] || [];
      acc[key].push(toast);
      return acc;
    },
    {} as Record<Position, Array<ToastState>>,
  );

  return (
    <ToastWrapper>
      {Object.entries(toastListByPosition).map(([position, toastList]) => {
        const style = positionStyle[position as Position];

        return (
          <div
            key={position}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              width: 160,
              display: 'grid',
              gap: 9,
              ...style,
            }}
          >
            {toastList.map((toast) => {
              const close = () => toast.close(toast.id);

              const content = typeof toast.data === 'function' ? toast.data({ close }) : toast.data;

              return (
                <ToastBase
                  key={toast.id}
                  isVisible={toast.isVisible}
                  onMouseEnter={() => {
                    toast.pause(toast.id);
                  }}
                  onMouseLeave={() => {
                    toast.resume(toast.id);
                  }}
                >
                  {content}
                </ToastBase>
              );
            })}
          </div>
        );
      })}
    </ToastWrapper>
  );
}
